const http = require('http');
const fs = require('fs');

const winston = require('winston');
const connect = require('connect');
const route = require('connect-route');
const connect_st = require('st');
const connect_rate_limit = require('connect-ratelimit');

const DocumentHandler = require('./lib/document_handler');

// Load the configuration and set some defaults
const configPath = process.argv.length <= 2 ? 'config.json' : process.argv[2];
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
config.port = process.env.PORT || config.port || 7777;
config.host = process.env.HOST || config.host || 'localhost';

/*
 * build the store from the config on-demand - so that we don't load it
 * for statics
 */
if (!config.storage) {
  config.storage = { type: 'file' };
}
if (!config.storage.type) {
  config.storage.type = 'file';
}

let Store, preferredStore;

if (process.env.REDISTOGO_URL && config.storage.type === 'redis') {
  const redisClient = require('redis-url').connect(process.env.REDISTOGO_URL);
  Store = require('./lib/document_stores/redis');
  preferredStore = new Store(config.storage, redisClient);
} else {
  Store = require(`./lib/document_stores/${config.storage.type}`);
  preferredStore = new Store(config.storage);
}

// Send the static documents into the preferred store, skipping expirations
let path, data;
for (const name in config.documents) {
  path = config.documents[name];
  data = fs.readFileSync(path, 'utf8');
  winston.info('loading static document', { name, path });
  if (data) {
    preferredStore.set(name, data, (cb) => {
      winston.debug('loaded static document', { success: cb });
    }, true);
  } else {
    winston.warn('failed to load static document', { name, path });
  }
}

// Pick up a key generator
const pwOptions = config.keyGenerator || {};
pwOptions.type = pwOptions.type || 'random';
const gen = require(`./lib/key_generators/${pwOptions.type}`);
const keyGenerator = new gen(pwOptions);

// Configure the document handler
const documentHandler = new DocumentHandler({
  store: preferredStore,
  maxLength: config.maxLength,
  keyLength: config.keyLength,
  keyGenerator
});

const app = connect();

// Rate limit all requests
if (config.rateLimits) {
  config.rateLimits.end = true;
  app.use(connect_rate_limit(config.rateLimits));
}

// first look at API calls
app.use(route((router) => {
  // get raw documents - support getting with extension

  router.get('/raw/:id', (request, response) => {
    return documentHandler.handleRawGet(request, response, config);
  });

  router.head('/raw/:id', (request, response) => {
    return documentHandler.handleRawGet(request, response, config);
  });

  // add documents

  router.post('/documents', (request, response) => {
    return documentHandler.handlePost(request, response);
  });

  // get documents
  router.get('/documents/:id', (request, response) => {
    return documentHandler.handleGet(request, response, config);
  });

  router.head('/documents/:id', (request, response) => {
    return documentHandler.handleGet(request, response, config);
  });
}));

// Otherwise, try to match static files
app.use(connect_st({
  path: `${__dirname}/src`,
  content: { maxAge: config.staticMaxAge },
  passthrough: true,
  index: false
}));

app.use(connect_st({
  path: `${__dirname}/dist`,
  content: { maxAge: config.staticMaxAge },
  passthrough: true,
  index: false
}));

console.log(`${__dirname}/dist`);
/*
 * Then we can loop back - and everything else should be a token,
 * so route it back to /
 */
app.use(route((router) => {
  router.get('/:id', (request, response, next) => {
    request.sturl = '/';
    next();
  });
}));

// And match index
app.use(connect_st({
  path: `${__dirname}/src`,
  content: { maxAge: config.staticMaxAge },
  index: 'index.html'
}));

http.createServer(app).listen(config.port, config.host);

winston.info(`listening on ${config.host}:${config.port}`);

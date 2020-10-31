/* eslint-disable no-var *//* eslint-disable object-shorthand *//* eslint-disable quote-props *//* eslint-disable no-unused-vars *//* eslint-disable no-undef *//* eslint-disable no-empty */
const haste_document = function () {
  this.locked = false;
};

const fontFamilyImport = document.querySelector('#editor-font-family');

const fonts = {
  AnonymousPro: `
    @font-face {
      font-family: 'Anonymous Pro';
      src: url('https://vizality.com/app/assets/fonts/anonymous-pro/anonymous-pro.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/anonymous-pro/anonymous-pro.woff') format('woff');
      font-display: swap;
    }`,
  DankMono: `
    @font-face {
      font-family: 'Dank Mono';
      src: url('https://vizality.com/app/assets/fonts/dank-mono/dank-mono.woff') format('woff');
      font-display: swap;
    }`,
  DejaVuSansMono: `
    @font-face {
      font-family: 'DejaVu Sans Mono';
      src: url('https://vizality.com/app/assets/fonts/dejavu-sans-mono/dejavu-sans-mono.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/dejavu-sans-mono/dejavu-sans-mono.woff') format('woff');
      font-display: swap;
    }`,
  FiraCodeMedium: `
    @font-face {
      font-family: 'FiraCode Medium';
      src: url('https://vizality.com/app/assets/fonts/firacode-medium/firacode-medium.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/firacode-medium/firacode-medium.woff') format('woff');
      font-display: swap;
    }`,
  Gintronic: `
    @font-face {
      font-family: 'Gintronic';
      src: url('https://vizality.com/app/assets/fonts/gintronic/gintronic.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/gintronic/gintronic.woff') format('woff');
      font-display: swap;
    }`,
  Hack: `
    @font-face {
      font-family: 'Hack';
      src: url('https://vizality.com/app/assets/fonts/hack/hack.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/hack/hack.woff') format('woff');
      font-display: swap;
    }`,
  Inconsolata: `
    @font-face {
      font-family: 'Inconsolata';
      src: url('https://vizality.com/app/assets/fonts/inconsolata/inconsolata.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/inconsolata/inconsolata.woff') format('woff');
      font-display: swap;
    }`,
  InputMono: `
    @font-face {
      font-family: 'Input Mono';
      src: url('https://vizality.com/app/assets/fonts/input-mono/input-mono.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/input-mono/input-mono.woff') format('woff');
      font-display: swap;
    }`,
  JetBrainsMono: `
    @font-face {
      font-family: 'JetBrains Mono';
      src: url('https://vizality.com/app/assets/fonts/jetbrains-mono/jetbrains-mono.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/jetbrains-mono/jetbrains-mono.woff') format('woff');
      font-display: swap;
    }`,
  Monoid: `
    @font-face {
      font-family: 'Monoid';
      src: url('https://vizality.com/app/assets/fonts/monoid/monoid.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/monoid/monoid.woff') format('woff');
      font-display: swap;
    }`,
  OperatorMono: `
    @font-face {
      font-family: 'Operator Mono';
      src: url('https://vizality.com/app/assets/fonts/operator-mono/operator-mono.woff2') format('woff2'),
            url('https://vizality.com/app/assets/fonts/operator-mono/operator-mono.woff') format('woff');
      font-display: swap;
    }`,
  SourceCodePro: `
    @font-face {
      font-family: 'Source Code Pro';
      src: url('https://vizality.com/app/assets/fonts/source-code-pro/source-code-pro-1.woff2') format('woff2');
      font-display: swap;
    }`
};

const lineNumbers = document.querySelector('.show-line-numbers');
lineNumbers.addEventListener('change', () => {
  if (lineNumbers.checked) {
    document.documentElement.setAttribute('line-numbers', '');
    setCookie('line-numbers', 'show');
  } else {
    document.documentElement.removeAttribute('line-numbers');
    setCookie('line-numbers', 'hide');
  }
});

const fontSizeSlider = document.getElementById('font-size-slider');
noUiSlider.create(fontSizeSlider, {
  start: getCookie('font-size') || 16,
  connect: 'lower',
  step: 1,
  orientation: 'horizontal',
  range: {
    'min': 10,
    'max': 30
  },
  tooltips: [ wNumb({ decimals: 0 }) ]
});

fontSizeSlider.noUiSlider.on('update', (values, handle, unencoded, tap, positions, noUiSlider) => {
  const value = unencoded.reduce(r => r);
  document.documentElement.style.setProperty('--vz-font-size', `${value}px`);
  setCookie('font-size', value);
});

const lineHeightSlider = document.getElementById('line-height-slider');
noUiSlider.create(lineHeightSlider, {
  start: getCookie('line-height') || 1.4,
  connect: 'lower',
  step: 0.1,
  orientation: 'horizontal',
  range: {
    'min': 0.8,
    'max': 2
  },
  tooltips: [ wNumb({ decimals: 1 }) ]
});

lineHeightSlider.noUiSlider.on('update', (values, handle, unencoded, tap, positions, noUiSlider) => {
  const value = unencoded.reduce(r => r);
  document.documentElement.style.setProperty('--vz-line-height', value);
  setCookie('line-height', value);
});

const backgroundShapesOpacitySlider = document.getElementById('background-shapes-opacity-slider');
noUiSlider.create(backgroundShapesOpacitySlider, {
  start: getCookie('background-shapes-opacity') * 100 || 60,
  connect: 'lower',
  step: 10,
  orientation: 'horizontal',
  range: {
    'min': 0,
    'max': 100
  },
  tooltips: [ wNumb({ decimals: 0 }) ]
});

backgroundShapesOpacitySlider.noUiSlider.on('update', (values, handle, unencoded, tap, positions, noUiSlider) => {
  const value = unencoded.reduce(r => r) / 100;
  document.documentElement.style.setProperty('--vz-background-shapes-opacity', value);
  setCookie('background-shapes-opacity', value);
});

document.addEventListener('DOMContentLoaded', () => {
  const tooltipItems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltipItems, { exitDelay: 0, outDuration: 0 });

  const selectItems = document.querySelectorAll('select');
  M.FormSelect.init(selectItems);
});

document.querySelector('.vz-select.font-family').addEventListener('change', function () {
  let value;
  switch (this.value) {
    case 'anonymous-pro':
      value = `'Anonymous Pro', monospace`;
      fontFamilyImport.innerHTML = fonts.AnonymousPro;
      break;
    case 'dank-mono':
      value = `'Dank Mono', monospace`;
      fontFamilyImport.innerHTML = fonts.DankMono;
      break;
    case 'dejavu-sans-mono':
      value = `'DejaVu Sans Mono', monospace`;
      fontFamilyImport.innerHTML = fonts.DejaVuSansMono;
      break;
    case 'firacode-medium':
      value = `'FiraCode Medium', monospace`;
      fontFamilyImport.innerHTML = fonts.FiraCodeMedium;
      break;
    case 'gintronic':
      value = `'Gintronic', monospace`;
      fontFamilyImport.innerHTML = fonts.Gintronic;
      break;
    case 'hack':
      value = `'Hack', monospace`;
      fontFamilyImport.innerHTML = fonts.Hack;
      break;
    case 'inconsolata':
      value = `'Inconsolata', monospace`;
      fontFamilyImport.innerHTML = fonts.Inconsolata;
      break;
    case 'input-mono':
      value = `'Input Mono', monospace`;
      fontFamilyImport.innerHTML = fonts.InputMono;
      break;
    case 'jetbrains-mono':
      value = `'JetBrains Mono', monospace`;
      fontFamilyImport.innerHTML = fonts.JetBrainsMono;
      break;
    case 'monoid':
      value = `'Monoid', monospace`;
      fontFamilyImport.innerHTML = fonts.Monoid;
      break;
    case 'operator-mono':
      value = `'Operator Mono', monospace`;
      fontFamilyImport.innerHTML = fonts.OperatorMono;
      break;
    case 'source-code-pro':
      value = `'Source Code Pro', monospace`;
      fontFamilyImport.innerHTML = fonts.SourceCodePro;
      break;
    default:
      value = `'Source Code Pro', monospace`;
      fontFamilyImport.innerHTML = fonts.SourceCodePro;
      break;
  }

  setCookie('font-family', value);
  document.documentElement.style.setProperty('--vz-font-family', value);
});

const themeItems = document.querySelectorAll('.vz-syntax-theme-item');

themeItems.forEach(item => {
  item.addEventListener('click', event => {
    themeItems.forEach(i => {
      i.classList.remove('active');
      item.classList.add('active');
    });

    const arr = event.target.className.split(' ');
    let theme = arr.filter(i => !i.indexOf('theme-item')).join();
    theme = theme.replace('theme-item-', '');
    setCookie('theme', theme);

    document.documentElement.setAttribute('theme', theme);
  });
});

const cookieCheck = (() => {
  const modeButton = document.querySelector('.vz-navigation-button.mode');

  document.documentElement.setAttribute('mode', getCookie('mode') || 'dark');

  if (getCookie('font-family')) {
    const fontFamilySelect = document.querySelector('.vz-select.font-family');
    switch (getCookie('font-family')) {
      case `'Anonymous Pro', monospace`:
        fontFamilyImport.innerHTML = fonts.AnonymousPro;
        fontFamilySelect.value = 'anonymous-pro';
        break;
      case `'Dank Mono', monospace`:
        fontFamilyImport.innerHTML = fonts.DankMono;
        fontFamilySelect.value = 'dank-mono';
        break;
      case `'DejaVu Sans Mono', monospace`:
        fontFamilyImport.innerHTML = fonts.DejaVuSansMono;
        fontFamilySelect.value = 'dejavu-sans-mono';
        break;
      case `'FiraCode Medium', monospace`:
        fontFamilyImport.innerHTML = fonts.FiraCodeMedium;
        fontFamilySelect.value = 'firacode-medium';
        break;
      case `'Gintronic', monospace`:
        fontFamilyImport.innerHTML = fonts.Gintronic;
        fontFamilySelect.value = 'gintronic';
        break;
      case `'Hack', monospace`:
        fontFamilyImport.innerHTML = fonts.Hack;
        fontFamilySelect.value = 'hack';
        break;
      case `'Inconsolata', monospace`:
        fontFamilyImport.innerHTML = fonts.Inconsolata;
        fontFamilySelect.value = 'inconsolata';
        break;
      case `'Input Mono', monospace`:
        fontFamilyImport.innerHTML = fonts.InputMono;
        fontFamilySelect.value = 'input-mono';
        break;
      case `'JetBrains Mono', monospace`:
        fontFamilyImport.innerHTML = fonts.JetBrainsMono;
        fontFamilySelect.value = 'jetbrains-mono';
        break;
      case `'Monoid', monospace`:
        fontFamilyImport.innerHTML = fonts.Monoid;
        fontFamilySelect.value = 'monoid';
        break;
      case `'Operator Mono', monospace`:
        fontFamilyImport.innerHTML = fonts.OperatorMono;
        fontFamilySelect.value = 'operator-mono';
        break;
      case `'Source Code Pro', monospace`:
        fontFamilyImport.innerHTML = fonts.SourceCodePro;
        fontFamilySelect.value = 'source-code-pro';
        break;
      default:
        fontFamilyImport.innerHTML = fonts.SourceCodePro;
        fontFamilySelect.value = 'source-code-pro';
        break;
    }
    document.documentElement.style.setProperty('--vz-font-family', getCookie('font-family'));
  }
  if (getCookie('line-numbers') === 'hide') {
    document.documentElement.removeAttribute('line-numbers');
    lineNumbers.checked = false;
  } else {
    document.documentElement.setAttribute('line-numbers', '');
    lineNumbers.checked = true;
  }
  if (getCookie('font-size')) {
    document.documentElement.style.setProperty('--vz-font-size', getCookie('font-size'));
  }
  if (getCookie('line-height')) {
    document.documentElement.style.setProperty('--vz-line-height', getCookie('line-height'));
  }
  if (getCookie('background-shapes-opacity')) {
    document.documentElement.style.setProperty('--vz-background-shapes-opacity', getCookie('background-shapes-opacity'));
  }
  if (getCookie('mode') === 'dark') {
    modeButton.dataset.tooltip = 'Light Mode<div class="tooltip-hint">Ctrl + M</div>';
  }
  if (getCookie('mode') === 'light') {
    modeButton.dataset.tooltip = 'Dark Mode<div class="tooltip-hint">Ctrl + M</div>';
  }
  if (getCookie('theme')) {
    themeItems.forEach(i => {
      i.classList.remove('active');
      if (document.querySelector(`.theme-item-${getCookie('theme')}`)) {
        document.querySelector(`.theme-item-${getCookie('theme')}`).classList.add('active');
      }
    });

    document.documentElement.setAttribute('theme', getCookie('theme'));
  }
})();

// Escapes HTML tag characters
haste_document.prototype.htmlEscape = function (s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
};

// Get this document from the server and lock it here
haste_document.prototype.load = function(key, callback, lang) {
  var _this = this;
  $.ajax('/documents/' + key, {
    type: 'get',
    dataType: 'json',
    success: function(res) {
      _this.locked = true;
      _this.key = key;
      _this.data = res.data;
      try {
        var high;
        if (lang === 'txt') {
          high = { value: _this.htmlEscape(res.data) };
        }
        else if (lang) {
          high = hljs.highlight(lang, res.data);
        }
        else {
          high = hljs.highlightAuto(res.data);
        }
      } catch(err) {
        // failed highlight, fall back on auto
        high = hljs.highlightAuto(res.data);
      }
      callback({
        value: high.value,
        key: key,
        language: high.language || lang,
        lineCount: res.data.split('\n').length
      });
    },
    error: function() {
      callback(false);
    }
  });
};

// Save this document to the server and lock it here
haste_document.prototype.save = function(data, callback) {
  if (this.locked) {
    return false;
  }
  this.data = data;
  var _this = this;
  $.ajax('/documents', {
    type: 'post',
    data: data,
    dataType: 'json',
    contentType: 'text/plain; charset=utf-8',
    success: function(res) {
      _this.locked = true;
      _this.key = res.key;
      var high = hljs.highlightAuto(data);
      callback(null, {
        value: high.value,
        key: res.key,
        language: high.language,
        lineCount: data.split('\n').length
      });
    },
    error: function(res) {
      try {
        callback($.parseJSON(res.responseText));
      }
      catch (e) {
        callback({message: 'Something went wrong!'});
      }
    }
  });
};

// represents the paste application

const haste = function (appName, options) {
  this.$root = document.documentElement;
  this.appName = appName;
  this.$textarea = $('.vz-textarea');
  this.$box = $('.vz-locked');
  this.$code = $('.vz-locked code');
  this.$linenos = $('.vz-lines');
  this.options = options;
  this.configureShortcuts();
  this.configureButtons();
};

// Set the page title - include the appName
haste.prototype.setTitle = function (ext) {
  const title = ext ? `${this.appName} - ${ext}` : this.appName;
  document.title = title;
};

// Show the light key
haste.prototype.lightKey = function () {
  this.configureKey([ 'new', 'save' ]);
  document.querySelector('.show-line-numbers-wrapper').classList.add('disabled');
};

// Show the full key
haste.prototype.fullKey = function () {
  this.configureKey([ 'new', 'edit', 'raw', 'theme' ]);
  document.querySelector('.show-line-numbers-wrapper').classList.remove('disabled');
};

// Set the key up for certain things to be enabled
haste.prototype.configureKey = function (enable) {
  let $this;
  let i = 0;
  $('.vz-navigation-action').each(function () {
    $this = $(this);
    for (i = 0; i < enable.length; i++) {
      if ($this.hasClass(enable[i])) {
        $this.addClass('enabled');
        return true;
      }
    }
    $this.removeClass('enabled');
  });
};

/*
 * Remove the current document (if there is one)
 * and set up for a new one
 */
haste.prototype.newDocument = function (hideHistory) {
  this.$box.hide();
  this.doc = new haste_document();
  if (!hideHistory) {
    window.history.pushState(null, this.appName, '/');
  }
  this.setTitle();
  this.lightKey();
  this.$textarea.val('').show('fast', function () {
    this.focus();
  });
  this.removeLineNumbers();
};

/*
 * Map of common extensions
 * Note: this list does not need to include anything that IS its extension,
 * due to the behavior of lookupTypeByExtension and lookupExtensionByType
 * Note: optimized for lookupTypeByExtension
 */
haste.extensionMap = {
  rb: 'ruby', py: 'python', pl: 'perl', php: 'php', scala: 'scala', go: 'go',
  xml: 'xml', html: 'xml', htm: 'xml', css: 'css', js: 'javascript', vbs: 'vbscript',
  lua: 'lua', pas: 'delphi', java: 'java', cpp: 'cpp', cc: 'cpp', m: 'objectivec',
  vala: 'vala', sql: 'sql', sm: 'smalltalk', lisp: 'lisp', ini: 'ini',
  diff: 'diff', bash: 'bash', sh: 'bash', tex: 'tex', erl: 'erlang', hs: 'haskell',
  md: 'markdown', txt: '', coffee: 'coffee', swift: 'swift'
};

/*
 * Look up the extension preferred for a type
 * If not found, return the type itself - which we'll place as the extension
 */
haste.prototype.lookupExtensionByType = function (type) {
  for (const key in haste.extensionMap) {
    if (haste.extensionMap[key] === type) return key;
  }
  return type;
};

/*
 * Look up the type for a given extension
 * If not found, return the extension - which we'll attempt to use as the type
 */
haste.prototype.lookupTypeByExtension = function (ext) {
  return haste.extensionMap[ext] || ext;
};

/*
 * Add line numbers to the document
 * For the specified number of lines
 */
haste.prototype.addLineNumbers = function (lineCount) {
  let h = '';
  for (let i = 0; i < lineCount; i++) {
    h += `${(i + 1).toString()}<br/>`;
  }
  $('.vz-lines').html(h);
};

// Remove the line numbers
haste.prototype.removeLineNumbers = function () {
  $('.vz-lines').html('&gt;');
};

// Load a document and show it
haste.prototype.loadDocument = function (key) {
  // Split the key up
  const parts = key.split('.', 2);
  // Ask for what we want
  const _this = this;
  _this.doc = new haste_document();
  _this.doc.load(parts[0], (ret) => {
    if (ret) {
      _this.$code.html(ret.value);
      _this.setTitle(ret.key);
      _this.fullKey();
      _this.$textarea.val('').hide();
      _this.$box.show().focus();
      _this.addLineNumbers(ret.lineCount);
    } else {
      _this.newDocument();
    }
  }, this.lookupTypeByExtension(parts[1]));
};

// Duplicate the current document - only if locked
haste.prototype.duplicateDocument = function () {
  if (this.doc.locked) {
    const currentData = this.doc.data;
    this.newDocument();
    this.$textarea.val(currentData);
  }
};

// Lock the current document
haste.prototype.lockDocument = function () {
  const _this = this;
  this.doc.save(this.$textarea.val(), (_, ret) => {
    if (ret) {
      _this.$code.html(ret.value);
      _this.setTitle(ret.key);
      let file = `/${ret.key}`;
      if (ret.language) {
        file += `.${_this.lookupExtensionByType(ret.language)}`;
      }
      window.history.pushState(null, `${_this.appName}-${ret.key}`, file);
      _this.fullKey();
      _this.$textarea.val('').hide();
      _this.$box.show().focus();
      _this.addLineNumbers(ret.lineCount);
    }
  });
};


haste.prototype.closeDrawers = function () {
  this.closeThemeDrawer();
  this.closeSettingsDrawer();
};

haste.prototype.closeThemeDrawer = function () {
  const themeDrawer = document.querySelector('.vz-navigation.syntax-themes');
  themeDrawer.classList.remove('open');

  const themeButton = document.querySelector('.vz-navigation-button.theme');
  themeButton.classList.remove('active');
};

haste.prototype.closeSettingsDrawer = function () {
  const settingsDrawer = document.querySelector('.vz-navigation.settings');
  settingsDrawer.classList.remove('open');

  const settingsButton = document.querySelector('.vz-navigation-button.settings');
  settingsButton.classList.remove('active');
};

haste.prototype.toggleThemeDrawer = function () {
  const themeDrawer = document.querySelector('.vz-navigation.syntax-themes');
  const drawerInner = document.querySelector('.vz-navigation.syntax-themes .vz-navigation-inner');

  themeDrawer.classList.toggle('open');
  const themeButton = document.querySelector('.vz-navigation-button.theme');
  if (themeDrawer.classList.contains('open')) {
    drawerInner.scrollTop = 0;
    themeButton.classList.add('active');
  } else {
    themeButton.classList.remove('active');
  }
};

haste.prototype.resetSettings = function () {
  const fontFamilySelect = document.querySelector('.vz-select.font-family');
  const dropdownText = document.querySelector('.dropdown-trigger');
  setCookie('font-family', `'Source Code Pro', monospace`);
  fontFamilyImport.innerHTML = fonts.SourceCodePro;
  fontFamilySelect.value = 'source-code-pro';

  setCookie('font-size', 16);
  fontSizeSlider.noUiSlider.set(16);

  setCookie('line-height', 1.4);
  lineHeightSlider.noUiSlider.set(1.4);

  setCookie('background-shapes-opacity', 0.6);
  backgroundShapesOpacitySlider.noUiSlider.set(60);

  setCookie('line-numbers', 'show');
  document.documentElement.setAttribute('line-numbers', '');
  lineNumbers.checked = true;
};

haste.prototype.toggleSettingsDrawer = function () {
  const settingsDrawer = document.querySelector('.vz-navigation.settings');

  settingsDrawer.classList.toggle('open');
  const settingsButton = document.querySelector('.vz-navigation-button.settings');
  if (settingsDrawer.classList.contains('open')) {
    settingsButton.classList.add('active');
  } else {
    settingsButton.classList.remove('active');
  }
};

haste.prototype.toggleMode = function () {
  const modeButton = document.querySelector('.vz-navigation-button.mode');

  if (this.$root.getAttribute('mode') === 'dark') {
    document.documentElement.setAttribute('mode', 'light');
    setCookie('mode', 'light');
    modeButton.dataset.tooltip = 'Dark Mode<div class="tooltip-hint">Ctrl + M</div>';
    M.Tooltip.getInstance(modeButton).close();
  } else {
    document.documentElement.setAttribute('mode', 'dark');
    setCookie('mode', 'dark');
    modeButton.dataset.tooltip = 'Light Mode<div class="tooltip-hint">Ctrl + M</div>';
    M.Tooltip.getInstance(modeButton).close();
  }
};

haste.prototype.configureButtons = function () {
  const _this = this;
  this.buttons = [
    {
      $where: $('.vz-navigation-button.save'),
      shortcut: (evt) => {
        return evt.ctrlKey && (evt.keyCode === 83);
      },
      action: () => {
        if (_this.$textarea.val().replace(/^\s+|\s+$/g, '') !== '') {
          _this.lockDocument();
        }
      }
    },
    {
      $where: $('.vz-navigation-button.new'),
      shortcut: (evt) => {
        return evt.ctrlKey && evt.keyCode === 78;
      },
      action: () => {
        _this.closeDrawers();
        _this.newDocument(!_this.doc.key);
      }
    },
    {
      $where: $('.vz-navigation-button.edit'),
      shortcut: (evt) => {
        return _this.doc.locked && evt.ctrlKey && evt.keyCode === 68;
      },
      action: () => {
        _this.closeDrawers();
        _this.duplicateDocument();
      }
    },
    {
      $where: $('.vz-navigation-button.raw'),
      shortcut: (evt) => {
        return evt.ctrlKey && evt.shiftKey && evt.keyCode === 82;
      },
      action: () => {
        window.location.href = `/raw/${_this.doc.key}`;
      }
    },
    {
      $where: $('.vz-navigation-button.mode'),
      shortcut: (evt) => {
        return evt.ctrlKey && (evt.keyCode === 77);
      },
      action: () => _this.toggleMode()
    },
    {
      $where: $('.vz-navigation-button.theme'),
      shortcut: (evt) => {
        return evt.ctrlKey && (evt.keyCode === 75);
      },
      action: () => {
        _this.closeSettingsDrawer();
        _this.toggleThemeDrawer();
      }
    },
    {
      $where: $('.vz-navigation-button.close-syntax-themes'),
      action: () => _this.closeThemeDrawer()
    },
    {
      $where: $('.vz-navigation-button.settings'),
      shortcut: (evt) => {
        return evt.ctrlKey && (evt.keyCode === 188);
      },
      action: () => {
        _this.closeThemeDrawer();
        _this.toggleSettingsDrawer();
      }
    },
    {
      override: true,
      shortcut: (evt) => {
        return evt.keyCode === 27;
      },
      action: () => {
        _this.closeThemeDrawer();
        _this.closeSettingsDrawer();
      }
    },
    {
      $where: $('.vz-settings-done'),
      action: () => _this.closeSettingsDrawer()
    },
    {
      $where: $('.vz-settings-reset'),
      action: () => _this.resetSettings()
    }
  ];
  for (let i = 0; i < this.buttons.length; i++) {
    this.configureButton(this.buttons[i]);
  }
};

haste.prototype.configureButton = function (options) {
  // Handle the click action
  if (!options.override) {
    options.$where.click(function (evt) {
      evt.preventDefault();
      if (!options.clickDisabled && $(this).hasClass('enabled')) {
        options.action();
      }
    });
  }
};

// Configure keyboard shortcuts for the textarea
haste.prototype.configureShortcuts = function () {
  const _this = this;
  $(document.body).keydown((evt) => {
    let button;
    for (let i = 0; i < _this.buttons.length; i++) {
      button = _this.buttons[i];
      if (button.shortcut && button.shortcut(evt) && (button.override || button.$where.hasClass('enabled'))) {
        evt.preventDefault();
        button.action();
        return;
      }
    }
  });
};

// Tab behavior in the textarea - 2 spaces per tab
$(() => {
  $('.vz-textarea').keydown(function (evt) {
    if (evt.keyCode === 9) {
      evt.preventDefault();
      const myValue = '  ';
      /*
       * http://stackoverflow.com/questions/946534/insert-text-into-textarea-with-jquery
       * For browsers like Internet Explorer
       */
      if (document.selection) {
        this.focus();
        const sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();
        // Mozilla and Webkit
      } else if (this.selectionStart || this.selectionStart === '0') {
        const startPos = this.selectionStart;
        const endPos = this.selectionEnd;
        const { scrollTop } = this;
        this.value = this.value.substring(0, startPos) + myValue +
          this.value.substring(endPos, this.value.length);
        this.focus();
        this.selectionStart = startPos + myValue.length;
        this.selectionEnd = startPos + myValue.length;
        this.scrollTop = scrollTop;
      } else {
        this.value += myValue;
        this.focus();
      }
    }
  });
});

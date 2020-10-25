/* eslint-disable no-unused-vars *//* eslint-disable no-undef */
const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

const eraseCookie = (name) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const Canvas = document.getElementById('canvas');
const ctx = Canvas.getContext('2d');

let particlesColor = getCookie('mode') === 'light' ? '#c7cad1' : '#202227';

const resize = () => {
  Canvas.width = Canvas.clientWidth;
  Canvas.height = Canvas.clientHeight;
};

window.addEventListener('resize', resize);
resize();

const switchMode = (mode) => {
  if (mode === 'light') {
    particlesColor = '#c7cad1';
  } else if (mode === 'dark') {
    particlesColor = '#202227';
  }
};

function callback (mutationsList, observer) {
  mutationsList.forEach(mutation => {
    if (mutation.attributeName === 'mode') {
      if (mutation.target.attributes.mode.value === 'light') {
        switchMode('light');
      }
      if (mutation.target.attributes.mode.value === 'dark') {
        switchMode('dark');
      }
    }
  });
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.documentElement, { attributes: true, attributeOldValue: false });


const elements = [];
const presets = {};

presets.o = (x, y, s, dx, dy) => {
  return {
    x,
    y,
    r: 12 * s,
    w: 5 * s,
    dx,
    dy,
    draw (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;

      ctx.beginPath();
      ctx.arc(this.x + +Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + +Math.sin((45 + x + (t / 10)) / 100) *
        4, this.r, 0, 2 * Math.PI, false);
      ctx.lineWidth = this.w;
      ctx.strokeStyle = particlesColor;
      ctx.stroke();
    }
  };
};

presets.x = (x, y, s, dx, dy, dr, r) => {
  r = r || 0;
  return {
    x,
    y,
    s: 20 * s,
    w: 5 * s,
    r,
    dx,
    dy,
    dr,
    draw (ctx, t) {
      this.x += this.dx;
      this.y += this.dy;
      this.r += this.dr;

      const _this = this;
      const line = function (x, y, tx, ty, c, o) {
        o = o || 0;
        ctx.beginPath();
        ctx.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
        ctx.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
        ctx.lineWidth = _this.w;
        ctx.strokeStyle = c;
        ctx.stroke();
      };

      ctx.save();

      ctx.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) *
        2);
      ctx.rotate(this.r * Math.PI / 180);

      line(-1, -1, 1, 1, particlesColor);
      line(1, -1, -1, 1, particlesColor);

      ctx.restore();
    }
  };
};

for (let x = 0; x < Canvas.width; x++) {
  for (let y = 0; y < Canvas.height; y++) {
    if (Math.round(Math.random() * 8000) === 1) {
      const s = ((Math.random() * 5) + 1) / 10;
      if (Math.round(Math.random()) === 1) {
        elements.push(presets.o(x, y, s, 0, 0));
      } else {
        elements.push(presets.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
      }
    }
  }
}

setInterval(() => {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  let amount = 0;
  const time = new Date().getTime();
  for (const e in elements) {
    amount++;
    if (amount % 2 === 0) {
      elements[e].draw(ctx, time);
    }
  }
}, 10);

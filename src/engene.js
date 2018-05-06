let cnv = document.getElementById('canvas');
let ctx = cnv.getContext('2d');

let render = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60);
    };
})();

let engine = function () {
  console.log("Game Loop doesn't init");
};

let startGame = function (game) {
  if (typeof game === 'function') {
    engine = game;
  }
  gameLoop();
};

let setGame = function (game) {
  if (typeof game === 'function') {
    engine = game;
  }
};

let gameLoop = function () {
  engine();
  render(gameLoop);
};

let clearAll = function () {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
};

let fillAll = function (color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
};

let draw = function (x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

let drawCircle = function (x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
};

function getRandom(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

let getMousePos = function (canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  let pos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
  
  return {
    x: pos.x > 0 && pos.x < rect.width && pos.y > 0 && pos.y < rect.height ? pos.x : -1,
    y: pos.x > 0 && pos.x < rect.width && pos.y > 0 && pos.y < rect.height ? pos.y : -1
  };
};

export {startGame, setGame, fillAll, draw, drawCircle, clearAll, getRandom, getMousePos}

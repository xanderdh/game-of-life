import {startGame, clearAll, fillAll} from './engene';
import Game from './game';

let cnv = document.getElementById('canvas');

let gameSettings = {
  elemSize: 10,
  w: 150,
  h: 60,
  life: '#00ff11',
  dead: '#000',
  field: '#343434'
};

let state = {
  condition: "PLAY",
  play: false,
  speed: 100
};

cnv.width = (gameSettings.elemSize + 1) * gameSettings.w - 1;
cnv.height = (gameSettings.elemSize + 1) * gameSettings.h - 1;

let game = new Game(gameSettings);
game.init();

const playStopButton = document.getElementById('play-stop');
const speedButton = document.getElementsByClassName('speed');
const randomizeButton = document.getElementById('randomize');
const clearButton = document.getElementById('clear');

clearButton.onclick = () => {
  game.init();
};

randomizeButton.onclick = () => {
  game.randomize();
};

playStopButton.onclick = () => {
  state.play = !state.play;
  playStopButton.innerHTML = state.play ? 'Stop' : 'Play'
};


for (let i = 0; i < speedButton.length; i++) {
  speedButton[i].onclick = () => {
    state.speed = +speedButton[i].dataset.speed;
  }
}

startGame(() => {
  clearAll();
  fillAll(gameSettings.field);

  if (state.condition === 'PLAY') {
    game.play(state.play, state.speed)
  }

});

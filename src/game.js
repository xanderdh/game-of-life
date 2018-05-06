import {getRandom, getMousePos} from './engene';
import Cell from './cell';

let counter = function (state) {
  return state ? 1 : 0
};

let cnv = document.getElementById('canvas');

export default class Game {
  constructor(option) {
    this.option = option;
    this.map = [];
    this.mapTmp = [];
    this.timeTmp = 0;
    this.delayTime = 0;
    this.mouse = {x: 0, y: 0}
  }

  delay() {
    let currentTime = new Date().getTime();

    if (currentTime > this.timeTmp + this.delayTime) {
      this.timeTmp = currentTime;
      return true
    } else return false
  }

  init() {
    this.map = [];
    for (let y = 0; y < this.option.h; y++) {
      let tmpRow = [];

      for (let x = 0; x < this.option.w; x++) {
        let cell = {
          x: x === 0 ? 0 : x * (this.option.elemSize + 1),
          y: y === 0 ? 0 : y * (this.option.elemSize + 1),
          w: this.option.elemSize,
          h: this.option.elemSize,
          life: false
        };

        tmpRow.push(new Cell(cell.x, cell.y, cell.w, cell.h, cell.life));
      }
      this.map.push(tmpRow);
    }

    window.onmousemove = (e) => {
      this.mouse = getMousePos(cnv, e);
    };

    window.onmousedown = e => {
      if (this.mouse.x >= 0 && this.mouse.y >= 0) {
        for (let y = 0; y < this.option.h; y++) {
          for (let x = 0; x < this.option.w; x++) {

            let collision = this.map[y][x].x <= this.mouse.x && this.map[y][x].x + this.map[y][x].w >= this.mouse.x &&
              this.map[y][x].y <= this.mouse.y && this.map[y][x].y + this.map[y][x].h >= this.mouse.y

            if (collision) {
              this.map[y][x].life = !this.map[y][x].life
            }
          }
        }
      }
    }
  }

  randomize() {
    for (let y = 0; y < this.option.h; y++) {
      for (let x = 0; x < this.option.w; x++) {
        if (getRandom(1, 100) < 10) {
          this.map[y][x].life = !this.map[y][x].life;
        }
      }
    }
  }

  drawAll() {
    for (let y = 0; y < this.option.h; y++) {
      for (let x = 0; x < this.option.w; x++) {
        this.map[y][x].draw(this.option)
      }
    }
  }

  calculateLife() {
    for (let y = 0; y < this.option.h; y++) {
      let tmpRow = [];

      for (let x = 0; x < this.option.w; x++) {

        let alive = 0;

        if (x + 1 < this.option.w) {
          alive += counter(this.map[y][x + 1].life);
        }

        if (y + 1 < this.option.h) {
          alive += counter(this.map[y + 1][x].life);
        }

        if (x + 1 < this.option.w && y + 1 < this.option.h) {
          alive += counter(this.map[y + 1][x + 1].life);
        }

        if (x - 1 >= 0) {
          alive += counter(this.map[y][x - 1].life);
        }

        if (y - 1 >= 0) {
          alive += counter(this.map[y - 1][x].life);
        }

        if (x - 1 >= 0 && y - 1 >= 0) {
          alive += counter(this.map[y - 1][x - 1].life);
        }

        if (x + 1 < this.option.w && y - 1 >= 0) {
          alive += counter(this.map[y - 1][x + 1].life);
        }

        if (x - 1 >= 0 && y + 1 < this.option.h) {
          alive += counter(this.map[y + 1][x - 1].life);
        }


        if (this.map[y][x].life) {
          if (alive < 2 || alive > 3) {
            tmpRow.push(new Cell(this.map[y][x].x, this.map[y][x].y, this.map[y][x].w, this.map[y][x].h, false));
          }

          if (alive === 2 || alive === 3) {
            tmpRow.push(new Cell(this.map[y][x].x, this.map[y][x].y, this.map[y][x].w, this.map[y][x].h, true));
          }

        } else {
          if (alive === 3) {
            tmpRow.push(new Cell(this.map[y][x].x, this.map[y][x].y, this.map[y][x].w, this.map[y][x].h, true));
          } else {
            tmpRow.push(this.map[y][x]);
          }
        }
      }

      this.mapTmp.push(tmpRow)
    }

    this.map = this.mapTmp;
  }

  play(animate, delay) {
    this.mapTmp = [];
    this.delayTime = delay;


    if (animate && this.delay()) {
      this.calculateLife()
    }

    this.drawAll();
  }
}

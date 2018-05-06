import {draw} from './engene';

export default class Cell {
  constructor(x, y, w, h, life) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.life = life;
  }

  draw(option) {
    draw(this.x, this.y, this.w, this.h, this.life ? option.life : option.dead)
  }
}

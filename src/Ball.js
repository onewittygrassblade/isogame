import Movable from './Movable';

export default class Ball extends Movable {
  constructor(drawable, worldX, worldY) {
    super(drawable, worldX, worldY);

    this.speed = 0.1;
  }
}

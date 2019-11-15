import Entity from './Entity';

export default class Ball extends Entity {
  move(worlPos) {
    this.updateCoords(worlPos);
    this.sprite.zIndex += 1;
  }

  update(dt) {

  }
}

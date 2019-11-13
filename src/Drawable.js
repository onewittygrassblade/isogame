export default class Drawable {
  constructor(texture, offset, isWalkable) {
    this.texture = texture;
    this.offset = offset;
    this.isWalkable = isWalkable;
  }
}

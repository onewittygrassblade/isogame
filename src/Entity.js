import { Sprite } from './const/aliases';
import { TILES_SIZE } from './const/world';

import { worldToIso } from './helpers/coords';

export default class Entity {
  constructor(drawable, worldX, worldY) {
    this.drawable = drawable;
    this.sprite = new Sprite(drawable.texture);

    this.worldPos = { x: worldX, y: worldY };
    this.placeInWorld();
    this.setZIndexOnX();
  }

  placeInWorld() {
    const isoPos = worldToIso(this.worldPos);
    this.sprite.position.set(
      isoPos.x + this.drawable.offset.x,
      isoPos.y + this.drawable.offset.y,
    );
  }

  setZIndexOnX(offset = 0) {
    this.sprite.zIndex = this.drawable.isWalkable
      ? 0
      : this.worldPos.x * TILES_SIZE.x + this.worldPos.y + offset;
  }

  setZIndexOnY(offset = 0) {
    this.sprite.zIndex = this.drawable.isWalkable
      ? 0
      : this.worldPos.x + this.worldPos.y * TILES_SIZE.y + offset;
  }
}

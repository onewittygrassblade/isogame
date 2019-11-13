import { Sprite } from './const/aliases';

import toIso from './helpers/toIso';

import { TILES_SIZE, TILES_OFFSET, TILE_SIZE_CARTESIAN } from './const/world';

export default class Entity {
  constructor(drawable, worldX, worldY) {
    this.drawable = drawable;
    this.sprite = new Sprite(drawable.texture);

    this.updateCoords(worldX, worldY);
  }

  updateCoords(worldX, worldY) {
    this.worldX = worldX;
    this.worldY = worldY;

    this.cartX = this.worldX * TILE_SIZE_CARTESIAN + TILES_OFFSET.x;
    this.cartY = this.worldY * TILE_SIZE_CARTESIAN + TILES_OFFSET.y;

    const isoPos = toIso(this.cartX, this.cartY);
    this.sprite.position.set(isoPos.x + this.drawable.offset.x, isoPos.y + this.drawable.offset.y);
    this.sprite.zIndex = worldX * TILES_SIZE.x + worldY;
  }
}

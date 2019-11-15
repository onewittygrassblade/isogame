import { Sprite } from './const/aliases';

import { worldToIso } from './helpers/coords';

import { TILES_SIZE, TILES_OFFSET, TILE_SIZE_CARTESIAN } from './const/world';

export default class Entity {
  constructor(drawable, worldX, worldY) {
    this.drawable = drawable;
    this.sprite = new Sprite(drawable.texture);

    this.updateCoords({ x: worldX, y: worldY });
  }

  updateCoords(worldPos) {
    const isoPos = worldToIso(worldPos);

    this.sprite.position.set(isoPos.x + this.drawable.offset.x, isoPos.y + this.drawable.offset.y);
    this.sprite.zIndex = worldPos.x * TILES_SIZE.x + worldPos.y;
  }
}

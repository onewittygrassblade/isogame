import {
  ParticleContainer,
  Sprite,
} from './const/aliases';

import Terrain from './Terrain';
import toIso from './helpers/toIso';

import { TILE_SIZE_CARTESIAN } from './const/app';
import { TILES, TILES_OFFSET } from './const/world';

export default class World {
  constructor(textures) {
    this.container = new ParticleContainer();
    this.terrains = {
      grass: new Terrain(textures['grass_stroke.png'], {x: 0, y: 0}),
      wall: new Terrain(textures['wall_stroke.png'], {x: 0, y: -64}),
    };

    this.build();
  }

  build() {
    for (let i = 0; i < TILES.length; i++) {
      for (let j = 0; j < 6; j++) {
        this.placeTile(
          this.terrains[TILES[i][j]],
          j * TILE_SIZE_CARTESIAN + TILES_OFFSET.x,
          i * TILE_SIZE_CARTESIAN + TILES_OFFSET.y
        );
      }
    }
  }

  placeTile(terrain, cartX, cartY) {
    const tile = new Sprite(terrain.texture);
    const isoPos = toIso(cartX, cartY);
    tile.position.set(isoPos.x + terrain.offset.x, isoPos.y + terrain.offset.y);
    this.container.addChild(tile);
  }
}

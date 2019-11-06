import {
  ParticleContainer,
  Sprite,
} from './const/aliases';

import { TILE_SIZE_CARTESIAN } from './const/app';

export default class World {
  constructor(textures) {
    this.container = new ParticleContainer();

    this.build(textures);
  }

  build(textures) {
    const tileMap = [
      ['wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png'],
      ['wall_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'wall_stroke.png'],
      ['wall_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'wall_stroke.png'],
      ['wall_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'wall_stroke.png'],
      ['wall_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'grass_stroke.png', 'wall_stroke.png'],
      ['wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png', 'wall_stroke.png'],
    ];

    for (let i = 0; i < tileMap.length; i++) {
      for (let j = 0; j < 6; j++) {
        const tile = new Sprite(textures[tileMap[i][j]]);
        const cartX = j * TILE_SIZE_CARTESIAN + 300;
        const cartY = i * TILE_SIZE_CARTESIAN - 100;
        tile.x = cartX - cartY;
        tile.y = (cartX + cartY) / 2;
        if (tileMap[i][j] === 'wall_stroke.png') {
          tile.y -= TILE_SIZE_CARTESIAN;
        }
        this.container.addChild(tile);
      }
    }
  }
}

import {
  ParticleContainer,
  Sprite,
} from './const/aliases';

import Drawable from './Drawable';
import Terrain from './Terrain';
import toIso from './helpers/toIso';

import { TILE_SIZE_CARTESIAN } from './const/app';
import { TILES, TILES_OFFSET } from './const/world';

export default class World {
  constructor(textures) {
    this.container = new ParticleContainer();
    this.drawables = {
      ball: new Drawable(textures['ball.png'], {x: 39, y: -8}),
      terrains: {
        grass: new Terrain(textures['grass_stroke.png'], {x: 0, y: 0}),
        wall: new Terrain(textures['wall_stroke.png'], {x: 0, y: -64}),
      },
    };

    this.renderTerrains();
    this.renderBall();
    this.orderSprites();
  }

  renderTerrains() {
    for (let i = 0; i < TILES.length; i++) {
      for (let j = 0; j < TILES[i].length; j++) {
        const terrain = this.drawables.terrains[TILES[i][j]];
        this.renderDrawable(terrain, j * TILE_SIZE_CARTESIAN + TILES_OFFSET.x, i * TILE_SIZE_CARTESIAN + TILES_OFFSET.y);
      }
    }
  }

  renderBall() {
    this.ball = this.renderDrawable(
      this.drawables.ball,
      2 * TILE_SIZE_CARTESIAN + TILES_OFFSET.x,
      2 * TILE_SIZE_CARTESIAN + TILES_OFFSET.y
    );
  }

  renderDrawable(drawable, cartX, cartY) {
    const sprite = new Sprite(drawable.texture);
    const isoPos = toIso(cartX, cartY);
    sprite.position.set(isoPos.x + drawable.offset.x, isoPos.y + drawable.offset.y);
    sprite.cartX = cartX;
    sprite.cartY = cartY;
    this.container.addChild(sprite);
    return sprite;
  }

  orderSprites() {
    this.container.children.sort((a, b) => {
      if (a.cartX < b.cartX) {
        return -1;
      }
      if (a.cartX > b.cartX) {
        return 1;
      }
      return 0;
    });

    this.container.children.sort((a, b) => {
      if (a.cartY < b.cartY) {
        return -1;
      }
      if (a.cartY > b.cartY) {
        return 1;
      }
      return 0;
    });
  }
}

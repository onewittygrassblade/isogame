import { ParticleContainer } from './const/aliases';

import Drawable from './Drawable';
import Entity from './Entity';

import { TILES, TILES_SIZE } from './const/world';

export default class World {
  constructor(textures) {
    this.container = new ParticleContainer({ sortableChildren: true });
    this.drawables = {
      ball: new Drawable(textures['ball.png'], { x: 39, y: -8 }, null),
      terrains: {
        grass: new Drawable(textures['grass_stroke.png'], { x: 0, y: 0 }, true),
        wall: new Drawable(textures['wall_stroke.png'], { x: 0, y: -64 }, false),
      },
    };

    this.renderTerrains();
    this.renderBall();
    this.container.sortChildren();
  }

  renderTerrains() {
    for (let i = 0; i < TILES_SIZE.x; i++) {
      for (let j = 0; j < TILES_SIZE.y; j++) {
        const drawable = this.drawables.terrains[TILES[i][j]];
        const terrain = new Entity(drawable, i, j);
        this.container.addChild(terrain.sprite);
      }
    }
  }

  renderBall() {
    this.ball = new Entity(this.drawables.ball, 2, 2);
    this.container.addChild(this.ball.sprite);
  }
}

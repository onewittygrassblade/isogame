import { Container } from './const/aliases';

import Drawable from './Drawable';
import Entity from './Entity';
import Ball from './Ball';
import { isoToWorld } from './helpers/coords';

import { TILES, TILES_SIZE } from './const/world';

export default class World {
  constructor(textures) {
    this.container = new Container({ sortableChildren: true });
    this.drawables = {
      ball: new Drawable(textures['ball.png'], { x: 39, y: -8 }, null),
      terrains: {
        grass: new Drawable(textures['grass_stroke.png'], { x: 0, y: 0 }, true),
        wall: new Drawable(textures['wall_stroke.png'], { x: 0, y: -64 }, false),
      },
    };

    this.createTiles();
    this.renderBall();
    this.container.sortChildren();
  }

  createTiles() {
    this.tiles = [];
    for (let i = 0; i < TILES_SIZE.x; i++) {
      this.tiles.push([]);
      for (let j = 0; j < TILES_SIZE.y; j++) {
        const drawable = this.drawables.terrains[TILES[i][j]];
        const terrain = new Entity(drawable, i, j);
        this.tiles[i].push(terrain);
        this.container.addChild(terrain.sprite);
      }
    }
  }

  renderBall() {
    this.ball = new Ball(this.drawables.ball, 3, 3);
    this.container.addChild(this.ball.sprite);
  }

  handleEvent(e) {
    if (e.type === 'mousedown') {
      this.moveBall({ x: e.offsetX, y: e.offsetY });
    }
  }

  moveBall(isoPos) {
    const worldPos = isoToWorld(isoPos);
    worldPos.x -= 1;
    if (!this.isWithinWorldBounds(worldPos)) return;

    const destination = this.getTerrainAtWorldPos(worldPos);
    if (destination.drawable.isWalkable) {
      this.ball.move(worldPos);
      this.container.sortChildren();
    }
  }

  isWithinWorldBounds(worldPos) {
    return worldPos.x > -1
      && worldPos.x < TILES_SIZE.x
      && worldPos.y > -1
      && worldPos.y < TILES_SIZE.y;
  }

  getTerrainAtWorldPos(worldPos) {
    return this.tiles[worldPos.x][worldPos.y];
  }

  update(dt) {
    this.ball.update(dt);
  }
}

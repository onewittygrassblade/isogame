import EasyStar from 'easystarjs';
import { Container } from 'pixi.js';

import Drawable from './Drawable';
import Entity from './Entity';
import Ball from './Ball';

import { TILES, TILES_SIZE } from './const/world';
import PubSub from './helpers/PubSub';
import { isoToWorld } from './helpers/coords';

export default class World {
  constructor(textures) {
    this.container = new Container({ sortableChildren: true });
    this.drawables = {
      ball: new Drawable(textures['ball.png'], { x: 39, y: -8 }, null),
      terrains: {
        grass: new Drawable(textures['grass.png'], { x: 0, y: 0 }, true),
        wall: new Drawable(textures['wall.png'], { x: 0, y: -32 }, false),
      },
    };

    this.createTiles();
    this.renderBall();
    this.container.sortChildren();

    this.configurePubSub();
    this.configurePathFinder();
  }

  createTiles() {
    this.tiles = [];
    for (let i = 0; i < TILES_SIZE.x; i++) {
      this.tiles.push([]);
      for (let j = 0; j < TILES_SIZE.y; j++) {
        const drawable = this.drawables.terrains[TILES[j][i]];
        const terrain = new Entity(drawable, i, j);
        this.tiles[i].push(terrain);
        this.container.addChild(terrain.sprite);
      }
    }
  }

  renderBall() {
    this.ball = new Ball(this.drawables.ball, 2, 3);
    this.container.addChild(this.ball.sprite);
  }

  configurePubSub() {
    PubSub.subscribe('directionXChange', () => {
      this.sortElements('setZIndexOnY');
    });

    PubSub.subscribe('directionYChange', () => {
      this.sortElements('setZIndexOnX');
    });
  }

  sortElements(sortingFunc) {
    for (let i = 0; i < TILES_SIZE.x; i++) {
      for (let j = 0; j < TILES_SIZE.y; j++) {
        this.tiles[i][j][sortingFunc]();
      }
    }
    this.ball[sortingFunc](0.5);
    this.container.sortChildren();
  }

  configurePathFinder() {
    this.easystar = new EasyStar.js(); // eslint-disable-line new-cap
    this.easystar.setGrid(TILES);
    this.easystar.setAcceptableTiles(['grass']);
    // this.easystar.enableDiagonals(); // depth sorting currently broken for diagonals
    // this.easystar.disableCornerCutting(); // unnecessary without diagonals
  }

  handleEvent(e) {
    if (e.type === 'mousedown') {
      this.moveBall({ x: e.offsetX, y: e.offsetY });
    }
  }

  moveBall(isoPos) {
    const worldPos = isoToWorld(isoPos);
    worldPos.x -= 1;

    if (!this.isWithinWorldBounds(worldPos)) {
      return;
    }

    if (worldPos.x === this.ball.worldPos.x && worldPos.y === this.ball.worldPos.y) {
      return;
    }

    const destinationTile = this.tiles[worldPos.x][worldPos.y];
    if (!destinationTile.drawable.isWalkable) {
      return;
    }

    this.easystar.findPath(
      this.ball.worldPos.x,
      this.ball.worldPos.y,
      worldPos.x,
      worldPos.y,
      (path) => {
        if (path) {
          this.ball.setPath(path);
        }
      }
    );
    this.easystar.calculate();
  }

  /* eslint-disable class-methods-use-this */
  isWithinWorldBounds(worldPos) {
    return worldPos.x > -1
      && worldPos.x < TILES_SIZE.x
      && worldPos.y > -1
      && worldPos.y < TILES_SIZE.y;
  }
  /* eslint-enable class-methods-use-this */

  update(dt) {
    if (this.ball.isMoving) {
      this.ball.update(dt);
    }
  }
}

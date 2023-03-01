import { Application, Assets } from 'pixi.js';

import World from './World';

import centerCanvas from './helpers/centerCanvas';

import {
  ASSETS_URL,
  RENDERER_WIDTH,
  RENDERER_HEIGHT,
} from './const/app';

export default class App extends Application {
  constructor() {
    super({ width: RENDERER_WIDTH, height: RENDERER_HEIGHT, backgroundColor: 0xababab });
  }

  async init() {
    // Set view
    document.getElementById('root').appendChild(this.view);

    centerCanvas(this.view);
    window.addEventListener('resize', () => {
      centerCanvas(this.view);
    });

    // Load assets
    const sheet = await Assets.load(ASSETS_URL);

    // Create scene
    this.world = new World(sheet.textures);
    this.stage.addChild(this.world.container);

    // Create event collectors
    this.events = [];
    this.view.addEventListener(
      'mousedown',
      (e) => this.events.push(e),
      false
    );

    // Set game loop
    // PIXI.Ticker uses a ratio that is 1 if FPS = 60, 2 if FPS = 2, etc.
    this.ticker.add((fpsRatio) => {
      this.processInput();
      this.world.update((fpsRatio * 1000) / 60); // time per frame = 1000 / 60 ms
    });
  }

  processInput() {
    while (this.events.length) {
      this.world.handleEvent(this.events[0]);
      this.events.shift();
    }
  }
}

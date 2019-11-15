import {
  loader,
  resources,
  Application,
} from './const/aliases';

import World from './World';

import centerCanvas from './helpers/centerCanvas';

import {
  RENDERER_WIDTH,
  RENDERER_HEIGHT,
} from './const/app';

export default class App extends Application {
  static loadAssets() {
    return new Promise((resolve, reject) => {
      loader
        .add('images/isotiles.json')
        .on('error', reject)
        .load(resolve);
    });
  }

  constructor() {
    super({ width: RENDERER_WIDTH, height: RENDERER_HEIGHT, backgroundColor: 0xababab });
  }

  setup() {
    // view
    document.getElementById('root').appendChild(this.view);

    centerCanvas(this.view);
    window.addEventListener('resize', () => {
      centerCanvas(this.view);
    });

    // event management
    this.events = [];
    this.view.addEventListener(
      'mousedown',
      (e) => this.events.push(e),
      false
    );

    // scene
    const { textures } = resources['images/isotiles.json'];
    this.world = new World(textures);
    this.stage.addChild(this.world.container);
  }

  run() {
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

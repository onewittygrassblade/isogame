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

    // scene
    const { textures } = resources['images/isotiles.json'];
    const world = new World(textures);
    this.stage.addChild(world.container);
  }

  // run() {
  //   PIXI.Ticker uses a ratio that is 1 if FPS = 60, 2 if FPS = 2, etc.
  //   this.ticker.add((fpsRatio) => {
  //
  //   });
  // }
}

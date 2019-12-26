import Entity from './Entity';
import PubSub from './helpers/PubSub';

import { worldToCart, cartToIso } from './helpers/coords';

export default class Movable extends Entity {
  constructor(drawable, worldX, worldY) {
    super(drawable, worldX, worldY);

    this.cartPos = worldToCart(this.worldPos);
    this.isMoving = false;
  }

  setPath(path) {
    this.path = path;
    this.path.shift();
    this.moveToPos(this.path[0]);
    this.path.shift();

    this.isMoving = true;
  }

  moveToPos(worldPos) {
    if (worldPos.x === this.worldPos.x) {
      PubSub.publish('directionYChange');
    } else {
      PubSub.publish('directionXChange');
    }
    this.worldPos = worldPos;
    this.destinationCartPos = worldToCart(worldPos);

    const dx = this.destinationCartPos.x - this.cartPos.x;
    const dy = this.destinationCartPos.y - this.cartPos.y;
    const d = Math.sqrt(dx * dx + dy * dy);

    this.cartVelocity = {
      x: (dx / d) * this.speed,
      y: (dy / d) * this.speed,
    };
  }

  update(dt) {
    if (!this.hasReachedDestination()) {
      this.cartPos.x += this.cartVelocity.x * dt;
      this.cartPos.y += this.cartVelocity.y * dt;
      const isoPos = cartToIso(this.cartPos);
      this.sprite.position.set(
        isoPos.x + this.drawable.offset.x,
        isoPos.y + this.drawable.offset.y,
      );
    } else if (this.path.length > 0) {
      this.moveToPos(this.path[0]);
      this.path.shift();
    } else {
      this.placeInWorld();
      this.isMoving = false;
    }
  }

  hasReachedDestination() {
    return Math.abs(this.destinationCartPos.x - this.cartPos.x) < 1
      && Math.abs(this.destinationCartPos.y - this.cartPos.y) < 1;
  }
}

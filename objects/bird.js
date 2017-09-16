const Util = require("../util");

class Bird {
  constructor(options) {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.speed = 3.5 * (Math.random() + 0.4);
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      Util.draw(ctx, this.feathersIcon, this, 100, 100);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.birdIcon, this, 50, 50);
    }
  }

  updatePos(helicopterPosY, wind) {
    this.posX -= this.speed + (this.birdShotCount / 8);
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX < -100) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.speed = 3 * (Math.random() + 0.35);
    this.feathers = 0;
  }
}

module.exports = Bird;

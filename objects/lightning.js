const Util = require("../util");

class Lightning {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = (-7000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
    this.width = 100;
    this.height = 700;
  }

  draw(ctx) {
    Util.draw(ctx, this.lightningIcon, this.posX, this.posY, this.width, this.height);
  }

  updatePos() {
    this.posY += 4.5;
    if (this.posY > 1100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = 1000 * Math.random();
    this.posY = -10000 * Math.random() - 1000;
    }
}

module.exports = Lightning;

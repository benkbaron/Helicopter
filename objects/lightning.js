const Util = require("../util");

class Lightning {
  constructor(options) {
    this.posX = (Util.canvasWidth * Math.random()) - 20;
    this.posY = (-5000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
    this.width = 100;
    this.height = 700;
  }

  draw(ctx) {
    Util.draw(ctx, this.lightningIcon, this, this.width, this.height);
  }

  updatePos() {
    this.posY += 4.5;
    if (this.posY > Util.canvasHeight + 100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = (Util.canvasWidth * Math.random()) - 20;
    this.posY = -5000 * Math.random() - 1000;
    }
}

module.exports = Lightning;

const Util = require("../util");

class Wind {
  constructor(options) {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = (500 * Math.random());
    this.width = 250;
    this.height = 250;
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.windIcon, this.posX, this.posY, this.width, this.height);
  }

  updatePos() {
    this.posX += 3;
    if (this.posX > 1200) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = 500 * Math.random();
  }
}

module.exports = Wind;

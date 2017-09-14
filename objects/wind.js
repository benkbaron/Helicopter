const Util = require("../util");

class Wind {
  constructor(options) {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = (500 * Math.random());
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.windIcon, this.posX, this.posY, 250, 250);
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

const Util = require("../util");

class Wind {
  constructor(options) {
    this.posX = -1200 - (Util.canvasWidth * Math.random());
    this.posY = (Util.canvasHeight * Math.random()) - 150;
    this.width = 250;
    this.height = 250;
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.windIcon, this, this.width, this.height);
  }

  updatePos() {
    this.posX += 3;
    if (this.posX > Util.canvasWidth + 200) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = -1200 - (Util.canvasWidth * Math.random());
    this.posY = (Util.canvasHeight * Math.random()) - 150;
  }
}

module.exports = Wind;

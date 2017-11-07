const Util = require("../util");

class Cloud {
  constructor(options) {
    this.posX = Util.canvasWidth + 200 + (800 * Math.random());
    this.posY = (Util.canvasHeight * Math.random()) - 100;
    this.width = 350;
    this.height = 350;
    this.cloudIcon = new Image();
    this.cloudIcon.src = "./assets/cloudIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.cloudIcon, this, this.width, this.height);
  }

  updatePos(wind) {
    if (this.posX < -400) {
      this.resetPos();
    } else if (this.posX > Util.canvasWidth / 4 && this.posX < Util.canvasWidth / 1.3) {
      this.posX -= 1/4;
    } else {
      this.posX -= 1;
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = Util.canvasWidth + 200 + (800 * Math.random());
    this.posY = (Util.canvasHeight * Math.random()) - 100;
  }
}

module.exports = Cloud;

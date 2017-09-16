const Util = require("../util");

class Cloud {
  constructor(options) {
    this.posX = 1200 + (1000 * Math.random());
    this.posY = (500 * Math.random()) - 100;
    this.width = 350;
    this.height = 350;
    this.cloudIcon = new Image();
    this.cloudIcon.src = "./assets/cloudIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.cloudIcon, this.posX, this.posY, this.width, this.height);
  }

  updatePos(wind) {
    if (this.posX < -500) {
      this.resetPos();
    } else if (this.posX > 400 && this.posX < 500) {
      this.posX -= 1/4;
    } else {
      this.posX -= 1;
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 500 * Math.random();
  }
}

module.exports = Cloud;

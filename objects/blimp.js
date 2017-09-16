const Util = require("../util");

class Blimp {
  constructor(options) {
    this.posX = - 500 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.width = 200;
    this.height = 200;
    this.blimpIcon = new Image();
    this.blimpIcon.src = "./assets/blimpIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.blimpIcon, this.posX, this.posY, this.width, this.height);
  }

  updatePos(wind) {
    if (this.posX > 1200) {
      this.resetPos();
    } else {
      this.posX += 1/2;
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 2;
    }
  }

  resetPos() {
    this.posX = - 600 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
  }

}

module.exports = Blimp;

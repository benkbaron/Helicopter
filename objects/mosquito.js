const Util = require("../util");

class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 800;
    this.mosquitoIcon = new Image();
    this.mosquitoIcon.src = "./assets/mosquitoIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.mosquitoIcon, this.posX, this.posY, 25, 25);
  }

  updatePos(helicopterPosX, helicopterPosY, wind) {
    if (helicopterPosX > this.posX) {
      this.posX += 3/4;
    } else {
      this.posX -= 3/4;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 3/4;
    } else {
      this.posY -= 3/4;
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 2.5;
    }
  }

  resetPos() {
    this.posX = 600 * Math.random();
    this.posY = 800;
  }

}

module.exports = Mosquito;

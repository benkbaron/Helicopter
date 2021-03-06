const Util = require("../util");

class Helicopter {
  constructor(options) {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
    this.keysDown = [];
    this.alive = true;
    this.width = 105;
    this.height = 105;
    this.initials = [" ", " ", " "];
    this.helicopterIconFlipped = new Image();
    this.helicopterIconFlipped.src = "./assets/helicopterIconFlipped.png";
    this.helicopterIcon = new Image();
    this.helicopterIcon.src = "./assets/helicopterIcon.png";
    this.skullIcon = new Image();
    this.skullIcon.src = "./assets/skullIcon.png";
  }

  draw(ctx) {
    let helicopterImage = this.flipped ? this.helicopterIconFlipped : this.helicopterIcon;
    helicopterImage = this.alive ? helicopterImage : this.skullIcon;
    Util.draw(ctx, helicopterImage, this, this.width, this.height);
  }

  updatePos(wind) {
    this.posY += 2;

    if (this.keysDown.includes(38)) {
      this.posY -= 6;
      }
    if (this.keysDown.includes(40)) {
      this.posY += 4;
      }
    if (this.keysDown.includes(37)) {
      this.posX -= 6;
      this.flipped = true;
      }
    if (this.keysDown.includes(39)) {
      this.posX += 6;
      this.flipped = false;
      }

    if (Util.inWindRange(this, wind)){
      this.posX += 5;
    }
  }

  resetPos() {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
  }

}

module.exports = Helicopter;

const Util = require("../util");

class Sun {
  constructor(options) {
    this.posX = 920;
    this.posY = 20;
    this.width = 70;
    this.height = 70;
    this.flipped = false;
    this.keysDown = [];
    this.alive = true;

    this.sunIcon = new Image();
    this.sunIcon.src = "./assets/sunIcon.png";

    this.sadSunIcon = new Image();
    this.sadSunIcon.src = "./assets/sadSunIcon.png";
  }

  draw(ctx, helicopter) {
    let sunImage = helicopter.alive ? this.sunIcon : this.sadSunIcon;
    Util.draw(ctx, sunImage, this, this.width, this.height);
  }

}

module.exports = Sun;

const Util = require("../util");

class Sun {
  constructor(options) {
    this.posX = Util.canvasWidth - 80;
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

  updatePos(){
    this.resetPos();
  }

  resetPos(){
    this.posX = Util.canvasWidth - 80;
    this.posY = 20;
  }

}

module.exports = Sun;

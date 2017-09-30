const Util = require("../util");

class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 800;
    this.width = 25;
    this.height = 25;
    this.mosquitoIcon = new Image();
    this.mosquitoIcon.src = "./assets/mosquitoIcon.png";
    this.difficulty = "easy";
    this.speed = 1/4;
  }

  difficultyChange(level) {
    this.difficulty = level;
    this.speed = this.difficulty === "easy" ? 1/4 : 4/5;
  }

  draw(ctx) {
    Util.draw(ctx, this.mosquitoIcon, this, this.width, this.width);
  }

  updatePos(wind, helicopter) {
    if (helicopter.posX > this.posX) {
      this.posX += this.speed;
    } else {
      this.posX -= this.speed;
    }

    if (helicopter.posY > this.posY) {
      this.posY += this.speed;
    } else {
      this.posY -= this.speed;
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

const Util = require("../util");

class Bird {
  constructor(options) {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.width = 50;
    this.height = 50;
    this.featherWidth = 100;
    this.featherHeight = 100;
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.difficulty = "easy";
    this.speed = 1.2 * (Math.random() + 0.4);
  }

  difficultyChange(level) {
    this.difficulty = level;
    this.speed = this.difficulty === "easy" ? 1.2 * (Math.random() + 0.4) : 3.5 * (Math.random() + 0.4);
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      Util.draw(ctx, this.feathersIcon, this, this.featherWidth, this.featherHeight);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.birdIcon, this, this.width, this.height);
    }
  }

  updatePos(wind, helicopter) {
    this.posX -= this.speed + (this.birdShotCount / 8);
    if (helicopter.posY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX < -100) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.speed = this.difficulty === "easy" ? 1.2 * (Math.random() + 0.4) : 3.5 * (Math.random() + 0.4);
    this.feathers = 0;
  }
}

module.exports = Bird;

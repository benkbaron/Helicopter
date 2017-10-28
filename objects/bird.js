const Util = require("../util");

class Bird {
  constructor(options) {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.width = 80;
    this.height = 80;
    this.featherWidth = 100;
    this.featherHeight = 100;
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.difficulty = "easy";
    this.speed = 1.1 * (Math.random() + 0.4);
    this.eagleImages = [];
    this.imageCounter = 0;

    for (let i = 0; i < 30; i++){
      let name = `${i}eagle`;
      this.name = new Image();
      this.name.src = `./assets/eagleImages/${i}eagle.gif`;
      this.eagleImages.push(this.name);
    }
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 1.3 * (Math.random() + 0.8);
        break;
      case "medium":
        this.speed = 3 * (Math.random() + 0.4);
        break;
      case "hard":
        this.speed = 4.5 * (Math.random() + 0.4);
        break;
    }
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      Util.draw(ctx, this.feathersIcon, this, this.featherWidth, this.featherHeight);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.eagleImages[Math.floor(this.imageCounter)], this, this.width, this.height);
      this.imageCounter += (this.speed / 3);
      this.imageCounter = this.imageCounter % 30;
    }
  }

  updatePos(wind, helicopter) {
    this.posX -= this.speed + (this.birdShotCount / 8);
    if (this.feathers > 0) {
      this.posY += 3;
    }
    if (helicopter.posY > this.posY) {
      this.posY += 1.3;
    } else {
      this.posY -= 1.3;
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
    this.difficultyChange(this.difficulty);
    this.feathers = 0;
  }
}

module.exports = Bird;

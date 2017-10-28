const Util = require("../util");

class BlueBird {
  constructor(options) {
    this.posX = (-500 * Math.random()) - 50;
    this.posY = 600 * Math.random();
    this.feathersWidth = 100;
    this.feathersHeight = 100;
    this.width = 60;
    this.height = 60;
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.blueBirdGif = new Image();
    this.blueBirdGif.src = "./assets/blueBirdGif.gif";
    this.speed = 1.1 * (Math.random() + 0.4);
    this.difficulty = "easy";
    this.blueBirdImages = [];
    this.imageCounter = 0;

    for (let i = 1; i <= 15; i++){
      let name = `blueBirdGif${i}`;
      this.name = new Image();
      this.name.src = `./assets/blueBirdImages/blueBird${i}.gif`;
      this.blueBirdImages.push(this.name);
    }
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 1.1 * (Math.random() + 0.4);
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
      Util.draw(ctx, this.feathersIcon, this, this.feathersWidth, this.feathersHeight);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.blueBirdImages[Math.floor(this.imageCounter)], this, this.width, this.height);
      this.imageCounter += (this.speed / 6);
      this.imageCounter = this.imageCounter % 15;
    }
  }

  updatePos(wind, helicopter) {
    this.posX += this.speed + (this.birdShotCount / 8);
    if (this.feathers > 0) {
      this.posY += 3;
    }
    if (helicopter.posY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX > 1050) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.speed += 0.03;
    }
  }

  resetPos() {
    this.posX = (-500 * Math.random()) - 50;
    this.posY = 600 * Math.random();
    this.difficultyChange(this.difficulty);
    this.feathers = 0;
  }
}

module.exports = BlueBird;

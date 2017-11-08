const Util = require("../util");
const Sound = require("../sound");

class Parachuter {
  constructor(options) {
    this.posX = Util.canvasWidth * Math.random() - 30;
    this.posY = -100 * Math.random() - 100;
    this.width = 60;
    this.height = 60;
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
    this.parachuterAngelIcon = new Image();
    this.parachuterAngelIcon.src = "./assets/angel.png";
    this.rescueCount = 0;
    this.lostCount = 0;
    this.dead = 0;
    this.speed = 0.8 + (this.rescueCount / 8);
    this.difficulty = "easy";
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 0.8 + (this.rescueCount / 7);
        break;
      case "medium":
        this.speed = 1.3 + (this.rescueCount / 6);
        break;
      case "hard":
        this.speed = 2.5 + (this.rescueCount / 5);
        break;
    }
  }

  draw(ctx) {
    let image = this.parachuterIcon;
    if (this.dead > 0) {
      if (this.dead === 80) {
        Sound.playSound("parachuterDied");
      }
      this.dead -= 1;
      image = this.parachuterAngelIcon;
      if (this.dead === 1) {
        this.rescueCount -= 1;
        this.resetPos();
      }
    }

    Util.draw(ctx, image, this, this.width, this.height);
  }

  updatePos(wind) {
    this.posY += this.speed;
    if (this.dead > 0) {
      this.posY -= 4;
    }
    if (this.posY > Util.canvasHeight + 10 || this.posX > Util.canvasWidth + 80) {
      this.rescueCount -= 1;
      Sound.playSound("parachuterDied");
      this.resetPos();
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos(saved = false) {
    this.posX = Util.canvasWidth * Math.random() - 30;
    this.posY = -100 * Math.random() - 100;
    if (saved) {
      Sound.playSound("catchSound");
    }
    this.difficultyChange(this.difficulty);
  }
}

module.exports = Parachuter;

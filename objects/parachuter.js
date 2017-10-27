const Util = require("../util");

let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

class Parachuter {
  constructor(options) {
    this.posX = 960 * Math.random();
    this.posY = -600 * Math.random();
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
        this.speed = 0.8 + (this.rescueCount / 8);
        break;
      case "medium":
        this.speed = 1.3 + (this.rescueCount / 8);
        break;
      case "hard":
        this.speed = 2.5 + (this.rescueCount / 8);
        break;
    }
  }

  draw(ctx) {
    let image = this.parachuterIcon;
    if (this.dead > 0) {
      this.dead -= 1;
      image = this.parachuterAngelIcon;
      if (this.dead === 1) {
        this.lostCount += 1;
        this.resetPos();
      }
    }

    Util.draw(ctx, image, this, this.width, this.height);
  }

  updatePos(wind) {
    this.posY += this.speed;
    if (this.posY > 610) {
      this.lostCount += 1;
      this.resetPos();
      wah.load();
      wah.play();
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 960 * Math.random();
    this.posY = -600 * Math.random();
    this.difficultyChange(this.difficulty);
  }
}

module.exports = Parachuter;

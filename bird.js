
class Bird {
  constructor(options) {
    this.posX = 1010;
    this.posY = 600 * Math.random();
    this.feathers = 0;

    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";

    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      ctx.drawImage(this.feathersIcon, this.posX, this.posY, 100, 100);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.birdIcon, this.posX, this.posY, 50, 50);
    }
  }

  updatePos(helicopterPosY) {
    this.posX -= 2.5;
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX < -100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = 1010;
    this.posY = 600 * Math.random();
  }
}

module.exports = Bird;

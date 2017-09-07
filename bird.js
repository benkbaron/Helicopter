
class Bird {
  constructor(options) {
    this.posX = 1010;
    this.posY = 600 * Math.random();
  }

  draw(ctx) {
    let birdPosX = this.posX;
    let birdPosY = this.posY;
    let birdIcon = new Image();
    birdIcon.src = "./assets/birdIcon.png";
    birdIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 50, 50);
    };
  }

  drawFeathers(ctx) {
    let birdPosX = this.posX;
    let birdPosY = this.posY;
    let feathersIcon = new Image();
    feathersIcon.src = "./assets/feathersIcon.png";
    feathersIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 100, 100);
    };
  }

  updatePos(helicopterPosY) {
    this.posX -= 2;
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


class Bird {
  constructor(options) {
    this.posX = 1010;
    this.posY = 600 * Math.random();
    this.feathers = 0;
  }

  draw(ctx) {
    let birdPosX = this.posX;
    let birdPosY = this.posY;

    if (this.feathers > 0) {
      this.feathers -= 1;
      let feathersIcon = new Image();
      feathersIcon.src = "./assets/feathersIcon.png";
      feathersIcon.onload = function() {
        ctx.drawImage(this, birdPosX, birdPosY, 100, 100);
      };
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
        let birdIcon = new Image();
        birdIcon.src = "./assets/birdIcon.png";
        birdIcon.onload = function() {
          ctx.drawImage(this, birdPosX, birdPosY, 50, 50);
        };
    }
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

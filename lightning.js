
class Lightning {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = (-10000 * Math.random()) - 1000;

  }

  draw(ctx) {
    let lightningPosX = this.posX;
    let lightningPosY = this.posY;
    let lightningIcon = new Image();
    lightningIcon.src = "./assets/lightningIcon.png";
    lightningIcon.onload = function() {
      ctx.drawImage(this, lightningPosX, lightningPosY, 100, 700);
    };
  }

  updatePos() {
    this.posY += 4;
    if (this.posY > 1100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = 1000 * Math.random();
    this.posY = -10000 * Math.random() - 1000;
    }
}

module.exports = Lightning;

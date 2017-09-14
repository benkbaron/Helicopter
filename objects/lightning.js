
class Lightning {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = (-7000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.lightningIcon, this.posX, this.posY, 100, 700);
  }

  updatePos() {
    this.posY += 4.5;
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

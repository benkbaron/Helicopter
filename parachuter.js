
class Parachuter {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.parachuterIcon, this.posX, this.posY, 50, 50);
  }

  updatePos() {
    this.posY += 1;
    if (this.posY > 1100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();
    }
}

module.exports = Parachuter;

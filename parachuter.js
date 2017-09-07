
class Parachuter {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();

  }

  draw(ctx) {
    let parachuterPosX = this.posX;
    let parachuterPosY = this.posY;
    let parachuterIcon = new Image();
    parachuterIcon.src = "./assets/parachuterIcon.png";
    parachuterIcon.onload = function() {
      ctx.drawImage(this, parachuterPosX, parachuterPosY, 50, 50);
    };
  }

  updatePos() {
    this.posY += 8;
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


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

  updatePos(wind) {
    this.posY += 1;
    if (this.posY > 1100) {
      this.resetPos();
    }
    if (this.inWindRange(wind)){
      this.posX += 3;
    }
  }

  inWindRange(wind) {
  if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
      (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
        return true;
      }
  return false;
  }

  resetPos() {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();
    }
}

module.exports = Parachuter;

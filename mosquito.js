
class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 800;
    this.mosquitoIcon = new Image();
    this.mosquitoIcon.src = "./assets/mosquitoIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.mosquitoIcon, this.posX, this.posY, 25, 25);
  }

  updatePos(helicopterPosX, helicopterPosY) {
    if (helicopterPosX > this.posX) {
      this.posX += 2/3;
    } else {
      this.posX -= 2/3;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 2/3;
    } else {
      this.posY -= 2/3;
    }
  }

}

module.exports = Mosquito;


class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 1005;
  }

  draw(ctx) {
    let mosquitoPosX = this.posX;
    let mosquitoPosY = this.posY;
    let mosquitoIcon = new Image();
    mosquitoIcon.src = "./assets/mosquitoIcon.png";
    mosquitoIcon.onload = function() {
      ctx.drawImage(this, mosquitoPosX, mosquitoPosY, 25, 25);
    };
  }

  updatePos(helicopterPosX, helicopterPosY) {
    if (helicopterPosX > this.posX) {
      this.posX += 1/2;
    } else {
      this.posX -= 1/2;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 1/2;
    } else {
      this.posY -= 1/2;
    }
  }

}

module.exports = Mosquito;

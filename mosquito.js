
class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 1100;
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
      this.posX += 3;
    } else {
      this.posX -= 3;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 3;
    } else {
      this.posY -= 3;
    }
  }

}

module.exports = Mosquito;

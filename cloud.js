
class Cloud {
  constructor(options) {
    this.posX = 1200 + (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;

  }

  draw(ctx) {
    let cloudPosX = this.posX;
    let cloudPosY = this.posY;
    let cloudIcon = new Image();
    cloudIcon.src = "./assets/cloudIcon.png";
    cloudIcon.onload = function() {
      ctx.drawImage(this, cloudPosX, cloudPosY, 350, 350);
    };
  }


  updatePos() {
    if (this.posX < -500) {
      this.resetPos();
    } else if (this.posX > 400 && this.posX < 500) {
      this.posX -= 2;
    } else {
      this.posX -= 10;
    }
  }

  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 600 * Math.random();
  }

}

module.exports = Cloud;

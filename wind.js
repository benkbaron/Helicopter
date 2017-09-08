
class Wind {
  constructor(options) {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    let windPosX = this.posX;
    let windPosY = this.posY;
    // windIcon.onload = function() {
      ctx.drawImage(this.windIcon, windPosX, windPosY, 250, 250);
    // };
  }


  updatePos() {
    this.posX += 3;
    if (this.posX > 1200) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = 600 * Math.random() - 100;
  }

}

module.exports = Wind;

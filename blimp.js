
class Blimp {
  constructor(options) {
    this.posX = - 1200 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;

  }

  draw(ctx) {
    let blimpPosX = this.posX;
    let blimpPosY = this.posY;
    let blimpIcon = new Image();
    blimpIcon.src = "./assets/blimpIcon.png";
    blimpIcon.onload = function() {
      ctx.drawImage(this, blimpPosX, blimpPosY, 200, 200);
    };
  }


  updatePos() {
    if (this.posX > 1200) {
      this.resetPos();
    } else {
      this.posX += 1/2;
    }
  }

  resetPos() {
    this.posX = - 600 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
  }

}

module.exports = Blimp;

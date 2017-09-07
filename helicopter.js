
class Helicopter {
  constructor(options) {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
  }

  draw(ctx) {
    let helicopterPosX = this.posX;
    let helicopterPosY = this.posY;
    let helicopterIcon = new Image();
    helicopterIcon.src = this.flipped ? "./assets/flippedhelicopterIcon.png" : "./assets/helicopterIcon.png";
    helicopterIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  }


  updatePos(code) {
    switch (code){
      case 38:
        this.posY -= 13;
        break;
      case 40:
        this.posY += 13;
        break;
      case 37:
        this.posX -= 13;
        this.flipped = true;
        break;
      case 39:
        this.posX += 13;
        this.flipped = false;
        break;
      }


  }

}

module.exports = Helicopter;

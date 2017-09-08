
class Helicopter {
  constructor(options) {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
    this.keysDown = [];
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

  drawSkull(ctx) {
    let helicopterPosX = this.posX;
    let helicopterPosY = this.posY;
    let skullIcon = new Image();
    skullIcon.src = "./assets/skullIcon.png";
    skullIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  }


  updatePos(wind) {
    this.posY += 2;

    if (this.keysDown.includes(38)) {
      this.posY -= 6;
      }
    if (this.keysDown.includes(40)) {
      this.posY += 6;
      }
    if (this.keysDown.includes(37)) {
      this.posX -= 6;
      this.flipped = true;
      }
    if (this.keysDown.includes(39)) {
      this.posX += 6;
      this.flipped = false;
      }

    if (this.inWindRange(wind)){
      this.posX += 6.1;
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
    this.posX = 100;
    this.posY = 100;
  }

}

module.exports = Helicopter;

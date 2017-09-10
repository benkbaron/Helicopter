
class Arrow {
  constructor(posX, posY) {
    this.posX = -100;
    this.posY = -100;
    this.appear = false;
    this.direction = "right";
    this.arrowIconLeft = new Image();
    this.arrowIconRight = new Image();
    this.arrowIconLeft.src = "./assets/flippedArrowIcon.png";
    this.arrowIconRight.src = "./assets/arrowIcon.png";
  }

  draw(ctx) {
    if (this.appear) {
      let arrowImage = this.direction === "right" ? this.arrowIconRight : this.arrowIconLeft;
      ctx.drawImage(arrowImage, this.posX, this.posY, 50, 50);
    }
  }

  shoot(helicopter) {
    if ((this.posY == -100) || (this.posX > 1050 || this.posX < -50)) {
      this.appear = true;
      this.posX = helicopter.flipped ? helicopter.posX : helicopter.posX + 100;
      this.posY = helicopter.posY + 20;
      this.direction = helicopter.flipped ? "left" : "right";
    }
  }

  updatePos(wind) {
    if (this.direction === "right") {
      this.posX += 4;
    } else {
      this.posX -= 4;
    }

    if (this.posX > 1050 || this.posX < -50) {
      this.appear = false;
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
    this.posX = -100;
    this.posY = -100;
  }

}

module.exports = Arrow;

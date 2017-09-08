
class Arrow {
  constructor(posX, posY) {
    this.posX = -1000;
    this.posY = -1000;
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
    if (this.posX > 1050 || this.posX < -50) {
      this.posX = helicopter.flipped ? helicopter.posX : helicopter.posX + 100;
      this.posY = helicopter.posY + 20;
      this.direction = helicopter.flipped ? "left" : "right";
      this.appear = true;
    }
  }

  updatePos() {
    if (this.direction === "right") {
      this.posX += 4;
    } else {
      this.posX -= 4;
    }

    if (this.posX > 1100 || this.posX < -100) {
      this.appear = false;
    }
  }

  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 600 * Math.random();
  }

}

module.exports = Arrow;

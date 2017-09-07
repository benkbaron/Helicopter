
class Arrow {
  constructor(posX, posY) {
    this.posX = -1000;
    this.posY = -1000;
    this.appear = false;
    this.direction = "right";
  }

  draw(ctx) {
    if (this.appear) {
      let arrowPosX = this.posX;
      let arrowPosY = this.posY;
      let arrowIcon = new Image();
      arrowIcon.src = this.direction === "right" ? "./assets/arrowIcon.png" : "./assets/flippedArrowIcon.png";
      arrowIcon.onload = function() {
        ctx.drawImage(this, arrowPosX, arrowPosY, 50, 50);
      };
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

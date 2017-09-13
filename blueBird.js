class BlueBird {
  constructor(options) {
    this.posX = -1000 * Math.random();
    this.posY = 600 * Math.random();
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.blueBirdGif = new Image();
    this.blueBirdGif.src = "./assets/blueBirdGif.gif";
    this.speed = 4 * (Math.random() + 0.4);

    this.blueBirdImages = [];

    this.blueBirdGif1 = new Image();
    this.blueBirdGif1.src = "./assets/blueBirdImages/blueBird1.gif";
    this.blueBirdGif2 = new Image();
    this.blueBirdGif2.src = "./assets/blueBirdImages/blueBird2.gif";
    this.blueBirdGif3 = new Image();
    this.blueBirdGif3.src = "./assets/blueBirdImages/blueBird3.gif";
    this.blueBirdGif4 = new Image();
    this.blueBirdGif4.src = "./assets/blueBirdImages/blueBird4.gif";
    this.blueBirdGif5 = new Image();
    this.blueBirdGif5.src = "./assets/blueBirdImages/blueBird5.gif";
    this.blueBirdGif6 = new Image();
    this.blueBirdGif6.src = "./assets/blueBirdImages/blueBird6.gif";
    this.blueBirdGif7 = new Image();
    this.blueBirdGif7.src = "./assets/blueBirdImages/blueBird7.gif";
    this.blueBirdGif8 = new Image();
    this.blueBirdGif8.src = "./assets/blueBirdImages/blueBird8.gif";
    this.blueBirdGif9 = new Image();
    this.blueBirdGif9.src = "./assets/blueBirdImages/blueBird9.gif";
    this.blueBirdGif10 = new Image();
    this.blueBirdGif10.src = "./assets/blueBirdImages/blueBird10.gif";
    this.blueBirdGif11 = new Image();
    this.blueBirdGif11.src = "./assets/blueBirdImages/blueBird11.gif";
    this.blueBirdGif12 = new Image();
    this.blueBirdGif12.src = "./assets/blueBirdImages/blueBird12.gif";
    this.blueBirdGif13 = new Image();
    this.blueBirdGif13.src = "./assets/blueBirdImages/blueBird13.gif";
    this.blueBirdGif14 = new Image();
    this.blueBirdGif14.src = "./assets/blueBirdImages/blueBird14.gif";
    this.blueBirdGif15 = new Image();
    this.blueBirdGif15.src = "./assets/blueBirdImages/blueBird15.gif";

    this.blueBirdImages.push(this.blueBirdGif1);
    this.blueBirdImages.push(this.blueBirdGif2);
    this.blueBirdImages.push(this.blueBirdGif3);
    this.blueBirdImages.push(this.blueBirdGif4);
    this.blueBirdImages.push(this.blueBirdGif5);
    this.blueBirdImages.push(this.blueBirdGif6);
    this.blueBirdImages.push(this.blueBirdGif7);
    this.blueBirdImages.push(this.blueBirdGif8);
    this.blueBirdImages.push(this.blueBirdGif9);
    this.blueBirdImages.push(this.blueBirdGif10);
    this.blueBirdImages.push(this.blueBirdGif11);
    this.blueBirdImages.push(this.blueBirdGif12);
    this.blueBirdImages.push(this.blueBirdGif13);
    this.blueBirdImages.push(this.blueBirdGif14);
    this.blueBirdImages.push(this.blueBirdGif15);
    this.imageCounter = 0;
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      ctx.drawImage(this.feathersIcon, this.posX, this.posY, 100, 100);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.blueBirdImages[Math.floor(this.imageCounter)], this.posX, this.posY, 60, 60);
      this.imageCounter += (this.speed / 6);
      this.imageCounter = this.imageCounter % 15;
    }
  }

  updatePos(helicopterPosY, wind) {
    this.posX += this.speed;
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX > 1050) {
      this.resetPos();
    }

    if (this.inWindRange(wind)){
      this.speed += 0.03;
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
    this.posX = -1000 * Math.random();
    this.posY = 600 * Math.random();
    this.speed = 3 * (Math.random() + 0.35);
  }
}

module.exports = BlueBird;

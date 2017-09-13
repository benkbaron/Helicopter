let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

class Parachuter {
  constructor(options) {
    this.posX = (1000 * Math.random()) - 30;
    this.posY = -600 * Math.random();
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
    this.parachuterSkullIcon = new Image();
    this.parachuterSkullIcon.src = "./assets/skullIcon.png";
    this.rescueCount = 0;
    this.lostCount = -1;
    this.dead = 0;
  }

  draw(ctx) {
    if (this.dead > 0) {
      this.dead -= 1;
      ctx.drawImage(this.parachuterSkullIcon, this.posX, this.posY, 60, 60);
      if (this.dead === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.parachuterIcon, this.posX, this.posY, 60, 60);
    }
  }

  updatePos(wind) {
    this.posY += 1.4 + (this.rescueCount / 10);
    if (this.posY > 610) {
      this.resetPos();
      wah.load();
      wah.play();
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

  resetPos(saved) {
    if (saved) {
      this.rescueCount += 1;
    } else {
      this.lostCount += 1;
    }
    this.posX = (1000 * Math.random()) - 30;
    this.posY = -600 * Math.random();
    }
}

module.exports = Parachuter;

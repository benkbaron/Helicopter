const Util = {

  checkCrash({helicopter, bird, blimp, mosquito, lightning}) {
    if (helicopter.posY > 550 || helicopter.posY < -100 ||
        helicopter.posX > 1100 || helicopter.posX < -100) {
      return true;
    }

    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [bird.posX + 25, bird.posY + 25]);
    if (space < 70 && bird.feathers === 0){
      bird.feathers = 25;
      return true;
    }

    space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [blimp.posX + 100, blimp.posY + 100]);
    if (space < 100){
      return true;
    }

    space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [mosquito.posX + 10, mosquito.posY + 10]);
    if (space < 40){
      return true;
    }

    let xDistance = Math.abs(helicopter.posX - lightning.posX);
    let yDistance = lightning.posY + 650 - helicopter.posY;

    if ((yDistance > 0 && yDistance < 700) && xDistance < 50){
      return true;
    }
  },

  checkCatch({helicopter, parachuter}) {
    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [parachuter.posX + 25, parachuter.posY + 25]);
    if (space < 60){
      return true;
    }
  },

  checkHit({arrowArr, bird, mosquito, parachuter}) {
    let answer = false;
    arrowArr.forEach((arrow) => {
      let space = this.distance([arrow.posX + 10, arrow.posY], [bird.posX + 30, bird.posY + 20]);
      if (space < 35){
        bird.feathers = 25;
        bird.birdShotCount += 1;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrow.posX + 10, arrow.posY], [parachuter.posX + 25, parachuter.posY + 15]);
      if (space < 30){
        parachuter.dead = 25;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrow.posX + 10, arrow.posY], [mosquito.posX, mosquito.posY]);
      if (space < 30) {
        mosquito.resetPos();
        arrow.resetPos();
        answer = true;
      }

    });
    return answer;
  },

  distance(pos1, pos2){
    let a = pos1[0] - pos2[0];
    let b = pos1[1] - pos2[1];

    return Math.sqrt(a*a + b*b);
  },
};

module.exports = Util;

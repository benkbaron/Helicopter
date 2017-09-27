let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

let catchSound = new Audio('./assets/catchSound.wav');
catchSound.volume = 0.25;

const Util = {

  checkCrash({helicopter, bird, blueBird, blimp, mosquito, lightning}) {
    if (helicopter.posY > 550 || helicopter.posY < -100 ||
        helicopter.posX > 1100 || helicopter.posX < -100) {
      return true;
    }

    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [bird.posX + 25, bird.posY + 25]);
    if (space < 70 && bird.feathers === 0){
      bird.feathers = 25;
      return true;
    }

    space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [blueBird.posX + (blueBird.width / 2), blueBird.posY + (blueBird.height / 2)]);
    if (space < 70 && blueBird.feathers === 0){
      blueBird.feathers = 25;
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

    if ((yDistance > 0 && yDistance < 700) && xDistance < 55){
      return true;
    }
  },

  checkCatch({helicopter, parachuter}) {
    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [parachuter.posX + 25, parachuter.posY + 25]);
    if (space < 60){
      if (parachuter.dead === 0) {
        parachuter.rescueCount += 1;
        parachuter.resetPos();
        catchSound.load();
        catchSound.play();
        return true;
      }
    }
  },

  checkHit({arrowArr, bird, blueBird, mosquito, parachuter}) {
    let answer = false;
    arrowArr.forEach((arrow) => {
    let arrowX = arrow.posX + (arrow.width / 2);
    let arrowY = arrow.posY + (arrow.height / 2);
    let space = this.distance([arrowX, arrowY], [bird.posX + (bird.width / 2), bird.posY + (bird.height / 2)]);
      if (space < 35 && bird.feathers === 0){
        bird.feathers = 25;
        bird.birdShotCount += 1;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([bird.posX + (bird.width / 2), bird.posY + (bird.height / 2)], [blueBird.posX + (blueBird.width / 2), blueBird.posY + (blueBird.height / 2)]);
      if (space < 20 && (bird.feathers === 0 && blueBird.feathers === 0)){
        blueBird.feathers = 25;
        bird.feathers = 25;
        answer = true;
      }

      space = this.distance([arrowX, arrowY], [blueBird.posX + (blueBird.width / 2), blueBird.posY + (blueBird.height / 2)]);
      if (space < 20 && blueBird.feathers === 0){
        blueBird.feathers = 25;
        blueBird.birdShotCount += 1;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([bird.posX + (bird.width / 2), bird.posY + (bird.height / 2)], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        bird.feathers = 25;
        parachuter.dead = 25;
        wah.load();
        wah.play();
        arrow.resetPos();
        answer = true;
      }
      space = this.distance([mosquito.posX + (mosquito.width / 2), mosquito.posY + (mosquito.height / 2)], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        mosquito.resetPos();
        parachuter.dead = 25;
        wah.load();
        wah.play();
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([blueBird.posX + (blueBird.width / 2), blueBird.posY + (blueBird.height / 2)], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        blueBird.feathers = 25;
        parachuter.dead = 25;
        wah.load();
        wah.play();
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrowX, arrowY], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        parachuter.dead = 25;
        wah.load();
        wah.play();
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrowX, arrowY], [mosquito.posX + (mosquito.width / 2), mosquito.posY + (mosquito.height / 2)]);
      if (space < 20) {
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

  inWindRange(obj, wind) {
    let space = this.distance([wind.posX, wind.posY], [obj.posX + (obj.width / 2), obj.posY + (obj.height / 2)]);
    if (space < 400 && wind.posX < obj.posX) return true;
    return false;
  },

  draw(ctx, image, object, width, height) {
    ctx.drawImage(image, object.posX, object.posY, width, height);
  },

};

module.exports = Util;

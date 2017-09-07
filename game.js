// import Helicopter from "./helicopter.js";
//
// class Game {
//   constructor() {
//     this.helicopter = new Helicopter;
//   }
//


document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1000, 600);
  //
  // ctx.font = '48px serif';
  // ctx.fillText('Rescue Count:', 10, 50);
  let flipped = false;

  drawHelicopter = () => {
    let helicopterIcon = new Image();
    helicopterIcon.src = flipped ? "./assets/flippedhelicopterIcon.png" : "./assets/helicopterIcon.png";
    helicopterIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  };

  drawBird = () => {
    let birdIcon = new Image();
    birdIcon.src = "./assets/birdIcon.png";
    birdIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 50, 50);
    };
  };

  drawCloud = () => {
    let cloudIcon = new Image();
    cloudIcon.src = "./assets/cloudIcon.png";
    cloudIcon.onload = function() {
      ctx.drawImage(this, cloudPosX, cloudPosY, 350, 350);
    };
  };

  drawLightning = () => {
    let lightningIcon = new Image();
    lightningIcon.src = "./assets/lightningIcon.png";
    lightningIcon.onload = function() {
      ctx.drawImage(this, lightningPosX, lightningPosY, 100, 700);
    };
  };

  drawBlimp = () => {
    let blimpIcon = new Image();
    blimpIcon.src = "./assets/blimpIcon.png";
    blimpIcon.onload = function() {
      ctx.drawImage(this, blimpPosX, blimpPosY, 200, 200);
    };
  };

  drawParachuter = () => {
    let parachuterIcon = new Image();
    parachuterIcon.src = "./assets/parachuterIcon.png";
    parachuterIcon.onload = function() {
      ctx.drawImage(this, parachuterPosX, parachuterPosY, 50, 50);
    };
  };

  drawFeathers = () => {
    let feathersIcon = new Image();
    feathersIcon.src = "./assets/feathersIcon.png";
    feathersIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 100, 100);
    };
  };

  drawSkull = () => {
    let skullIcon = new Image();
    skullIcon.src = "./assets/skullIcon.png";
    skullIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  };

  checkCrash = () => {
    let space = distance([helicopterPosX + 50, helicopterPosY + 50], [birdPosX + 25, birdPosY + 25]);
    if (space < 70){
      return true;
    }
  };

  checkCatch = () => {
    let space = distance([helicopterPosX + 50, helicopterPosY], [parachuterPosX + 25, parachuterPosY + 50]);
    if (space < 60){
      return true;
    }
  };



  distance = (pos1, pos2) => {
    let a = pos1[0] - pos2[0];
    let b = pos1[1] - pos2[1];

    return Math.sqrt(a*a + b*b);
  };

  let helicopterPosX = 100;
  let helicopterPosY = 100;

  let birdPosX = 1010;
  let birdPosY = 600 * Math.random();

  let cloudPosX = 1200 + (1000 * Math.random());
  let cloudPosY = (600 * Math.random()) - 100;

  let blimpPosX = - 1200 - (1000 * Math.random());
  let blimpPosY = (600 * Math.random()) - 100;

  let parachuterPosX = 1000 * Math.random();
  let parachuterPosY = -1000 * Math.random();

  let lightningPosX = 1000 * Math.random();
  let lightningPosY = -10000 * Math.random();

  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);

    if (checkCrash()) {
      drawFeathers();
      drawSkull();
      drawParachuter();
      drawBlimp();
      drawCloud();
      drawLightning();
    } else if (checkCatch()){
      drawHelicopter();
      updateBirdPos();
      drawBird();
      resetParachuterPos();
      drawParachuter();
      updateBlimpPos();
      drawBlimp();
      updateCloudPos();
      drawCloud();
      updateLightningPos();
      drawLightning();
    } else {
      drawHelicopter();
      updateBirdPos();
      drawBird();
      updateParachuterPos();
      drawParachuter();
      updateBlimpPos();
      drawBlimp();
      updateCloudPos();
      drawCloud();
      updateLightningPos();
      drawLightning();
    }
  };

  updateBirdPos = () => {
    birdPosX -= 10;
    if (helicopterPosY > birdPosY) {
      birdPosY += 3;
    } else {
      birdPosY -= 3;
    }

    if (birdPosX < -100) {
      birdPosX = 1010;
      birdPosY = 600 * Math.random();
    }
  };

  updateCloudPos = () => {
    if (cloudPosX < -500) {
      resetCloudPos();
    } else if (cloudPosX > 400 && cloudPosX < 500) {
      cloudPosX -= 2;
    } else {
      cloudPosX -= 10;
    }
  };

  updateBlimpPos = () => {
    if (blimpPosX > 1200) {
      resetBlimpPos();
    } else {
      blimpPosX += 5;
    }
  };

  updateParachuterPos = () => {
    parachuterPosY += 8;
    if (parachuterPosY > 1100) {
      resetParachuterPos();
    }
  };

  updateLightningPos = () => {
    lightningPosY += 60;
    if (lightningPosY > 1100) {
      resetLightningPos();
    }
  };

  resetParachuterPos = () => {
    parachuterPosX = 1000 * Math.random();
    parachuterPosY = -1000 * Math.random();
  };

  resetLightningPos = () => {
    lightningPosX = 1000 * Math.random();
    lightningPosY = -10000 * Math.random();
  };

  resetBlimpPos = () => {
    blimpPosX = - 1200 - (1000 * Math.random());
    blimpPosY = (600 * Math.random()) - 100;
  };

  resetCloudPos = () => {
    cloudPosX = 1200 + 1000 * Math.random();
    cloudPosY = 600 * Math.random();
  };

  resetPage();
  //
  // setInterval(resetPage(), 500);

  document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      switch (event.keyCode){
        case 38:
          helicopterPosY -= 13;
          break;
        case 40:
          helicopterPosY += 13;
          break;
        case 37:
          helicopterPosX -= 13;
          flipped = true;
          break;
        case 39:
          helicopterPosX += 13;
          flipped = false;
          break;
        }
      resetPage();
    }
  });
});
//
// module.exports = Game;

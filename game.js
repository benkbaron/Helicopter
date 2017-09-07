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

  drawHelicopter = () => {
    let helicopterIcon = new Image();
    helicopterIcon.src = "./assets/helicopterIcon.png";
    helicopterIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  };

  drawBird = () => {
    let birdIcon = new Image();
    birdIcon.src = "./assets/birdIcon.png";
    birdIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 100, 100);
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

  checkCrash = (helicopter, otherObject) => {
    if (distance([helicopterPosX, helicopterPosY], [birdPosX, birdPosY]) < 90){
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

  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);
    if (checkCrash()) {
      drawFeathers();
      drawSkull();
    } else {
      drawHelicopter();
      updateBirdPos();
      drawBird();
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

  resetPage();
  //
  // setInterval(resetPage(), 500);

  document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      switch (event.keyCode){
        case 38:
        helicopterPosY -= 10;
        break;
        case 40:
        helicopterPosY += 10;
        break;
        case 37:
        helicopterPosX -= 10;
        break;
        case 39:
        helicopterPosX += 10;
        break;
      }
      resetPage();
    }
  });
});
//
// module.exports = Game;

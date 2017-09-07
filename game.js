// import Helicopter from "./helicopter.js";
//
// class Game {
//   constructor() {
//     this.helicopter = new Helicopter;
//   }
//

const Parachuter = require("./parachuter");
const Blimp = require("./blimp");
const Cloud = require("./cloud");

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1000, 600);
  //
  // ctx.font = '48px serif';
  // ctx.fillText('Rescue Count:', 10, 50);
  let flipped = false;


  let parachuter1 = new Parachuter();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();





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

  drawLightning = () => {
    let lightningIcon = new Image();
    lightningIcon.src = "./assets/lightningIcon.png";
    lightningIcon.onload = function() {
      ctx.drawImage(this, lightningPosX, lightningPosY, 100, 700);
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
    let space = distance([helicopterPosX + 50, helicopterPosY], [parachuter1.posX + 25, parachuter1.posY + 50]);
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

  let lightningPosX = 1000 * Math.random();
  let lightningPosY = (-10000 * Math.random()) - 1000;

  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);

    if (checkCrash()) {
      drawFeathers();
      drawSkull();
      parachuter1.draw(ctx);
      blimp1.draw(ctx);
      cloud1.draw(ctx);
      drawLightning();
    } else if (checkCatch()){
      drawHelicopter();
      updateBirdPos();
      drawBird();
      parachuter1.resetPos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
      updateLightningPos();
      drawLightning();
    } else {
      drawHelicopter();
      updateBirdPos();
      drawBird();
      parachuter1.updatePos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
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


  updateLightningPos = () => {
    lightningPosY += 60;
    if (lightningPosY > 1100) {
      resetLightningPos();
    }
  };


  resetLightningPos = () => {
    lightningPosX = 1000 * Math.random();
    lightningPosY = -10000 * Math.random();
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

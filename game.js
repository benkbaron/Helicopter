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
const Lightning = require("./lightning");
const Bird = require("./bird");
const Mosquito = require("./mosquito");

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
  let lightning1 = new Lightning();
  let bird1 = new Bird();
  let mosquito1 = new Mosquito();

  drawHelicopter = () => {
    let helicopterIcon = new Image();
    helicopterIcon.src = flipped ? "./assets/flippedhelicopterIcon.png" : "./assets/helicopterIcon.png";
    helicopterIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
  };

  drawFeathers = (bird) => {
    let feathersIcon = new Image();
    feathersIcon.src = "./assets/feathersIcon.png";
    feathersIcon.onload = function() {
      ctx.drawImage(this, bird.posX, bird.posY, 100, 100);
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
    let space = distance([helicopterPosX + 50, helicopterPosY + 50], [bird1.posX + 25, bird1.posY + 25]);
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


  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);

    if (checkCrash()) {
      drawFeathers(bird1);
      drawSkull();
      parachuter1.draw(ctx);
      blimp1.draw(ctx);
      mosquito1.draw(ctx);
      cloud1.draw(ctx);
      lightning1.draw(ctx);
    } else if (checkCatch()){
      drawHelicopter();
      bird1.updatePos(helicopterPosY);
      bird1.draw(ctx);
      parachuter1.resetPos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      mosquito1.updatePos(helicopterPosX, helicopterPosY);
      mosquito1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
      lightning1.updatePos();
      lightning1.draw(ctx);
    } else {
      drawHelicopter();
      bird1.updatePos(helicopterPosY);
      bird1.draw(ctx);
      parachuter1.updatePos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      mosquito1.updatePos(helicopterPosX, helicopterPosY);
      mosquito1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
      lightning1.updatePos();
      lightning1.draw(ctx);
    }
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

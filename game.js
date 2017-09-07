const Parachuter = require("./parachuter");
const Blimp = require("./blimp");
const Cloud = require("./cloud");
const Lightning = require("./lightning");
const Bird = require("./bird");
const Mosquito = require("./mosquito");
const Helicopter = require("./helicopter");

// class Game {
//
//   constructor() {
//   }

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1000, 600);
  //
  // ctx.font = '48px serif';
  // ctx.fillText('Rescue Count:', 10, 50);


  let parachuter1 = new Parachuter();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();
  let lightning1 = new Lightning();
  let bird1 = new Bird();
  let mosquito1 = new Mosquito();
  let helicopter1 = new Helicopter();

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
      ctx.drawImage(this, helicopter1.posX, helicopter1.posY, 100, 100);
    };
  };

  checkCrash = () => {
    if (helicopter1.posY > 550) {
      return true;
    }
    let space = distance([helicopter1.posX + 50, helicopter1.posY + 50], [bird1.posX + 25, bird1.posY + 25]);
    if (space < 70){
      return true;
    }
  };

  checkCatch = () => {
    let space = distance([helicopter1.posX + 50, helicopter1.posY], [parachuter1.posX + 25, parachuter1.posY + 50]);
    if (space < 60){
      return true;
    }
  };

  distance = (pos1, pos2) => {
    let a = pos1[0] - pos2[0];
    let b = pos1[1] - pos2[1];

    return Math.sqrt(a*a + b*b);
  };

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
      helicopter1.updatePos();
      helicopter1.draw(ctx);
      bird1.updatePos(helicopter1.posY);
      bird1.draw(ctx);
      parachuter1.resetPos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      mosquito1.updatePos(helicopter1.posX, helicopter1.posY);
      mosquito1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
      lightning1.updatePos();
      lightning1.draw(ctx);
    } else {
      helicopter1.updatePos();
      helicopter1.draw(ctx);
      bird1.updatePos(helicopter1.posY);
      bird1.draw(ctx);
      parachuter1.updatePos();
      parachuter1.draw(ctx);
      blimp1.updatePos();
      blimp1.draw(ctx);
      mosquito1.updatePos(helicopter1.posX, helicopter1.posY);
      mosquito1.draw(ctx);
      cloud1.updatePos();
      cloud1.draw(ctx);
      lightning1.updatePos();
      lightning1.draw(ctx);
    }
  };

  // let timer = setInterval(resetPage, 1000/60);

  setInterval(resetPage, 1000/60);

  // run = () => {
  //   timer()
  //
  // }

  document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.shouldMove = true;
      helicopter1.lastKeyDown = event.keyCode;
      helicopter1.updatePos();
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.shouldMove = false;
      helicopter1.lastKeyDown = false;
      helicopter1.updatePos();
    }
  });


});


// }
//
// let game1 = new Game();
// setInterval(game1.resetPage(), 1000)

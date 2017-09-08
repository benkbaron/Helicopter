const Parachuter = require("./parachuter");
const Blimp = require("./blimp");
const Cloud = require("./cloud");
const Lightning = require("./lightning");
const Bird = require("./bird");
const Mosquito = require("./mosquito");
const Helicopter = require("./helicopter");
const Arrow = require("./arrow");

// class Game {
//
//   constructor() {
//   }

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");

  let parachuter1 = new Parachuter();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();
  let lightning1 = new Lightning();
  let bird1 = new Bird();
  let mosquito1 = new Mosquito();
  let helicopter1 = new Helicopter();
  let arrow1 = new Arrow();
  let rescueCount = 0;
  let birdShotCount = 0;
  let lifeCount = 3;

  let intervalSpeed = 1000/60;

  checkCrash = () => {
    if (helicopter1.posY > 550 || helicopter1.posY < -100 ||
        helicopter1.posX > 1100 || helicopter1.posX < -100) {
      return true;
    }

    let space = distance([helicopter1.posX + 50, helicopter1.posY + 50], [bird1.posX + 25, bird1.posY + 25]);
    if (space < 70 && bird1.feathers === 0){
      bird1.feathers = 25;
      return true;
    }

    space = distance([helicopter1.posX + 50, helicopter1.posY + 50], [mosquito1.posX + 10, mosquito1.posY + 10]);
    if (space < 40){
      return true;
    }

    let xDistance = Math.abs(helicopter1.posX - lightning1.posX);
    let yDistance = lightning1.posY + 650 - helicopter1.posY;

    if ((yDistance > 0 && yDistance < 700) && xDistance < 50){
      return true;
    }

  };

  checkCatch = () => {
    let space = distance([helicopter1.posX + 50, helicopter1.posY + 50], [parachuter1.posX + 25, parachuter1.posY + 25]);
    if (space < 60){
      rescueCount += 1;
      return true;
    }
  };

  checkHit = () => {
    let space = distance([arrow1.posX, arrow1.posY], [bird1.posX + 25, bird1.posY + 25]);
    if (space < 60){
      bird1.feathers = 25;
      birdShotCount += 1;
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
    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.fillText(`Rescues: ${rescueCount}`, 10, 25);
    ctx.fillText(`Birds Shot: ${birdShotCount}`, 10, 50);
    ctx.fillText(`Lives Left: ${lifeCount}`, 10, 75);
    addSun(ctx);
    if (lifeCount === 0) {
      displayGameOver();
      return;
    }

    // ctx.beginPath();
    // ctx.arc(950, 50, 25, 0, 2 * Math.PI, false);
    // ctx.fillStyle = 'yellow';
    // ctx.fill();

    if (checkCrash()) {
      displayCrash();
      intervalSpeed = 2000;
      helicopter1.resetPos();
      lifeCount -= 1;
    } else if (checkCatch()){
      intervalSpeed = 1000/60;

      displayCaught();
    } else if (checkHit()){
      intervalSpeed = 1000/60;

      displayHit();
    } else {
      intervalSpeed = 1000/60;

      displayStandard();
    }

    setTimeout(resetPage, intervalSpeed);
  };

  // setInterval(resetPage, intervalSpeed);

  document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.keysDown.push(event.keyCode);
      helicopter1.updatePos();
    }

    if (event.keyCode === 32){
      arrow1.shoot(helicopter1);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.keysDown = helicopter1.keysDown.filter(num => num !== event.keyCode );
      helicopter1.updatePos();
    }
  });

  displayCrash = () => {
    bird1.draw(ctx);
    helicopter1.drawSkull(ctx);
    parachuter1.draw(ctx);
    blimp1.draw(ctx);
    mosquito1.draw(ctx);
    lightning1.draw(ctx);
    cloud1.draw(ctx);
  };

  displayCaught = () => {
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
    lightning1.updatePos();
    lightning1.draw(ctx);
    arrow1.updatePos();
    arrow1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  displayHit = () => {
    helicopter1.updatePos();
    helicopter1.draw(ctx);
    bird1.draw(ctx);
    arrow1.appear = false;
    arrow1.posX = -1000;
    parachuter1.updatePos();
    parachuter1.draw(ctx);
    blimp1.updatePos();
    blimp1.draw(ctx);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY);
    mosquito1.draw(ctx);
    lightning1.updatePos();
    lightning1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  displayStandard = () => {
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
    lightning1.updatePos();
    lightning1.draw(ctx);
    arrow1.updatePos();
    arrow1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  addSun = (ctx) => {
    let sunIcon = new Image();
    sunIcon.src = "./assets/sunIcon.png";
    sunIcon.onload = function() {
      ctx.drawImage(this, 920, 20, 70, 70);
    };
  };

  resetPage();

  displayGameOver = () => {
    ctx.fillStyle = "white";
    ctx.font = '80px serif';
    ctx.fillText('Sorry you lost!', 270, 280);
  };

});


// }
//
// let game1 = new Game();
// setInterval(game1.resetPage(), 1000)

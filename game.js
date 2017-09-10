const Parachuter = require("./parachuter");
const Blimp = require("./blimp");
const Cloud = require("./cloud");
const Lightning = require("./lightning");
const Bird = require("./bird");
const Mosquito = require("./mosquito");
const Helicopter = require("./helicopter");
const Arrow = require("./arrow");
const Wind = require("./wind");

const Util = require("./util");

let reset;

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 1000, 600);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1000, 600);
  ctx.fillStyle = "white";
  ctx.font = '80px serif';
  ctx.fillText('Helicopter', 320, 150);
  ctx.fillStyle = "white";
  ctx.font = '50px serif';
  ctx.fillText('Hit Spacebar to Start!', 270, 270);
  ctx.fillStyle = "black";
  ctx.font = '25px serif';
  ctx.fillText('Fly using the arrow keys. Rescue parachuters by flying over them.', 150, 380);
  ctx.fillText('All objects, but clouds and wind, are dangerous! Careful to stay in the borders!', 100, 440);
  ctx.fillText('Shoot birds and mosquitos using spacebar, only 1 arrow at a time.', 170, 500);

  let parachuter1 = new Parachuter();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();
  let lightning1 = new Lightning();
  let bird1 = new Bird();
  let mosquito1 = new Mosquito();
  let helicopter1 = new Helicopter();
  let arrow1 = new Arrow();
  let wind1 = new Wind();
  parachuter1.rescueCount = 0;
  parachuter1.lostCount = -1;
  bird1.birdShotCount = 0;
  let lifeCount = 3;

  let intervalSpeed = 1000/60;

  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.font = '18px serif';
    ctx.fillText(`Parachuters Saved: ${parachuter1.rescueCount}`, 10, 22);
    ctx.fillText(`Parachuters Lost: ${parachuter1.lostCount}`, 10, 44);
    ctx.fillText(`Birds Shot: ${bird1.birdShotCount}`, 10, 66);
    ctx.fillText(`Lives Left: ${lifeCount}`, 10, 88);

    if (lifeCount === 0) {
      displayGameOver();
      return;
    }

    if (reset) {
      resetObjects();
      reset = false;
    }

    if (Util.checkCrash({helicopter: helicopter1, bird: bird1, blimp: blimp1,
                         mosquito: mosquito1, lightning: lightning1})) {
      displayCrash();
      intervalSpeed = 2000;
      lifeCount -= 1;
      reset = true;
    } else if (Util.checkCatch({helicopter: helicopter1, parachuter: parachuter1})) {
        intervalSpeed = 1000/60;
        displayCaught();
    } else if (Util.checkHit({arrow: arrow1, bird: bird1, mosquito: mosquito1, parachuter: parachuter1})) {
        intervalSpeed = 1000/60;
        displayHit();
    } else {
        intervalSpeed = 1000/60;
        displayStandard();
    }

    setTimeout(resetPage, intervalSpeed);
  };

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (gameStarted) {
      if (event.keyCode >= 37 && event.keyCode <= 40 ) {
        helicopter1.keysDown.push(event.keyCode);
        helicopter1.updatePos(wind1);
      }
    }
    if (event.keyCode === 32){
      if (lifeCount === 0 || gameStarted === false) {
        restartGame();
      } else {
        arrow1.shoot(helicopter1);
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.keysDown = helicopter1.keysDown.filter(num => num !== event.keyCode );
      helicopter1.updatePos(wind1);
    }
  });

  let gameStarted = false;

  displayCrash = () => {
    addSadSun(ctx);
    bird1.draw(ctx);
    helicopter1.drawSkull(ctx);
    parachuter1.draw(ctx);
    blimp1.draw(ctx);
    mosquito1.draw(ctx);
    lightning1.draw(ctx);
    wind1.draw(ctx);
    cloud1.draw(ctx);
  };

  resetObjects = () => {
    addSadSun(ctx);
    bird1.resetPos();
    helicopter1.resetPos();
    parachuter1.resetPos();
    parachuter1.lostCount -= 1;
    blimp1.resetPos();
    mosquito1.resetPos();
    lightning1.resetPos();
    wind1.resetPos();
    cloud1.resetPos();
    arrow1.resetPos();
    bird1.draw(ctx);
    helicopter1.drawSkull(ctx);
    parachuter1.draw(ctx);
    blimp1.draw(ctx);
    mosquito1.draw(ctx);
    lightning1.draw(ctx);
    wind1.draw(ctx);
    arrow1.draw(ctx);
    cloud1.draw(ctx);
  };

  displayCaught = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    helicopter1.draw(ctx);
    bird1.updatePos(helicopter1.posY, wind1);
    bird1.draw(ctx);
    parachuter1.resetPos(true);
    parachuter1.draw(ctx);
    blimp1.updatePos(wind1);
    blimp1.draw(ctx);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    mosquito1.draw(ctx);
    lightning1.updatePos();
    lightning1.draw(ctx);
    arrow1.updatePos(wind1);
    arrow1.draw(ctx);
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos(wind1);
    cloud1.draw(ctx);
  };

  displayHit = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    helicopter1.draw(ctx);
    bird1.updatePos(helicopter1.posY, wind1);
    bird1.draw(ctx);
    arrow1.appear = false;
    arrow1.posX = -1000;
    parachuter1.updatePos(wind1);
    parachuter1.draw(ctx);
    blimp1.updatePos(wind1);
    blimp1.draw(ctx);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    mosquito1.draw(ctx);
    lightning1.updatePos();
    lightning1.draw(ctx);
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos(wind1);
    cloud1.draw(ctx);
  };

  displayStandard = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    bird1.updatePos(helicopter1.posY, wind1);
    parachuter1.updatePos(wind1);
    blimp1.updatePos(wind1);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    lightning1.updatePos();
    arrow1.updatePos(wind1);
    wind1.updatePos();
    cloud1.updatePos(wind1);
    helicopter1.draw(ctx);
    bird1.draw(ctx);
    parachuter1.draw(ctx);
    blimp1.draw(ctx);
    mosquito1.draw(ctx);
    lightning1.draw(ctx);
    arrow1.draw(ctx);
    wind1.draw(ctx);
    cloud1.draw(ctx);
  };

  displayGameOver = () => {
    ctx.fillStyle = "white";
    ctx.font = '80px serif';
    ctx.fillText('So sorry you lost!', 220, 280);
    ctx.font = '50px serif';
    ctx.fillText('Spacebar to Try Again', 280, 400);
    addSadSun(ctx);
  };

  restartGame = () => {
    parachuter1.rescueCount = 0;
    parachuter1.lostCount = -1;
    bird1.birdShotCount = 0;
    lifeCount = 3;
    helicopter1.resetPos();
    bird1.resetPos();
    wind1.resetPos();
    cloud1.resetPos();
    arrow1.resetPos();
    parachuter1.resetPos(false);
    blimp1.resetPos();
    mosquito1.resetPos();
    blimp1.resetPos();
    lightning1.resetPos();
    gameStarted = true;
    resetPage();
  };

  let sunIcon = new Image();
  sunIcon.src = "./assets/sunIcon.png";
  addSun = (ctx) => { ctx.drawImage(sunIcon, 920, 20, 70, 70); };

  let sadSunIcon = new Image();
  sadSunIcon.src = "./assets/sadSunIcon.png";
  addSadSun = (ctx) => { ctx.drawImage(sadSunIcon, 920, 20, 70, 70); };


});

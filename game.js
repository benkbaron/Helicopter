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
let paused = false;

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
  ctx.fillText("Press 'p' to Start and Pause", 220, 270);
  ctx.fillStyle = "black";
  ctx.font = '28px serif';
  ctx.fillText('Fly using the arrow keys. Rescue parachuters by flying over them.', 130, 380);
  ctx.fillText('All objects, but clouds and wind, are dangerous! Careful to stay in the borders!', 60, 440);
  ctx.fillText('Shoot birds and mosquitos using spacebar.', 250, 500);

  let parachuter1 = new Parachuter();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();
  let lightning1 = new Lightning();
  let bird1 = new Bird();
  let mosquito1 = new Mosquito();
  let helicopter1 = new Helicopter();
  let arrowArr = [];
  let wind1 = new Wind();
  let allObjects = [parachuter1, blimp1, lightning1, bird1, mosquito1, helicopter1, wind1, cloud1];

  parachuter1.rescueCount = 0;
  parachuter1.lostCount = -1;
  bird1.birdShotCount = 0;
  let lifeCount = 3;
  let inputs = [];

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
    } else if (paused) {
      ctx.font = '60px serif';
      ctx.fillText("Paused", 410, 220);
      ctx.font = '40px serif';
      ctx.fillText("Press 'p' to resume.", 340, 350);
    } else if (reset) {
      resetObjects();
      intervalSpeed = 1000/60;
      reset = false;
    } else if (Util.checkCrash({helicopter: helicopter1, bird: bird1, blimp: blimp1,
                                mosquito: mosquito1, lightning: lightning1})) {
      displayCrash();
      intervalSpeed = 2000;
      lifeCount -= 1;
      reset = true;
    } else if (Util.checkCatch({helicopter: helicopter1, parachuter: parachuter1})) {
        intervalSpeed = 1000/60;
        displayCaught();
    } else {
        if (Util.checkHit({arrowArr: arrowArr, bird: bird1, mosquito: mosquito1,
                          parachuter: parachuter1})) {
          playSound("arrowHit");
        }
        intervalSpeed = 1000/60;
        displayStandard();
      }

    arrowCounter -= 1;
    setTimeout(resetPage, intervalSpeed);
  };

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (gameStarted) {
      if (event.keyCode >= 37 && event.keyCode <= 40 ) {
        if (helicopter1.keysDown.includes(event.keyCode) === false){
          helicopter1.keysDown.push(event.keyCode);
        }
      }
      if (inputs.length < 4) {
        inputs.push(event.keyCode);
      }
    }

    if (event.keyCode === 32 && !paused){
      if ( gameStarted && (arrowCounter < 1 || passwordEntered())){
        firstArrow = arrowArr[0];
        firstArrow.shoot(helicopter1);
        playSound("arrowShot");
        arrowArr = arrowArr.slice(1);
        arrowArr.push(firstArrow);
        arrowCounter = 45;
      }
    }

    if (event.keyCode === 80){
      if (!gameStarted) {
        restartGame();
      } else {
      paused = paused ? false : true;
    }
    }
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      helicopter1.keysDown = helicopter1.keysDown.filter(num => num !== event.keyCode );
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
    playSound("lifeLost")
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
    resetArrows();
    drawArrows();
    drawAll();
  };

  displayCaught = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    bird1.updatePos(helicopter1.posY, wind1);
    parachuter1.resetPos(true);
    blimp1.updatePos(wind1);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    lightning1.updatePos();
    wind1.updatePos();
    cloud1.updatePos(wind1);
    drawArrows();
    drawAll();
  };

  displayStandard = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    bird1.updatePos(helicopter1.posY, wind1);
    parachuter1.updatePos(wind1);
    blimp1.updatePos(wind1);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    lightning1.updatePos();
    wind1.updatePos();
    cloud1.updatePos(wind1);
    drawArrows();
    drawAll();
  };

  displayGameOver = () => {
    ctx.fillStyle = "white";
    ctx.font = '80px serif';
    ctx.fillText('So sorry you lost!', 220, 280);
    ctx.font = '50px serif';
    ctx.fillText("Press 'p' to Try Again", 270, 400);
    addSadSun(ctx);
    gameStarted = false;
  };

  restartGame = () => {
    parachuter1.rescueCount = 0;
    parachuter1.lostCount = -1;
    bird1.birdShotCount = 0;
    lifeCount = 3;
    helicopter1.resetPos();
    helicopter1.keysDown = [];
    bird1.resetPos();
    wind1.resetPos();
    cloud1.resetPos();
    resetArrows();
    parachuter1.resetPos(false);
    blimp1.resetPos();
    mosquito1.resetPos();
    blimp1.resetPos();
    lightning1.resetPos();
    gameStarted = true;
    inputs = [];
    resetPage();
  };

  let sunIcon = new Image();
  sunIcon.src = "./assets/sunIcon.png";
  addSun = (ctx) => { ctx.drawImage(sunIcon, 920, 20, 70, 70); };

  let sadSunIcon = new Image();
  sadSunIcon.src = "./assets/sadSunIcon.png";
  addSadSun = (ctx) => { ctx.drawImage(sadSunIcon, 920, 20, 70, 70); };

  drawArrows = () => {
    arrowArr.forEach((arrow) => {
      arrow.updatePos(wind1);
      arrow.draw(ctx);
    });
  };

  resetArrows = () => {
    arrowArr.forEach((arrow) => {
      arrow.resetPos();
    });
  };

  addArrows = () => {
    for (let i = 0; i < 50; i++){
      arrowArr.push(new Arrow());
    }
  };

  drawAll = () => {
    allObjects.forEach((obj) => {
      obj.draw(ctx);
    });
  };

  let arrowCounter = 0;
  addArrows();

  passwordEntered = () => {
    if (inputs[0] === 86 && inputs[1] === 69 && inputs[2] === 82 && inputs[3] === 78) {
      return true;
    }
    return false;
  };

  let music = new Audio('./assets/music.m4a');
  music.volume = 0.4;
  music.loop = true;
  music.play();

  let arrowShotSound = new Audio('./assets/arrowShot.wav');
  arrowShotSound.volume = 0.3;

  let arrowHitSound = new Audio('./assets/arrowHit.wav');
  arrowHitSound.volume = 0.7;

  let lifeLostSound = new Audio('./assets/lifeLost.wav');
  lifeLostSound.volume = 0.5;

  let musicButton = document.getElementById("musicButton");
  let playing = true;
  musicButton.addEventListener("click", () => {
    musicControl();
  });

  let soundEffects = true;
  let soundButton = document.getElementById("soundButton");
  soundButton.addEventListener("click", () => {
    if (soundEffects) {
      soundEffects = false;
      soundButton.innerHTML = "Turn Sound Effects On";
    } else {
      soundEffects = true;
      soundButton.innerHTML = "Turn Sound Effects Off";
    }
  });

  playSound = (sound) => {
    if (soundEffects) {
      if (sound === "arrowShot") {
        arrowShotSound.load();
        arrowShotSound.play();
      } else if (sound === "arrowHit") {
        arrowHitSound.load();
        arrowHitSound.play();
      } else if (sound === "lifeLost") {
        lifeLostSound.load();
        lifeLostSound.play();
      }
    }
  };

  musicControl = () => {
  if (!playing){
    musicButton.innerHTML = "Turn Music Off";
    music.play();
    playing = true;
  } else {
    musicButton.innerHTML = "Turn Music On";
    music.pause();
    playing = false;
  }
  };
});

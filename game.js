const Arrow = require("./objects/arrow");
const Bird = require("./objects/bird");
const Blimp = require("./objects/blimp");
const BlueBird = require("./objects/blueBird");
const Cloud = require("./objects/cloud");
const DrawCanvas = require("./drawcanvas");
const Helicopter = require("./objects/helicopter");
const Lightning = require("./objects/lightning");
const Mosquito = require("./objects/mosquito");
const Parachuter = require("./objects/parachuter");
const Sound = require("./sound");
const Sun = require("./objects/sun");
const Util = require("./util");
const Wind = require("./objects/wind");

const $DJ = require("./lib/main.js");

fetchHighScores = () => {
  $DJ.ajax({
    method: "GET",
    url: "https://helicopterbackend.herokuapp.com/api/scores",
    success: (data) => { showHighScores(data);},
    error: () => alert("Error in fetching highscores. Sorry."),
  });
};

let scoreData;

sendScores = (scoreData) => {
  $DJ.ajax({
    method: "POST",
    url: "https://helicopterbackend.herokuapp.com/api/scores",
    data: scoreData,
    success: (data) => {},
    error: () => alert("Error in sending score to database. Sorry."),
  });
};

let parachuterHighScore;
let birdsHighScore;

showHighScores = (data) => {
  parachuterHighScore = data["parachuter_highscore"][0]["parachuters"];
  birdsHighScore = data["bird_highscore"][0]["birds"];
};

let reset;
let paused = false;

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");

  DrawCanvas.startPage(ctx);

  let arrowArr = [];
  let bird1 = new Bird();
  let blimp1 = new Blimp();
  let cloud1 = new Cloud();
  let helicopter1 = new Helicopter();
  let lightning1 = new Lightning();
  let mosquito1 = new Mosquito();
  let parachuter1 = new Parachuter();
  let sun1 = new Sun();
  let wind1 = new Wind();

  let blueBird1 = new BlueBird();

  let allObjects = [parachuter1, blimp1, lightning1, bird1, blueBird1, mosquito1, helicopter1, wind1, cloud1, sun1];

  parachuter1.rescueCount = 0;
  parachuter1.lostCount = 0;
  bird1.birdShotCount = 0;
  let lifeCount = 3;
  let inputs = [];

  resetPage = () => {
    DrawCanvas.playingPage(ctx, parachuter1, bird1, blueBird1, lifeCount);
    helicopter1.alive = true;
    if (lifeCount === 0) {
      displayGameOver();
      return;
    } else if (paused) {
      DrawCanvas.pausedPage(ctx);
    } else if (reset) {
      resetObjects();
      intervalSpeed = 1000/60;
      reset = false;
    } else if (Util.checkCrash({helicopter: helicopter1, bird: bird1, blueBird: blueBird1,
                                blimp: blimp1, mosquito: mosquito1, lightning: lightning1})) {
      helicopter1.alive = false;
      displayCrash();
      intervalSpeed = 2000;
      lifeCount -= 1;
      reset = true;
    } else if (Util.checkCatch({helicopter: helicopter1, parachuter: parachuter1})) {
        intervalSpeed = 1000/60;
        displayCaught();
    } else {
        if (Util.checkHit({arrowArr: arrowArr, bird: bird1, blueBird: blueBird1, mosquito: mosquito1,
                          parachuter: parachuter1})) {
          Sound.playSound("arrowHit", soundEffects);
        }
        intervalSpeed = 1000/60;
        displayStandard();
      }

    arrowTimer -= 1;
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
      if ( (gameStarted && helicopter1.alive) && (arrowTimer < 1 || passwordEntered())){
        firstArrow = arrowArr[0];
        firstArrow.shoot(helicopter1);
        Sound.playSound("arrowShot", soundEffects);
        arrowArr = arrowArr.slice(1);
        arrowArr.push(firstArrow);
        arrowTimer = 35;
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
    drawAll();
    drawArrows();
    Sound.playSound("lifeLost", soundEffects);
  };

  resetObjects = () => {
    resetAllPos();
    resetArrows();
    drawArrows();
    drawAll();
  };

  displayCaught = () => {
    updateAllPos();
    drawArrows();
    drawAll();
  };

  displayStandard = () => {
    updateAllPos();
    drawArrows();
    drawAll();
  };

  displayGameOver = () => {
    scoreData = new FormData();
    scoreData.append("score[parachuters]", parachuter1.rescueCount);
    scoreData.append("score[birds]", bird1.birdShotCount + blueBird1.birdShotCount);
    sendScores(scoreData);
    ctx.fillStyle = "white";
    ctx.font = '80px tahoma';
    ctx.fillText('So sorry you lost!', 220, 170);
    ctx.font = '50px tahoma';
    ctx.fillText("Press 'p' to Try Again", 270, 260);
    ctx.font = '28px tahoma';
    ctx.fillText(`Parachuters Saved Highscore: ${parachuterHighScore}`, 320, 350);
    ctx.fillText(`Birds Shot Highscore: ${birdsHighScore}`, 365, 390);
    ctx.fillText(`Your Parachuters Saved Score: ${parachuter1.rescueCount}`, 320, 430);
    ctx.fillText(`Your Birds Shot Score: ${blueBird1.birdShotCount + bird1.birdShotCount}`, 365, 470);
    gameStarted = false;
  };

  restartGame = () => {
    fetchHighScores();
    parachuter1.rescueCount = 0;
    parachuter1.lostCount = 0;
    bird1.birdShotCount = 0;
    blueBird1.birdShotCount = 0;
    lifeCount = 3;
    helicopter1.keysDown = [];
    resetAllPos();
    resetArrows();
    gameStarted = true;
    inputs = [];
    resetPage();
  };

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
      obj.draw(ctx, helicopter1);
    });
  };

  updateAllPos = () => {
    allObjects.forEach((obj) => {
      obj.updatePos(wind1, helicopter1);
    });
  };

  resetAllPos = () => {
    allObjects.forEach((obj) => {
      obj.resetPos();
    });
  };

  let arrowTimer = 0;
  addArrows();

  passwordEntered = () => {
    if (inputs[0] === 86 && inputs[1] === 69 && inputs[2] === 82 && inputs[3] === 78) {
      return true;
    }
    return false;
  };

  Sound.playMusic();

  let musicButton = document.getElementById("musicButton");
  let playing = true;
  musicButton.addEventListener("click", () => {
    Sound.musicControl(playing);
    playing = playing ? false : true;
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

});

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {

  checkCrash({helicopter, bird, blueBird, blimp, mosquito, lightning}) {
    if (helicopter.posY > 550 || helicopter.posY < -100 ||
        helicopter.posX > 1100 || helicopter.posX < -100) {
      return true;
    }

    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [bird.posX + 40, bird.posY + 40]);
    if (space < 50 && bird.feathers === 0){
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
        parachuter.resetPos(true);
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
      if ((space < 30 && parachuter.dead === 0) && bird.feathers === 0){
        bird.feathers = 25;
        parachuter.dead = 80;
        arrow.resetPos();
        answer = true;
      }
      space = this.distance([mosquito.posX + (mosquito.width / 2), mosquito.posY + (mosquito.height / 2)], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        mosquito.resetPos();
        parachuter.dead = 80;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([blueBird.posX + (blueBird.width / 2), blueBird.posY + (blueBird.height / 2)], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if ((space < 30 && parachuter.dead === 0) && blueBird.feathers === 0){
        blueBird.feathers = 25;
        parachuter.dead = 80;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrowX, arrowY], [parachuter.posX + (parachuter.width / 2), parachuter.posY + (parachuter.height / 2)]);
      if (space < 30 && parachuter.dead === 0){
        parachuter.dead = 80;
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
    if (space < 300 && wind.posX < obj.posX) return true;
    return false;
  },

  draw(ctx, image, object, width, height) {
    ctx.drawImage(image, object.posX, object.posY, width, height);
  },

};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

let parachuterDied = new Audio('./assets/wah.wav');
parachuterDied.volume = 0.05;

let catchSound = new Audio('./assets/catchSound.wav');
catchSound.volume = 0.3;

let arrowShot = new Audio('./assets/arrowShot.wav');
arrowShot.volume = 0.3;

let arrowHit = new Audio('./assets/arrowHit.wav');
arrowHit.volume = 0.7;

let lifeLost = new Audio('./assets/lifeLost.wav');
lifeLost.volume = 0.5;

let music = new Audio('./assets/music.m4a');
music.volume = 0.4;
music.loop = true;

const Sound = {

  playMusic() {
    music.play();
  },

  soundEffects: true,

  playSound(sound) {
    if (this.soundEffects) {
      eval(`${sound}`).load();
      eval(`${sound}`).play();
    }
  },

  musicControl(playing) {
    if (!playing){
      musicButton.innerHTML = "Turn Music Off";
      music.play();
      playing = true;
    } else {
      musicButton.innerHTML = "Turn Music On";
      music.pause();
      playing = false;
    }
  },

};

module.exports = Sound;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Arrow = __webpack_require__(3);
const Bird = __webpack_require__(4);
const Blimp = __webpack_require__(5);
const BlueBird = __webpack_require__(6);
const Cloud = __webpack_require__(7);
const DrawCanvas = __webpack_require__(8);
const Helicopter = __webpack_require__(9);
const Lightning = __webpack_require__(10);
const Mosquito = __webpack_require__(11);
const Parachuter = __webpack_require__(12);
const Sound = __webpack_require__(1);
const Sun = __webpack_require__(13);
const Util = __webpack_require__(0);
const Wind = __webpack_require__(14);
const $DJ = __webpack_require__(15);

document.addEventListener("DOMContentLoaded", (event) => {
  Sound.playMusic();
  let gameStarted = false;
  let initialsEntered = false;
  let initials = [" ", " ", " "];
  let initialCount = 0;
  let scoreData;
  let parachuterHighScore;
  let birdsHighScore;
  let reset;
  let paused = false;
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
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
  let allObjects = [sun1, parachuter1, blimp1, lightning1, bird1, blueBird1, mosquito1,
                    helicopter1, wind1, cloud1];
  parachuter1.rescueCount = 0;
  parachuter1.lostCount = 0;
  bird1.birdShotCount = 0;

    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 10);
    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 30);
    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 50);
    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 100);
    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 500);
    setTimeout(() => DrawCanvas.startPage(ctx,helicopter1), 700);

  let lifeCount = 3;
  let inputs = [];
  let arrowTimer = 0;

  resetPage = () => {
    DrawCanvas.playingPage(ctx, parachuter1, bird1, blueBird1, lifeCount, helicopter1);
    helicopter1.alive = true;
    if (lifeCount === 0) {
      displayGameOver();
      return;
    } else if (paused) {
      DrawCanvas.pausedPage(ctx);
    } else if (reset) {
      resetObjects();
      DrawCanvas.borderTimer = 0;
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
          Sound.playSound("arrowHit");
        }
        intervalSpeed = 1000/60;
        displayStandard();
      }

    arrowTimer -= 1;
    setTimeout(resetPage, intervalSpeed);
  };

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (initialsEntered) {
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
          Sound.playSound("arrowShot");
          arrowArr = arrowArr.slice(1);
          arrowArr.push(firstArrow);
          arrowTimer = 35;
        }
      }

      if (event.keyCode === 13){
          if (!gameStarted) {
            restartGame();
          }
          else {
            paused = paused ? false : true;
          }
      }
    }

      if (!initialsEntered) {
        if (initialCount < 3 && event.keyCode >= 65 && event.keyCode <= 90) {
          helicopter1.initials[initialCount] = String.fromCharCode(event.keyCode);
          initialCount += 1;
          DrawCanvas.startPage(ctx, helicopter1);
        } else if (initialCount > 0 && event.keyCode == 8){
          initialCount -= 1;
          helicopter1.initials[initialCount] = " ";
          DrawCanvas.startPage(ctx, helicopter1);
        } else if (initialCount === 3 && event.keyCode === 13) {
          initialsEntered = true;
          restartGame();
        }
      }
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      helicopter1.keysDown = helicopter1.keysDown.filter(num => num !== event.keyCode );
    }
  });

  displayCrash = () => {
    drawAll();
    drawArrows();
    Sound.playSound("lifeLost");
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
    scoreData.append("score[initials]", helicopter1.initials.join(""));
    sendScores(scoreData);
    DrawCanvas.gameOver(ctx, parachuterHighScores, birdsHighScores,
                        parachuter1, bird1, blueBird1, helicopter1);
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

  addArrows();

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

  passwordEntered = () => {
    if (inputs[0] === 86 && inputs[1] === 69 && inputs[2] === 82 && inputs[3] === 78) {
      return true;
    }
    return false;
  };

  let musicButton = document.getElementById("musicButton");
  let playing = true;
  musicButton.addEventListener("click", () => {
    Sound.musicControl(playing);
    playing = playing ? false : true;
  });

  // let soundEffects = true;
  let soundButton = document.getElementById("soundButton");
  soundButton.addEventListener("click", () => {
    if (Sound.soundEffects) {
      Sound.soundEffects = false;
      soundButton.innerHTML = "Turn Sound Effects On";
    } else {
      Sound.soundEffects = true;
      soundButton.innerHTML = "Turn Sound Effects Off";
    }
  });

  let easyDifficulty;
  let hardDifficulty;

  let easyButton = document.getElementById("easyButton");
  easyButton.addEventListener("click", () => {
      setDifficulty("easy");
      easyButton.style.background = '#35e504';
      mediumButton.style.background = 'Transparent';
      hardButton.style.background = 'Transparent';
    }
  );

  let mediumButton = document.getElementById("mediumButton");
  mediumButton.addEventListener("click", () => {
      setDifficulty("medium");
      easyButton.style.background = 'Transparent';
      mediumButton.style.background = '#35e504';
      hardButton.style.background = 'Transparent';
    }
  );

  let hardButton = document.getElementById("hardButton");
  hardButton.addEventListener("click", () => {
      setDifficulty("hard");
      easyButton.style.background = 'Transparent';
      mediumButton.style.background = 'Transparent';
      hardButton.style.background = '#35e504';
    }
  );

  setDifficulty = (level) => {
    mosquito1.difficultyChange(level);
    bird1.difficultyChange(level);
    blueBird1.difficultyChange(level);
    parachuter1.difficultyChange(level);
  };

  fetchHighScores = () => {
    $DJ.ajax({
      method: "GET",
      url: "https://helicopterbackend.herokuapp.com/api/scores",
      success: (data) => { showHighScores(data);},
      error: () => alert("Error in fetching highscores. Sorry."),
    });
  };

  sendScores = (scoreData) => {
    $DJ.ajax({
      method: "POST",
      url: "https://helicopterbackend.herokuapp.com/api/scores",
      data: scoreData,
      success: (data) => {},
      error: () => alert("Error in sending score to database. Sorry."),
    });
  };

  showHighScores = (data) => {
    parachuterHighScores = data.parachuter_highscores;
    birdsHighScores = data.bird_highscores;
  };

});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Arrow {
  constructor(posX, posY) {
    this.posX = -100;
    this.posY = -100;
    this.width = 50;
    this.height = 50;
    this.direction = "right";
    this.arrowIconLeft = new Image();
    this.arrowIconRight = new Image();
    this.arrowIconLeft.src = "./assets/flippedArrowIcon.png";
    this.arrowIconRight.src = "./assets/arrowIcon.png";
  }

  draw(ctx) {
    let arrowImage = this.direction === "right" ? this.arrowIconRight : this.arrowIconLeft;
    Util.draw(ctx, arrowImage, this, this.width, this.height);
  }

  shoot(helicopter) {
    if ((this.posY == -100) || (this.posX > 1050 || this.posX < -50)) {
      this.posX = helicopter.flipped ? helicopter.posX : helicopter.posX + 100;
      this.posY = helicopter.posY + 20;
      this.direction = helicopter.flipped ? "left" : "right";
    }
  }

  updatePos(wind) {
    if (this.direction === "right") {
      this.posX += 5;
    } else {
      this.posX -= 5;
    }

    if (this.posX > 1050 || this.posX < -50) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = -100;
    this.posY = -100;
  }
}

module.exports = Arrow;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Bird {
  constructor(options) {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.width = 80;
    this.height = 80;
    this.featherWidth = 100;
    this.featherHeight = 100;
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.difficulty = "easy";
    this.speed = 1.1 * (Math.random() + 0.4);
    this.eagleImages = [];
    this.imageCounter = 0;

    for (let i = 0; i < 30; i++){
      let name = `${i}eagle`;
      this.name = new Image();
      this.name.src = `./assets/eagleImages/${i}eagle.gif`;
      this.eagleImages.push(this.name);
    }
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 1.3 * (Math.random() + 0.8);
        break;
      case "medium":
        this.speed = 3 * (Math.random() + 0.4);
        break;
      case "hard":
        this.speed = 4.5 * (Math.random() + 0.4);
        break;
    }
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      Util.draw(ctx, this.feathersIcon, this, this.featherWidth, this.featherHeight);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.eagleImages[Math.floor(this.imageCounter)], this, this.width, this.height);
      this.imageCounter += (this.speed / 3);
      this.imageCounter = this.imageCounter % 30;
    }
  }

  updatePos(wind, helicopter) {
    this.posX -= this.speed + (this.birdShotCount / 8);
    if (this.feathers > 0) {
      this.posY += 3;
    } else {
      if (helicopter.posY > this.posY) {
        this.posY += 1.3;
      } else {
        this.posY -= 1.3;
      }
    }
    if (this.posX < -100) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.difficultyChange(this.difficulty);
    this.feathers = 0;
  }
}

module.exports = Bird;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Blimp {
  constructor(options) {
    this.posX = - 500 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.width = 200;
    this.height = 200;
    this.blimpIcon = new Image();
    this.blimpIcon.src = "./assets/blimpIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.blimpIcon, this, this.width, this.height);
  }

  updatePos(wind) {
    if (this.posX > 1200) {
      this.resetPos();
    } else {
      this.posX += 1/2;
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 2;
    }
  }

  resetPos() {
    this.posX = - 600 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
  }

}

module.exports = Blimp;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class BlueBird {
  constructor(options) {
    this.posX = (-500 * Math.random()) - 50;
    this.posY = 600 * Math.random();
    this.feathersWidth = 100;
    this.feathersHeight = 100;
    this.width = 60;
    this.height = 60;
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.blueBirdGif = new Image();
    this.blueBirdGif.src = "./assets/blueBirdGif.gif";
    this.speed = 1.1 * (Math.random() + 0.4);
    this.difficulty = "easy";
    this.blueBirdImages = [];
    this.imageCounter = 0;

    for (let i = 1; i <= 15; i++){
      let name = `blueBirdGif${i}`;
      this.name = new Image();
      this.name.src = `./assets/blueBirdImages/blueBird${i}.gif`;
      this.blueBirdImages.push(this.name);
    }
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 1.1 * (Math.random() + 0.4);
        break;
      case "medium":
        this.speed = 3 * (Math.random() + 0.4);
        break;
      case "hard":
        this.speed = 4.5 * (Math.random() + 0.4);
        break;
    }
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      Util.draw(ctx, this.feathersIcon, this, this.feathersWidth, this.feathersHeight);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      Util.draw(ctx, this.blueBirdImages[Math.floor(this.imageCounter)], this, this.width, this.height);
      this.imageCounter += (this.speed / 6);
      this.imageCounter = this.imageCounter % 15;
    }
  }

  updatePos(wind, helicopter) {
    this.posX += this.speed + (this.birdShotCount / 8);
    if (this.feathers > 0) {
      this.posY += 3;
    } else {
      if (helicopter.posY > this.posY) {
        this.posY += 1;
      } else {
        this.posY -= 1;
      }
    }

    if (this.posX > 1050) {
      this.resetPos();
    }

    if (Util.inWindRange(this, wind)){
      this.speed += 0.03;
    }
  }

  resetPos() {
    this.posX = (-500 * Math.random()) - 50;
    this.posY = 600 * Math.random();
    this.difficultyChange(this.difficulty);
    this.feathers = 0;
  }
}

module.exports = BlueBird;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Cloud {
  constructor(options) {
    this.posX = 1200 + (1000 * Math.random());
    this.posY = (500 * Math.random()) - 100;
    this.width = 350;
    this.height = 350;
    this.cloudIcon = new Image();
    this.cloudIcon.src = "./assets/cloudIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.cloudIcon, this, this.width, this.height);
  }

  updatePos(wind) {
    if (this.posX < -500) {
      this.resetPos();
    } else if (this.posX > 400 && this.posX < 500) {
      this.posX -= 1/4;
    } else {
      this.posX -= 1;
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 500 * Math.random();
  }
}

module.exports = Cloud;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const arrowIcon = new Image();
arrowIcon.src = "./assets/arrowIcon.png";

const birdIcon = new Image();
birdIcon.src = "./assets/eagleImages/0eagle.gif";

const arrowKeyIcon = new Image();
arrowKeyIcon.src = "./assets/arrowKeyIcon.png";

const enterIcon = new Image();
enterIcon.src = "./assets/enterIcon.png";

const spacebar = new Image();
spacebar.src = "./assets/spacebar.png";

const thumbsUpIcon = new Image();
thumbsUpIcon.src = "./assets/thumbsUpIcon.png";

const pauseIcon = new Image();
pauseIcon.src = "./assets/pauseIcon.png";

const parachuterIcon = new Image();
parachuterIcon.src = "./assets/parachuterIcon.png";


const DrawCanvas = {
  startPage(ctx, helicopter1){
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.font = 'bold 80px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText("Helicopter", 295, 140);
    ctx.fillStyle = "red";
    ctx.fillText("Helicopter", 295, 140);
    ctx.font = 'bold 38px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText("Type your initials and press enter to begin!", 90, 250);
    ctx.fillStyle = "red";
    ctx.fillText("Type your initials and press enter to begin!", 90, 250);
    ctx.fillStyle = "red";
    ctx.font = '40px tahoma';
    ctx.fillText(`${helicopter1.initials[0]}`, 449, 330);
    ctx.fillText(`${helicopter1.initials[1]}`, 496, 330);
    ctx.fillText(`${helicopter1.initials[2]}`, 542, 330);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.2;
    ctx.strokeText(`${helicopter1.initials[0]}`, 449, 330);
    ctx.strokeText(`${helicopter1.initials[1]}`, 496, 330);
    ctx.strokeText(`${helicopter1.initials[2]}`, 542, 330);
    ctx.strokeText("_  _  _", 450, 335);


    ctx.fillStyle = "red";
    ctx.fillText("_  _  _", 450, 335);
    ctx.fillStyle = "black";
    ctx.font = '26px tahoma';

    ctx.drawImage(helicopter1.helicopterIcon, 150, 370, 100, 100);
    ctx.drawImage(arrowKeyIcon, 295, 360, 130, 130);

    ctx.drawImage(helicopter1.helicopterIcon, 50, 470, 100, 100);
    ctx.drawImage(birdIcon, 230, 500, 70, 70);
    ctx.drawImage(arrowIcon, 160, 490, 70, 70);
    ctx.drawImage(spacebar, 290, 460, 140, 130);

    ctx.drawImage(helicopter1.helicopterIcon, 600, 370, 100, 100);
    ctx.drawImage(parachuterIcon, 680, 390, 70, 70);
    ctx.drawImage(thumbsUpIcon, 780, 380, 70, 70);

    ctx.drawImage(pauseIcon, 630, 490, 70, 70);
    ctx.drawImage(enterIcon, 780, 500, 80, 50);

  },

  playingPage(ctx, parachuter1, bird1, blueBird1, lifeCount, helicopter1){
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, 1000, 600);

    if (helicopter1.alive) {
      ctx.font = 'bold 24px tahoma';
      ctx.strokeStyle = 'black';
      ctx.fillStyle = "yellow";
      ctx.lineWidth = 0.5;
      ctx.fillText(`Parachuters Saved: ${parachuter1.rescueCount}`, 6, 24);
      ctx.fillText(`Parachuters Lost: ${parachuter1.lostCount}`, 6, 46);
      ctx.fillText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 6, 68);
      ctx.fillText(`Lives Left: ${lifeCount}`, 6, 90);
      ctx.strokeText(`Parachuters Saved: ${parachuter1.rescueCount}`, 6, 24);
      ctx.strokeText(`Parachuters Lost: ${parachuter1.lostCount}`, 6, 46);
      ctx.strokeText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 6, 68);
      ctx.strokeText(`Lives Left: ${lifeCount}`, 6, 90);
    }

    if (helicopter1.alive && (helicopter1.posX < -5 || helicopter1.posX > 900 || helicopter1.posY < -20 || helicopter1.posY > 515)) {
      DrawCanvas.drawBorderDanger(ctx);
      DrawCanvas.borderTimer = 40;
    } else if (helicopter1.alive && DrawCanvas.borderTimer > 0) {
      DrawCanvas.drawBorderDanger(ctx);
      DrawCanvas.borderTimer -= 1;
    }
  },

  borderTimer: 0,

  drawBorderDanger(ctx) {
    ctx.font = 'bold 50px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText("Danger!", 420, 250);
    ctx.strokeText("Stay in the borders!", 265, 350);
    ctx.fillStyle = "red";
    ctx.fillText("Danger!", 420, 250);
    ctx.fillText("Stay in the borders!", 265, 350);
  },

  pausedPage(ctx){
    ctx.font = 'bold 60px tahoma';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeText("Paused", 400, 250);
    ctx.fillText("Paused", 400, 250);
    ctx.font = 'bold 40px tahoma';
    ctx.strokeText("Press enter to resume", 290, 350);
    ctx.fillText("Press enter to resume", 290, 350);
  },

  gameOver(ctx, parachuterHighScores, birdsHighScores, parachuter1, bird1, blueBird1, helicopter1){
    parachuterHighScores.push({initials: helicopter1.initials.join(""), parachuters: parachuter1.rescueCount});
    birdsHighScores.push({initials: helicopter1.initials.join(""), birds: blueBird1.birdShotCount + bird1.birdShotCount});

    parachuterHighScores.sort(function (a, b) {
      return b.parachuters - a.parachuters;
    });

    birdsHighScores.sort(function (a, b) {
      return b.birds - a.birds;
    });
    ctx.font = 'bold 80px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText("You lost!", 330, 100);
    ctx.fillStyle = "red";
    ctx.fillText("You lost!", 330, 100);
    ctx.font = '50px tahoma';
    ctx.fillStyle = "black";
    ctx.fillText("Hit enter to try again", 280, 180);
    ctx.font = '28px tahoma';
    ctx.fillText("Parachuters Saved Highscores", 120, 250);
    ctx.fillText("Birds Shot Highscores", 560, 250);
    ctx.font = '20px tahoma';
    ctx.fillText(`1. ${parachuterHighScores[0].initials}:`, 240, 300);
    ctx.fillText(`${parachuterHighScores[0].parachuters}`, 320, 300);
    ctx.fillText(`2. ${parachuterHighScores[1].initials}:`, 240, 325);
    ctx.fillText(`${parachuterHighScores[1].parachuters}`, 320, 325);
    ctx.fillText(`3. ${parachuterHighScores[2].initials}:`, 240, 350);
    ctx.fillText(`${parachuterHighScores[2].parachuters}`, 320, 350);
    ctx.fillText(`4. ${parachuterHighScores[3].initials}:`, 240, 375);
    ctx.fillText(`${parachuterHighScores[3].parachuters}`, 320, 375);
    ctx.fillText(`5. ${parachuterHighScores[4].initials}:`, 240, 400);
    ctx.fillText(`${parachuterHighScores[4].parachuters}`, 320, 400);
    ctx.fillText(`1. ${birdsHighScores[0].initials}:`, 640, 300);
    ctx.fillText(`${birdsHighScores[0].birds}`, 720, 300);
    ctx.fillText(`2. ${birdsHighScores[1].initials}:`, 640, 325);
    ctx.fillText(`${birdsHighScores[1].birds}`, 720, 325);
    ctx.fillText(`3. ${birdsHighScores[2].initials}:`, 640, 350);
    ctx.fillText(`${birdsHighScores[2].birds}`, 720, 350);
    ctx.fillText(`4. ${birdsHighScores[3].initials}:`, 640, 375);
    ctx.fillText(`${birdsHighScores[3].birds}`, 720, 375);
    ctx.fillText(`5. ${birdsHighScores[4].initials}:`, 640, 400);
    ctx.fillText(`${birdsHighScores[4].birds}`, 720, 400);
    ctx.font = '24px tahoma';
    ctx.fillText(`Your Parachuters Saved Score: ${parachuter1.rescueCount}`, 340, 460);
    ctx.fillText(`Your Birds Shot Score: ${blueBird1.birdShotCount + bird1.birdShotCount}`, 380, 490);
  }
};

module.exports = DrawCanvas;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Helicopter {
  constructor(options) {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
    this.keysDown = [];
    this.alive = true;
    this.width = 105;
    this.height = 105;
    this.initials = [" ", " ", " "];
    this.helicopterIconFlipped = new Image();
    this.helicopterIconFlipped.src = "./assets/helicopterIconFlipped.png";
    this.helicopterIcon = new Image();
    this.helicopterIcon.src = "./assets/helicopterIcon.png";
    this.skullIcon = new Image();
    this.skullIcon.src = "./assets/skullIcon.png";
  }

  draw(ctx) {
    let helicopterImage = this.flipped ? this.helicopterIconFlipped : this.helicopterIcon;
    helicopterImage = this.alive ? helicopterImage : this.skullIcon;
    Util.draw(ctx, helicopterImage, this, this.width, this.height);
  }

  updatePos(wind) {
    this.posY += 2;

    if (this.keysDown.includes(38)) {
      this.posY -= 6;
      }
    if (this.keysDown.includes(40)) {
      this.posY += 4;
      }
    if (this.keysDown.includes(37)) {
      this.posX -= 6;
      this.flipped = true;
      }
    if (this.keysDown.includes(39)) {
      this.posX += 6;
      this.flipped = false;
      }

    if (Util.inWindRange(this, wind)){
      this.posX += 5;
    }
  }

  resetPos() {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
  }

}

module.exports = Helicopter;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Lightning {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = (-7000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
    this.width = 100;
    this.height = 700;
  }

  draw(ctx) {
    Util.draw(ctx, this.lightningIcon, this, this.width, this.height);
  }

  updatePos() {
    this.posY += 4.5;
    if (this.posY > 1100) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = 1000 * Math.random();
    this.posY = -10000 * Math.random() - 1000;
    }
}

module.exports = Lightning;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 700;
    this.width = 25;
    this.height = 25;
    this.mosquitoIcon = new Image();
    this.mosquitoIcon.src = "./assets/mosquitoIcon.png";
    this.difficulty = "easy";
    this.speed = 1/5;
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 1/5;
        break;
      case "medium":
        this.speed = 3/5;
        break;
      case "hard":
        this.speed = 1;
        break;
    }
  }

  draw(ctx) {
    Util.draw(ctx, this.mosquitoIcon, this, this.width, this.width);
  }

  updatePos(wind, helicopter) {
    if (helicopter.posX > this.posX) {
      this.posX += this.speed;
    } else {
      this.posX -= this.speed;
    }

    if (helicopter.posY > this.posY) {
      this.posY += this.speed;
    } else {
      this.posY -= this.speed;
    }

    if (Util.inWindRange(this, wind)){
      this.posX += 2.5;
    }
  }

  resetPos() {
    this.posX = 600 * Math.random();
    this.posY = 700;
  }

}

module.exports = Mosquito;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Sound = __webpack_require__(1);

class Parachuter {
  constructor(options) {
    this.posX = 960 * Math.random();
    this.posY = -300 * Math.random() - 100;
    this.width = 60;
    this.height = 60;
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
    this.parachuterAngelIcon = new Image();
    this.parachuterAngelIcon.src = "./assets/angel.png";
    this.rescueCount = 0;
    this.lostCount = 0;
    this.dead = 0;
    this.speed = 0.8 + (this.rescueCount / 8);
    this.difficulty = "easy";
  }

  difficultyChange(level) {
    this.difficulty = level;
    switch (level) {
      case "easy":
        this.speed = 0.8 + (this.rescueCount / 8);
        break;
      case "medium":
        this.speed = 1.3 + (this.rescueCount / 8);
        break;
      case "hard":
        this.speed = 2.5 + (this.rescueCount / 8);
        break;
    }
  }

  draw(ctx) {
    let image = this.parachuterIcon;
    if (this.dead > 0) {
      if (this.dead === 80) {
        Sound.playSound("parachuterDied");
      }
      this.dead -= 1;
      image = this.parachuterAngelIcon;
      if (this.dead === 1) {
        this.lostCount += 1;
        this.resetPos();
      }
    }

    Util.draw(ctx, image, this, this.width, this.height);
  }

  updatePos(wind) {
    this.posY += this.speed;
    if (this.dead > 0) {
      this.posY -= 4;
    }
    if (this.posY > 610 || this.posX > 1100) {
      this.lostCount += 1;
      Sound.playSound("parachuterDied");
      this.resetPos();
    }
    if (Util.inWindRange(this, wind)){
      this.posX += 3;
    }
  }

  resetPos(saved = false) {
    this.posX = 960 * Math.random();
    this.posY = -300 * Math.random() - 100;
    if (saved) {
      Sound.playSound("catchSound");
    }
    this.difficultyChange(this.difficulty);
  }
}

module.exports = Parachuter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Sun {
  constructor(options) {
    this.posX = 920;
    this.posY = 20;
    this.width = 70;
    this.height = 70;
    this.flipped = false;
    this.keysDown = [];
    this.alive = true;

    this.sunIcon = new Image();
    this.sunIcon.src = "./assets/sunIcon.png";

    this.sadSunIcon = new Image();
    this.sadSunIcon.src = "./assets/sadSunIcon.png";
  }

  draw(ctx, helicopter) {
    let sunImage = helicopter.alive ? this.sunIcon : this.sadSunIcon;
    Util.draw(ctx, sunImage, this, this.width, this.height);
  }

  updatePos(){
    return true;
  }

  resetPos(){
    return true;
  }

}

module.exports = Sun;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Wind {
  constructor(options) {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = (500 * Math.random());
    this.width = 250;
    this.height = 250;
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    Util.draw(ctx, this.windIcon, this, this.width, this.height);
  }

  updatePos() {
    this.posX += 3;
    if (this.posX > 1200) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = 500 * Math.random();
  }
}

module.exports = Wind;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(16);

const funcArr = [];

window.$DJ = function(ele){
  if (ele instanceof HTMLElement){
    ele = Array.from(ele);
    let domEl = new DOMNodeCollection(ele);
    return domEl;

  } else if (typeof ele === 'string'){
    let eles = document.querySelectorAll(ele);
    eles = Array.from(eles);
    let domEl = new DOMNodeCollection(eles);
    return domEl;

  } else if (typeof ele === 'function'){
      if (document.readyState === "complete"){
        ele();
      } else {
      funcArr.push(ele);
      }
    }
};

document.addEventListener("DOMContentLoaded", function(){
  funcArr.forEach((fn) => fn());
});

$DJ.extend = function(mainObject, ...objs){
  return Object.assign(mainObject, ...objs);
};

 $DJ.ajax = (options) => {

   const defaultOptions = {
     method: "",
     url: "",
     data: {},
     contentType: "application/x-www-form-urlencoded; charset=utf-8",
     success: () => {},
     error: () => {},
   };
   let mergedOptions = $DJ.extend(defaultOptions, options);

    const xhr = new XMLHttpRequest();
    xhr.open(mergedOptions.method, mergedOptions.url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        mergedOptions.success(JSON.parse(xhr.response));
      } else {
        mergedOptions.error(JSON.parse(xhr.response));
      }
    };
    xhr.send(mergedOptions.data);
  };

module.exports = $DJ;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr){
    this.htmlArr = htmlArr;
  }

  each(callback){
    this.htmlArr.forEach(callback);
  }

  html(str){
    if(str){
      this.each(function(el){
        el.innerHtml = str;
      });
    } else if (this.htmlArr.length > 0){
      return this.htmlArr[0].innerHtml;
    }
  }

  empty(){
    this.html("");
  }

  append(el){
    if (this.htmlArr.length === 0) return;

    if (typeof el === 'string'){
      this.each(item => item.innerHTML += el);
    } else if (el instanceof DOMNodeCollection) {
      this.htmlArr.appendChild(el);
    }
  }


  attr(str, value){
    if (value) {
      this.htmlArr[0].setAttribute(str, value);
    }
    return this.htmlArr[0].getAttribute(str);
  }

  addClass(newClass){
    this.each(function(el){
      el.classList.add(newClass);
    });
  }

  removeClass(rmClass){
    this.each(function(el){
      el.classList.remove(rmClass);
    });
  }

  children(){
    let allChildren = [];
    this.each(function(el){
      let childArr = Array.from(el.childNodes);
      // avoids nesting arrays
      allChildren = allChildren.concat(childArr);
    });
    return new DOMNodeCollection(allChildren);
  }

  parent(){
    let allParents = [];
    this.each(function(el){
      // ensures allParents does not contain duplicates
      if(!allParents.includes(el.parentNode)){
        allParents.push(el.parentNode);
      }
    });
    return new DOMNodeCollection(allParents);
  }

  find(selector){
    let result = [];
    this.each((el) =>{
      let elements = el.querySelectorAll(selector);
      if(elements){
        Array.from(elements).forEach((el) => {
          if(!result.includes(el)) result.push(el);
        });
      }
    });
    return new DOMNodeCollection(result);
  }

  remove(){
    this.each(function(el){
      el.parentNode.removeChild(el);
    });
  }

  on(eventName, cb){
    this.each(function(el) {
      DOMNodeCollection.addEvent(el, eventName, cb);
      el.addEventListener(eventName, cb);
    });
  }

  off(eventName){
    this.each(function(el) {
      DOMNodeCollection.getCallBacks(el, eventName).forEach((cb) => {
          el.removeEventListener(eventName, cb);
        });
        DOMNodeCollection.resetEvents(el, eventName);
    });
  }

  static addEvent(el, eventName, cb) {
    DOMNodeCollection.getCallBacks(el, eventName).push(cb);
  }

  static getCallBacks(el, eventName) {
    let events = DOMNodeCollection.getEvents(el);

    if (events[eventName] === undefined) {
      events[eventName] = [];
    }

    return events[eventName];
  }

  static getEvents(el) {
    if (el.domJuanEvents === undefined) {
      el.domJuanEvents = {};
    }
    return el.domJuanEvents;
  }

  static resetEvents(el, eventName) {
    DOMNodeCollection.getEvents(el)[eventName] = [];
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Parachuter = __webpack_require__(1);
const Blimp = __webpack_require__(2);
const Cloud = __webpack_require__(3);
const Lightning = __webpack_require__(4);
const Bird = __webpack_require__(5);
const Mosquito = __webpack_require__(6);
const Helicopter = __webpack_require__(7);
const Arrow = __webpack_require__(8);
const Wind = __webpack_require__(9);

const BlueBird = __webpack_require__(10);

const Util = __webpack_require__(11);

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

  let blueBird1 = new BlueBird();

  let allObjects = [parachuter1, blimp1, lightning1, bird1, blueBird1, mosquito1, helicopter1, wind1, cloud1];

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
    ctx.fillText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 10, 66);
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
    } else if (Util.checkCrash({helicopter: helicopter1, bird: bird1, blueBird: blueBird1,
                                blimp: blimp1, mosquito: mosquito1, lightning: lightning1})) {
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
    blueBird1.draw(ctx);
    helicopter1.drawSkull(ctx);
    parachuter1.draw(ctx);
    blimp1.draw(ctx);
    mosquito1.draw(ctx);
    lightning1.draw(ctx);
    wind1.draw(ctx);
    cloud1.draw(ctx);
    drawArrows();
    playSound("lifeLost");
  };

  resetObjects = () => {
    addSadSun(ctx);
    bird1.resetPos();
    blueBird1.resetPos();
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
    blueBird1.updatePos(helicopter1.posY, wind1);
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
    blueBird1.updatePos(helicopter1.posY, wind1);
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
    blueBird1.birdShotCount = 0;
    lifeCount = 3;
    helicopter1.resetPos();
    helicopter1.keysDown = [];
    bird1.resetPos();
    blueBird1.resetPos();
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

class Parachuter {
  constructor(options) {
    this.posX = 960 * Math.random();
    this.posY = -600 * Math.random();
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
    this.parachuterSkullIcon = new Image();
    this.parachuterSkullIcon.src = "./assets/skullIcon.png";
    this.rescueCount = 0;
    this.lostCount = -1;
    this.dead = 0;
  }

  draw(ctx) {
    if (this.dead > 0) {
      this.dead -= 1;
      ctx.drawImage(this.parachuterSkullIcon, this.posX, this.posY, 60, 60);
      if (this.dead === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.parachuterIcon, this.posX, this.posY, 60, 60);
    }
  }

  updatePos(wind) {
    this.posY += 1.4 + (this.rescueCount / 8);
    if (this.posY > 610) {
      this.resetPos();
      wah.load();
      wah.play();
    }
    if (this.inWindRange(wind)){
      this.posX += 3;
    }
  }

  inWindRange(wind) {
  if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
      (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
        return true;
      }
  return false;
  }

  resetPos(saved) {
    if (saved) {
      this.rescueCount += 1;
    } else {
      this.lostCount += 1;
    }
    this.posX = 960 * Math.random();
    this.posY = -600 * Math.random();
    }
}

module.exports = Parachuter;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


class Blimp {
  constructor(options) {
    this.posX = - 500 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.blimpIcon = new Image();
    this.blimpIcon.src = "./assets/blimpIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.blimpIcon, this.posX, this.posY, 200, 200);
  }


  updatePos(wind) {
    if (this.posX > 1200) {
      this.resetPos();
    } else {
      this.posX += 1/2;
    }
    if (this.inWindRange(wind)){
      this.posX += 2;
    }
  }


    inWindRange(wind) {
    if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
        (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
          return true;
        }
    return false;
    }


  resetPos() {
    this.posX = - 600 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
  }

}

module.exports = Blimp;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


class Cloud {
  constructor(options) {
    this.posX = 1200 + (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.cloudIcon = new Image();
    this.cloudIcon.src = "./assets/cloudIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.cloudIcon, this.posX, this.posY, 350, 350);
  }


  updatePos(wind) {
    if (this.posX < -500) {
      this.resetPos();
    } else if (this.posX > 400 && this.posX < 500) {
      this.posX -= 1/4;
    } else {
      this.posX -= 1;
    }
    if (this.inWindRange(wind)){
      this.posX += 3;
    }
  }

  inWindRange(wind) {
  if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
      (this.posY < wind.posY + 300 && this.posY > wind.posY - 300))) {
        return true;
      }
  return false;
  }


  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 600 * Math.random();
  }

}

module.exports = Cloud;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


class Lightning {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = (-7000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.lightningIcon, this.posX, this.posY, 100, 700);
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
/* 5 */
/***/ (function(module, exports) {

class Bird {
  constructor(options) {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.speed = 3.5 * (Math.random() + 0.4);
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      ctx.drawImage(this.feathersIcon, this.posX, this.posY, 100, 100);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.birdIcon, this.posX, this.posY, 50, 50);
    }
  }

  updatePos(helicopterPosY, wind) {
    this.posX -= this.speed + (this.birdShotCount / 8);
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX < -100) {
      this.resetPos();
    }

    if (this.inWindRange(wind)){
      this.posX += 3;
    }
  }

  inWindRange(wind) {
    if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
        (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
          return true;
        }
    return false;
  }

  resetPos() {
    this.posX = 1050;
    this.posY = 600 * Math.random();
    this.speed = 3 * (Math.random() + 0.35);
  }
}

module.exports = Bird;


/***/ }),
/* 6 */
/***/ (function(module, exports) {


class Mosquito {
  constructor(options) {
    this.posX = 600 * Math.random();
    this.posY = 800;
    this.mosquitoIcon = new Image();
    this.mosquitoIcon.src = "./assets/mosquitoIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.mosquitoIcon, this.posX, this.posY, 25, 25);
  }

  updatePos(helicopterPosX, helicopterPosY, wind) {
    if (helicopterPosX > this.posX) {
      this.posX += 3/4;
    } else {
      this.posX -= 3/4;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 3/4;
    } else {
      this.posY -= 3/4;
    }

    if (this.inWindRange(wind)){
      this.posX += 2.5;
    }
  }


  inWindRange(wind) {
    if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
        (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
          return true;
        }
    return false;
  }

  resetPos() {
    this.posX = 600 * Math.random();
    this.posY = 800;
  }

}

module.exports = Mosquito;


/***/ }),
/* 7 */
/***/ (function(module, exports) {


class Helicopter {
  constructor(options) {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
    this.keysDown = [];

    this.helicopterIconFlipped = new Image();
    this.helicopterIconFlipped.src = "./assets/flippedhelicopterIcon.png";
    this.helicopterIcon = new Image();
    this.helicopterIcon.src = "./assets/helicopterIcon.png";
    this.skullIcon = new Image();
    this.skullIcon.src = "./assets/skullIcon.png";
  }

  draw(ctx) {
    let helicopterImage = this.flipped ? this.helicopterIconFlipped : this.helicopterIcon;
    ctx.drawImage(helicopterImage, this.posX, this.posY, 100, 100);
  }

  drawSkull(ctx) {
    ctx.drawImage(this.skullIcon, this.posX, this.posY, 100, 100);
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

    if (this.inWindRange(wind)){
      this.posX += 6.1;
    }
  }

  inWindRange(wind) {
    if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
        (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
          return true;
        }
    return false;
  }


  resetPos() {
    this.posX = 100;
    this.posY = 100;
    this.flipped = false;
  }

}

module.exports = Helicopter;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Arrow {
  constructor(posX, posY) {
    this.posX = -100;
    this.posY = -100;
    this.direction = "right";
    this.arrowIconLeft = new Image();
    this.arrowIconRight = new Image();
    this.arrowIconLeft.src = "./assets/flippedArrowIcon.png";
    this.arrowIconRight.src = "./assets/arrowIcon.png";
  }

  draw(ctx) {
      let arrowImage = this.direction === "right" ? this.arrowIconRight : this.arrowIconLeft;
      ctx.drawImage(arrowImage, this.posX, this.posY, 50, 50);
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
      this.posX += 4;
    } else {
      this.posX -= 4;
    }

    if (this.posX > 1050 || this.posX < -50) {
      this.resetPos();
    }

    if (this.inWindRange(wind)){
      this.posX += 3;
    }
  }

  inWindRange(wind) {
  if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
      (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
        return true;
      }
  return false;
  }

  resetPos() {
    this.posX = -100;
    this.posY = -100;
  }
}

module.exports = Arrow;


/***/ }),
/* 9 */
/***/ (function(module, exports) {


class Wind {
  constructor(options) {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;
    this.windIcon = new Image();
    this.windIcon.src = "./assets/windIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.windIcon, this.posX, this.posY, 250, 250);
  }


  updatePos() {
    this.posX += 3;
    if (this.posX > 1200) {
      this.resetPos();
    }
  }

  resetPos() {
    this.posX = -1200 - (1000 * Math.random());
    this.posY = 600 * Math.random() - 100;
  }

}

module.exports = Wind;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

class BlueBird {
  constructor(options) {
    this.posX = -1000 * Math.random();
    this.posY = 600 * Math.random();
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.blueBirdGif = new Image();
    this.blueBirdGif.src = "./assets/blueBirdGif.gif";
    this.speed = 4 * (Math.random() + 0.4);

    this.blueBirdImages = [];

    this.blueBirdGif1 = new Image();
    this.blueBirdGif1.src = "./assets/blueBirdImages/blueBird1.gif";
    this.blueBirdGif2 = new Image();
    this.blueBirdGif2.src = "./assets/blueBirdImages/blueBird2.gif";
    this.blueBirdGif3 = new Image();
    this.blueBirdGif3.src = "./assets/blueBirdImages/blueBird3.gif";
    this.blueBirdGif4 = new Image();
    this.blueBirdGif4.src = "./assets/blueBirdImages/blueBird4.gif";
    this.blueBirdGif5 = new Image();
    this.blueBirdGif5.src = "./assets/blueBirdImages/blueBird5.gif";
    this.blueBirdGif6 = new Image();
    this.blueBirdGif6.src = "./assets/blueBirdImages/blueBird6.gif";
    this.blueBirdGif7 = new Image();
    this.blueBirdGif7.src = "./assets/blueBirdImages/blueBird7.gif";
    this.blueBirdGif8 = new Image();
    this.blueBirdGif8.src = "./assets/blueBirdImages/blueBird8.gif";
    this.blueBirdGif9 = new Image();
    this.blueBirdGif9.src = "./assets/blueBirdImages/blueBird9.gif";
    this.blueBirdGif10 = new Image();
    this.blueBirdGif10.src = "./assets/blueBirdImages/blueBird10.gif";
    this.blueBirdGif11 = new Image();
    this.blueBirdGif11.src = "./assets/blueBirdImages/blueBird11.gif";
    this.blueBirdGif12 = new Image();
    this.blueBirdGif12.src = "./assets/blueBirdImages/blueBird12.gif";
    this.blueBirdGif13 = new Image();
    this.blueBirdGif13.src = "./assets/blueBirdImages/blueBird13.gif";
    this.blueBirdGif14 = new Image();
    this.blueBirdGif14.src = "./assets/blueBirdImages/blueBird14.gif";
    this.blueBirdGif15 = new Image();
    this.blueBirdGif15.src = "./assets/blueBirdImages/blueBird15.gif";

    this.blueBirdImages.push(this.blueBirdGif1);
    this.blueBirdImages.push(this.blueBirdGif2);
    this.blueBirdImages.push(this.blueBirdGif3);
    this.blueBirdImages.push(this.blueBirdGif4);
    this.blueBirdImages.push(this.blueBirdGif5);
    this.blueBirdImages.push(this.blueBirdGif6);
    this.blueBirdImages.push(this.blueBirdGif7);
    this.blueBirdImages.push(this.blueBirdGif8);
    this.blueBirdImages.push(this.blueBirdGif9);
    this.blueBirdImages.push(this.blueBirdGif10);
    this.blueBirdImages.push(this.blueBirdGif11);
    this.blueBirdImages.push(this.blueBirdGif12);
    this.blueBirdImages.push(this.blueBirdGif13);
    this.blueBirdImages.push(this.blueBirdGif14);
    this.blueBirdImages.push(this.blueBirdGif15);
    this.imageCounter = 0;
  }

  draw(ctx) {
    if (this.feathers > 0) {
      this.feathers -= 1;
      ctx.drawImage(this.feathersIcon, this.posX, this.posY, 100, 100);
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.blueBirdImages[Math.floor(this.imageCounter)], this.posX, this.posY, 60, 60);
      this.imageCounter += (this.speed / 6);
      this.imageCounter = this.imageCounter % 15;
    }
  }

  updatePos(helicopterPosY, wind) {
    this.posX += this.speed + (this.birdShotCount / 8);
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX > 1050) {
      this.resetPos();
    }

    if (this.inWindRange(wind)){
      this.speed += 0.03;
    }
  }

  inWindRange(wind) {
    if ((this.posX > wind.posX && this.posX < wind.posX + 500) && ((wind.posX > -300) &&
        (this.posY < wind.posY + 200 && this.posY > wind.posY))) {
          return true;
        }
    return false;
  }

  resetPos() {
    this.posX = -1000 * Math.random();
    this.posY = 600 * Math.random();
    this.speed = 3 * (Math.random() + 0.35);
  }
}

module.exports = BlueBird;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

let catchSound = new Audio('./assets/catchSound.wav');
catchSound.volume = 0.3;

const Util = {

  checkCrash({helicopter, bird, blueBird, blimp, mosquito, lightning}) {
    if (helicopter.posY > 550 || helicopter.posY < -100 ||
        helicopter.posX > 1100 || helicopter.posX < -100) {
      return true;
    }

    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [bird.posX + 25, bird.posY + 25]);
    if (space < 70 && bird.feathers === 0){
      bird.feathers = 25;
      return true;
    }

    space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [blueBird.posX + 25, blueBird.posY + 25]);
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

    if ((yDistance > 0 && yDistance < 700) && xDistance < 50){
      return true;
    }
  },

  checkCatch({helicopter, parachuter}) {
    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [parachuter.posX + 25, parachuter.posY + 25]);
    if (space < 60){
      catchSound.load();
      catchSound.play();
      return true;
    }
  },

  checkHit({arrowArr, bird, blueBird, mosquito, parachuter}) {
    let answer = false;
    arrowArr.forEach((arrow) => {
    let space = this.distance([arrow.posX + 10, arrow.posY], [bird.posX + 30, bird.posY + 20]);
      if (space < 35){
        bird.feathers = 25;
        bird.birdShotCount += 1;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrow.posX + 10, arrow.posY], [blueBird.posX + 30, blueBird.posY + 20]);
      if (space < 35){
        blueBird.feathers = 25;
        blueBird.birdShotCount += 1;
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrow.posX + 10, arrow.posY], [parachuter.posX + 25, parachuter.posY + 15]);
      if (space < 30){
        parachuter.dead = 25;
        wah.load();
        wah.play();
        arrow.resetPos();
        answer = true;
      }

      space = this.distance([arrow.posX + 10, arrow.posY], [mosquito.posX, mosquito.posY]);
      if (space < 30) {
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
};

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
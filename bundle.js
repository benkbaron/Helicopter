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
const Wind = __webpack_require__(11);

const Util = __webpack_require__(12);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class Parachuter {
  constructor(options) {
    this.posX = 1000 * Math.random();
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
      ctx.drawImage(this.parachuterSkullIcon, this.posX, this.posY, 50, 50);
      if (this.dead === 0) {
        this.resetPos();
      }
    } else {
      ctx.drawImage(this.parachuterIcon, this.posX, this.posY, 50, 50);
    }
  }

  updatePos(wind) {
    this.posY += 1.7;
    if (this.posY > 650) {
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

  resetPos(saved) {
    if (saved) {
      this.rescueCount += 1;
    } else {
      this.lostCount += 1;
    }
    this.posX = 1000 * Math.random();
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
    this.posX = 1010;
    this.posY = 600 * Math.random();
    this.feathers = 0;
    this.birdShotCount = 0;
    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";
    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
    this.speed = 3 * (Math.random() + 0.35);
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
    this.posX -= this.speed;
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
    this.posX = 1010;
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
      this.posX += 1;
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
    this.appear = false;
    this.direction = "right";
    this.arrowIconLeft = new Image();
    this.arrowIconRight = new Image();
    this.arrowIconLeft.src = "./assets/flippedArrowIcon.png";
    this.arrowIconRight.src = "./assets/arrowIcon.png";
  }

  draw(ctx) {
    if (this.appear) {
      let arrowImage = this.direction === "right" ? this.arrowIconRight : this.arrowIconLeft;
      ctx.drawImage(arrowImage, this.posX, this.posY, 50, 50);
    }
  }

  shoot(helicopter) {
    if ((this.posY == -100) || (this.posX > 1050 || this.posX < -50)) {
      this.appear = true;
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
      this.appear = false;
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
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

const Util = {

  checkCrash({helicopter, bird, blimp, mosquito, lightning}) {
    if (helicopter.posY > 550 || helicopter.posY < -100 ||
        helicopter.posX > 1100 || helicopter.posX < -100) {
      return true;
    }

    let space = this.distance([helicopter.posX + 50, helicopter.posY + 50], [bird.posX + 25, bird.posY + 25]);
    if (space < 70 && bird.feathers === 0){
      bird.feathers = 25;
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
      return true;
    }
  },

  checkHit({arrow, bird, mosquito, parachuter}) {
    let space = this.distance([arrow.posX + 10, arrow.posY], [bird.posX + 30, bird.posY + 20]);
    if (space < 35){
      bird.feathers = 25;
      bird.birdShotCount += 1;
      return true;
    }

    space = this.distance([arrow.posX + 10, arrow.posY], [parachuter.posX + 25, parachuter.posY + 15]);
    if (space < 30){
      parachuter.dead = 25;
      return true;
    }

    space = this.distance([arrow.posX + 10, arrow.posY], [mosquito.posX, mosquito.posY]);
    if (space < 30) {
      mosquito.resetPos();
      return true;
    }
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
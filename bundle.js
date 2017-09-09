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

// class Game {
//
//   constructor() {
//   }

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

    space = distance([helicopter1.posX + 50, helicopter1.posY + 50], [blimp1.posX + 100, blimp1.posY + 100]);
    if (space < 100){
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
    let space = distance([arrow1.posX + 10, arrow1.posY], [bird1.posX + 20, bird1.posY + 20]);
    if (space < 50){
      bird1.feathers = 25;
      birdShotCount += 1;
      return true;
    }

    space = distance([arrow1.posX + 10, arrow1.posY], [mosquito1.posX, mosquito1.posY]);
    if (space < 30) {
      mosquito1.resetPos();
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

    if (lifeCount === 0) {
      displayGameOver();
      return;
    }

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
    if (gameStarted) {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.keysDown.push(event.keyCode);
      helicopter1.updatePos();
    }

    if (event.keyCode === 32){
      arrow1.shoot(helicopter1);
    }
  }
  });

  document.addEventListener("keyup", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      helicopter1.keysDown = helicopter1.keysDown.filter(num => num !== event.keyCode );
      helicopter1.updatePos();
    }
  });

  let gameStarted = false;

  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 32){
    if (lifeCount === 0 || gameStarted === false) {
      lifeCount = 3;
      rescueCount = 0;
      birdShotCount = 0;
      helicopter1.resetPos();
      bird1.resetPos();
      wind1.resetPos();
      cloud1.resetPos();
      arrow1.resetPos();
      parachuter1.resetPos();
      blimp1.resetPos();
      mosquito1.resetPos();
      blimp1.resetPos();
      lightning1.resetPos();
      gameStarted = true;
      resetPage();
    }
  }
  });


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

  displayCaught = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    helicopter1.draw(ctx);
    bird1.updatePos(helicopter1.posY, wind1);
    bird1.draw(ctx);
    parachuter1.resetPos();
    parachuter1.draw(ctx);
    blimp1.updatePos();
    blimp1.draw(ctx);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    mosquito1.draw(ctx);
    lightning1.updatePos();
    lightning1.draw(ctx);
    arrow1.updatePos();
    arrow1.draw(ctx);
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos();
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
    blimp1.updatePos();
    blimp1.draw(ctx);
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    mosquito1.draw(ctx);
    lightning1.updatePos();
    lightning1.draw(ctx);
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  displayStandard = () => {
    addSun(ctx);
    helicopter1.updatePos(wind1);
    bird1.updatePos(helicopter1.posY, wind1);
    parachuter1.updatePos(wind1);
    blimp1.updatePos();
    mosquito1.updatePos(helicopter1.posX, helicopter1.posY, wind1);
    lightning1.updatePos();
    arrow1.updatePos();
    wind1.updatePos();
    cloud1.updatePos();
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

  let sunIcon = new Image();
  sunIcon.src = "./assets/sunIcon.png";
  addSun = (ctx) => { ctx.drawImage(sunIcon, 920, 20, 70, 70); };

  let sadSunIcon = new Image();
  sadSunIcon.src = "./assets/sadSunIcon.png";
  addSadSun = (ctx) => { ctx.drawImage(sadSunIcon, 920, 20, 70, 70); };

  // resetPage();




  displayGameOver = () => {
    ctx.fillStyle = "white";
    ctx.font = '80px serif';
    ctx.fillText('Sorry you lost!', 270, 280);
    ctx.font = '50px serif';
    ctx.fillText('Spacebar to Try Again', 280, 400);
  };

});


// }
//
// let game1 = new Game();
// setInterval(game1.resetPage(), 1000)


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class Parachuter {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();
    this.parachuterIcon = new Image();
    this.parachuterIcon.src = "./assets/parachuterIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.parachuterIcon, this.posX, this.posY, 50, 50);
  }

  updatePos(wind) {
    this.posY += 1;
    if (this.posY > 1100) {
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
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();
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


  updatePos() {
    if (this.posX > 1200) {
      this.resetPos();
    } else {
      this.posX += 1/2;
    }
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


  updatePos() {
    if (this.posX < -500) {
      this.resetPos();
    } else if (this.posX > 400 && this.posX < 500) {
      this.posX -= 1/4;
    } else {
      this.posX -= 1;
    }
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
    this.posY = (-8000 * Math.random()) - 1000;
    this.lightningIcon = new Image();
    this.lightningIcon.src = "./assets/lightningIcon.png";
  }

  draw(ctx) {
    ctx.drawImage(this.lightningIcon, this.posX, this.posY, 100, 700);
  }

  updatePos() {
    this.posY += 4;
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

    this.feathersIcon = new Image();
    this.feathersIcon.src = "./assets/feathersIcon.png";

    this.birdIcon = new Image();
    this.birdIcon.src = "./assets/birdIcon.png";
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
    this.posX -= 2.5;
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
  }

  draw(ctx) {
    let helicopterImage = this.flipped ? this.helicopterIconFlipped : this.helicopterIcon;
    ctx.drawImage(helicopterImage, this.posX, this.posY, 100, 100);
  }

  drawSkull(ctx) {
    let helicopterPosX = this.posX;
    let helicopterPosY = this.posY;
    let skullIcon = new Image();
    skullIcon.src = "./assets/skullIcon.png";
    skullIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
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
  }

}

module.exports = Helicopter;


/***/ }),
/* 8 */
/***/ (function(module, exports) {


class Arrow {
  constructor(posX, posY) {
    this.posX = -1000;
    this.posY = -1000;
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
    if (this.posX > 1050 || this.posX < -50) {
      this.posX = helicopter.flipped ? helicopter.posX : helicopter.posX + 100;
      this.posY = helicopter.posY + 20;
      this.direction = helicopter.flipped ? "left" : "right";
      this.appear = true;
    }
  }

  updatePos() {
    if (this.direction === "right") {
      this.posX += 4;
    } else {
      this.posX -= 4;
    }

    if (this.posX > 1100 || this.posX < -100) {
      this.appear = false;
    }
  }

  resetPos() {
    this.posX = 1200 + 1000 * Math.random();
    this.posY = 600 * Math.random();
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
    let windPosX = this.posX;
    let windPosY = this.posY;
    // windIcon.onload = function() {
      ctx.drawImage(this.windIcon, windPosX, windPosY, 250, 250);
    // };
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
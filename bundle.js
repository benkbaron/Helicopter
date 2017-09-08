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
    wind1.draw(ctx);
    cloud1.draw(ctx);
  };

  displayCaught = () => {
    helicopter1.updatePos(wind1);
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
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  displayHit = () => {
    helicopter1.updatePos(wind1);
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
    wind1.updatePos();
    wind1.draw(ctx);
    cloud1.updatePos();
    cloud1.draw(ctx);
  };

  displayStandard = () => {
    helicopter1.updatePos(wind1);
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
    wind1.updatePos();
    wind1.draw(ctx);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class Parachuter {
  constructor(options) {
    this.posX = 1000 * Math.random();
    this.posY = -1000 * Math.random();

  }

  draw(ctx) {
    let parachuterPosX = this.posX;
    let parachuterPosY = this.posY;
    let parachuterIcon = new Image();
    parachuterIcon.src = "./assets/parachuterIcon.png";
    parachuterIcon.onload = function() {
      ctx.drawImage(this, parachuterPosX, parachuterPosY, 50, 50);
    };
  }

  updatePos() {
    this.posY += 1;
    if (this.posY > 1100) {
      this.resetPos();
    }
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
    this.posX = - 1200 - (1000 * Math.random());
    this.posY = (600 * Math.random()) - 100;

  }

  draw(ctx) {
    let blimpPosX = this.posX;
    let blimpPosY = this.posY;
    let blimpIcon = new Image();
    blimpIcon.src = "./assets/blimpIcon.png";
    blimpIcon.onload = function() {
      ctx.drawImage(this, blimpPosX, blimpPosY, 200, 200);
    };
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

  }

  draw(ctx) {
    let cloudPosX = this.posX;
    let cloudPosY = this.posY;
    let cloudIcon = new Image();
    cloudIcon.src = "./assets/cloudIcon.png";
    cloudIcon.onload = function() {
      ctx.drawImage(this, cloudPosX, cloudPosY, 350, 350);
    };
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

  }

  draw(ctx) {
    let lightningPosX = this.posX;
    let lightningPosY = this.posY;
    let lightningIcon = new Image();
    lightningIcon.src = "./assets/lightningIcon.png";
    lightningIcon.onload = function() {
      ctx.drawImage(this, lightningPosX, lightningPosY, 100, 700);
    };
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
  }

  draw(ctx) {
    let birdPosX = this.posX;
    let birdPosY = this.posY;

    if (this.feathers > 0) {
      this.feathers -= 1;
      let feathersIcon = new Image();
      feathersIcon.src = "./assets/feathersIcon.png";
      feathersIcon.onload = function() {
        ctx.drawImage(this, birdPosX, birdPosY, 100, 100);
      };
      if (this.feathers === 0) {
        this.resetPos();
      }
    } else {
        let birdIcon = new Image();
        birdIcon.src = "./assets/birdIcon.png";
        birdIcon.onload = function() {
          ctx.drawImage(this, birdPosX, birdPosY, 50, 50);
        };
    }
  }

  updatePos(helicopterPosY) {
    this.posX -= 2.5;
    if (helicopterPosY > this.posY) {
      this.posY += 1;
    } else {
      this.posY -= 1;
    }

    if (this.posX < -100) {
      this.resetPos();
    }
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
  }

  draw(ctx) {
    let mosquitoPosX = this.posX;
    let mosquitoPosY = this.posY;
    let mosquitoIcon = new Image();
    mosquitoIcon.src = "./assets/mosquitoIcon.png";
    mosquitoIcon.onload = function() {
      ctx.drawImage(this, mosquitoPosX, mosquitoPosY, 25, 25);
    };
  }

  updatePos(helicopterPosX, helicopterPosY) {
    if (helicopterPosX > this.posX) {
      this.posX += 2/3;
    } else {
      this.posX -= 2/3;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 2/3;
    } else {
      this.posY -= 2/3;
    }
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
  }

  draw(ctx) {
    let helicopterPosX = this.posX;
    let helicopterPosY = this.posY;
    let helicopterIcon = new Image();
    helicopterIcon.src = this.flipped ? "./assets/flippedhelicopterIcon.png" : "./assets/helicopterIcon.png";
    helicopterIcon.onload = function() {
      ctx.drawImage(this, helicopterPosX, helicopterPosY, 100, 100);
    };
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
      this.posY += 6;
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
  }

  draw(ctx) {
    if (this.appear) {
      let arrowPosX = this.posX;
      let arrowPosY = this.posY;
      let arrowIcon = new Image();
      arrowIcon.src = this.direction === "right" ? "./assets/arrowIcon.png" : "./assets/flippedArrowIcon.png";
      arrowIcon.onload = function() {
        ctx.drawImage(this, arrowPosX, arrowPosY, 50, 50);
      };
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
  }

  draw(ctx) {
    let windPosX = this.posX;
    let windPosY = this.posY;
    let windIcon = new Image();
    windIcon.src = "./assets/windIcon.png";
    windIcon.onload = function() {
      ctx.drawImage(this, windPosX, windPosY, 250, 250);
    };
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
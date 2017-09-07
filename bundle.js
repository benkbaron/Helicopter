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
    this.posY = (-10000 * Math.random()) - 1000;

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
  }

  draw(ctx) {
    let birdPosX = this.posX;
    let birdPosY = this.posY;
    let birdIcon = new Image();
    birdIcon.src = "./assets/birdIcon.png";
    birdIcon.onload = function() {
      ctx.drawImage(this, birdPosX, birdPosY, 50, 50);
    };
  }

  updatePos(helicopterPosY) {
    this.posX -= 2;
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
    this.posY = 1005;
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
      this.posX += 1/2;
    } else {
      this.posX -= 1/2;
    }

    if (helicopterPosY > this.posY) {
      this.posY += 1/2;
    } else {
      this.posY -= 1/2;
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
    this.shouldMove = false;
    this.lastKeyDown = false;
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


  updatePos() {
    this.posY += 2;
    if (this.lastKeyDown) {
    switch (this.lastKeyDown){
      case 38:
        this.posY -= 6;
        break;
      case 40:
        this.posY += 6;
        break;
      case 37:
        this.posX -= 6;
        this.flipped = true;
        break;
      case 39:
        this.posX += 6;
        this.flipped = false;
        break;
      }
      }
    }

}

module.exports = Helicopter;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
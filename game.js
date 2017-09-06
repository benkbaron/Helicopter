// import Helicopter from "./helicopter.js";
//
// class Game {
//   constructor() {
//     this.helicopter = new Helicopter;
//   }
//


document.addEventListener("DOMContentLoaded", (event) => {
  let canvas = document.querySelector("canvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1000, 600);

  let helicopterPosX = 100;
  let helicopterPosY = 100;

  drawHelicopter = (x, y) => {
    let helicopterIcon = new Image();
    helicopterIcon.onload = function() {
      ctx.drawImage(this, x, y, 100, 100);
    };
    helicopterIcon.src = "./assets/helicopterIcon.png";
  };

  drawHelicopter(helicopterPosX, helicopterPosY);

  resetPage = () => {
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1000, 600);
  };


  document.addEventListener("keydown", (event) => {
    if (event.keyCode >= 37 && event.keyCode <= 40 ) {
      switch (event.keyCode){
        case 38:
        helicopterPosY -= 10;
        break;
        case 40:
        helicopterPosY += 10;
        break;
        case 37:
        helicopterPosX -= 10;
        break;
        case 39:
        helicopterPosX += 10;
        break;
      }
      resetPage();
      drawHelicopter(helicopterPosX, helicopterPosY);
    }
  });
});
//
// module.exports = Game;

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

const Util = require("./util");

const DrawCanvas = {
  startPage(ctx, helicopter1){
    ctx.clearRect(0, 0, Util.canvasWidth, Util.canvasHeight);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, Util.canvasWidth, Util.canvasHeight);
    ctx.font = 'bold 80px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText("Helicopter", (Util.canvasWidth / 2) - 200, 140);
    ctx.fillStyle = "red";
    ctx.fillText("Helicopter", (Util.canvasWidth / 2) - 200, 140);
    ctx.font = 'bold 38px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText("Type your initials and press enter to begin!", (Util.canvasWidth / 2) - 400, 250);
    ctx.fillStyle = "red";
    ctx.fillText("Type your initials and press enter to begin!", (Util.canvasWidth / 2) - 400, 250);
    ctx.fillStyle = "red";
    ctx.font = '40px tahoma';
    ctx.fillText(`${helicopter1.initials[0]}`, (Util.canvasWidth / 2) - 46, 330);
    ctx.fillText(`${helicopter1.initials[1]}`, (Util.canvasWidth / 2), 330);
    ctx.fillText(`${helicopter1.initials[2]}`, (Util.canvasWidth / 2) + 46, 330);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.2;
    ctx.strokeText(`${helicopter1.initials[0]}`, (Util.canvasWidth / 2) - 46, 330);
    ctx.strokeText(`${helicopter1.initials[1]}`, (Util.canvasWidth / 2), 330);
    ctx.strokeText(`${helicopter1.initials[2]}`, (Util.canvasWidth / 2) + 46, 330);
    ctx.strokeText("_  _  _", (Util.canvasWidth / 2) - 45, 335);


    ctx.fillStyle = "red";
    ctx.fillText("_  _  _", (Util.canvasWidth / 2) - 45, 335);
    ctx.fillStyle = "black";
    ctx.font = '26px tahoma';

    ctx.drawImage(helicopter1.helicopterIcon, (Util.canvasWidth / 2) - 355, 370, 100, 100);
    ctx.drawImage(arrowKeyIcon, (Util.canvasWidth / 2) - 235, 360, 130, 130);

    ctx.drawImage(arrowIcon, (Util.canvasWidth / 2) - 330, 490, 70, 70);
    ctx.drawImage(spacebar, (Util.canvasWidth / 2) - 240, 460, 140, 130);

    ctx.drawImage(helicopter1.helicopterIcon, (Util.canvasWidth / 2) + 130, 370, 100, 100);
    ctx.drawImage(parachuterIcon, (Util.canvasWidth / 2) + 200, 390, 70, 70);
    ctx.drawImage(thumbsUpIcon, (Util.canvasWidth / 2) + 300, 380, 70, 70);

    ctx.drawImage(pauseIcon, (Util.canvasWidth / 2) + 150, 490, 70, 70);
    ctx.drawImage(enterIcon, (Util.canvasWidth / 2) + 300, 500, 80, 50);

  },

  playingPage(ctx, paused, parachuter1, bird1, blueBird1, lifeCount, helicopter1){
    ctx.clearRect(0, 0, Util.canvasWidth, Util.canvasHeight);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, Util.canvasWidth, Util.canvasHeight);

    if (helicopter1.alive) {
      ctx.font = 'bold 24px tahoma';
      ctx.strokeStyle = 'black';
      ctx.fillStyle = "yellow";
      ctx.lineWidth = 0.5;
      ctx.fillText(`Parachuters Saved: ${parachuter1.rescueCount}`, 8, 26);
      ctx.fillText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 8, 48);
      ctx.fillText(`Lives Left: ${lifeCount}`, 8, 70);
      ctx.strokeText(`Parachuters Saved: ${parachuter1.rescueCount}`, 8, 26);
      ctx.strokeText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 8, 48);
      ctx.strokeText(`Lives Left: ${lifeCount}`, 8, 70);
    }

    if ((helicopter1.alive && !paused) && (helicopter1.posX < -5 || helicopter1.posX > Util.canvasWidth - 100 || helicopter1.posY < -20 || helicopter1.posY > Util.canvasHeight - 85)) {
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
    ctx.strokeText("Danger!", (Util.canvasWidth / 2) - 70, Util.canvasHeight / 2 - 90);
    ctx.strokeText("Stay in the borders!", (Util.canvasWidth / 2) - 220, Util.canvasHeight / 2 + 10);
    ctx.fillStyle = "red";
    ctx.fillText("Danger!", (Util.canvasWidth / 2
    ) - 70, Util.canvasHeight / 2 - 90);
    ctx.fillText("Stay in the borders!", (Util.canvasWidth / 2) - 220, Util.canvasHeight / 2 + 10);
  },

  pausedPage(ctx){
    ctx.font = 'bold 60px tahoma';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = "red";
    ctx.lineWidth = 4;
    ctx.strokeText("Paused", (Util.canvasWidth / 2) - 110, (Util.canvasHeight / 2) - 80);
    ctx.fillText("Paused", (Util.canvasWidth / 2) - 110, (Util.canvasHeight / 2) - 80);
    ctx.font = 'bold 40px tahoma';
    ctx.strokeText("Press enter to resume", (Util.canvasWidth / 2) - 220, (Util.canvasHeight / 2));
    ctx.fillText("Press enter to resume", (Util.canvasWidth / 2) - 220, (Util.canvasHeight / 2));
  },

  gameOver(ctx, parachuterHighScores, birdsHighScores, parachuter1, bird1, blueBird1, helicopter1, sortedScores){
    if (!sortedScores) {
      parachuterHighScores.push({initials: helicopter1.initials.join(""), parachuters: parachuter1.rescueCount});
      birdsHighScores.push({initials: helicopter1.initials.join(""), birds: blueBird1.birdShotCount + bird1.birdShotCount});

      parachuterHighScores.sort(function (a, b) {
        return b.parachuters - a.parachuters;
      });

      birdsHighScores.sort(function (a, b) {
        return b.birds - a.birds;
      });
    }
    ctx.font = 'bold 80px tahoma';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.strokeText("You lost!", (Util.canvasWidth / 2) - 150, (Util.canvasHeight / 6));
    ctx.fillStyle = "red";
    ctx.fillText("You lost!", (Util.canvasWidth / 2) - 150, (Util.canvasHeight / 6));
    ctx.font = '50px tahoma';
    ctx.fillStyle = "black";
    ctx.fillText("Hit enter to try again", (Util.canvasWidth / 2) - 210, (Util.canvasHeight / 6) + 100);
    ctx.font = '28px tahoma';
    ctx.fillText("Parachuters Saved", (Util.canvasWidth / 2) - 220, (Util.canvasHeight / 6) + 170);
    ctx.fillText("Highscores", (Util.canvasWidth / 2) - 170, (Util.canvasHeight / 6) + 210);
    ctx.fillText("Birds Shot", (Util.canvasWidth / 2) + 115, (Util.canvasHeight / 6) + 170);
    ctx.fillText("Highscores", (Util.canvasWidth / 2) + 110, (Util.canvasHeight / 6) + 210);
    ctx.font = '20px tahoma';
    ctx.fillText(`1. ${parachuterHighScores[0].initials}:`, (Util.canvasWidth / 2) - 160, (Util.canvasHeight / 6) + 250);
    ctx.fillText(`${parachuterHighScores[0].parachuters}`, (Util.canvasWidth / 2) - 80, (Util.canvasHeight / 6) + 250);
    ctx.fillText(`2. ${parachuterHighScores[1].initials}:`, (Util.canvasWidth / 2) - 160, (Util.canvasHeight / 6) + 275);
    ctx.fillText(`${parachuterHighScores[1].parachuters}`, (Util.canvasWidth / 2) - 80, (Util.canvasHeight / 6) + 275);
    ctx.fillText(`3. ${parachuterHighScores[2].initials}:`, (Util.canvasWidth / 2) - 160, (Util.canvasHeight / 6) + 300);
    ctx.fillText(`${parachuterHighScores[2].parachuters}`, (Util.canvasWidth / 2) - 80, (Util.canvasHeight / 6) + 300);
    ctx.fillText(`4. ${parachuterHighScores[3].initials}:`, (Util.canvasWidth / 2) - 160, (Util.canvasHeight / 6) + 325);
    ctx.fillText(`${parachuterHighScores[3].parachuters}`, (Util.canvasWidth / 2) - 80, (Util.canvasHeight / 6) + 325);
    ctx.fillText(`5. ${parachuterHighScores[4].initials}:`, (Util.canvasWidth / 2) - 160, (Util.canvasHeight / 6) + 350);
    ctx.fillText(`${parachuterHighScores[4].parachuters}`, (Util.canvasWidth / 2) - 80, (Util.canvasHeight / 6) + 350);

    ctx.fillText(`1. ${birdsHighScores[0].initials}:`, (Util.canvasWidth / 2) + 130, (Util.canvasHeight / 6) + 250);
    ctx.fillText(`${birdsHighScores[0].birds}`, (Util.canvasWidth / 2) + 212, (Util.canvasHeight / 6) + 250);
    ctx.fillText(`2. ${birdsHighScores[1].initials}:`, (Util.canvasWidth / 2) + 130, (Util.canvasHeight / 6) + 275);
    ctx.fillText(`${birdsHighScores[1].birds}`, (Util.canvasWidth / 2) + 212, (Util.canvasHeight / 6) + 275);
    ctx.fillText(`3. ${birdsHighScores[2].initials}:`, (Util.canvasWidth / 2) + 130, (Util.canvasHeight / 6) + 300);
    ctx.fillText(`${birdsHighScores[2].birds}`, (Util.canvasWidth / 2) + 212, (Util.canvasHeight / 6) + 300);
    ctx.fillText(`4. ${birdsHighScores[3].initials}:`, (Util.canvasWidth / 2) + 130, (Util.canvasHeight / 6) + 325);
    ctx.fillText(`${birdsHighScores[3].birds}`, (Util.canvasWidth / 2) + 212, (Util.canvasHeight / 6) + 325);
    ctx.fillText(`5. ${birdsHighScores[4].initials}:`, (Util.canvasWidth / 2) + 130, (Util.canvasHeight / 6) + 350);
    ctx.fillText(`${birdsHighScores[4].birds}`, (Util.canvasWidth / 2) + 212, (Util.canvasHeight / 6) + 350);
    ctx.font = '24px tahoma';
    ctx.fillText(`Your Parachuters Saved Score: ${parachuter1.rescueCount}`, (Util.canvasWidth / 2) - 140, (Util.canvasHeight / 2) + 200);
    ctx.fillText(`Your Birds Shot Score: ${blueBird1.birdShotCount + bird1.birdShotCount}`, (Util.canvasWidth / 2) - 100, (Util.canvasHeight / 2) + 250);
  }
};

module.exports = DrawCanvas;

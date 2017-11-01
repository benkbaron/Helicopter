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

const DrawCanvas = {
  startPage(ctx, helicopter1){
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.font = '80px tahoma';
    ctx.fillText('Helicopter', 322, 150);
    ctx.fillStyle = "white";
    ctx.font = '45px tahoma';
    ctx.fillText("Type your initials and press enter to begin!", 95, 250);
    ctx.fillStyle = "yellow";
    ctx.font = '35px tahoma';
    ctx.fillText(`${helicopter1.initials[0]}`, 455, 310);
    ctx.fillText(`${helicopter1.initials[1]}`, 495, 310);
    ctx.fillText(`${helicopter1.initials[2]}`, 535, 310);
    ctx.fillStyle = "white";
    ctx.fillText("_  _  _", 455, 315);
    ctx.fillStyle = "black";
    ctx.font = '26px tahoma';
    ctx.fillText('Fly using the arrow keys. Rescue parachuters by flying over them.', 130, 380);
    ctx.fillText('All objects, but clouds and wind, are dangerous! Careful to stay in the borders!', 60, 440);
    ctx.fillText("Shoot birds and mosquitos using spacebar. Hit enter to pause game.", 115, 500);
    ctx.fillText("Select level difficulty below.", 345, 570);
  },

  playingPage(ctx, parachuter1, bird1, blueBird1, lifeCount){
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.font = '18px tahoma';
    ctx.fillText(`Parachuters Saved: ${parachuter1.rescueCount}`, 10, 22);
    ctx.fillText(`Parachuters Lost: ${parachuter1.lostCount}`, 10, 44);
    ctx.fillText(`Birds Shot: ${bird1.birdShotCount + blueBird1.birdShotCount}`, 10, 66);
    ctx.fillText(`Lives Left: ${lifeCount}`, 10, 88);
  },

  pausedPage(ctx){
    ctx.font = '60px tahoma';
    ctx.fillText("Paused", 410, 220);
    ctx.font = '40px tahoma';
    ctx.fillText("Press enter to resume", 310, 350);
  },

  gameOver(ctx, parachuterHighScore, birdsHighScore, parachuter1, bird1, blueBird1){
    ctx.fillStyle = "white";
    ctx.font = '80px tahoma';
    ctx.fillText('So sorry you lost!', 220, 170);
    ctx.font = '50px tahoma';
    ctx.fillText("Hit enter to try again", 270, 260);
    ctx.font = '28px tahoma';
    ctx.fillText(`Parachuters Saved Highscore: ${parachuterHighScore}`, 320, 350);
    ctx.fillText(`Birds Shot Highscore: ${birdsHighScore}`, 365, 390);
    ctx.fillText(`Your Parachuters Saved Score: ${parachuter1.rescueCount}`, 320, 460);
  }
};

module.exports = DrawCanvas;

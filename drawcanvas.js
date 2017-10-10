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

  gameOver(ctx, parachuterHighScores, birdsHighScores, parachuter1, bird1, blueBird1, helicopter1){
    parachuterHighScores.push({initials: helicopter1.initials.join(""), parachuters: parachuter1.rescueCount});
    birdsHighScores.push({initials: helicopter1.initials.join(""), birds: blueBird1.birdShotCount + bird1.birdShotCount});

    parachuterHighScores.sort(function (a, b) {
      return b.parachuters - a.parachuters;
    });

    birdsHighScores.sort(function (a, b) {
      return b.birds - a.birds;
    });

    ctx.fillStyle = "white";
    ctx.font = '80px tahoma';
    ctx.fillText('So sorry you lost!', 220, 100);
    ctx.font = '50px tahoma';
    ctx.fillText("Hit enter to try again", 280, 180);
    ctx.font = '28px tahoma';
    ctx.fillText("Parachuters Saved Highscores", 120, 250);
    ctx.fillText("Birds Shot Highscores", 520, 250);
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
    ctx.fillText(`1. ${birdsHighScores[0].initials}:`, 600, 300);
    ctx.fillText(`${birdsHighScores[0].birds}`, 680, 300);
    ctx.fillText(`2. ${birdsHighScores[1].initials}:`, 600, 325);
    ctx.fillText(`${birdsHighScores[1].birds}`, 680, 325);
    ctx.fillText(`3. ${birdsHighScores[2].initials}:`, 600, 350);
    ctx.fillText(`${birdsHighScores[2].birds}`, 680, 350);
    ctx.fillText(`4. ${birdsHighScores[3].initials}:`, 600, 375);
    ctx.fillText(`${birdsHighScores[3].birds}`, 680, 375);
    ctx.fillText(`5. ${birdsHighScores[4].initials}:`, 600, 400);
    ctx.fillText(`${birdsHighScores[4].birds}`, 680, 400);
    ctx.font = '24px tahoma';
    ctx.fillText(`Your Parachuters Saved Score: ${parachuter1.rescueCount}`, 340, 460);
    ctx.fillText(`Your Birds Shot Score: ${blueBird1.birdShotCount + bird1.birdShotCount}`, 380, 490);
  }
};

module.exports = DrawCanvas;

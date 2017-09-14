const DrawCanvas = {

  startPage(ctx){
    ctx.clearRect(0, 0, 1000, 600);
    ctx.fillStyle = "#053fff";
    ctx.fillRect(0, 0, 1000, 600);
    ctx.fillStyle = "white";
    ctx.font = '80px tahoma';
    ctx.fillText('Helicopter', 320, 150);
    ctx.fillStyle = "white";
    ctx.font = '45px tahoma';
    ctx.fillText("Press 'p' to Start and Pause", 220, 270);
    ctx.fillStyle = "black";
    ctx.font = '26px tahoma';
    ctx.fillText('Fly using the arrow keys. Rescue parachuters by flying over them.', 130, 380);
    ctx.fillText('All objects, but clouds and wind, are dangerous! Careful to stay in the borders!', 60, 440);
    ctx.fillText('Shoot birds and mosquitos using spacebar.', 250, 500);
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
    ctx.fillText("Press 'p' to resume", 340, 350);
  },
};

module.exports = DrawCanvas;

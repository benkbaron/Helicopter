let wah = new Audio('./assets/wah.wav');
wah.volume = 0.05;

let catchSound = new Audio('./assets/catchSound.wav');
catchSound.volume = 0.3;

let arrowShotSound = new Audio('./assets/arrowShot.wav');
arrowShotSound.volume = 0.3;

let arrowHitSound = new Audio('./assets/arrowHit.wav');
arrowHitSound.volume = 0.7;

let lifeLostSound = new Audio('./assets/lifeLost.wav');
lifeLostSound.volume = 0.5;

let music = new Audio('./assets/music.m4a');
music.volume = 0.4;
music.loop = true;

const Sound = {

  playMusic() {
    music.play();
  },

  playSound(sound, soundEffects) {
    if (soundEffects) {
      if (sound === "arrowShot") {
        arrowShotSound.load();
        arrowShotSound.play();
      } else if (sound === "arrowHit") {
        arrowHitSound.load();
        arrowHitSound.play();
      } else if (sound === "lifeLost") {
        lifeLostSound.load();
        lifeLostSound.play();
      }
    }
  },

  musicControl() {
    if (!playing){
      musicButton.innerHTML = "Turn Music Off";
      music.play();
      playing = true;
    } else {
      musicButton.innerHTML = "Turn Music On";
      music.pause();
      playing = false;
    }
  },

};

module.exports = Sound;

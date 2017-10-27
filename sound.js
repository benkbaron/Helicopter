let parachuterDied = new Audio('./assets/wah.wav');
parachuterDied.volume = 0.05;

let catchSound = new Audio('./assets/catchSound.wav');
catchSound.volume = 0.3;

let arrowShot = new Audio('./assets/arrowShot.wav');
arrowShot.volume = 0.3;

let arrowHit = new Audio('./assets/arrowHit.wav');
arrowHit.volume = 0.7;

let lifeLost = new Audio('./assets/lifeLost.wav');
lifeLost.volume = 0.5;

let music = new Audio('./assets/music.m4a');
music.volume = 0.4;
music.loop = true;

const Sound = {

  playMusic() {
    music.play();
  },

  soundEffects: true,

  playSound(sound) {
    if (this.soundEffects) {
      eval(`${sound}`).load();
      eval(`${sound}`).play();
    }
  },

  musicControl(playing) {
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

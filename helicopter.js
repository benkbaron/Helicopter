const MovingObject = require("./moving_object");


class Helicopter extends MovingObject {
  constructor(options) {
    options.width = 50;
    options.height = 50;
    options.vel = [2, 2];
    options.pos = [100, 100];
    super(options);
  }

}


module.exports = Helicopter;

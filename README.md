## Helicopter

### Functionality & MVP  

Players will be able to begin the helicopter game quickly and with minimal instruction. The helicopter will constantly be falling with players clicking to avoid crashing into objects.

- [ ] Track the high score.
- [ ] Direct the helicopter's position.
- [ ] Select level difficulty.

In addition, this project will include:

- [ ] A production README

### Wireframes

Hard copy of wireframe available upon request.

This app will consist of a single screen with the game and links to the Github, my LinkedIn. Instructions, difficulty selection and the high score will appear in the game's screen where the player may click to begin.

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript` for game logic,
- `HTML5` with `Canvas` for effects rendering.

In addition to the entry file, there will be two scripts involved in this project:

`game.js`: this script will handle the logic for creating and updating the necessary elements and their interactions and rendering them to the DOM.

`objects.js`: this script will handle the logic behind the scenes for each individual elements properties and movement.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Write a basic entry file and being writing the 2 scripts outlined above. Goals for the day:

- Study Canvas.
- Review Asteroids game for how objects move and interact.

**Day 2**:   Implement logic for each moving element.  Use `game.js` to create and render the objects.  Goals for the day:

- Continue to study Canvas.
- Have objects appear on page.

**Day 3**: Have objects move and interact with each other. Goals for the day:

- Have a playable game.
- Create difficulty levels.

**Day 4**: Style the frontend, making it polished and professional. Goals for the day:

- Have a styled mainpage.
- Keep track of high score.
- Add moving obstacles.

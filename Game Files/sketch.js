// The preload function is called before setup() and is used to load external assets.
function preload() {
  // Load the 'arial.ttf' font file and assign it to the variable 'arial'.
  arial = loadFont('arial.ttf');
  option1 = loadSound('Game Music/Music Files/Track1.mp3');
  option2 = loadSound('Game Music/Music Files/Track2.mp3');
  option3 = loadSound('Game Music/Music Files/Track3.mp3');
}


// The setup function is called once at the beginning to initialize the canvas and settings.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a canvas using the entire window's dimensions in WEBGL mode
  textFont(arial);
  textAlign(CENTER, CENTER);
  rectMode(CENTER); // Configure rectangle drawing mode to be centered
  angleMode(DEGREES); // Utilize degrees for angle measurements

  // Create new camera objectS and set its initial position and target
  menuCam = createCamera();
  setCamera(menuCam);
  cam1 = createCamera();
  cam2 = createCamera();
  cam3 = createCamera();
  cam4 = createCamera();

  cam1.camera(-250, -300, 250, 0, -100, 0);
  cam2.camera(-300, 0, 0, 0, 0, 0);
  cam3.camera(0, 0, 300, 0, 0, 0);
  cam4.camera(1, -500, 0, 0, 0, 0);
  menuCam.camera();
  gameCam = cam1;

  // Invokes the Gravity function at regular intervals defined by the timer variable which is set to 500
  setInterval(() => Gravity(), timer);

  // Create the left Tetris grid object with specified properties
  mytetrisGridL = new tetrisGrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });

  // Create the right Tetris grid object with specified properties
  mytetrisGridR = new tetrisGrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });

  // Create the floor of the tetris grid with specified properties
  mytetrisGridF = new tetrisGrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });

  currentSong = option1;


  // Calls the pieceGeneration() function to generate the first piece
  buttonInitialise()
  pieceGeneration()
}

// The playGame function is called to start the gameplay.
function playGame() {
  // Set the game progression state to "play," indicating that the game is in the playing phase.
  gameProgression = "play";

  // Call the playMusic function to start playing background music or sound.
  //playMusic();
}


// Define the Gravity function using arrow function syntax
let Gravity = () => {
  // Calls the pieceDropLogic function
  pieceDropLogic();
}

// Function to manage the logic for dropping a game piece
function pieceDropLogic() {
  // Check if the game is currently in the 'play' state
  if (gameProgression == "play") {
    // Log the result of the dropAllowed function for debugging
    console.log(dropAllowed());

    // Check if dropping the piece is allowed and if there is no collision
    if (dropAllowed() && collisionDetection()) {
      // If dropping is allowed and there is no collision, drop the piece down by one layer
      pieceQueue[queuePointer].drop();
    } else {
      // If dropping is not allowed or there is a collision, generate a new piece
      pieceGeneration();
    }
  }
}

// Function to check if dropping of a game piece is allowed
function dropAllowed() {
  // Retrieve the positions of the current falling piece from the queue
  let fallingPiecePos = pieceQueue[queuePointer].getAllPos();

  // Loop through each position of the falling piece
  for (let i = 0; i < fallingPiecePos.length; i++) {
    // Check if the layer number of the current position is less than 0
    if ((fallingPiecePos[i].layerNum < 0)) {
      // If any position is below the floor of the tetris grid, return false
      return false;
    }
  }

  // If none of the positions are below the teris grid floor, return true
  return true;
}

// Function to generate a new game piece
function pieceGeneration() {
  // Move to the next piece in the queue
  queuePointer++

  // Generate a new piece with random type and color
  pieceQueue[queuePointer] = new peice(Math.round(Math.random() * 4), { x: 0, layerNum: 0, z: 0, },
    {
      r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)),
      b: (Math.round(Math.random() * 255))
    }, {
    r: (Math.round(Math.random() * 255)),
    g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255))
  });

  do {
    // Create random rotation and positional coordinate variables
    let xRandom
    let zRandom
    let lRotRandom
    let xyRotRandom

    // Generate a random x position, ensuring it's within the grid boundaries
    xRandom = (Math.round(Math.random() * 8))

    // Generate a random z position, also within grid boundaries
    zRandom = (Math.round(Math.random() * 8))

    // Generate a random amount of L-rotations (0 to 3)
    lRotRandom = (Math.round(Math.random() * 3))

    // Generate a random amount of XY-rotations (0 to 3)
    xyRotRandom = (Math.round(Math.random() * 3))

    // Set the position of the new piece based on the random x and z coordinates
    pieceQueue[queuePointer].setPos({ x: xRandom, layerNum: 28, z: zRandom })

    // Apply L-rotations to the piece
    for (let i = 0; i < lRotRandom; i++) {
      pieceQueue[queuePointer].rotateL()
    }

    // Apply XY-rotations to the piece
    for (let i = 0; i < xyRotRandom; i++) {
      pieceQueue[queuePointer].rotateU()
    }

  } while (bounds())
}

function collisionDetection() {
  // Get the position of the current moving piece from the queue
  let pieceMoveBoxPos = pieceQueue[queuePointer].getAllPos();

  // Iterate through the entire piece queue, excluding the active piece
  for (let i = 0; i < (pieceQueue.length - 1); i++) {
    // Retrieve the positions of the current piece in the queue
    let pieceBoxPos = pieceQueue[i].getAllPos();

    for (let j = 0; j < pieceBoxPos.length; j++) {
      // Iterate through each position of the current piece in the queue

      for (let k = 0; k < pieceMoveBoxPos.length; k++) {
        // Iterate through each position of the current moving piece

        // Check if the layer number of the queue piece is directly below the moving piece
        if (pieceBoxPos[j].layerNum == (pieceMoveBoxPos[k].layerNum - 1)) {
          // Check if the x and z coordinates of the queue piece and moving piece match
          if (pieceBoxPos[j].x == pieceMoveBoxPos[k].x && pieceBoxPos[j].z == pieceMoveBoxPos[k].z) {
            // If they match, it means the pieces will collide. Perform further actions based on this
            if (pieceMoveBoxPos[k].layerNum >= 25) {
              // If the moving piece is at or above a certain layer, change the game state to "over"
              gameProgression = "over";
            }
            // Return false indicating a collision will occur
            return false;
          }
        }
      }
    }
  }

  // If no collision is detected, return true
  return true;
}

function bounds() {
  // Retrieve the positions of the currently active piece
  let activePiece = pieceQueue[queuePointer].getAllPos();

  // Loop through each position in the active piece
  for (let i = 0; i < activePiece.length; i++) {
    // Check if the x-coordinate of the current position is out of bounds (greater than 9 or less than 0)
    if (activePiece[i].x > 9 || activePiece[i].x < 0) {
      // Return true if the piece is out of bounds on the x-axis
      return true;
    }
    // Check if the z-coordinate of the current position is out of bounds (greater than 9 or less than 0)
    if (activePiece[i].z > 9 || activePiece[i].z < 0) {
      // Return true if the piece is out of bounds on the z-axis
      return true;
    }
  }

  // Return false if the piece is within bounds on both axes
  return false;
}

// Function to handle the start of the dropping action when the drop button is pressed
function startDropping() {
  isDropButtonPressed = true;
}

// Function to handle the end of the dropping action when the drop button is released
function stopDropping() {
  isDropButtonPressed = false;
}

// Main draw function that is continuously executed in the p5.js game loop
function draw() {
  inputs();
  processes();
  outputs();
}

// The inputs function handles Inputs from the user
function inputs() {
  if (keyIsDown(32)) { pieceDropLogic() }

  if (isDropButtonPressed) { pieceDropLogic() }
}
// The processes function handles data processing and calculations.
function processes() {
  // Check if the game progression is at the main menu.
  if (gameProgression == "mMenu") {
    // Reset the queue pointer and clear the piece queue.
    queuePointer = -1;
    pieceQueue = [];

    // Generate a new set of game pieces.
    pieceGeneration();
  }

  // Check if the game progression is during gameplay.
  if (gameProgression == "play") {
    // Hide the directional buttons and the drop button.
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide()
    mMenuButton.hide()
    exitButton.hide()
    settingsmainButton.hide()
    tutorialmainButton.hide()
    tutorialpauseButton.hide()
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()
    colorPicker.hide()
  }
}


// The outputs function handles displaying visual outputs on the canvas.
function outputs() {
  // Get the current selected ground color from a color picker.
  currentGround = colorPicker.value();

  // Set the background of the canvas to the selected ground color.
  background(currentGround);

  // Check if the game progression is during gameplay.
  if (gameProgression == "play") {
    // Set the camera to a specific game camera, likely for gameplay view.
    setCamera(gameCam);

    // Set the stroke color to white (for drawing lines).
    stroke(255);

    // Display each piece in the piece queue.
    for (let i = 0; i < pieceQueue.length; i++) {
      pieceQueue[i].show();
    }

    // Set the stroke color to lime green.
    stroke('lime');

    // Display the left Tetris grid element.
    mytetrisGridL.show();

    // Display the right Tetris grid element.
    mytetrisGridR.show();

    // Display the front Tetris grid element.
    mytetrisGridF.show();

    // Show various gameplay buttons and controls.
    upButton.show();
    downButton.show();
    leftButton.show();
    rightButton.show();
    rotateU.show();
    rotateD.show();
    rotateL.show();
    rotateR.show();
    dropButton.show();

    // Hide non-gameplay buttons.
    settingsmainButton.hide();
    exitButton.hide();
    tutorialmainButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    exitToPauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
  }
  // Check if the game progression is at the main menu.
  else if (gameProgression == "mMenu") {
    // Call the mainMenu function to display the main menu.
    mainMenu();
  }

  // Check if the game progression is in a "pause" state.
  else if (gameProgression == "pause") {
    // Call the pauseMenu function to display the pause menu.
    pauseMenu();
  }

  else if (gameProgression == "over") {
    overMenu()
  }

  else if (gameProgression == "tutorialMain") {
    tutorialMainOption()

  }
  else if (gameProgression == "tutorialPause") {
    tutorialPauseOption()
  }

  else if (gameProgression == "settingsMain") {
    settingsMainOption()
  }

  else if (gameProgression == "settingsPause") {
    settingsPauseOption()
  }
}

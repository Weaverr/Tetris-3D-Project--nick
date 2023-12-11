// Variables
let mytetrisGridL;
let mytetrisGridR;
let mytetrisGridF;
let timer = 500;
let pieceQueue = [];
let queuePointer = -1;
let gameProgression = "mMenu";
let cam1, cam2, cam3, cam4;
let currentcamera;
let isDropButtonPressed = false;
let gameCam;
let arial


function preload() {
  arial = loadFont('arial.ttf');
}


// The setup function is called once at the beginning to initialize the canvas and settings.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a canvas using the entire window's dimensions in WEBGL mode
  textFont(arial);
  textAlign(CENTER, CENTER);
  rectMode(CENTER); // Configure rectangle drawing mode to be centered
  angleMode(DEGREES); // Utilize degrees for angle measurements

  // Create new camera objectS and set its initial position and target
  menuCam = createCamera()
  setCamera(menuCam)
  cam1 = createCamera()
  cam2 = createCamera()
  cam3 = createCamera()
  cam4 = createCamera()

  cam1.camera(-250, -300, 250, 0, -100, 0);
  cam2.camera(-300, 0, 0, 0, 0, 0)
  cam3.camera(0, 0, 300, 0, 0, 0)
  cam4.camera(1, -500, 0, 0, 0, 0)
  gameCam = cam1

  // Invokes the Gravity function at regular intervals defined by the timer variable which is set to 500
  setInterval(() => Gravity(), timer);

  // Create the left Tetris grid object with specified properties
  mytetrisGridL = new tetrisGrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });

  // Create the right Tetris grid object with specified properties
  mytetrisGridR = new tetrisGrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });

  // Create the floor of the tetris grid with specified properties
  mytetrisGridF = new tetrisGrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });

  // Create multiple camera objects and instantiate camera variables 

  // Create buttons with labels
  upButton = createButton('Up');
  downButton = createButton('Down');
  leftButton = createButton('Left');
  rightButton = createButton('Right');
  dropButton = createButton('Drop')
  mMenuButton = createButton('Press to play');
  overButton = createButton('Back to main menu')

  // Create button sizes
  upButton.size(80, 40);
  downButton.size(80, 40);
  leftButton.size(80, 40);
  rightButton.size(80, 40);
  dropButton.size(500, 100)
  mMenuButton.size(400, 100)
  overButton.size(400, 100)

  // Position the buttons
  upButton.position(100, windowHeight / 2 - 10);
  downButton.position(100, windowHeight / 2 + 50);
  leftButton.position(10, windowHeight / 2 + 20);
  rightButton.position(190, windowHeight / 2 + 20);
  dropButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260)
  mMenuButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260)
  overButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260)

  // Add event listeners to the buttons
  upButton.mousePressed(moveUp);
  downButton.mousePressed(moveDown);
  leftButton.mousePressed(moveLeft);
  rightButton.mousePressed(moveRight);
  dropButton.mousePressed(startDropping);
  dropButton.mouseReleased(stopDropping);
  mMenuButton.mouseReleased(playGame);
  overButton.mouseReleased(returnTomMenu);

  upButton.hide();
  downButton.hide()
  leftButton.hide();
  rightButton.hide();
  dropButton.hide()
  overButton.hide()

  // Calls the pieceGeneration() function to generate the first piece
  pieceGeneration()
}

function playGame() {
  gameProgression = "play"
}

function returnTomMenu() {
  console.log("triggered")
  gameProgression = "mMenu"
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
  if (gameProgression == "play") {
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide()
    overButton.hide()
    mMenuButton.hide()
  }
}

// The outputs function handles displaying visual outputs on the canvas.
function outputs() {
  background(255, 255, 255)
  if (gameProgression == "play") {
    setCamera(gameCam)
    stroke(255);
    for (let i = 0; i < pieceQueue.length; i++) { pieceQueue[i].show() }
    stroke('lime')
    mytetrisGridL.show(); // Display the left Tetris grid element
    mytetrisGridR.show(); // Display the right Tetris grid element
    mytetrisGridF.show(); // Display the front Tetris grid element
    upButton.show();
    downButton.show()
    leftButton.show();
    rightButton.show();
    dropButton.show()
    overButton.hide()
  }
  if (gameProgression == "mMenu") {
    setCamera(menuCam)
    mMenuButton.show()
    push()
    textSize(100)
    fill(0)
    text("Main Menu", 0, -200)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide()
    overButton.hide()
  }

  if (gameProgression == "pause") {
    setCamera(menuCam)
    push()
    textSize(100)
    fill(0)
    text("Pause", 0, -200)
    textSize(50)
    text("Press 'p' to continue", 0, -50)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide()
    overButton.hide()
  }
  if (gameProgression == "over") {
    setCamera(menuCam)
    push()
    textSize(100)
    fill(0)
    text("Game over", 0, -200)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide()
    mMenuButton.hide()
    overButton.show()
  }
}

function keyPressed() {
  // Check if the 'D' key is pressed
  if (keyCode == '68' && gameProgression == "play") {
    // Store the current position of the active piece
    let oldPos = pieceQueue[queuePointer].getMasterPos();
    // Move the piece one unit to the right
    pieceQueue[queuePointer].setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z });
    // Check if the new position is within bounds and not colliding
    if (bounds() && collisionDetection()) {
      // If out of bounds or colliding, revert to the old position
      pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
    }
  }

  // Check if the 'A' key is pressed
  if (keyCode == '65' && gameProgression == "play") {
    // Store the current position of the active piece
    let oldPos = pieceQueue[queuePointer].getMasterPos();
    // Move the piece one unit to the left
    pieceQueue[queuePointer].setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z });
    // Check if the new position is within bounds and not colliding
    if (bounds() && collisionDetection()) {
      // If out of bounds or colliding, revert to the old position
      pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
    }
  }

  // Check if the 'W' key is pressed
  if (keyCode == '87' && gameProgression == "play") {
    // Store the current position of the active piece
    let oldPos = pieceQueue[queuePointer].getMasterPos();
    // Move the piece one unit downwards
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 });
    // Check if the new position is within bounds and not colliding
    if (bounds() && collisionDetection()) {
      // If out of bounds or colliding, revert to the old position
      pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
    }
  }

  // Check if the 'S' key is pressed
  if (keyCode == '83' && gameProgression == "play") {
    // Store the current position of the active piece
    let oldPos = pieceQueue[queuePointer].getMasterPos();
    // Move the piece one unit upwards
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 });
    // Check if the new position is within bounds and not colliding
    if (bounds() && collisionDetection()) {
      // If out of bounds or colliding, revert to the old position
      pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
    }
  }

  // Check if the 'P' key is pressed
  if (keyCode == '80') {
    // The keyCode '80' corresponds to the 'P' key

    // Toggle the game progression state between "pause" and "play"
    if (gameProgression == "pause") {
      // If the game is currently paused, change the state to "play"
      gameProgression = "play"
    } else {
      // If the game is currently playing, change the state to "pause"
      gameProgression = "pause"
    }
  }

  // Check if the Left Arrow key is pressed
  if (keyCode == '37' && gameProgression == "play") {
    // The keyCode '37' corresponds to the Left Arrow key

    // Rotate the current active piece in the queue to the left
    pieceQueue[queuePointer].rotateL();

    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it back to the right to undo the action
      pieceQueue[queuePointer].rotateR();
    }
  }

  // Check if the Right Arrow key is pressed
  if (keyCode == '39' && gameProgression == "play") {
    // The keyCode '39' corresponds to the Right Arrow key

    // Rotate the current active piece in the queue to the right
    pieceQueue[queuePointer].rotateR();

    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it back to the left to undo the action
      pieceQueue[queuePointer].rotateL();
    }
  }

  // Check if the Up Arrow key is pressed
  if (keyCode == '38' && gameProgression == "play") {
    // The keyCode '38' corresponds to the Up Arrow key

    // Rotate the current active piece in the queue upwards
    pieceQueue[queuePointer].rotateU();

    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it downwards to undo the action
      pieceQueue[queuePointer].rotateD();
    }
  }

  // Check if the Down Arrow key is pressed
  if (keyCode == '40' && gameProgression == "play") {
    // The keyCode '40' corresponds to the Down Arrow key

    // Rotate the current active piece in the queue downwards
    pieceQueue[queuePointer].rotateD();

    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it upwards to undo the action
      pieceQueue[queuePointer].rotateU();
    }
  }
}

// Function to move a game piece to the right
function moveRight() {
  // Store the current position of the piece
  let oldPos = pieceQueue[queuePointer].getMasterPos();
  // Set the new position to one unit right
  pieceQueue[queuePointer].setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z });
  // Check if the new position is within bounds and not colliding with other pieces
  if (bounds() && collisionDetection()) {
    // If out of bounds or colliding, revert to the original position
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
  }
}

// Function to move a game piece to the left
function moveLeft() {
  let oldPos = pieceQueue[queuePointer].getMasterPos();
  pieceQueue[queuePointer].setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z });
  if (bounds() && collisionDetection()) {
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
  }
}

// Function to move a game piece upwards
function moveUp() {
  let oldPos = pieceQueue[queuePointer].getMasterPos();
  pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 });
  if (bounds() && collisionDetection()) {
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
  }
}

// Function to move a game piece downwards
function moveDown() {
  let oldPos = pieceQueue[queuePointer].getMasterPos();
  pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 });
  if (bounds() && collisionDetection()) {
    pieceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z });
  }
}

// Function to switch between different camera views based on key input
function keyTyped() {
  // Switch to camera 1
  if (key == '1') {
    gameCam = cam1;
  }
  // Switch to camera 2
  else if (key == '2') {
    gameCam = cam2;
  }
  // Switch to camera 3
  else if (key == '3') {
    gameCam = cam3;
  }
  // Switch to camera 4
  else if (key == '4') {
    gameCam = cam4;
  }
}


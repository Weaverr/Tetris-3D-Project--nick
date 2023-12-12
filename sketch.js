// Variables
// got rid of devCam
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
let arial;
let pauseGround = [255, 255, 0];
let mainGround = [255, 255, 255];
let angleX = 0;
let angleY = 0;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
let lastMouseX, lastMouseY;
let gameSong, uziSong;
let muteButton;
let isMuted = false;
let bgColor;
let colorPicker;


function preload() {
  arial = loadFont('arial.ttf');
  gameSong = loadSound('music.mp3');
  uziSong = loadSound('uzi.mp3');
  moonSong = loadSound('moon.mp3')

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
  menuCam.camera()
  gameCam = cam1

  // Invokes the Gravity function at regular intervals defined by the timer variable which is set to 500
  setInterval(() => Gravity(), timer);

  // Create the left Tetris grid object with specified properties
  mytetrisGridL = new tetrisGrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });

  // Create the right Tetris grid object with specified properties
  mytetrisGridR = new tetrisGrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });

  // Create the floor of the tetris grid with specified properties
  mytetrisGridF = new tetrisGrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });

  currentSong = gameSong;
  bgColor = color(255);

  // Create buttons with labels
  upButton = createButton('Up');
  downButton = createButton('Down');
  leftButton = createButton('Left');
  rightButton = createButton('Right');
  dropButton = createButton('Drop');
  mMenuButton = createButton('Press to play');
  overButton = createButton('Back to main menu');
  settingsmainButton = createButton('Settings');
  exitButton = createButton('Back to main menu');
  tutorialmainButton = createButton('How to play');
  tutorialpauseButton = createButton('How to play');
  settingspauseButton = createButton('Settings')
  exitToPauseButton = createButton('Back to pause menu');
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  muteButton = createButton('Mute');
  trackSelector = createSelect();
  colorPicker = createColorPicker('#ffffff');



  trackSelector.option('Original Track', 'original');
  trackSelector.option('Uzi Track', 'uzi');
  trackSelector.option('Moon Track', 'moon');

  // Create button sizes
  upButton.size(80, 40);
  downButton.size(80, 40);
  leftButton.size(80, 40);
  rightButton.size(80, 40);
  dropButton.size(500, 100);
  mMenuButton.size(400, 100);
  overButton.size(400, 100);
  settingsmainButton.size(200,100);
  exitButton.size(200,100);
  tutorialmainButton.size(200,100);
  tutorialpauseButton.size(200,100);
  exitToPauseButton.size(200,100)
  settingspauseButton.size(200,100)
  muteButton.size(130,30)
  trackSelector.size(130,30)
  colorPicker.position(10, 100);


  // Position the buttons
  upButton.position(100, windowHeight / 2 - 10);
  downButton.position(100, windowHeight / 2 + 50);
  leftButton.position(10, windowHeight / 2 + 20);
  rightButton.position(190, windowHeight / 2 + 20);
  dropButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260);
  mMenuButton.position(windowWidth / 2 - 200, windowHeight / 2 + 50);
  overButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260);
  settingsmainButton.position(windowWidth / 2 - 100, windowHeight / 2 - 10);
  exitButton.position(windowWidth / 2 - 100, windowHeight / 2 + 210);
  tutorialmainButton.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
  tutorialpauseButton.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
  settingspauseButton.position(windowWidth / 2 - 100, windowHeight / 2 - 10);
  exitToPauseButton.position(25,50);
  volumeSlider.position(windowWidth / 2 -525, windowHeight / 2 - 250);
  muteButton.position(windowWidth / 2 -524, windowHeight / 2 - 200);
  trackSelector.position(windowWidth / 2 -524, windowHeight / 2 - 140);





  // Add event listeners to the buttons
  upButton.mousePressed(moveUp);
  downButton.mousePressed(moveDown);
  leftButton.mousePressed(moveLeft);
  rightButton.mousePressed(moveRight);
  dropButton.mousePressed(startDropping);
  dropButton.mouseReleased(stopDropping);
  mMenuButton.mouseReleased(playGame);
  overButton.mouseReleased(returnTomMenu);
  exitButton.mouseReleased(returnTomMenu);
  tutorialmainButton.mouseReleased(tutorialMainMenu);
  settingsmainButton.mouseReleased(settingsMainMenu);
  tutorialpauseButton.mouseReleased(tutorialPauseMenu);
  settingspauseButton.mouseReleased(settingsPauseMenu);
  exitToPauseButton.mouseReleased(returnToPause);
  volumeSlider.input(setVolume);
  muteButton.mousePressed(toggleMute);
  trackSelector.changed(changeTrack);



  upButton.hide();
  downButton.hide()
  leftButton.hide();
  rightButton.hide();
  dropButton.hide();
  overButton.hide();
  settingsmainButton.hide();
  exitButton.hide();
  tutorialmainButton.hide();
  tutorialpauseButton.hide();
  exitToPauseButton.hide();
  settingsmainButton.hide();
  volumeSlider.hide();
  muteButton.hide();
  trackSelector.hide()
 

  // Calls the pieceGeneration() function to generate the first piece
  pieceGeneration()
}

function setVolume() {
  let volume = volumeSlider.value();
  if (currentSong) {
      currentSong.setVolume(volume);
  }
}

function playGame() {
  gameProgression = "play";
  playMusic();
}

function toggleMute() {
  if (isMuted) {
      currentSong.setVolume(0.5); // Restore previous volume
      muteButton.html('Mute');
      isMuted = false;
  } else {
      currentSong.setVolume(0); // Mute the song
      muteButton.html('Unmute');
      isMuted = true;
  }
}

function changeTrack() {
  let selectedTrack = trackSelector.value();
  if (selectedTrack === 'original') {
      uziSong.stop();
      moonSong.stop()
      currentSong = gameSong;
      gameSong.loop();
  } else if (selectedTrack === 'uzi') {
      gameSong.stop();
      moonSong.stop()
      currentSong = uziSong;
      uziSong.loop();
  } else if (selectedTrack === 'moon'){
    gameSong.stop()
    uziSong.stop()
    currentSong = moonSong;
    moonSong.loop() 
  }
  setVolume(); // Update volume for the new track
}

function playMusic() {
  if (!currentSong.isPlaying()) {
    currentSong.loop(); // Loop the song
  }
}

function returnTomMenu() {
  console.log("triggered");
  gameProgression = "mMenu";
}

function returnToPause(){
  console.log("triggered");
  gameProgression = "pause"
}

function tutorialPauseMenu(){
  console.log("triggered");
  gameProgression = "tutorialPause";

}

function settingsPauseMenu(){
  console.log("triggered");
  gameProgression = "settingsPause";
}

function tutorialMainMenu(){
  console.log("triggered");
  gameProgression = "tutorialMain";

}

function settingsMainMenu(){
  console.log("triggered");
  gameProgression = "settingsMain";

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
  if (gameProgression == "play") {
    bgColor = colorPicker.value(); // Update the background color based on picker
    background(bgColor); // Set the background color in the main game
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
    settingsmainButton.hide()
    exitButton.hide()
    tutorialmainButton.hide()
    tutorialpauseButton.hide()
    settingspauseButton.hide()
    exitToPauseButton.hide()
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()
  }
  if (gameProgression == "mMenu") {
    background(mainGround);
    settingsmainButton.size(400,100)
    settingsmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 160)
    setCamera(menuCam)
    mMenuButton.show()
    tutorialmainButton.size(400,100)
    tutorialmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 270)
    push()
    textSize(100)
    fill(0)
    text("Tetris 3D", 0, -200)
    pop()
    translate(10,-250,-500)
    rotateX(frameCount * 1);
    rotateY(frameCount * 1);
    stroke('lime')
    box(250);

    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.show();
    exitButton.hide();
    tutorialmainButton.show();
    exitToPauseButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()
  }

  if (gameProgression == "pause") {
    background(pauseGround);
    setCamera(menuCam)
    settingspauseButton.show();
    exitButton.show()
    exitButton.position(windowWidth / 2 - 100, windowHeight / 2 + 210);
    tutorialpauseButton.show()
    push()
    textSize(100)
    fill(0)
    text("Pause Menu", 0, -200)
    textSize(50)
    text("Press 'p' to continue", 0, -75)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    tutorialmainButton.hide()
    settingsmainButton.hide()
    exitToPauseButton.hide()
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()
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
    settingsmainButton.hide()
    exitButton.hide()
    tutorialmainButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    exitToPauseButton.hide();
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()
  }

  if (gameProgression == "tutorialMain") {
    setCamera(menuCam)
    exitButton.position(25,50)
    push()
    textSize(100)
    fill(0)
    text("Tutorial menu", 0, -400)
    textSize(28)
    text("How to play:", 0, -300)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    exitButton.show();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()

  }

  if (gameProgression == "settingsMain") {
    setCamera(menuCam)
    exitButton.position(25,50)
    push()
    textSize(100)
    fill(0)
    text("Settings Menu", 0, -400)
    textSize(28)
    text("Audio:", -650, -300)
    text("Background:", -650, 0)
    text("Controls:", -650, 300)
    textSize(24)
    text("Volume:", -600, -245)
    text("Mute Sound:", -625, -185 )
    text("Current Track:", -625, -125 )
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    exitButton.show();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.show()
    muteButton.show()
    trackSelector.show()

  }
  if (gameProgression == "tutorialPause") {
    setCamera(menuCam)
    exitToPauseButton.show()
    push()
    textSize(100)
    fill(0)
    text("Tutorial menu", 0, -400)
    textSize(28)
    text("How to play:", 0, -300)
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    tutorialpauseButton.hide()
    exitButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    exitToPauseButton.show();
    settingspauseButton.hide()
    volumeSlider.hide()
    muteButton.hide()
    trackSelector.hide()

  }
  if (gameProgression == "settingsPause") {
    setCamera(menuCam)
    exitButton.position(25,50)
    push()
    textSize(100)
    fill(0)
    text("Settings Menu", 0, -400)
    textSize(28)
    text("Audio:", -650, -300)
    text("Volume:", -500, -500)
    text("Background:", -650, 0)
    text("Controls:", -650, 300)
    textSize(24)
    text("Volume:", -600, -245)
    text("Mute Sound:", -625, -185 )
    text("Current Track:", -625, -125 )
    pop()
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    exitButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    tutorialpauseButton.hide();
    exitToPauseButton.show();
    volumeSlider.show()
    muteButton.show()
    trackSelector.show()

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
    } else if (gameProgression == "play") {
      // debuggingggg up there line above
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


// Variables
let myPiece;
let myLPiece;
let currentcamera;
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let keyIsPressed = false;
let timer = 1000;

// Define boundaries for Tetris grid walls
const minX = -50;
const maxX = 50;
const minZ = -50;
const maxZ = 50;

// The setup function is called once at the beginning to initialize the canvas and settings.
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // Create a canvas using the entire window's dimensions in WEBGL mode
  rectMode(CENTER); // Configure rectangle drawing mode to be centered
  angleMode(DEGREES); // Utilize degrees for angle measurements
  currentcamera = new devCam(-250, -300, 250, 0, -100, 0); // Create a new camera object and set its initial position and target

  setInterval( () => Gravity(), timer);
 
  // Create the left Tetris grid object with specified properties
  myTetrisgridL = new Tetrisgrid(110, 300, 0, 55, -150, 1, 0, 90, 255, {r: 0, g: 0, b: 0});

  // Create the right Tetris grid object with specified properties
  myTetrisgridR = new Tetrisgrid(110, 300, 0,  0, -150, -55, 0, 0, 255, {r: 0, g: 0, b: 0}); 

  // Create the floor of the tetris grid with specified properties
  myTetrisgridF = new Tetrisgrid(110, 110, 0,  0, 0, 0, 90, 0, 255, {r: 0, g: 0, b: 0});

  // Create the demopiece with specified properties
  myPiece = new Piece(0, -110, 0, {r: 0, g: 0, b: 255}, 255);

  myLPiece = new LPiece(0, -100, 0, {r: 255, g: 0, b: 0}, 0, 0);

  // Create buttons with labels
  upButton = createButton('Up');
  downButton = createButton('Down');
  leftButton = createButton('Left');
  rightButton = createButton('Right');

  // Create button sizes
  upButton.size(80, 40);
  downButton.size(80, 40);
  leftButton.size(80, 40);
  rightButton.size(80, 40);

  // Position the buttons
  upButton.position(100, windowHeight /2 - 10);
  downButton.position(100, windowHeight /2 + 50);
  leftButton.position(10, windowHeight /2 + 20);
  rightButton.position(190, windowHeight /2 + 20);

  // Add event listeners to the buttons
  upButton.mousePressed(moveUp);
  downButton.mousePressed(moveDown);
  leftButton.mousePressed(moveLeft);
  rightButton.mousePressed(moveRight);
}
// Creates a gravity function
let Gravity = () => {
  myPiece.y += 10;

  if (myPiece.y >= myTetrisgridF.y - 25) {
    myPiece.y = myTetrisgridF.y - 25;
  }
}

// Function to access the current camera object
function cam() {
  return currentcamera;
}

// The draw function is called continuously to update the canvas.
function draw() {
  inputs(); 
  processes(); 
  outputs(); 
}

// The inputs function handles gathering user input or other data.
function inputs() {

}

// The processes function handles data processing and calculations.
function processes() {
  myLPiece.move();
  myPiece.handleInputs();
  }

// The outputs function handles displaying visual outputs on the canvas.
function outputs() {
  background(255, 255, 255);
  currentcamera.show(); // Displays the camera 
  stroke(255);
  myPiece.show(); // Displays the demopiece
  myLPiece.show();
  stroke('lime')
  myTetrisgridL.show(); // Display the left Tetris grid element
  myTetrisgridR.show(); // Display the right Tetris grid element
  myTetrisgridF.show(); // Display the front Tetris grid element
}

function moveUp() {
  myPiece.z -= distance; // Adjust the value as needed
}

function moveDown() {
  myPiece.z += distance; // Adjust the value as needed
}

function moveLeft() {
  myPiece.x -= distance; // Adjust the value as needed
}

function moveRight() {
  myPiece.x += distance; // Adjust the value as needed
}
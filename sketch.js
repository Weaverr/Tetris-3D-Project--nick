// Variables
let myPiece;
let myLPiece;
let currentcamera;
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let keyIsPressed = false;
let timer = 500;

// Define boundaries for Tetris grid walls
const minX = -50;
const maxX = 50;
const minZ = -50;
const maxZ = 50;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  currentcamera = new devCam(-250, -300, 250, 0, -100, 0);

  setInterval(() => Gravity(), timer);

  myTetrisgridL = new Tetrisgrid(100, 300, 0, 50, -150, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridR = new Tetrisgrid(100, 300, 0, 0, -150, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridF = new Tetrisgrid(100, 100, 0, 0, 0, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });




  myPiece = new boxPiece(2, 5, { r: 0, g: 0, b: 255 }, { r: 255, g: 255, b: 255 });
  //myLPiece = new LPiece(0, -100, 0, {r: 255, g: 0, b: 0}, 0, 0);
}
let Gravity = () => {
  myPiece.layer -= 1
  if (myPiece.layer < 1) {
    myPiece.layer = 0
  }
}

function cam() {
  return currentcamera;
}

function draw() {
  inputs();
  processes();
  outputs();
}

function inputs() {

}


function processes() {
  //myLPiece.move();
  myPiece.handleInputs();
}


function outputs() {
  background(255, 255, 255);
  currentcamera.show();
  stroke(255);
  myPiece.show();
  //myLPiece.show();
  stroke('lime')
  myTetrisgridL.show();
  myTetrisgridR.show();
  myTetrisgridF.show();
}

function moveUp() {
  myPiece.z -= distance;
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
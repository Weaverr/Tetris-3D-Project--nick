// Variables
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let timer = 1000;
let peiceQueue = []
let queuePointer = -1
let gameState = "play"
//game state is a good way to to menus and pause and shit
//i will set it to "over" when the game is over
//"play" when the game is playing
//change the gameState to something else as its the same in my program and looks bait


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  currentcamera = new devCam(-250, -300, 250, 0, -100, 0);
  setInterval(() => Gravity(), timer);
  myTetrisgridL = new Tetrisgrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridR = new Tetrisgrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridF = new Tetrisgrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });
  peiceGeneration()
}

let Gravity = () => {
  peiceDropLogic()
}

function peiceDropLogic() {
  if (gameState == "play") {
    console.log(dropAllowed())
    if (dropAllowed() && collisionDetection()) {
      peiceQueue[queuePointer].drop()
    } else {
      peiceGeneration()
    }
  }
}

function dropAllowed() {
  let fallingPeicePos = peiceQueue[queuePointer].getAllPos()
  for (let i = 0; i < fallingPeicePos.length; i++) {
    if ((fallingPeicePos[i].layerNum < 0)) {
      return false
    }
  }
  return true
}

function peiceGeneration() {
  //generate new peicee
  queuePointer++
  //peiceQueue[queuePointer] = new peice(Math.round(Math.random() * 4), { x: 0, layerNum: 0, z: 0, }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) })
  peiceQueue[queuePointer] = new peice(1, { x: 0, layerNum: 0, z: 0, }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) })
  do {
    let xRandom
    let zRandom
    xRandom = (Math.round(Math.random() * 8))
    zRandom = (Math.round(Math.random() * 8))
    peiceQueue[queuePointer].setPos({ x: xRandom, layerNum: 28, z: zRandom })
    //!bounds() was a error that can be written up
  } while (bounds())
}

function collisionDetection() {
  let peiceMoveBoxPos = peiceQueue[queuePointer].getAllPos()
  for (let i = 0; i < (peiceQueue.length - 1); i++) {
    //Iterates through the peice queue without the active peice
    let peiceBoxPos = peiceQueue[i].getAllPos()
    for (let j = 0; j < peiceBoxPos.length; j++) {
      //Iterates through the current peice in queue      
      for (let k = 0; k < peiceMoveBoxPos.length; k++) {
        //Iterates through the current moving peice
        if (peiceBoxPos[j].layerNum == (peiceMoveBoxPos[k].layerNum - 1)) {
          if (peiceBoxPos[j].x == peiceMoveBoxPos[k].x && peiceBoxPos[j].z == peiceMoveBoxPos[k].z) {
            //compares between current peice in queue and current moving peice and returns true if they will collide
            if (peiceMoveBoxPos[k].layerNum >= 25) {
              gameState = "over"
            }
            return false
          }
        }
      }
    }
  }
  return true
}

function bounds() {
  //validation used in writeup
  let activePeice = peiceQueue[queuePointer].getAllPos()
  for (let i = 0; i < activePeice.length; i++) {
    if (activePeice[i].x > 9 || activePeice[i].x < 0) {
      return true
    }
    if (activePeice[i].z > 9 || activePeice[i].z < 0) {
      return true
    }
  }
  return false
}

function draw() {
  inputs();
  processes();
  outputs();
}

function inputs() {
  if (keyIsDown(32)) { peiceDropLogic() }
}

function processes() {
  if (gameState == "over") { console.log("Game Over") }
}

function outputs() {
  background(255, 255, 255);
  currentcamera.show();
  stroke(255);
  for (let i = 0; i < peiceQueue.length; i++) { peiceQueue[i].show() }
  stroke('lime')
  myTetrisgridL.show();
  myTetrisgridR.show();
  myTetrisgridF.show();
}

function keyPressed() {
  if (keyCode == '87') {
    //w
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    peiceQueue[queuePointer].setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z })
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }
  if (keyCode == '83') {
    //s
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    peiceQueue[queuePointer].setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z })
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }
  if (keyCode == '65') {
    //a
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 })
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }
  if (keyCode == '68') {
    //d

    let oldPos = peiceQueue[queuePointer].getMasterPos()
    peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 })
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }
  if (keyCode == '80') {
    //p
    if (gameState == "pause") {
      gameState = "play"
    } else {
      gameState = "pause"
    }
  }
  if (keyCode == '37') {
    //Left arrow key
    peiceQueue[queuePointer].rotateL()
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].rotateR()
    }
  }
  if (keyCode == '39') {
    //Right arrow key
    peiceQueue[queuePointer].rotateR()
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].rotateL()
    }
  }
  if (keyCode == '38') {
    //up arrow key
    peiceQueue[queuePointer].rotateU()
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].rotateD()
    }
  }
  if (keyCode == '40') {
    //down arrow key
    peiceQueue[queuePointer].rotateD()
    if (bounds() && collisionDetection()) {
      peiceQueue[queuePointer].rotateU()
    }
  }
}
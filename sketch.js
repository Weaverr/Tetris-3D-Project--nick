// Variables
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let timer = 100;
let peiceQueue
let queuePointer = 0
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
  box1 = new peice(0, { x: 0, layerNum: 30, z: 0, }, { r: 0, g: 0, b: 255 }, { r: 255, g: 255, b: 255 })
  peiceQueue = [box1]
}
let Gravity = () => {
  peiceDropLogic()
}

function peiceDropLogic(){
  if ((!(peiceQueue[queuePointer].getMasterPos().layerNum < 0)) && !(collisionDetection()) && gameState == "play") {
    peiceQueue[queuePointer].drop()
  } else {
    //generate new peicee
    queuePointer++
    peiceQueue[queuePointer] = new peice(Math.round(Math.random() * 3), { x: 0, layerNum: 30, z: 0, }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) }, { r: (Math.round(Math.random() * 255)), g: (Math.round(Math.random() * 255)), b: (Math.round(Math.random() * 255)) })
    let xRandom
    let zRandom
    do {
      xRandom = (Math.round(Math.random() * 8))
    } while (xRandom >= (9 - peiceQueue[queuePointer].getDimensions.x))
    do {
      zRandom = (Math.round(Math.random() * 8))
    } while (zRandom >= (9 - peiceQueue[queuePointer].getDimensions.z))
    peiceQueue[queuePointer].setPos({ x: xRandom, layerNum: 30, z: zRandom })
  }
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
        if (peiceBoxPos[j].layerNum == (peiceMoveBoxPos[k].layerNum - 1)){
          if (peiceBoxPos[j].x == peiceMoveBoxPos[k].x && peiceBoxPos[j].z == peiceMoveBoxPos[k].z) {
            //compares between current peice in queue and current moving peice and returns true if they will collide
            if (peiceMoveBoxPos[k].layerNum >= 25){
              gameState = "over"
            }
            return true
          }
        }
      }
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
  if(keyIsDown(32)){
    peiceDropLogic()
  }
}


function processes() {
  if(gameState == "over"){
    console.log("Game Over")
  }
}


function outputs() {
  background(255, 255, 255);
  currentcamera.show();
  stroke(255);
  for (let i = 0; i < peiceQueue.length; i++) {
    peiceQueue[i].show()
  }
  stroke('lime')
  myTetrisgridL.show();
  myTetrisgridR.show();
  myTetrisgridF.show();
}



function keyPressed() {
  // replace box1 with activepeice
  if (keyCode == '87') {
    //w
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.x >= (9 - (peiceQueue[queuePointer].getDimensions().x - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '83') {
    //s
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.x <= 0)) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '65') {
    //a
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.z <= 0)) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 })
    }
  }

  if (keyCode == '68') {
    //d
    let oldPos = peiceQueue[queuePointer].getMasterPos()
    if (!(oldPos.z >= (9 - (peiceQueue[queuePointer].getDimensions().z - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      peiceQueue[queuePointer].setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 })
    }
  }
  //console.log(event)
}
// how to break code: ands and ors, i j k, -1, ==
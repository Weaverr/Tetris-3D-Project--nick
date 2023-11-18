// Variables
let myTetrisgridL;
let myTetrisgridR;
let myTetrisgridF;
let timer = 500;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  currentcamera = new devCam(-250, -300, 250, 0, -100, 0);
  setInterval(() => Gravity(), timer);
  myTetrisgridL = new Tetrisgrid(100, 300, 0, 50, -155, 1, 0, 90, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridR = new Tetrisgrid(100, 300, 0, 0, -155, -50, 0, 0, 255, { r: 0, g: 0, b: 0 });
  myTetrisgridF = new Tetrisgrid(100, 100, 0, 0, -5, 0, 90, 0, 255, { r: 0, g: 0, b: 0 });

  box1 = new peice(0, { x: 0, layerNum: 6, z: 0, }, { r: 0, g: 0, b: 255 }, { r: 255, g: 255, b: 255 })

}
let Gravity = () => {
  if (!(box1.getMasterPos().layerNum < 0)) {
    box1.drop()
  }
}


function draw() {
  inputs();
  processes();
  outputs();
}

function inputs() {

}


function processes() {

}


function outputs() {
  background(255, 255, 255);
  currentcamera.show();
  stroke(255);
  box1.show()
  stroke('lime')
  myTetrisgridL.show();
  myTetrisgridR.show();
  myTetrisgridF.show();
}



function keyPressed() {
  // replace box1 with activeBox
  if (keyCode == '87') {
    //w
    let oldPos = box1.getMasterPos()
    if (!(oldPos.x >= (9 - (box1.getDimensions().x - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      box1.setPos({ x: oldPos.x + 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '83') {
    //s
    let oldPos = box1.getMasterPos()
    if (!(oldPos.x <= 0)) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      box1.setPos({ x: oldPos.x - 1, layerNum: oldPos.layerNum, z: oldPos.z })
    }
  }

  if (keyCode == '65') {
    //a
    let oldPos = box1.getMasterPos()
    if (!(oldPos.z <= 0)){
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      box1.setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z - 1 })
    }
  }

  if (keyCode == '68') {
    //d
    let oldPos = box1.getMasterPos()
    if (!(oldPos.z >= (9 - (box1.getDimensions().z - 1)))) {
      //VALIDATION, REMOVE IF AND ADD INTO WRITEUP FOR MARKS
      box1.setPos({ x: oldPos.x, layerNum: oldPos.layerNum, z: oldPos.z + 1 })
    }
  }
  //console.log(event)
}
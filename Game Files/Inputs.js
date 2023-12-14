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

// Function to handle the start of the dropping action when the drop button is pressed
function startDropping() {
  isDropButtonPressed = true;
}

// Function to handle the end of the dropping action when the drop button is released
function stopDropping() {
  isDropButtonPressed = false;
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
  
  function RotateUp(){
    pieceQueue[queuePointer].rotateU();
  
    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it downwards to undo the action
      pieceQueue[queuePointer].rotateD();
    }
  }
  
  function RotateDown(){
    pieceQueue[queuePointer].rotateD();
  
    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it upwards to undo the action
      pieceQueue[queuePointer].rotateU();
    }
  }
  
  function RotateLeft(){
    pieceQueue[queuePointer].rotateL();
  
    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it back to the right to undo the action
      pieceQueue[queuePointer].rotateR();
    }
  }
  
  function RotateRight(){
    pieceQueue[queuePointer].rotateR();
  
    // Check if the piece is out of bounds or colliding after rotation
    if (bounds() && collisionDetection()) {
      // If the piece is out of bounds or colliding, rotate it back to the left to undo the action
      pieceQueue[queuePointer].rotateL();
    }
  }
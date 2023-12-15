// The buttonInitialize function is responsible for creating buttons with labels.
function buttonInitialise(){
    // Create buttons with labels
    upButton = createButton('Up');
    downButton = createButton('Down');
    leftButton = createButton('Left');
    rightButton = createButton('Right');
    dropButton = createButton('Drop');
    mMenuButton = createButton('Press to play');
    exitButton = createButton('Back to main menu');
    tutorialmainButton = createButton('How to play');
    settingsmainButton = createButton('Settings');
    tutorialpauseButton = createButton('How to play');
    settingspauseButton = createButton('Settings')
    exitToPauseButton = createButton('Back to pause menu');

    volumeSlider = createSlider(0, 1, 0.5, 0.01);
    
    muteButton = createButton('Mute');
    trackSelector = createSelect();
    colorPicker = createColorPicker('#ffffff');
    rotateU = createButton('Rotate Up');
    rotateD = createButton('Rotate Down');
    rotateL = createButton('Rotate Left');
    rotateR = createButton('Rotate Right');
  
  
    trackSelector.option('Track 1', 'Track 1 (Original)');
    trackSelector.option('Track 2', 'Track 2');
    trackSelector.option('Track 3', 'Track 3');
  
    // Create button sizes
    upButton.size(80, 40);
    downButton.size(80, 40);
    leftButton.size(80, 40);
    rightButton.size(80, 40);
    rotateU.size(80, 40);
    rotateD.size(80, 40);
    rotateL.size(80, 40);
    rotateR.size(80, 40);
    dropButton.size(500, 100);
    mMenuButton.size(400, 100);
    settingsmainButton.size(200,100);
    exitButton.size(200,100);
    tutorialmainButton.size(200,100);
    tutorialpauseButton.size(200,100);
    exitToPauseButton.size(200,100)
    settingspauseButton.size(200,100)
    muteButton.size(130,30);
    trackSelector.size(130,30);
    colorPicker.size(100, 30);
  
    // Position the buttons
    upButton.position(100, windowHeight / 2 - 10);
    downButton.position(100, windowHeight / 2 + 50);
    leftButton.position(10, windowHeight / 2 + 20);
    rightButton.position(190, windowHeight / 2 + 20);
    rotateU.position(1700, windowHeight / 2 - 10);
    rotateD.position(1700, windowHeight / 2 + 50);
    rotateL.position(1610, windowHeight / 2 + 20);
    rotateR.position(1790, windowHeight / 2 + 20);
    dropButton.position(windowWidth / 2 - 250, windowHeight / 2 + 260);
    mMenuButton.position(windowWidth / 2 - 200, windowHeight / 2 + 50);
    settingsmainButton.position(windowWidth / 2 - 100, windowHeight / 2 - 10);
    exitButton.position(windowWidth / 2 - 100, windowHeight / 2 + 210);
    tutorialmainButton.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
    tutorialpauseButton.position(windowWidth / 2 - 100, windowHeight / 2 + 100);
    settingspauseButton.position(windowWidth / 2 - 100, windowHeight / 2 - 10);
    exitToPauseButton.position(25,50);
    volumeSlider.position(windowWidth / 2 -525, windowHeight / 2 - 250);
    muteButton.position(windowWidth / 2 -524, windowHeight / 2 - 200);
    trackSelector.position(windowWidth / 2 -524, windowHeight / 2 - 140);
    colorPicker.position(windowWidth / 2 -510, windowHeight / 2 + 50);
  
    // Add event listeners to the buttons
    upButton.mousePressed(moveUp);
    downButton.mousePressed(moveDown);
    leftButton.mousePressed(moveLeft);
    rightButton.mousePressed(moveRight);
    rotateU.mousePressed(RotateUp);
    rotateD.mousePressed(RotateDown);
    rotateL.mousePressed(RotateLeft);
    rotateR.mousePressed(RotateRight);
    dropButton.mousePressed(startDropping);
    dropButton.mouseReleased(stopDropping);
    mMenuButton.mouseReleased(playGame);
    exitButton.mouseReleased(returnTomMenu);
    tutorialmainButton.mouseReleased(returnTotMain);
    settingsmainButton.mouseReleased(returnTosMain);
    tutorialpauseButton.mouseReleased(returnTotPause);
    settingspauseButton.mouseReleased(returnTosPause);
    exitToPauseButton.mouseReleased(returnToPause);
    volumeSlider.input(setVolume);
    muteButton.mousePressed(toggleMute);
    trackSelector.changed(changeTrack);
  
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    settingsmainButton.hide();
    exitButton.hide();
    tutorialmainButton.hide();
    tutorialpauseButton.hide();
    exitToPauseButton.hide();
    settingsmainButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
    settingspauseButton.hide();
    mMenuButton.hide();
}

// The returnToMainMenu function is called to return to the main menu.
function returnTomMenu() {
  console.log("triggered"); 
  gameProgression = "mMenu"; // Set the game progression state to "mMenu."
}

// The returnToPause function is called to return to the pause menu.
function returnToPause() {
  console.log("triggered"); 
  gameProgression = "pause"; // Set the game progression state to "pause."
}

// The returnToSettingsPause function is called to return to the settings menu within the pause menu.
function returnTosPause() {
  console.log("triggered"); 
  gameProgression = "settingsPause"; // Set the game progression state to "settingsPause."
}

// The returnToSettingsMain function is called to return to the settings menu within the main menu.
function returnTosMain() {
  console.log("triggered"); 
  gameProgression = "settingsMain"; // Set the game progression state to "settingsMain."
}

// The returnToTutorialPause function is called to return to the tutorial menu within the pause menu.
function returnTotPause() {
  console.log("triggered"); // Output a message to the console for debugging or logging.
  gameProgression = "tutorialPause"; // Set the game progression state to "tutorialPause."
}

// The returnToTutorialMain function is called to return to the tutorial menu within the main menu.
function returnTotMain() {
  console.log("triggered"); // Output a message to the console for debugging or logging.
  gameProgression = "tutorialMain"; // Set the game progression state to "tutorialMain."
}


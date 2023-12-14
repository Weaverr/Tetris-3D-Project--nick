function mainMenu(){
    background(mainGround);
    settingsmainButton.size(400,100);
    settingsmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 160);
    setCamera(menuCam);
    mMenuButton.show();
    tutorialmainButton.size(400,100);
    tutorialmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 270);
    push();
    textSize(100);
    fill(0);
    text("Tetris 3D", 0, -200);
    pop();
    translate(10,-250,-500);
    rotateX(frameCount * 1);
    rotateY(frameCount * 1);
    stroke('lime');
    box(250);

    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.show();
    exitButton.hide();
    tutorialmainButton.show();
    exitToPauseButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}

function pauseMenu(){
    background(pauseGround);
    setCamera(menuCam);
    settingspauseButton.show();
    exitButton.show();
    exitButton.position(windowWidth / 2 - 100, windowHeight / 2 + 210);
    tutorialpauseButton.show();
    push();
    textSize(100);
    fill(0);
    text("Pause Menu", 0, -200);
    textSize(50);
    text("Press 'p' to continue", 0, -75);
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    overButton.hide();
    tutorialmainButton.hide();
    settingsmainButton.hide();
    exitToPauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}

function overMenu(){
    background(mainGround);
    setCamera(menuCam);
    push();
    textSize(100);
    fill(0);
    text("Game over", 0, -200);
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    mMenuButton.hide();
    overButton.show();
    settingsmainButton.hide();
    exitButton.hide();
    tutorialmainButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    exitToPauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}

function tutorialMainOption(){
    background(mainGround);
    setCamera(menuCam);
    exitButton.position(25,50);
    push();
    textSize(100);
    fill(0);
    text("Tutorial menu", 0, -400);
    textSize(28);
    text("How to play:", 0, -300);
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    exitButton.show();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}

function tutorialPauseOption(){
    background(mainGround);
    setCamera(menuCam);
    exitToPauseButton.show();
    push();
    textSize(100);
    fill(0);
    text("Tutorial menu", 0, -400);
    textSize(28);
    text("How to play:", 0, -300);
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
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
    colorPicker.hide()  
}

function settingsMainOption(){
    background(mainGround);
    setCamera(menuCam);
    exitButton.position(25,50);
    push();
    textSize(100);
    fill(0);
    text("Settings Menu", 0, -400);
    textSize(28);
    text("Audio:", -650, -300);
    text("Background:", -650, 0);
    textSize(24);
    text("Volume:", -600, -245);
    text("Mute Sound:", -625, -185 );
    text("Current Track:", -625, -125 );
    text("Background Color:", -625, 60 );
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    overButton.hide();
    settingsmainButton.hide();
    exitButton.show();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.show();
    muteButton.show();
    trackSelector.show();
    colorPicker.show();
}

function settingsPauseOption(){
    background(mainGround);
    setCamera(menuCam);
    exitButton.position(25,50);
    push();
    textSize(100);
    fill(0);
    text("Settings Menu", 0, -400);
    textSize(28);
    text("Audio:", -650, -300);
    text("Volume:", -500, -500);
    text("Background:", -650, 0);
    textSize(24);
    text("Volume:", -600, -245);
    text("Mute Sound:", -625, -185 );
    text("Current Track:", -625, -125 );
    text("Background Color:", -625, 60 );
    pop();
    upButton.hide();
    downButton.hide()
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
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
    colorPicker.show()
}
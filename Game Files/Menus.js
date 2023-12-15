// The mainMenu function is responsible for displaying the main menu.
function mainMenu() {
    // Set the background color to the main ground color.
    background(mainGround);

    // Set the size and position of the "Settings" button for the main menu.
    settingsmainButton.size(400, 100);
    settingsmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 160);
    settingsmainButton.show();

    setCamera(menuCam);

    // Show the "Main Menu" button.
    mMenuButton.show();

    // Set the size and position of the "Tutorial" button for the main menu.
    tutorialmainButton.size(400, 100);
    tutorialmainButton.position(windowWidth / 2 - 200, windowHeight / 2 + 270);

    // Display the "Tetris 3D" title text.
    push();
    textSize(100);
    fill(0); 
    text("Tetris 3D", 0, -200); 
    pop(); 

    // Translate and rotate to create an animated box.
    translate(10, -250, -500);
    rotateX(frameCount * 1);
    rotateY(frameCount * 1);
    stroke('lime'); 
    box(250); 

    // Hide various buttons and UI elements not needed in the main menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    exitButton.hide();
    exitToPauseButton.hide();
    tutorialpauseButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();

    // Show the "Settings" and "Tutorial" buttons in the main menu.
    tutorialmainButton.show();
}

// The pauseMenu function is responsible for displaying the pause menu.
function pauseMenu() {
    // Set the background color to the pause ground color.
    background(pauseGround);

    setCamera(menuCam);

    // Show the "Settings" button for the pause menu.
    settingspauseButton.show();

    // Show the "Exit" button for the pause menu and position it.
    exitButton.show();
    exitButton.position(windowWidth / 2 - 100, windowHeight / 2 + 210);

    // Show the "Tutorial" button for the pause menu.
    tutorialpauseButton.show();

    // Display the "Pause Menu" title text.
    push(); 
    textSize(100);
    fill(0); 
    text("Pause Menu", 0, -200); 
    
    // Display a message to instruct the player to press 'p' to continue.
    textSize(50);
    text("Press 'p' to continue", 0, -75);
    pop(); 

    // Hide various buttons and UI elements not needed in the pause menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    tutorialmainButton.hide();
    settingsmainButton.hide();
    exitToPauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}


// The overMenu function is responsible for displaying the game over menu.
function overMenu() {
    // Set the background color to the main ground color.
    background(mainGround);

    setCamera(menuCam);

    // Display the "Game Over" title text.
    push(); 
    textSize(100);
    fill(0); 
    text("Game over", 0, -200); 
    pop(); 

    // Hide various buttons and UI elements not needed in the game over menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    mMenuButton.hide();
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


// The tutorialMainOption function is responsible for displaying the tutorial menu within the main menu.
function tutorialMainOption() {
    // Set the background color to the main ground color.
    background(mainGround);

    setCamera(menuCam);

    // Show the exit button, likely for returning to the main menu.
    exitButton.position(25, 50);
    exitButton.show();

    // Display the title and instructions for the tutorial.
    push();
    textSize(100);
    fill(0); 

    // Display the title of the tutorial menu.
    text("Tutorial Option", 0, -400);

    // Display instructions on how to play the game.
    textSize(40);
    text("How to play:", 0, -300);
    textSize(28);

    // Provide detailed gameplay instructions.
    text("'Move' and 'Rotate' the pieces as they fall down the grid and try to stack them as neatly as possible by reducing the amount of gaps between tetrominoes.", 0, -250);
    text("Pieces can only be moved and rotated within the grid boundaries. You are under constant pressure from the gradual falling of the piece, so make sure to", 0, -220);
    text("act quickly and decisively. Score can be achieved by clearing entire layers of the grid by completely filling a base creating a solid line which can be", 0, -190);
    text("made up of different pieces. Score can also be achieved by using the 'drop' button on your screen or the 'SPACE' key on your keyboard which will speed", 0, -160);
    text("up the rate at which pieces fall - AHHH MORE STRESS!. The game will end when the pieces stack up to reach the top of the grid, therefore YOU LOSE!", 0, -130);
    text("In order to stop this, you must try and and create as many layers as possible to achieve the greatest score possible and therefore keep the pieces", 0, -100);
    text("stacking at the lowest point in the grid possible, 'remember to act with speed' and 'make the right decisions' and then you just might become the", 0, -70);
    text("BEST at TETRIS 3D", 0, -40);

    // Display control instructions.
    textSize(40);
    text("Controls:", 0, 60);
    textSize(28);

    // Provide a list of control instructions.
    text("Move Forwards:  W Key / 'UP' button", -697, 130);
    text("Move Backwards:  D Key / 'DOWN' button", -665, 170);
    text("Move Left:  A Key / 'LEFT' button", -720, 210);
    text("Move Right:  D Key / 'RIGHT' button", -700, 250);
    text("Rotate Up:  Up Arrow Key / 'ROTATE UP' button", -625, 310);
    text("Rotate Down:  Down Arrow Key / 'ROTATE DOWN' button", -565, 350);
    text("Rotate Left:  Left Arrow Key / 'ROTATE LEFT' button", -600, 390);
    text("Rotate Right:  Right Arrow Key / 'ROTATE RIGHT' button", -570, 430);
    text("Instant Drop:  'SPACE' key / 'DROP' button", 0, 130);
    text("Pause:  'P' key", 0, 170);

    pop();

    // Hide various buttons and UI elements not needed in the tutorial menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    settingsmainButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}


// The tutorialPauseOption function is responsible for displaying the tutorial menu within the pause menu.
function tutorialPauseOption() {
    // Set the background color to the main ground color.
    background(mainGround);

    setCamera(menuCam);

    // Show the "Exit to Pause" button to return to the pause menu.
    exitToPauseButton.show();

    // Display the title and instructions for the tutorial.
    push(); 
    textSize(100);
    fill(0); 
    // Display the title of the tutorial menu.
    text("Tutorial Option", 0, -400);

    // Display instructions on how to play the game.
    textSize(40);
    text("How to play:", 0, -300);
    textSize(28);

    // Provide detailed gameplay instructions.
    text("'Move' and 'Rotate' the pieces as they fall down the grid and try to stack them as neatly as possible by reducing the amount of gaps between tetrominoes.", 0, -250);
    text("Pieces can only be moved and rotated within the grid boundaries. You are under constant pressure from the gradual falling of the piece so make sure to", 0, -220);
    text("act quickly and decisively. Score can be achieved by clearing entire layers of the grid by completely filling a base creating a solid line which can be", 0, -190);
    text("made up of different pieces. Score can also be achieved by using the 'drop' button on your screen or the 'SPACE' key on your keyboard which will speed", 0, -160);
    text("up the rate at which pieces fall - AHHH MORE STRESS!. The game will end when the pieces stack up to reach the top of the grid therefore YOU LOSE!", 0, -130);
    text("In order to stop this you must try and and create as many layers as possible to achieve the greatest score possible and therefore keep the pieces", 0, -100);
    text("stacking at the lowest point in the grid possible, 'remember to act with speed' and 'make the right decisions' and then you just might become the", 0, -70);
    text("BEST at TETRIS 3D.", 0, -40);
    
    // Display control instructions.
    textSize(40);
    text("Controls:", 0, 60);
    textSize(28);
    
    // Provide a list of control instructions.
    text("Move Forwards:  W Key / 'UP' button", -697, 130);
    text("Move Backwards:  D Key / 'DOWN' button", -665, 170);
    text("Move Left:  A Key / 'LEFT' button", -720, 210);
    text("Move Right:  D Key / 'RIGHT' button", -700, 250);
    text("Rotate Up:  Up Arrow Key / 'ROTATE UP' button", -625, 310);
    text("Rotate Down:  Down Arrow Key / 'ROTATE DOWN' button", -565, 350);
    text("Rotate Left:  Left Arrow Key / 'ROTATE LEFT' button", -600, 390);
    text("Rotate Right:  Right Arrow Key / 'ROTATE RIGHT' button", -570, 430);
    text("Instant Drop:  'SPACE' key / 'DROP' button", 0, 130);
    text("Pause:  'P' key", 0, 170);

    pop();

    // Hide various buttons and UI elements not needed in the tutorial menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    settingsmainButton.hide();
    tutorialpauseButton.hide();
    exitButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.hide();
    muteButton.hide();
    trackSelector.hide();
    colorPicker.hide();
}


// The settingsMainOption function is responsible for displaying the settings menu in the main menu.
function settingsMainOption() {
    // Set the background color to the main ground color.
    background(mainGround);

    setCamera(menuCam);

    // Position and display the "Exit" button at a specific location.
    exitButton.position(25, 50);
    exitButton.show();

    // Display the "Settings Menu" title text.
    push(); 
    textSize(100);
    fill(0); 
    text("Settings Option", 0, -400); 

    // Display various settings options and labels.
    textSize(28);
    text("Audio:", -650, -300);
    text("Background:", -650, 0);
    textSize(24);
    text("Volume:", -600, -245);
    text("Mute Sound:", -625, -185);
    text("Current Track:", -625, -125);
    text("Background Color:", -625, 60);
    pop(); 

    // Hide various buttons and UI elements not needed in the settings menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    settingsmainButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    volumeSlider.show();
    muteButton.show();
    trackSelector.show();
    colorPicker.show();
}


// The settingsPauseOption function is responsible for displaying the settings menu in the pause menu.
function settingsPauseOption() {
    // Set the background color to the main ground color.
    background(mainGround);

    // Set the camera to the menu camera, likely for the settings menu view.
    setCamera(menuCam);
    exitToPauseButton.show();

    // Display the "Settings Menu" title text.
    push(); 
    textSize(100);
    fill(0); 
    text("Settings Option", 0, -400); 

    // Display various settings options and labels.
    textSize(28);
    text("Audio:", -650, -300);
    text("Volume:", -500, -500);
    text("Background:", -650, 0);
    textSize(24);
    text("Volume:", -600, -245);
    text("Mute Sound:", -625, -185);
    text("Current Track:", -625, -125);
    text("Background Color:", -625, 60);
    pop(); 

    // Hide various buttons and UI elements not needed in the settings menu.
    upButton.hide();
    downButton.hide();
    leftButton.hide();
    rightButton.hide();
    rotateU.hide();
    rotateD.hide();
    rotateL.hide();
    rotateR.hide();
    dropButton.hide();
    settingsmainButton.hide();
    exitButton.hide();
    mMenuButton.hide();
    tutorialmainButton.hide();
    settingspauseButton.hide();
    tutorialpauseButton.hide();
    volumeSlider.show();
    muteButton.show();
    trackSelector.show();
    colorPicker.show();

}
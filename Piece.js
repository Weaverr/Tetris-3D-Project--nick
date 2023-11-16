class boxPiece {
    constructor(startbox, startLayer, colour, stroke) {
        this.layer = startLayer
        this.box = startbox
        /* this.box[1] = this.box[0] + 1
        this.box[2] = this.box[0] + 10
        this.box[3] = this.box[1] + 10 */
        this.colour = colour;
        this.stroke = stroke;

        // Movement distance per step
        this.distance = 10;
        this.keyIsPressed = false;

        // Define the grid boundaries (update as per your grid)
        this.minX = -50;
        this.maxX = 50; // Example width
        this.minZ = -50; //fine
        this.maxZ = 50; // fine
    }

    // Method to handle keyboard inputs
    handleInputs() {
        if (!this.keyIsPressed) {
            if (keyIsDown(87)) { // W key for up
                this.move('up');
                this.keyIsPressed = true;
            } else if (keyIsDown(65)) { // A key for left
                this.move('left');
                this.keyIsPressed = true;
            } else if (keyIsDown(83)) { // S key for down
                this.move('down');
                this.keyIsPressed = true;
            } else if (keyIsDown(68)) { // D key for right
                this.move('right');
                this.keyIsPressed = true;
            }
        }

        // Reset keyIsPressed if no relevant keys are pressed
        if (!keyIsDown(87) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)) {
            this.keyIsPressed = false;
        }
    }
    // Method to display the piece
    show() {
        push();
        fill(this.colour.r, this.colour.g, this.colour.b);
        stroke(this.stroke.r, this.stroke.g, this.stroke.b);
        let boxPos = getGridPos(this.box)
        translate(boxPos.x, getLayerPos(this.layer), boxPos.z);
        box(10, 10, 10);
        pop();
    }
}

function getLayerPos(layerNum) {
    return (-20 - (10 * layerNum))
}

function getGridPos(gridNum) {
    if (gridNum == 1){ return { x: -45, z: -45 }}
    if (gridNum == 2){ return { x: -45, z: -35 } }
    
}
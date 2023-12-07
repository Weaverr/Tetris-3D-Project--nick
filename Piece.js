// Class to handle and manage box elements called boxHandler
class boxHandler {
    // Constructor for initializing boxHandler with position, colour, and stroke
    constructor(newBox, colour, stroke) {
        this.boxPos = newBox
        this.colour = colour;
        this.stroke = stroke;
    }
    // Method to display the box
    show() {
        push();
        fill(this.colour.r, this.colour.g, this.colour.b);
        stroke(this.stroke.r, this.stroke.g, this.stroke.b);
        // Calculate position based on layer and coordinates
        let y = (-20 - (10 * this.boxPos.layerNum))
        let x = valueCoordinator(this.boxPos.x)
        let z = valueCoordinator(this.boxPos.z)
        translate(x, y, z); // Move to calculated position
        box(10, 10, 10); 
        pop();
    }
    // Method to lower the box by one layer
    drop() { this.boxPos.layerNum = this.boxPos.layerNum - 1 }
    // Getter method for the box's position
    getPos() { return (this.boxPos) }
    // Setter method to update the box's position
    setPos(newBox) { this.boxPos = newBox }
}
// Function to map grid values to coordinates
function valueCoordinator(value) {
    // Returns corresponding coordinate for each grid value
    if (value == 0) { return (-45) }
    if (value == 1) { return (-35) }
    if (value == 2) { return (-25) }
    if (value == 3) { return (-15) }
    if (value == 4) { return (-5) }
    if (value == 5) { return (5) }
    if (value == 6) { return (15) }
    if (value == 7) { return (25) }
    if (value == 8) { return (35) }
    if (value == 9) { return (45) }
}

// Class representing a game piece composed of multiple boxes
class peice {
    // Constructor for creating a new game piece
    constructor(pieceType, masterLocation, colour, fill) {
        this.boxArr = [];
        this.masterLocation = masterLocation;
        this.pieceType = pieceType
        this.colour = colour;
        this.fill = fill;
        this.roationXZ = 0;
        this.rotationL = 0;
        this.pieceInitialise();
    }

    // Method to display the piece
    show() {
        // Iterate and display each box in the piece
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].show()
        }
    }
    // Method to lower each box in the piece by one layer
    drop() {
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].drop()
        }
    }
    // Getter for the master position of the piece
    getMasterPos() { return (this.boxArr[0].getPos()) }

    // Method to get the positions of all boxes comprising a game piece
    getAllPos() {
        // Initialize an empty array to hold the positions of each box
        let allPos = []

        for (let i = 0; i < this.boxArr.length; i++) {
            // Retrieve the position of each box and store it in the allPos array
            allPos[i] = this.boxArr[i].getPos()
        }

        // Return the array containing the positions of all the boxes
        return (allPos)
    }

    // Setter to update the master location and reposition the piece
    setPos(masterLocation) {
        this.masterLocation = masterLocation
        this.boxArr[0].setPos({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z })
        this.updatePos()
    }

    rotateL() {
        // Check if the piece type allows for rotation
        if (!this.pieceType == 0) {
            // Increment the XZ rotation
            this.roationXZ++;
            // If the rotation exceeds the limit, reset to 0
            if (this.roationXZ >= 4) {
                this.roationXZ = 0;
            }
            // Update the position of the piece after rotation
            this.updatePos();
        }
    }
    
    rotateR() {
        // Check if the piece type allows for rotation
        if (!this.pieceType == 0) {
            // Decrement the XZ rotation
            this.roationXZ--;
            // If the rotation goes below 0, set it to the maximum rotation value
            if (this.roationXZ < 0) {
                this.roationXZ = 3;
            }
            // Update the position of the piece after rotation
            this.updatePos();
        }
    }
    
    rotateU() {
        // Check if the piece type allows for rotation
        if (!this.pieceType == 0) {
            // Increment the L rotation
            this.rotationL++;
            // If the rotation exceeds the limit, reset to 0
            if (this.rotationL >= 4) {
                this.rotationL = 0;
            }
            // Update the position of the piece after rotation
            this.updatePos();
        }
    }
    
    rotateD() {
        // Check if the piece type allows for rotation
        if (!this.pieceType == 0) {
            // Decrement the L rotation
            this.rotationL--;
            // If the rotation goes below 0, set it to the maximum rotation value
            if (this.rotationL < 0) {
                this.rotationL = 3;
            }
            // Update the position of the piece after rotation
            this.updatePos();
        }
    }
    
    pieceInitialise() {
        // Initialize the first box of the piece at the master location
        this.boxArr[0] = new boxHandler(
            { 
                x: this.masterLocation.x, 
                layerNum: this.masterLocation.layerNum, 
                z: this.masterLocation.z 
            }, 
            this.colour, 
            this.fill
        );
    
        if (this.pieceType == 0) {
            // If the piece type is 0 (e.g., a 2x2 box), initialize the rest of the boxes
            for (let i = 1; i < 8; i++) {
                this.boxArr[i] = new boxHandler(
                    { 
                        x: this.masterLocation.x, 
                        layerNum: this.masterLocation.layerNum, 
                        z: this.masterLocation.z 
                    }, 
                    this.colour, 
                    this.fill
                );
            }
        }
    
        if (this.pieceType >= 1) {
            // For other piece types, initialize a different number of boxes
            for (let i = 1; i < 4; i++) {
                this.boxArr[i] = new boxHandler(
                    { 
                        x: this.masterLocation.x, 
                        layerNum: this.masterLocation.layerNum, 
                        z: this.masterLocation.z 
                    }, 
                    this.colour, 
                    this.fill
                );
            }
        }
    
        // Update the position of the piece after initialization
        this.updatePos();
    }
    
    updatePos() {
        
        if (this.pieceType == 0) {
            //2x2x2 box
            this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, 
                layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            this.boxArr[4].setPos({ x: this.getMasterPos().x, 
                layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
            this.boxArr[5].setPos({ x: this.getMasterPos().x + 1, 
                layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
            this.boxArr[6].setPos({ x: this.getMasterPos().x, 
                layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z + 1 })
            this.boxArr[7].setPos({ x: this.getMasterPos().x + 1, 
                layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z + 1 })
        }


        if (this.pieceType == 1) {
            //tPeice
            if (this.roationXZ == 0) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 1) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 2) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 3) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
        }

        if (this.pieceType == 2) {
            //lPeice
            if (this.roationXZ == 0) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 1) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 2) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 3) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
        }

        if (this.pieceType == 3) {
            //line
            if (this.roationXZ == 0) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 3, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 3, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 3, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 3, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 1) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 3 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 3, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 3 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 3, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 2) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 3, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 3, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 3, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 3, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 3) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 3 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum + 3, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 3 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 2, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, 
                        layerNum: this.getMasterPos().layerNum - 3, z: this.getMasterPos().z })
                }
            }
        }

        if (this.pieceType == 4) {
            //zpeice
            if (this.roationXZ == 0) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 1) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 2) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 3) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, 
                        layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
        }

    }
}
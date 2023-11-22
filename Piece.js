class boxHandler {
    constructor(newBox, colour, stroke) {
        this.boxPos = newBox
        this.colour = colour;
        this.stroke = stroke;
    }
    show() {
        push();
        fill(this.colour.r, this.colour.g, this.colour.b);
        stroke(this.stroke.r, this.stroke.g, this.stroke.b);
        let y = (-20 - (10 * this.boxPos.layerNum))
        let x = valueCoordinator(this.boxPos.x)
        let z = valueCoordinator(this.boxPos.z)
        translate(x, y, z);
        //better variable names than xyz
        box(10, 10, 10);
        pop();
    }
    drop() { this.boxPos.layerNum = this.boxPos.layerNum - 1 }
    getPos() { return (this.boxPos) }
    setPos(newBox) { this.boxPos = newBox }
}

function valueCoordinator(value) {
    //make better name lol
    //error with single equals
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


class peice {
    constructor(peiceType, masterLocation, color, fill) {
        this.boxArr = []
        this.masterLocation = masterLocation
        this.peiceType = peiceType
        this.color = color;
        this.fill = fill;
        this.roationXZ = 0
        this.rotationL = 0
        this.peiceInitialise()
    }
    show() {
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].show()
        }
    }
    drop() {
        for (let i = 0; i < this.boxArr.length; i++) {
            this.boxArr[i].drop()
        }
    }
    getMasterPos() { return (this.boxArr[0].getPos()) }
    getAllPos() {
        let allPos = []
        for (let i = 0; i < this.boxArr.length; i++) {
            allPos[i] = this.boxArr[i].getPos()
        }
        return (allPos)
    }
    setPos(masterLocation) {
        this.masterLocation = masterLocation
        this.boxArr[0].setPos({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z })
        this.updatePos()
    }
    rotateL() {
        if (!this.peiceType == 0) {
            this.roationXZ++
            if (this.roationXZ >= 4) {
                this.roationXZ = 0
            }
            this.updatePos()
        }
        console.log("RotationL " + this.rotationL + " RotationXY " + this.roationXZ)
    }
    rotateR() {
        if (!this.peiceType == 0) {
            this.roationXZ--
            if (this.roationXZ < 0) {
                this.roationXZ = 3
            }
            this.updatePos()
        }
        console.log("RotationL " + this.rotationL + " RotationXY " + this.roationXZ)
    }
    rotateU() {
        if (!this.peiceType == 0) {
            this.rotationL++
            if (this.rotationL >= 4) {
                this.rotationL = 0
            }
            this.updatePos()
        }
        console.log("RotationL " + this.rotationL + " RotationXY " + this.roationXZ)
    }
    rotateD() {
        if (!this.peiceType == 0) {
            this.rotationL--
            if (this.rotationL < 0) {
                this.rotationL = 3
            }
            this.updatePos()
        }
        console.log("RotationL " + this.rotationL + " RotationXY " + this.roationXZ)
    }
    peiceInitialise() {
        this.boxArr[0] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
        if (this.peiceType == 0) {
            //2x2box
            for (let i = 1; i < 8; i++) {
                this.boxArr[i] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            }
        }
        if (this.peiceType >= 1) {
            for (let i = 1; i < 4; i++) {
                this.boxArr[i] = new boxHandler({ x: this.masterLocation.x, layerNum: this.masterLocation.layerNum, z: this.masterLocation.z }, this.color, this.fill);
            }
        }
        this.updatePos()
    }

    updatePos() {
        if (this.peiceType == 0) {
            //2x2 box
            this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            this.boxArr[4].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
            this.boxArr[5].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
            this.boxArr[6].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z + 1 })
            this.boxArr[7].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z + 1 })
        }
        if (this.peiceType == 1) {
            //tPeice
            if (this.roationXZ == 0) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 1) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x , layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 2) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
            if (this.roationXZ == 3) {
                if (this.rotationL == 0) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 1) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum + 1, z: this.getMasterPos().z })
                }
                if (this.rotationL == 2) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                }
                if (this.rotationL == 3) {
                    this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                    this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                    this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum - 1, z: this.getMasterPos().z })
                }
            }
        }






        if (this.peiceType == 2) {
            //lPeice
            if (this.roationXZ == 0) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            }
            if (this.roationXZ == 1) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            }
            if (this.roationXZ == 2) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
            }
            if (this.roationXZ == 3) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            }
        }








        if (this.peiceType == 3) {
            //line
            if (this.roationXZ == 0) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x + 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[3].setPos({ x: this.getMasterPos().x + 3, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            }
            if (this.roationXZ == 1) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 2 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 3 })
            }
            if (this.roationXZ == 2) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x - 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[3].setPos({ x: this.getMasterPos().x - 3, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
            }
            if (this.roationXZ == 3) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                this.boxArr[2].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 2 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 3 })
            }
        }







        if (this.peiceType == 4) {
            //line
            if (this.roationXZ == 0) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            }
            if (this.roationXZ == 1) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x + 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x + 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
            }
            if (this.roationXZ == 2) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z - 1 })
            }
            if (this.roationXZ == 3) {
                this.boxArr[1].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z })
                this.boxArr[2].setPos({ x: this.getMasterPos().x - 1, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
                this.boxArr[3].setPos({ x: this.getMasterPos().x - 2, layerNum: this.getMasterPos().layerNum, z: this.getMasterPos().z + 1 })
            }
        }

    }
}
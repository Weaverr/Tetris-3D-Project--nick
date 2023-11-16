class Piece {
  constructor(x, y, z, colour, stroke) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.colour = colour;
      this.stroke = stroke;
      this.blocks = [
          { x: 0, y: 0, z: 0 },
          { x: 10, y: 0, z: 0 },
          { x: 0, y: 10, z: 0 },
          { x: 10, y: 10, z: 0 },
          { x: 0, y: 0, z: 10 },
          { x: 10, y: 0, z: 10 },
          { x: 0, y: 10, z: 10 },
          { x: 10, y: 10, z: 10 }
      ];

      // Movement distance per step
      this.distance = 10;
      this.keyIsPressed = false;

      // Define the grid boundaries (update as per your grid)
      this.minX = -50;
      this.maxX = 50; // Example width
      this.minZ = -50; //fine
      this.maxZ = 50; // fine
  }

  // Unified move method
  move(direction) {
      let newX = this.x;
      let newZ = this.z;

      switch (direction) {
          case 'up':
              newZ -= this.distance;
              if (newZ >= this.minZ) {
                  this.z = newZ;
              }
              break;
          case 'down':
              newZ += this.distance;
              if (newZ <= this.maxZ) {
                  this.z = newZ;
              }
              break;
          case 'left':
              newX -= this.distance;
              if (newX >= this.minX) {
                  this.x = newX;
              }
              break;
          case 'right':
              newX += this.distance;
              if (newX <= this.maxX) {
                  this.x = newX;
              }
              break;
      }
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
      for (const block of this.blocks) {
          push();
          fill(this.colour.r, this.colour.g, this.colour.b);
          stroke(this.stroke.r, this.stroke.g, this.stroke.b);
          translate(this.x + block.x, this.y + block.y, this.z + block.z);
          box(10, 10, 10);
          pop();
      }
  }
}
class LPiece {
    constructor(x, y, z, colour, stroke) {
      // Define properties such as dimensions, initial position, color, etc.
      this.x = x;
      this.y = y;
      this.z = z;
      this.dpX = 0;
      this.dpZ = 0;
      this.colour = colour;
      this.stroke = stroke;
      // Define the shape of the L piece using blocks or cuboids
      this.blocks = [
        // Base of the L-shape
        { x: 0, y: 0, z: 0 },
        { x: 10, y: 0, z: 0 },
        { x: 20, y: 0, z: 0 },
        // Extending limb of the L-shape
        { x: 20, y: 10, z: 0 }
      ];
    }
  
    show() {
      // Display the L piece by drawing its blocks or cuboids with the specified color
      for (const block of this.blocks) {
        let {r, g, b} = this.colour;
        let {stroke} = this.stroke;
        push();
        fill(r, g, b);
        translate(this.x + block.x, this.y + block.y, this.z + block.z);
        box(10, 10, 10); // Adjust dimensions as needed
        pop();
      }
    }
    move() {
        const distance = 10;
         this.x += this.dpX
         this.z += this.dpZ
  }

}
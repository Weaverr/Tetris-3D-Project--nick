// Class to define a camera
class devCam {
    constructor(x, y, z, lookx, looky, lookz) { // Constructor for creating camera elements
      this.x = x;
      this.y = y;
      this.z = z;
      this.lookx = lookx;
      this.looky = looky;
      this.lookz = lookz;
    }
  
    // Method to set up and display the camera
    show() { 
    // Use the camera function to set up the camera position and orientation
      camera(this.x, this.y, this.z, this.lookx, this.looky, this.lookz); 
    }
  }

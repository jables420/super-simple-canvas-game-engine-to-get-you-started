var objects = [];
//canvas.width = window.innerWidth; //
//canvas.height = window.innerHeight;

class GameCanvas {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  updateFrame() {
    for (const object of objects) {
      object.updateDimensions()
      object.draw()
    }  
  }

  rectCollision(a, b) {
    if (a.bottomEdge < b.topEdge) {
      return false;
    } else if (a.topEdge > b.bottomEdge) {
      return false;
    } else if (a.leftEdge > b.rightEdge) {
      return false;
    } else if (a.rightEdge < b.leftEdge) {
      return false;
    }
    return true;
  }
}

class Line {
  constructor(canvas, x1 = 0, y1 = 0, x2 = 0, y2 = 0, lineColor = "black", lineWidth = 2) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.lineWidth = lineWidth;

    this.id = objects.length; //since id start from 0
    objects.push(this);
  //why is 'objects' needed? well every frame everythis has to be redrawn
    this.die = function() {
      objects.splice(this.id,1);
      this.ctx.clearRect(this.centerX, this.y, this.width, this.height)
    } 
  }

  draw() {
    this.ctx.strokeStyle = this.lineColor;
    this.ctx.lineWidth = this.lineWidth;
  
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  updateDimensions() {
    //pass
  }
}
//////////Add Event Listener///////////

document.addEventListener("keydown", function(event) {
  isKeyDown[event.key] = true;
  console.log('deteced key down', event.key)
});

document.addEventListener("keyup", function(event) {
  isKeyDown[event.key] = false;
  console.log("detectedf key up", event.key)
});

function isKeyDown() {
  this.ArrowUp = false; //filler
}

////////////////game functions//////////////

class Circle {
  constructor(canvas, centerX, centerY, radius, color = "red") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    
    this.topEdge = centerY - radius;
    this.bottomEdge = centerY + radius;
    this.leftEdge = centerX - radius;
    this.rightEdge = centerX + radius;

    this.lineWidth = 2;
    this.color = color;
    this.fill = true;
    this.border = false;
    this.borderColor = "black";

    this.id = objects.length; //since id start from 0
    objects.push(this);
  //why is 'objects' needed? well every frame everythis has to be redrawn
    this.die = function() {
      objects.splice(this.id,1);
      this.ctx.clearRect(this.centerX, this.y, this.width, this.height)
    } 

    this.vspeed = 0;
    this.hspeed = 0;
  }

  draw() {
    if (this.border == true) {
      this.ctx.beginPath();
      
      this.ctx.strokeStyle = this.borderColor;
      this.ctx.lineWidth = this.lineWidth;
      
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();

      console.log("Drew")
    }
      
    if (this.fill == true) {
      this.ctx.beginPath();
      
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();

      this.ctx.closePath()
    }
  }

  updateDimensions() {
    this.centerX += this.hspeed;
    this.centerY += this.vspeed;
    
    this.topEdge = this.y;
    this.bottomEdge = this.y + this.height;
    this.leftEdge = this.x;
    this.rightEdge = this.x + this.width;
  }
}

class Rect {
  constructor(canvas, x, y, width, height, color = "red") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.lineWidth = 2;
    this.color = color;
    this.borderColor = "black";
    this.fill = true;
    this.border = false;
    
    this.topEdge = y;
    this.bottomEdge = y + height;
    this.leftEdge = x;
    this.rightEdge = x + width;

    this.id = objects.length; //since id start from 0
    objects.push(this);
  //why is 'objects' needed? well every frame everythis has to be redrawn
    this.die = function() {
      objects.splice(this.id,1);
      this.ctx.clearRect(this.leftEdge, this.topEdge, this.width, this.height)
    } 

    this.vspeed = 0;
    this.hspeed = 0;
  }

  draw() {
    if (this.border == true) {
      this.ctx.strokeStyle = this.borderColor;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
    if (this.fill == true) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }


  updateDimensions() {
    this.x += this.hspeed;
    this.y += this.vspeed;
    
    this.topEdge = this.y;
    this.bottomEdge = this.y + this.height;
    this.leftEdge = this.x;
    this.rightEdge = this.x + this.width;
  }
}
/*regardless of whether canvas is there or not*/
const canvas = document.getElementById("canvas");
gameRunning = true;
var things = [];

//canvas.width = window.innerWidth; //
//canvas.height = window.innerHeight;

document.onmousemove = updateCoordinates;

clientx = 0;
clienty = 0;

function updateCoordinates(e) {
  clientx = e.clientX;
  clienty = e.clientY;
}

////////////////check browser support//////////////

function checkBrowser() {
  if (canvas.getContext) {
    startGame()
  } else {
    console.log("no canvas sadge")
  }
}

////////////////game functions//////////////

function Rect(ctx, xpos, ypos, width, height, color = "rgb(200, 0, 0)") {
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
  this.color = color;
  
  this.topEdge = ypos;
  this.bottomEdge = ypos + height;
  this.leftEdge = xpos;
  this.rightEdge = xpos + width;
  
  this.id = things.length; //since id start from 0
  things.push(this);
  //why is 'things' needed? well every frame everything has to be redrawn
  this.die = function() {
    things.splice(this.id,1);
    ctx.clearRect(xpos, ypos, width, height)
  } 
}

function drawLine(ctx, x1, y1, x2, y2, color='black', width=2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function collision(a, b) {
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


function drawIt(ctx, xpos, ypos, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(xpos, ypos, width, height);
}

function clear(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isKeyDown() {
  this.ArrowUp = false; //filler
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

////////////////game logic//////////////

var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var score = 0;
const ctx = canvas.getContext("2d");

///////////////////define variables/////////////////////

var square = new Rect(ctx, 0, 0, 50, 50);
var squarespeed = 5;

//////////////////game!////////////////////////////////

function startGame() {
  //clear(ctx);
  
  requestAnimationFrame(startGame);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    clear(ctx)
    //while game runnin g, redraw everything in things.
    for (const thing of things) {

      xpos = thing.xpos;
      ypos = thing.ypos;
      width = thing.width;
      height = thing.height; 
      color = thing.color;

      thing.topEdge = ypos;
      thing.bottomEdge = ypos + height;
      thing.leftEdge = xpos;
      thing.rightEdge = xpos + width;

      drawIt(ctx, xpos, ypos, width, height, color);
      console.log("drew it")
    }  


    ///demo movement///
    if (isKeyDown.ArrowLeft && square.leftEdge > 0) {
      square.xpos -= squarespeed;
    } else if (isKeyDown.ArrowRight && square.rightEdge < canvas.width) {
      square.xpos += squarespeed;
    } else if (isKeyDown.ArrowUp && square.topEdge > 0) {
      square.ypos -= squarespeed;
    } else if (isKeyDown.ArrowDown && square.bottomEdge < canvas.height) {
      square.ypos += squarespeed
    }


    console.log(square.leftEdge, square.rightEdge, square.topEdge, square.bottomEdge)

    ///end demo movement///
  }
}

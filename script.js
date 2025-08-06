//@ts-check

import {GameCanvas, isKeyDown} from "./game_engine.js";
import {Rect, Circle, Line} from "./game_engine.js";

let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;
const canvas = document.getElementById("canvas");

const gameCanvas = new GameCanvas(canvas)
///////////////////define variables/////////////////////
let square = new Rect(canvas, 10, 10, 50, 50, "purple");
square.fill = false;
square.borderColor = "purple";
square.border = true;
square.lineWidth = 2; //

let circle = new Circle(canvas, 100, 100, 20, "red")
circle.fill = true;

let line = new Line(canvas);

document.onmousemove = updateCoordinates;
let clientX = 0;
let clientY = 0;

function updateCoordinates(e) {
  clientX = e.clientX;
  clientY = e.clientY;
  console.log("Mouse coordinates", clientX, clientY)
}

//////////////////game!////////////////////////////////

function startGame() {
  //clear(ctx);
  
  requestAnimationFrame(startGame);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    gameCanvas.clear();
    gameCanvas.updateFrame();

    circle.centerX = clientX;
    circle.centerY = clientY;
    
    ///demo movement///
    if (isKeyDown["ArrowLeft"] || isKeyDown["a"] && square.leftEdge > 0) {
      square.x -= 5;
    }
    
    //@ts-ignore
    if (isKeyDown["ArrowRight"] || isKeyDown["d"] && square.rightEdge < canvas.width) {
      square.x += 5;
    }
    
    if (isKeyDown["ArrowUp"] || isKeyDown["w"] && square.topEdge > 0) {
      square.y -= 5;
    } 
    
    //@ts-ignore canvas DOES exist
    if (isKeyDown["ArrowDown"] || isKeyDown["s"] && square.bottomEdge < canvas.height) {
      square.y += 5;
    }

    line.x2 = square.x + square.width / 2;
    line.y2 = square.y + square.height / 2;
    line.x1 = circle.centerX;
    line.y1 = circle.centerY;

    console.log(square.leftEdge, square.rightEdge, square.topEdge, square.bottomEdge)

    ///end demo movement///
  }
}


startGame()
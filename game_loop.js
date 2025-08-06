//@ts-check

import { GameCanvas } from "./game_engine.js";
import { gameLoop } from "./game_config.js";

let fps = 60;
let now;
let then = Date.now();
let interval = 1000/fps;
let delta;
const canvas = document.getElementById("canvas");

const gameCanvas = new GameCanvas(canvas);

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

    gameLoop();
  }
}


startGame()
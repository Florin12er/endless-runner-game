/** @type {HTMLCanvasElement} */
import input from "./input.js";
import Player from "./player.js";
import { backGround } from "./background.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = 760;
  class Game {
    constructor(width, height) {
      this.groundMargin = 120;
      this.width = width;
      this.speed = 0;
      this.maxSpeed = 3;
      this.height = height;
      this.background = new backGround(this);
      this.player = new Player(this);
      this.input = new input();
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.player.draw(ctx);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});

/** @type {HTMLCanvasElement} */
import input from "./input.js";
import Player from "./player.js";
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new input();
    }
    update() {
      this.player.update(this.input.keys);
    }
    draw(ctx) {
      this.player.draw(ctx);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});

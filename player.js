/** @type {HTMLCanvasElement} */
import { Sitting } from "./playerStates.js";
export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("dog_image");
    this.speed = 0;
    this.maxSpeed = 5;
    this.state = [new Sitting(this)];
    this.currentState = this.state[0];
    this.currentState.enter();
  }
  update(input) {
    //horizontal movement
    this.x += this.speed;
    if (input.includes("d")) this.speed = this.maxSpeed;
    else if (input.includes("a")) this.speed = -this.maxSpeed;
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement
    if (input.includes(" ") && this.onGrund()) this.vy -= 30;
    this.y += this.vy;
    if (!this.onGrund()) this.vy += this.weight;
    else this.vy = 0;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  onGrund() {
    return this.y >= this.game.height - this.height;
  }
}
// timestamp : 7:37:26

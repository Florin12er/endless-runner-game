/** @type {HTMLCanvasElement} */
import {
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from "./playerStates.js";
import { CollionAnimation } from "./collisionAnimation.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.hitSound = new Audio(
      "./sounds/sounds_roblox-death-sound-sound-effect-(hd)-made-with-Voicemod-technology.mp3",
    );
    this.hitSound.loop = true;
    this.hitSound.volume = 1;
    this.killedSound = new Audio("./sounds/Fire impact 1 (1).wav");
    this.killedSound.loop = true;
    this.killedSound.volume = 1;
    this.jumpingSound = new Audio("./sounds/action_jump.mp3");
    this.jumpingSound.loop = true;
    this.jumpingSound.volume = 1;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.image = document.getElementById("dog_image");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.speed = 0;
    this.maxSpeed = 5;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
  }
  update(input) {
    this.checkCollision();
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.speed;
    if (input.includes("d") && this.currentState !== this.states[6])
      this.speed = this.maxSpeed;
    else if (input.includes("a") && this.currentState !== this.states[6])
      this.speed = -this.maxSpeed;
    else this.speed = 0;
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;
    // animation
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += 3.099999999999909;
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }
  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.colllisions.push(
          new CollionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5,
          ),
        );
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++;
        } else {
          this.setState(6, 0);
          this.game.lives--;
          this.game.score -= 3;
          if (this.game.lives <= 0) {
            this.game.gameOver = true;
          }
        }
      }
    });
  }
}

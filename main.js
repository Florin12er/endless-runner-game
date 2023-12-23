/** @type {HTMLCanvasElement} */
import input from "./input.js";
import Player from "./player.js";
import { backGround } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

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
      this.score = 0;
      this.UI = new UI(this);
      this.maxSpeed = 3;
      this.maxParticles = 100;
      this.height = height;
      this.particles = [];
      this.background = new backGround(this);
      this.player = new Player(this);
      this.input = new input();
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.markedForDeletion = false;
      this.fontColor = "black";
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += 2.599999999999909;
      }
      this.enemies.forEach((enemy) => {
        enemy.update();
        if (enemy.markedForDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      });
      // check if off the screen
      if (this.x + this.width < 0) this.markedForDeletion = true;
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.player.draw(ctx);
      this.enemies.forEach((enemy) => {
        enemy.draw(ctx);
      });
      this.particles.forEach((particle) => {
        particle.draw(ctx);
      });
      this.UI.draw(ctx);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
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

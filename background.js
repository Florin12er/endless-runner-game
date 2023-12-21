/** @type {HTMLCanvasElement} */
const level1 = document.getElementById("level1");
const level2 = document.getElementById("level2");

class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height,
    );
  }
}
export class backGround {
  constructor(game) {
    this.game = game;
    this.width = 1920;
    this.height = 760;
    // level 1
    this.layer1image = document.getElementById("layer6");
    this.layer2image = document.getElementById("layer7");
    this.layer3image = document.getElementById("layer8");
    this.layer4image = document.getElementById("layer9");
    this.layer5image = document.getElementById("layer10");
    this.layer1 = new Layer(game, this.width, this.height, 0, this.layer1image);
    this.layer2 = new Layer(
      game,
      this.width,
      this.height,
      0.1,
      this.layer2image,
    );
    this.layer3 = new Layer(
      game,
      this.width,
      this.height,
      0.3,
      this.layer3image,
    );
    this.layer4 = new Layer(
      game,
      this.width,
      this.height,
      0.7,
      this.layer4image,
    );
    this.layer5 = new Layer(game, this.width, this.height, 1, this.layer5image);
    //************************************************************************************************

    // level 2
    this.layer6image = document.getElementById("layer5");
    this.layer7image = document.getElementById("layer4");
    this.layer8image = document.getElementById("layer3");
    this.layer9image = document.getElementById("layer2");
    this.layer6 = new Layer(game, this.width, this.height, 1, this.layer6image);
    this.layer7 = new Layer(game, this.width, this.height, 1, this.layer7image);
    this.layer8 = new Layer(
      game,
      this.width,
      this.height,
      0.7,
      this.layer8image,
    );
    this.layer9 = new Layer(
      game,
      this.width,
      this.height,
      0.6,
      this.layer9image,
    );
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];

    this.backgroundLayers1 = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
    this.backgroundLayers2 = [
      this.layer9,
      this.layer8,
      this.layer7,
      this.layer6,
    ];
    //************************************************************************************************

    level1.addEventListener("click", () => {
      this.backgroundLayers = this.backgroundLayers1;
    });
    level2.addEventListener("click", () => {
      this.backgroundLayers = this.backgroundLayers2;
    });
  }
  update() {
    this.backgroundLayers.forEach((layer) => layer.update());
  }
  draw(ctx) {
    this.backgroundLayers.forEach((layer) => layer.draw(ctx));
  }
}

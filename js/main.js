import { Tentacle } from "./Tentacle.js";
import { getRandomColor, randomRange } from "./utils.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let animationId = null;
let tentacles = [];

const TENTACLE_COUNT = 5;

function createTentacles(count) {
  const tentaclesArray = [];

  for (let i = 0; i < count; i++) {
    const startRadius = randomRange(-100, 100);
    const speed = randomRange(-0.02, 0.02);
    const dividedRadius = randomRange(1.05, 1.2);
    const multiplierSpeed = randomRange(0.5, 1.5);
    const width = randomRange(25, 50);
    const dividedWidth = randomRange(1.1, 1.3);
    const segmentCount = Math.floor(randomRange(25, 50));
    const startColor = getRandomColor();
    const targetColor = getRandomColor();
    const colorChangeDuration = randomRange(3000, 8000);
    const overlap = randomRange(1.05, 1.1);

    const tentacle = new Tentacle(
      canvas.width / 2,
      canvas.height / 2,
      startRadius,
      width,
      dividedWidth,
      speed,
      startColor,
      context,
      segmentCount,
      dividedRadius,
      multiplierSpeed,
      overlap,
      targetColor,
      colorChangeDuration,
    );

    tentaclesArray.push(tentacle);
  }

  return tentaclesArray;
}

function init() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  tentacles = createTentacles(TENTACLE_COUNT);

  animate();
}

function animate() {
  draw();
  animationId = requestAnimationFrame(animate);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  tentacles.forEach((tentacle) => {
    tentacle.centerX = canvas.width / 2;
    tentacle.centerY = canvas.height / 2;
    tentacle.draw();
  });
}

window.addEventListener("load", init);
window.addEventListener("resize", init);

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
    const maxRadius = 40;
    const minRadius = 20;
    let startRadius = randomRange(-maxRadius, maxRadius);
    if (Math.abs(startRadius) < minRadius) {
      startRadius = startRadius >= 0 ? minRadius : -minRadius;
    }

    const maxSpeed = 0.02;
    const minSpeed = 0.01;
    let speed = randomRange(-maxSpeed, maxSpeed);
    if (Math.abs(speed) < minSpeed) {
      speed = speed >= 0 ? minSpeed : -minSpeed;
    }

    const dividedRadius = randomRange(1.05, 1.1);
    const multiplierSpeed = randomRange(0.5, 1.5);
    const width = randomRange(25, 50);
    const dividedWidth = randomRange(1.05, 1.09);
    const segmentCount = Math.floor(randomRange(40, 80));
    const overlap = randomRange(1.05, 1.1);
    const startColor = getRandomColor();
    const targetColor = getRandomColor();
    const colorChangeDuration = randomRange(3000, 8000);

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

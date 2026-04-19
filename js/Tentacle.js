import { VectorDraw } from "./VectorDraw.js";
import { getRandomColor, interpolateColor } from "./utils.js";

export class Tentacle {
  constructor(
    centerX,
    centerY,
    beginRadius,
    beginWidth,
    dividedWidth,
    beginSpeed,
    color,
    context,
    count,
    dividedRadius,
    multiplierSpeed,
    overlap = 0.85,
    targetColor = null,
    colorChangeDuration = 5000,
  ) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.segments = [];
    this.context = context;
    this.color = color;
    this.targetColor = targetColor || color;
    this.colorChangeDuration = colorChangeDuration;
    this.colorChangeStartTime = performance.now();
    this.originalColor = color;
    this.overlap = overlap;

    let radius = Math.abs(beginRadius);
    let currentWidth = beginWidth;
    const isNegative = beginRadius < 0;

    for (let i = 0; i < count; i++) {
      const segment = new VectorDraw(
        0,
        0,
        radius,
        currentWidth,
        beginSpeed * (i + multiplierSpeed),
        color,
        context,
      );
      if (isNegative) {
        segment.speed = -segment.speed;
      }
      this.segments.push(segment);
      radius /= dividedRadius;
      currentWidth /= dividedWidth;
    }
  }

  getCurrentColor() {
    if (this.targetColor === this.originalColor) {
      return this.color;
    }

    const now = performance.now();
    const elapsed = now - this.colorChangeStartTime;
    let progress = Math.min(1, elapsed / this.colorChangeDuration);

    if (progress >= 1) {
      const newTargetColor = getRandomColor();
      this.originalColor = this.targetColor;
      this.targetColor = newTargetColor;
      this.colorChangeStartTime = now;
      progress = 0;
    }

    return interpolateColor(this.originalColor, this.targetColor, progress);
  }

  draw() {
    let currentX = this.centerX;
    let currentY = this.centerY;
    const currentColor = this.getCurrentColor();

    this.segments.forEach((segment, index) => {
      segment.centerX = currentX;
      segment.centerY = currentY;
      segment.color = currentColor;
      segment.draw();

      const endPoint = segment.getEndPoint();
      if (index < this.segments.length - 1) {
        const dx = endPoint.x - currentX;
        const dy = endPoint.y - currentY;

        currentX = currentX + dx * this.overlap;
        currentY = currentY + dy * this.overlap;
      }
    });
  }

  updatePosition(centerX, centerY) {
    this.centerX = centerX;
    this.centerY = centerY;
  }
}

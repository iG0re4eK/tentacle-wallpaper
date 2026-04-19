export class VectorDraw {
  constructor(centerX, centerY, radius, width, speed, color, context) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.context = context;
    this.speed = speed;
    this.angle = 0;
  }

  getEndPoint() {
    const x = this.centerX + Math.cos(this.angle) * this.radius;
    const y = this.centerY + Math.sin(this.angle) * this.radius;
    return { x, y };
  }

  draw() {
    const endPoint = this.getEndPoint();

    this.context.beginPath();
    this.context.moveTo(this.centerX, this.centerY);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.width;
    this.context.stroke();

    this.animate();
  }

  animate() {
    this.angle += this.speed;
  }
}

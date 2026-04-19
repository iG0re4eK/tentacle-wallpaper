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
    this.context.lineCap = "round";
    this.context.stroke();

    const circleRadius = this.width / 2;
    this.drawCircle(this.centerX, this.centerY, circleRadius);
    this.drawCircle(endPoint.x, endPoint.y, circleRadius);

    this.animate();
  }

  drawCircle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill();

    this.context.beginPath();
    this.context.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.globalAlpha = 0.5;
    this.context.fill();
    this.context.globalAlpha = 1;
  }

  animate() {
    this.angle += this.speed;
  }
}

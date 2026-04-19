export const COLOR_PALETTE = [
  "#37ff00",
  "#04ff00",
  "#77ff00",
  "#00ff99",
  "#00f7ff",
  "#00d5ff",
  "#00aaff",
  "#0084ff",
  "#006aff",
];

export function getRandomColor() {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function interpolateColor(color1, color2, factor) {
  const tempCanvas = document.createElement("canvas");
  const tempContext = tempCanvas.getContext("2d");

  tempContext.fillStyle = color1;
  tempContext.fillRect(0, 0, 1, 1);
  const rgb1 = tempContext.getImageData(0, 0, 1, 1).data;

  tempContext.fillStyle = color2;
  tempContext.fillRect(0, 0, 1, 1);
  const rgb2 = tempContext.getImageData(0, 0, 1, 1).data;

  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

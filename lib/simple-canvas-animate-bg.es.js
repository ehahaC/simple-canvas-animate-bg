var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
class Point {
  constructor(ctx) {
    __publicField(this, "ctx");
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "r", 4);
    __publicField(this, "step", 1);
    __publicField(this, "xSpeed", getRandom(-50, 50));
    __publicField(this, "ySpeed", getRandom(-50, 50));
    __publicField(this, "lastDrawTime", null);
    this.x = getRandom(0, ctx.canvas.width);
    this.y = getRandom(0, ctx.canvas.height);
    this.ctx = ctx;
  }
  draw() {
    if (this.lastDrawTime) {
      let duration = (Date.now() - this.lastDrawTime) / 1e3;
      if (duration > 0.015) {
        duration = 0.015;
      }
      let xDis = this.xSpeed * duration;
      let yDis = this.ySpeed * duration;
      let x = this.x + xDis;
      let y = this.y + yDis;
      if (x >= this.ctx.canvas.width - this.r / 2) {
        x = this.ctx.canvas.width - this.r / 2;
        this.xSpeed = -this.xSpeed;
      } else if (x < 0) {
        x = 0;
        this.xSpeed = -this.xSpeed;
      }
      if (y >= this.ctx.canvas.height - this.r / 2) {
        y = this.ctx.canvas.height - this.r / 2;
        this.ySpeed = -this.ySpeed;
      } else if (y < 0) {
        y = 0;
        this.ySpeed = -this.ySpeed;
      }
      this.x = x;
      this.y = y;
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(200, 200, 200, 1)`;
    this.ctx.fill();
    this.ctx.closePath();
    this.lastDrawTime = Date.now();
  }
}
class Graph {
  constructor(dom, {
    count = 100,
    width = window.innerWidth,
    height = window.innerHeight,
    canvasBg = "black"
  }) {
    __publicField(this, "ctx");
    __publicField(this, "points");
    __publicField(this, "maxDis", 200);
    __publicField(this, "canvasBg");
    this.ctx = dom.getContext("2d");
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
    this.canvasBg = canvasBg;
    this.points = new Array(count).fill(0).map((_) => new Point(this.ctx));
  }
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.canvasBg;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].draw();
      for (let j = i + 1; j < this.points.length; j++) {
        let distance = this.getDistance(
          this.points[i].x,
          this.points[i].y,
          this.points[j].x,
          this.points[j].y
        );
        if (distance > this.maxDis) {
          continue;
        }
        let alpha = 1 - distance / this.maxDis;
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[i].x, this.points[i].y);
        this.ctx.lineTo(this.points[j].x, this.points[j].y);
        this.ctx.strokeStyle = `rgba(200, 200, 200, ${alpha})`;
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
    requestAnimationFrame(() => {
      this.draw();
    });
  }
  getDistance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
export { Graph, Point, getRandom };

interface IGraphOption {
	count?: number;
	width?: number;
	height?: number;
	canvasBg?: string;
}

/**
 * 获取指定范围内随机数值
 * @param min 数字范围的起始值
 * @param max 数字范围的结束值
 * @returns
 */
export function getRandom(min: number, max: number) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}

export class Point {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	r = 4;
	step = 1;
	xSpeed = getRandom(-50, 50);
	ySpeed = getRandom(-50, 50);
	lastDrawTime: number | null = null;

	constructor(ctx: CanvasRenderingContext2D) {
		this.x = getRandom(0, ctx.canvas.width);
		this.y = getRandom(0, ctx.canvas.height);
		this.ctx = ctx;
	}

	draw() {
		if (this.lastDrawTime) {
			let duration = (Date.now() - this.lastDrawTime) / 1000;
            // 限制最大间隔时间，防止步进过大
            if ( duration > 0.015 ){
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

			// if (x >= this.ctx.canvas.width - this.r / 2 || x <= 0) {
			// 	this.xSpeed = -this.xSpeed;
			// }
			// if (y >= this.ctx.canvas.height - this.r / 2 || y <= 0) {
			// 	this.ySpeed = -this.ySpeed;
			// }

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

export class Graph {
	public ctx: CanvasRenderingContext2D;
	public points: Point[];
	public maxDis = 200;
	public canvasBg: string;

	constructor(
		dom: HTMLCanvasElement,
		{
			count = 100,
			width = window.innerWidth,
			height = window.innerHeight,
			canvasBg = "black",
		}: IGraphOption
	) {
		this.ctx = dom.getContext("2d")!;
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
				// 两个点之间的直线距离
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

	/**
	 * 获取两个坐标之间的直线距离
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @returns
	 */
	getDistance(x1: number, y1: number, x2: number, y2: number) {
		let dx = x2 - x1;
		let dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}
}

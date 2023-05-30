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
export declare function getRandom(min: number, max: number): number;
export declare class Point {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    r: number;
    step: number;
    xSpeed: number;
    ySpeed: number;
    lastDrawTime: number | null;
    constructor(ctx: CanvasRenderingContext2D);
    draw(): void;
}
export declare class Graph {
    ctx: CanvasRenderingContext2D;
    points: Point[];
    maxDis: number;
    canvasBg: string;
    constructor(dom: HTMLCanvasElement, { count, width, height, canvasBg, }: IGraphOption);
    draw(): void;
    /**
     * 获取两个坐标之间的直线距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns
     */
    getDistance(x1: number, y1: number, x2: number, y2: number): number;
}
export {};

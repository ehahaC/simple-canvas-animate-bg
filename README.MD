# 使用方法：

```typescript
const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
new Graph(canvas, {
	count: 200,
	width: window.innerWidth,
	height: window.innerHeight,
	canvasBg: "#000000",
}).draw();
```
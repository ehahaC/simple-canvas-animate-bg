import "./style.css";
import { Graph } from "./utils/graph";

// const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
// new Graph(canvas, { count: 200 }).draw();

const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
new Graph(canvas, {
	count: 200,
	width: window.innerWidth,
	height: window.innerHeight,
	canvasBg: "#000000",
}).draw();

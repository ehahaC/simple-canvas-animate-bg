(function(s,i){typeof exports=="object"&&typeof module!="undefined"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(s=typeof globalThis!="undefined"?globalThis:s||self,i(s.graph={}))})(this,function(s){"use strict";var d=Object.defineProperty;var p=(s,i,c)=>i in s?d(s,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):s[i]=c;var e=(s,i,c)=>(p(s,typeof i!="symbol"?i+"":i,c),c);function i(l,t){return Math.floor(Math.random()*(t+1-l)+l)}class c{constructor(t){e(this,"ctx");e(this,"x");e(this,"y");e(this,"r",4);e(this,"step",1);e(this,"xSpeed",i(-50,50));e(this,"ySpeed",i(-50,50));e(this,"lastDrawTime",null);this.x=i(0,t.canvas.width),this.y=i(0,t.canvas.height),this.ctx=t}draw(){if(this.lastDrawTime){let t=(Date.now()-this.lastDrawTime)/1e3;t>.015&&(t=.015);let h=this.xSpeed*t,o=this.ySpeed*t,a=this.x+h,n=this.y+o;a>=this.ctx.canvas.width-this.r/2?(a=this.ctx.canvas.width-this.r/2,this.xSpeed=-this.xSpeed):a<0&&(a=0,this.xSpeed=-this.xSpeed),n>=this.ctx.canvas.height-this.r/2?(n=this.ctx.canvas.height-this.r/2,this.ySpeed=-this.ySpeed):n<0&&(n=0,this.ySpeed=-this.ySpeed),this.x=a,this.y=n}this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2),this.ctx.fillStyle="rgba(200, 200, 200, 1)",this.ctx.fill(),this.ctx.closePath(),this.lastDrawTime=Date.now()}}class r{constructor(t,{count:h=100,width:o=window.innerWidth,height:a=window.innerHeight,canvasBg:n="black"}){e(this,"ctx");e(this,"points");e(this,"maxDis",200);e(this,"canvasBg");this.ctx=t.getContext("2d"),this.ctx.canvas.width=o,this.ctx.canvas.height=a,this.canvasBg=n,this.points=new Array(h).fill(0).map(x=>new c(this.ctx))}draw(){this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height),this.ctx.fillStyle=this.canvasBg,this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);for(let t=0;t<this.points.length;t++){this.points[t].draw();for(let h=t+1;h<this.points.length;h++){let o=this.getDistance(this.points[t].x,this.points[t].y,this.points[h].x,this.points[h].y);if(o>this.maxDis)continue;let a=1-o/this.maxDis;this.ctx.beginPath(),this.ctx.moveTo(this.points[t].x,this.points[t].y),this.ctx.lineTo(this.points[h].x,this.points[h].y),this.ctx.strokeStyle=`rgba(200, 200, 200, ${a})`,this.ctx.stroke(),this.ctx.closePath()}}requestAnimationFrame(()=>{this.draw()})}getDistance(t,h,o,a){let n=o-t,x=a-h;return Math.sqrt(n*n+x*x)}}s.Graph=r,s.Point=c,s.getRandom=i,Object.defineProperties(s,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
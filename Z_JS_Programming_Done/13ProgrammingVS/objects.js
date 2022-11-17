console.log("js file has been called");
// ----------------- set up code includes resolution management
var myScale = 0;

function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  myScale=dpr;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  console.log(rect.width);
  console.log(rect.height);
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}
// basic drawing on the canvas with no functions


 // Now this line will be the same size on the page
  // but will look sharper on high-DPI devices!
var ctx = setupCanvas(document.querySelector('.myCanvas'));
canvas = document.querySelector('.myCanvas');
const width = canvas.width/myScale;
const height = canvas.height/myScale;
// rgb(0,0,0) rgb(153,153,153) rgb(255,255,255)
// rgb(204,0,0) rgb(255,204,51) rgb(51,51,255)
// rgb(255,102,102) rgb(255,255,153) rgb(0,153,204)

// object requires class name, constructor, encapsulated functions
class Circle{
	constructor(x,y,r,f_col, s_col,f,s, l){
		this.x = x;
		this.y = y;
        this.r = r;
        this.f_col = f_col;
        this.s_col = s_col;
		this.s = s;
        this.f = f;
        this.l=l
    }
    // encapsulated functions (owned only by circle)
    update(){
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;
        ctx.beginPath()
        ctx.arc(this.x,this.y, this.r, 0, 2*Math.PI);
    if(this.f){
        ctx.fill();
    }
    if(this.s){
        ctx.lineWidth=this.l;
        ctx.stroke();
    }

        }


}

var firstCircle = new Circle(100,300,50,"rgb(255,204,51)","rgb(0,153,204)", true, false, 10);
firstCircle.update();
firstCircle.x=300;
firstCircle.s=true;
firstCircle.update();
firstCircle.f_col="rgb(255,102,102)"
firstCircle.x=500;
firstCircle.update();

// Triangle x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
class Triangle{
    constructor(x,y,w,h,f_col,s_col, f,s,l){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.f_col=f_col;
        this.s_col = s_col;
        this.f=f;
        this.s=s;
        this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;
        ctx.lineWidth = this.l;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x,this.y+this.h);
        ctx.lineTo(this.x+this.w, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        
    }
}

var myTriangle = new Triangle(600,height/2-100,200,200, "rgb(255,204,51)","rgb(0,153,204)", true, true, 10);
myTriangle.update();





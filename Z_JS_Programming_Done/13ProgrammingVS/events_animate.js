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

var xMouse = 0;
var yMouse = 0;
var mouseDown = false;

// mouse event listeners
canvas.addEventListener("mousedown",myMouseDown);
function myMouseDown(e){
    mouseDown = true;
    console.log("mouse down has happened");
}

canvas.addEventListener("mouseup", myMouseUp);
function myMouseUp(e){
    mouseDown = false;
    console.log("mouse up has happened");
}

canvas.addEventListener("mousemove", myMouseMove);
function myMouseMove(e){
    xMouse = e.offsetX;
    yMouse = e.offsetY;
}

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
myCircle=new Circle(xMouse, yMouse, 20,"rgb(255,204,51)", "rgb(51,51,255)", true, true, 3 );
myCircle.update();
var count = 0;
function animate(){
    count += 1;
    console.log(count);
    if(mouseDown){
    myCircle.x=xMouse;
    myCircle.y=yMouse;}
    ctx.clearRect(0, 0, width, height);
    myCircle.update();
    window.requestAnimationFrame(animate);
}
animate();





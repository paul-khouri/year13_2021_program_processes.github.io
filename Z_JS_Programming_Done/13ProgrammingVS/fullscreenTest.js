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

function myCircle(x,y,r){
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
}

class Grid{
    constructor(x,y,w,h,x_num, y_num, s_col, l){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.x_num =x_num;
        this.y_num = y_num;
        this.s_col=s_col;
        this.l=l;
        }
        update(){
            this.draw();
    
        }
        draw(){
            ctx.strokeStyle=this.s_col;
            ctx.lineWidth=this.l;
            for(var i=0; i<=this.x_num ; i++){
                ctx.beginPath();
                var xPos=this.x+i*this.w/this.x_num;
                ctx.moveTo(xPos, this.y);
                ctx.lineTo(xPos, this.y+this.h);
                ctx.stroke();
            } 
            for(var j=0; j<=this.y_num ; j++){
                ctx.beginPath();
                var yPos=this.y+j*this.h/this.y_num;
                ctx.moveTo(this.x, yPos);
                ctx.lineTo(this.x+this.w,yPos);
                ctx.stroke();
            }
            this.myCircle(0,0,15);
            this.myCircle(width,0,15);
            this.myCircle(0,height,15);
            this.myCircle(width,height,15);

        }
    }
Grid.prototype.myCircle = myCircle;
myGrid = new Grid(0,0,width,height, 20,20,"rgba(255,255,255,1)", 0.5);
myGrid.update();
function print(m){
    document.getElementById("output").innerHTML += m;
    
}
function newLine(){
    document.getElementById("output").innerHTML += "<br>";
}
canvas.addEventListener("touchstart", handleStart, true);
function handleStart(e){
    print("From Touch");
    print(e.pageX);
    newLine();
    print(e.pageY);
    newLine();
}
canvas.addEventListener("mousedown", handleDown);
function handleDown(e){
 print("From Mouse");
 newLine();
  print(e.offsetX);
  newLine();
  print(e.offsetY);
  newLine();
}
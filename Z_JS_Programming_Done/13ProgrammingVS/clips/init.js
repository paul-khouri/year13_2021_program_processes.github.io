console.log("init js file has been called");
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
var ctx = setupCanvas(document.querySelector('#myCanvas'));
canvas = document.querySelector('#myCanvas');
const width = canvas.width/myScale;
const height = canvas.height/myScale;

//-----------------------------
var colArray=[
    [
    "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
    "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
    "rgba(0,153,204,1)","rgba(255,255,153,1)","rgba(255,255,102,1)"
    ],
    [
        "rgba(255,255,255,0.5)", "rgba(153,153,153,0.5)", "rgba(0,0,0,0.5)", 
        "rgba(204,0,0,0.5)","rgba(255,204,51,0.5)","rgba(51,51,255,0.5)",
        "rgba(0,153,204,0.5)","rgba(255,255,153,0.5)","rgba(255,255,102,0.5)"
        ],
    [
        "rgba(255,255,255,0)", "rgba(153,153,153,0)", "rgba(0,0,0,0)", 
        "rgba(204,0,0,0)","rgba(255,204,51,0)","rgba(51,51,255,0)",
        "rgba(0,153,204,0)","rgba(255,255,153,0)","rgba(255,255,102,0)"
        ]
    ]
//-----------------------------
//drawCircle x, y, radius, fill(boolean), stroke(boolean)
function drawCircle(x,y,r,f,s){
  ctx.beginPath()
  ctx.arc(x,y, r, 0, 2*Math.PI);
  if(f){
      ctx.fill();
  }
  if(s){
      ctx.stroke();
  }
  }
  //drawRectangle x, y, width, height fill(boolean), stroke(boolean)
  function drawRectangle(x,y, w,h,f,s){
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  if(f){
      ctx.fill();
  }
  if(s){
      ctx.stroke();
  }
  }
  // takes x y start and x y end
  function drawLine(x_1,y_1,x_2,y_2){
      ctx.beginPath();
      ctx.moveTo(x_1, y_1);
      ctx.lineTo(x_2 , y_2);
      ctx.stroke();
  }
  // message x, y
  function writeText(m,x,y){
      var myFont= "20px monospace";
      ctx.font=myFont;
      ctx.fillText(m, x,y);
  }
  //----------------
  class myShape{
    // class myShape name, x,y, width, c_1, c_2, c_3
        constructor(name, x,y, width, c_1, c_2, c_3){
            this.name= name;
            this.x= x;
            this.y = y;
            this.width = width;
            this.c_1=c_1;
            this.c_2=c_2;
            this.c_3=c_3;
        }
        update(){
            this.draw();
    
        }
        draw(){
            ctx.save();
            ctx.fillStyle = this.c_1;
            this.drawRectangle(this.x, this.y, this.width,this.width, true, false);
            ctx.clip();
            ctx.fillStyle = this.c_2;
            this.drawCircle(this.x, this.y, this.width/3, true, false);
            this.drawCircle(this.x+this.width, this.y+this.width/3, this.width/9, true, false);
            ctx.restore();
            ctx.fillStyle = this.c_3;
            this.drawCircle(this.x+this.width, this.y+3*this.width/4, this.width/9, true, false);
    
    
        }
    
    
    }
    myShape.prototype.drawCircle = drawCircle;
    myShape.prototype.drawRectangle = drawRectangle;
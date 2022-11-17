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


//drawLine takes x y start and x y end, line width
function drawLine(x_1,y_1,x_2,y_2,w){
    ctx.beginPath();
    ctx.lineWidth=w;
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    ctx.stroke();
}
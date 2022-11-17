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
var ctx = setupCanvas(document.querySelector('#myCanvas'));
canvas = document.querySelector('#myCanvas');
const width = canvas.width/myScale;
const height = canvas.height/myScale;

var colArray=[
"rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)", 
"rgb(204,0,0)","rgb(255,204,51)","rgb(51,51,255)",
"rgb(0,153,204)","rgb(255,255,153)","rgb(255,255,102)"
]
function setFillStroke(f,s){
    ctx.fillStyle=f;
    ctx.strokeStyle=s;
}
function setLineWidth(n){
    ctx.lineWidth=n;
}
// x, y, radius, fill(boolean), stroke(boolean)
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
// x, y, witdh, height fill(boolean), stroke(boolean)
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
//---------------
setFillStroke(colArray[2], colArray[8])
setLineWidth(10);
drawCircle(width/2,60,60, true, true);
//----------------
setFillStroke(colArray[6], colArray[7])
setLineWidth(5);
drawRectangle(400,130,200,200, true, true);
//----------------
setLineWidth(1);
setFillStroke(colArray[3],colArray[3]);
drawLine(400,130, 600,330);
setFillStroke(colArray[3],colArray[4]);
drawLine(600,130, 400,330);
//--------------------
setFillStroke(colArray[4], colArray[3]);
setLineWidth(7);
var i=0;
drawCircle(200+i*100, 400,20*(i+1), true, true);
i=1;
drawCircle(200+i*100, 400,20*(i+1), true, true);
i=2;
drawCircle(200+i*100, 400,20*(i+1), true, true);
//write text
setFillStroke(colArray[0], colArray[0]);
writeText("Text is here", 100,50);
//----------------
ctx.save();
setLineWidth(2);
setFillStroke(colArray[4],colArray[4]);
ctx.translate(100, 100);
drawCircle(0,0,10,false,true);
drawRectangle(0,0,100,100, true, false);
var degree= 45;
ctx.rotate(Math.PI / 180 * degree);
setFillStroke(colArray[5],colArray[5]);
drawRectangle(0,0,100,100, true, false);
ctx.restore();
writeText("Rotation by 45 degrees", 50,250);


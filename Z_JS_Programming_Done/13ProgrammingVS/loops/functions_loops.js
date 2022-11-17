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

var colArray=[
"rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)", 
"rgb(204,0,0)","rgb(255,204,51)","rgb(51,51,255)",
"rgb(0,153,204)","rgb(255,255,153)","rgb(255,102,102)"
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
setFillStroke(colArray[0],colArray[0]);
for(var j=0; j<5; j++){
drawCircle(50+100*j, 100, 40, false, true);
}
setFillStroke(colArray[4],colArray[4]);
setLineWidth(10);
for(var k=0; k<8; k++){
    drawLine(10, 200+30*k, 300, 200+30*k);
}
setFillStroke(colArray[8],colArray[5]);
for(var i=0; i<60; i++){
    drawRectangle(10+12*i, 580-2*i, 10,10, true, false);
}
for(var i=0; i<10; i++){
    for(var k=0; k<10; k++){
    drawRectangle(600+20*i, 20+20*k, 10,10, true, false);
    }
}




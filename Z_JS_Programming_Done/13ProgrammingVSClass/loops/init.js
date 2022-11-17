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
console.log(width);
console.log(height);

var colArray=[
  [
  "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
  "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
  "rgba(0,153,204,1)","rgba(255,255,153,1)","rgba(255,255,102,1)"
  ],
  [
      "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 
      "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",
      "rgba(0,153,204,0.67)","rgba(255,255,153,0.67)","rgba(255,255,102,0.67)"
      ],
  [
      "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 
      "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",
      "rgba(0,153,204,0.33)","rgba(255,255,153,0.33)","rgba(255,255,102,0.33)"
      ]
  ]
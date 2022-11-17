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
var ctx = setupCanvas(document.querySelector('.myCanvas'));
canvas = document.querySelector('.myCanvas');
const width = canvas.width/myScale;
const height = canvas.height/myScale;


// images
var imgCircle= new Image();
imgCircle.src="images/circle_button.png";
var imgSquare= new Image();
imgSquare.src="images/square_button.png";
var imgTriangle= new Image();
imgTriangle.src="images/triangle_button.png";


// white ,grey, black
//deep green blue, green, pale green
//red, yellow, blue black
var colArray = ["rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)",
"rgb(11,73,88)", "rgb(77,138,124)", "rgb(196,219,148)", 
"rgb(255,78,100)", "rgb(255,255,153)" , "rgb(27,63,72)"];
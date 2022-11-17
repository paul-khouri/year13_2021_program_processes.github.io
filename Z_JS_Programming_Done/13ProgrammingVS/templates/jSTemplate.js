// ----------------- set up code includes resolution management

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
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
  
  // Now this line will be the same size on the page
  // but will look sharper on high-DPI devices!
  var c = setupCanvas(document.querySelector('.myCanvas'));
  canvas = document.querySelector('.myCanvas');
  var width = canvas.width/2;
  var height= canvas.height/2;
//-----------------------object array ------------------------------------------------------------
objectSet=[]
// --------------------- listeners ----------------------------------------------------------------

var xMouseNow = 0;
var yMouseNow = 0;
var myMouseDown = false;

// mouse event listeners
canvas.addEventListener("mousedown", myMDown);
canvas.addEventListener("mouseup", myMUp);
canvas.addEventListener("mousemove", myMMove);

function myMDown(e){
    console.log("mouse down has happened"); 
    myMouseDown = true;
}
function myMUp(e){
    console.log("mouse up has happened"); 
    myMouseDown = false;
}
function myMMove(e){
    xMouseNow= e.offsetX;
    yMouseNow = e.offsetY;
}

// --------------------- general functions ----------------------------------------------------
// creates an rgba string from numerical input 4 integers
function makergb(r,g,b,a){
    var rgbString = "rgba("+r+","+g+","+b+","+a+")";
    return rgbString
}
function my_Line(x_1, y_1, x_2, y_2){
    c.lineWidth=0.5;
    c.beginPath();
    c.moveTo(x_1, y_1);
    c.lineTo(x_2,y_2);
    c.stroke();
    }
// x, y, radius, fill(boolean), stroke(boolean)
function drawCircle(x,y,r,f,s){
    c.beginPath()
    c.arc(x,y, r, 0, 2*Math.PI);
    if(f){
        c.fill();
    }
    if(s){
        c.stroke();
    }
    }
//-------------------------objects -------------------------------------------------------------









//
var count = 0;
function animate(){
    count+=1;
    //console.log(count)
    window.requestAnimationFrame(animate)
}
animate();
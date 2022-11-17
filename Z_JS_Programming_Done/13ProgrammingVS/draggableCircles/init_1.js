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

// ------------------ listeners

var xMouse = 0;
var yMouse = 0;
var xMouseStart = 0;
var yMouseStart = 0;
var myMouseDown = false;
var myMouseDownTaken = false;

// mouse event listeners
canvas.addEventListener("mousedown", myMDown);
canvas.addEventListener("mouseup", myMUp);
canvas.addEventListener("mousemove", myMMove);

function myMDown(e){
    console.log("mouse down has happened");
    xMouseStart = e.offsetX;
    yMouseStart = e.offsetY; 
    myMouseDown = true;
}
function myMUp(e){
    console.log("mouse up has happened"); 
    myMouseDown = false;
}
function myMMove(e){
    xMouse= e.offsetX;
    yMouse = e.offsetY;
}




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
function drawLine(x_1,y_1,x_2,y_2,w,sc){
    ctx.beginPath();
    ctx.strokeStyle = sc;
    ctx.lineWidth=w;
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    ctx.stroke();
}

function distanceCheck(x_1, y_1, x_2, y_2){
var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
return d
}

//- objects
class Circle{
//class Circle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke, strokewidth
    constructor(name, x,y, r, f, s, fc, sc, sw){
        this.name = name;
        this.x= x;
        this.y=y;
        this.r=r;
        this.f=f;
        this.s=s;
        this.fc = fc;
        this.sc=sc;
        this.sw= sw;
        this.drag = false;
    }

    getX(){
        return this.x
    }
    getY(){
        return this.y;
    }

    update(){
 
        this.draw();
    }

    draw(){
        var dist = this.distanceCheck(this.x, this.y, xMouse, yMouse);

        this.drawLine(this.x, this.y, xMouse, yMouse, 0.5, this.sc);

        if(dist<this.r){
            ctx.strokeStyle="rgb(0,0,255)";
        if(myMouseDown && !myMouseDownTaken){
                this.drag = true; 
                myMouseDownTaken = true;
            }
        }else{
        ctx.strokeStyle=this.sc;
        }

        if(this.drag){
            ctx.strokeStyle="rgb(0,255,255)";
            this.x=xMouse;
            this.y=yMouse;
        }

        if(!myMouseDown){
            this.drag = false;
            myMouseDownTaken = false;
        }


        ctx.fillStyle=this.fc;
        ctx.lineWidth=this.sw;
        this.drawCircle(this.x,this.y,this.r, this.f, this.s);

    }
}
Circle.prototype.drawCircle = drawCircle;
Circle.prototype.distanceCheck = distanceCheck;
Circle.prototype.drawLine = drawLine;

class MoveLine{
//MoveLine takes two draggable circles
    constructor(c_1, c_2){
        this.c_1 = c_1;
        this.c_2 = c_2;
    }

    update(){
        this.draw();

    }
    draw(){
        this.c_1.update();
        this.c_2.update();
        this.drawLine(this.c_1.getX(), this.c_1.getY(), this.c_2.getX(), this.c_2.getY(), 3, "rgb(255,255,255)");

    }
}
MoveLine.prototype.drawLine = drawLine;
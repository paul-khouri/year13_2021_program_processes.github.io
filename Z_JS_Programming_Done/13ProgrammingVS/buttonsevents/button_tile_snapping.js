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
// images
var imgCircle= new Image();
imgCircle.src="images/circle_button.png";
var imgSquare= new Image();
imgSquare.src="images/square_button.png";
var imgTriangle= new Image();
imgTriangle.src="images/triangle_button.png";




// ------------------ functions 
// check in rectangular bounds xMouseNow, yMouseNow, x,y, width, height
function inBounds(xMouse, yMouse, x,y,width, height){
    if(xMouse > x &&
        xMouse < x+width &&
        yMouse > y &&
        yMouse < y+height){
            return true;
        }else{
            return false;
        }
    }
// takes number and rounding level start value n>=s
function roundTo(n, r, s){
    return (Math.floor((n-s)/r)*r)+s
}
//------------ object management
buttonArray = [];
objectSet = [];
var selectedButton;
//------------------------------
class Button{
    // string name, int x, int y, int w,int h, stringrgba bC, stringrgba hC, stringrgba sC,boolean s  
   constructor(name,x,y,w,h,bC, hC, sC, pic_name){
       this.name = name; this.x=x; this.y=y; this.width = w; this.height = h;
       this.baseColor = bC; this.hoverColor = hC ; this.selectedColor= sC ;
       this.selected = false; this.pic = pic_name;  
   }
   update(){
       if(this.inBounds(xMouse, yMouse, this.x, this.y, this.width, this.height)){
           ctx.fillStyle= this.hoverColor;
           if(mouseDown){
               if(selectedButton && selectedButton != this){
                   selectedButton.selected =false;
               }
               selectedButton = this;
               this.selected = true;
           }
       }else{
           ctx.fillStyle = this.baseColor;
       }
       if(this.selected){
           ctx.fillStyle = this.selectedColor;
       }
       this.draw();
   }
   draw(){
    ctx.strokeStyle = "rgb(255,255,153)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill();
    ctx.stroke();
    ctx.fillText(this.name, this.x+this.width/2,this.y+2*this.height/4);
    ctx.drawImage(this.pic, this.x, this.y, 100, 100);
   }
   }
   Button.prototype.inBounds=inBounds;
//------------------------------
// object requires class name, constructor, encapsulated functions
// Circle x, y,radius, fillcolour stroke colour, fill(b), stroke(b), l
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
        ctx.arc(this.x,this.y, this.r, 0, 2*Math.PI,false);
        ctx.arc(this.x,this.y,this.r/2,0,Math.PI*2, true);
    if(this.f){
        ctx.fill();
    }
    if(this.s){
        ctx.lineWidth=this.l;
        ctx.stroke();
    }

        }
}
// Rectangle x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
class Rectangle{
    constructor(x,y,w,h,f_col,s_col, f,s,l){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.f_col=f_col;
        this.s_col = s_col;
        this.f=f;
        this.s=s;
        this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;
        ctx.lineWidth = this.l;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h)
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = this.s_col;
        ctx.strokeStyle = this.f_col;
        ctx.beginPath();
        ctx.arc(this.x+this.w/2, this.y+this.h/2, this.h/4, 0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.strokeStyle = this.s_col;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x+this.w, this.y);
        ctx.lineTo(this.x, this.y+this.h);
        ctx.stroke();
        //ctx.stroke();
        
    }
}
// Triangle x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
class Triangle{
    constructor(x,y,w,h,f_col,s_col, f,s,l){
        this.x=x+l;
        this.y=y+l;
        this.w=w-2*l;
        this.h=h-2*l;
        this.f_col=f_col;
        this.s_col = s_col;
        this.f=f;
        this.s=s;
        this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;
        ctx.lineWidth = this.l;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x,this.y+this.h);
        ctx.lineTo(this.x+this.w, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        
    }
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
    }
}

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
    //console.log("mouse up has happened");
}

canvas.addEventListener("mousemove", myMouseMove);
function myMouseMove(e){
    xMouse = e.offsetX;
    yMouse = e.offsetY;
}

var boundryX =25;
var boundryY =25;
var boundryWidth = 400;
var boundryHeight = 400;
// white ,grey, black
//deep green blue, green, pale green
//red, yellow, blue black
var mycol = ["rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)",
"rgb(11,73,88)", "rgb(77,138,124)", "rgb(196,219,148)", 
"rgb(255,78,100)", "rgb(255,255,153)" , "rgb(27,63,72)"];
myGrid = new Grid(boundryX,boundryY,boundryWidth, boundryHeight, 5, 5,"rgb(255,255,255)", 0.5);
// string name, int x, int y, int w,int h, stringrgba bC, stringrgba hC, stringrgba sC,boolean s 
squareButton = new Button("Square",25,450, 100,100,"rgb(51,51,255)", "rgb(255,255,153)", "rgb(0,153,204)", imgSquare );
circleButton = new Button("Circle",125,450, 100,100,"rgb(51,51,255)", "rgb(255,255,153)", "rgb(0,153,204)", imgCircle );
triangleButton = new Button("Triangle",225,450, 100,100,"rgb(51,51,255)", "rgb(255,255,153)", "rgb(0,153,204)", imgTriangle );

var count = 0;
function animate(){
    count += 1;
    ctx.clearRect(0, 0, width, height);
    myGrid.update();
    squareButton.update();
    circleButton.update();
    triangleButton.update();
    for(var k=0; k<objectSet.length; k++){
        objectSet[k].update();
        
    }

    if (inBounds(xMouse, yMouse, boundryX, boundryY, boundryWidth, boundryHeight)){
        console.log("mouse in bounds");

    if(mouseDown && selectedButton){
        var xRound = roundTo(xMouse, 80,25);
        var yRound = roundTo(yMouse, 80,25);
        if(selectedButton.name == "Square"){
            console.log("I want to draw a square");
            // Rectangle x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
            objectSet.push(new Rectangle(xRound, yRound, 80,80, mycol[5] ,mycol[6], true, false, 2 ))
            mouseDown = false;
        }
        if(selectedButton.name == "Circle"){
            console.log("I want to draw a circle");
            // Circle x, y,radius, fillcolour stroke colour, fill(b), stroke(b), l
            objectSet.push(new Circle(xRound+40,yRound+40,40,"rgb(200,200,200)","rgb(204,0,0)",true,false,0.1))
            mouseDown = false;
        }
        if(selectedButton.name == "Triangle"){
            console.log("I want to draw a Triangle");
            // Triangle x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
            objectSet.push(new Triangle(xRound,yRound,80,80,mycol[6],mycol[7],true,true,5))
            mouseDown = false;
        }
    }
}
    window.requestAnimationFrame(animate);
}
animate();





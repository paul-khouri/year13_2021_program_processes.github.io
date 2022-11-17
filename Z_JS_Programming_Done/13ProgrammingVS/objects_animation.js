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

// mouse event listeners
canvas.addEventListener("mousedown", myMDown);

function myMDown(e){
    console.log("mouse down has happened"); 
}

canvas.addEventListener("mouseup", function(e){
console.log("mouse up has happened");   
    });

canvas.addEventListener("mousemove", function(e){
//console.log("mouse move has happened");
xMouseNow= e.offsetX;
yMouseNow = e.offsetY;
var posString = "mouse move: x position: "+xMouseNow+"\ny position: "+yMouseNow;
testText.updateText(0,xMouseNow);
testText.updateText(1,yMouseNow);
testText.x=xMouseNow;
testText.y=yMouseNow;
    });

canvas.addEventListener("click", function(e){
console.log("mouse has been clicked");    
    });

canvas.addEventListener("dblclick", function(e){
console.log("mouse has been double clicked");
    });
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
    // encapsulated functions(now methods) (owned only by circle)
    // update called from outside
    update(){
        this.draw();
    }
    // main drawing method
    draw(){
        c.fillStyle = this.f_col;
        c.strokeStyle = this.s_col;
        c.beginPath()
        c.arc(this.x,this.y, this.r, 0, 2*Math.PI);
    if(this.f){
        c.fill();
    }
    if(this.s){
        c.lineWidth=this.l;
        c.stroke();
    }

        }
}

class MyText{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.txt =[]
    }
    update(){
        this.draw();
    }
    addText(t){
        this.txt.push(t);
        console.log(this.txt);
    }
    updateText(i, t){
        this.txt[i]=t;
    }
    draw(){
        var lineHeight = 20;
        c.fillStyle = makergb(255,255,255,1);
        c.strokeStyle = makergb(255,255,255,1);
        drawCircle(this.x,this.y,2,true, false);
        var myFont= "20px sans-serif";
        c.font=myFont;
        for(var i=0 ; i<this.txt.length; i++){
            my_Line(this.x,this.y + i*lineHeight,this.x+100, this.y + i*lineHeight);
            c.fillText(this.txt[i], this.x,this.y + i*lineHeight);
        }
    }
}
// -------------------------------------------------------------------------------------
var firstCircle = new Circle(300,300,80,"rgb(255,204,51)","rgb(0,153,204)", true, false, 10);
//firstCircle.update();
//firstCircle.x=350;
//firstCircle.s=true;
//firstCircle.update();
var testText = new MyText(400,200);
testText.addText("");
testText.addText("");
//testText.update();
objectSet.push(firstCircle);
objectSet.push( new Circle(500,300,80,makergb(255,204,51,1),makergb(0,153,204,0.5), true, true, 10) );
objectSet.push(testText);
countText = new MyText(100,100);
countText.addText("")
objectSet.push(countText);
console.log(objectSet);


  // draw line
  c.strokeStyle='rgb(255,255,255)';
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(0, height/2);
  c.lineTo(width, height/2);
  c.stroke();
var count = 0;
  function animate(){
      count+=1;
      countText.updateText(0,count);
      c.clearRect(0, 0, width, height);
      for(var i=0; i<objectSet.length ; i++){
        objectSet[i].update();
    }
      window.requestAnimationFrame(animate)
  }
  animate();
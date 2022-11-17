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
//drawRectangle x, y, width, height fill(boolean), stroke(boolean), fill colour stroke colour, stroke width
function drawRectangle(x,y, w,h,f,s, fc , sc, lwid){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(f){
        ctx.fillStyle= fc;
        ctx.fill();
    }
    if(s){
        ctx.strokeStyle = sc;
        ctx.lineWidth = lwid;
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
class MoveCircle{
   // Move Circle  name, x,y, r, fc, dx,dy, boundryWidth, boundryHeight
constructor(name, x,y, r, fc, dx,dy, boundryWidth, boundryHeight ){
    this.name = name;
    this.x=x;
    this.y=y;
    this.r=r;
    this.fc=fc;
    this.dx=dx;
    this.dy=dy;
    this.boundryWidth = boundryWidth;
    this.boundryHeight = boundryHeight;
    this.staticX = x;
    this.staticY = y;
}

update(){
    if(this.x > this.staticX +this.boundryWidth/2  || this.x < this.staticX -this.boundryWidth/2){
        this.dx = - this.dx;
    }
    if(this.y > this.staticY +this.boundryHeight/2  || this.y < this.staticY -this.boundryHeight/2){
        this.dy = - this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

}
draw(){
    this.drawRectangle(this.staticX-this.boundryWidth/2, this.staticY - this.boundryHeight/2, this.boundryWidth, 
        this.boundryHeight, false, true,"", colArray[0][3], 1);
    //drawCircle x, y, radius, fill(boolean), stroke(boolean)
    ctx.fillStyle = this.fc;
    this.drawCircle(this.x, this.y, this.r, true, false);

}

}
MoveCircle.prototype.drawCircle = drawCircle;
MoveCircle.prototype.drawRectangle = drawRectangle;












//

class AnimateCircle{
//class AnimateCircle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke, strokewidth
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
        this.count=0;
    }

    update(){
      this.count+=1;
      this.draw();
    }

    draw(){
    this.drawRectangle(this.x-this.r, this.y-this.r, 3*this.r, 3*this.r, false, true, "", "rgb(255,0,0)", 1 );
      var R= Math.abs(Math.cos(2*Math.PI*this.count/720));
      var currentRadius= R*this.r

        ctx.strokeStyle=this.sc;
        ctx.fillStyle=this.fc;
        ctx.lineWidth=this.sw;
        this.drawCircle(this.x+this.r,this.y,currentRadius, this.f, this.s);
        this.drawCircle(this.x+this.r,this.y+this.r,currentRadius, this.f, this.s);
        this.drawCircle(this.x,this.y+this.r,currentRadius, this.f, this.s);
        this.drawCircle(this.x,this.y,currentRadius, this.f, this.s);

    }
}
AnimateCircle.prototype.drawCircle = drawCircle;
AnimateCircle.prototype.distanceCheck = distanceCheck;
AnimateCircle.prototype.drawLine = drawLine;
AnimateCircle.prototype.drawRectangle = drawRectangle;


class RotatingCircle{
  //class RotatingCircle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke, strokewidth
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
          this.count=0;
      }
  
      update(){
        this.count+=1;
        this.draw();
      }
  
      draw(){
        this.drawRectangle(this.x-3*this.r, this.y-2*this.r, 4*this.r, 4*this.r, false, true, "", "rgb(255,0,0)", 1 );

  
          ctx.strokeStyle=this.sc;
          ctx.fillStyle=this.fc;
          ctx.lineWidth=this.sw;
          
          ctx.save()
          ctx.translate(this.x-this.r, this.y);
          this.drawCircle(0,0,2*this.r, this.f, this.s);
          var degree= this.count;
          ctx.rotate(Math.PI / 180 * degree);
          this.drawCircle(this.r,0,this.r, this.f, this.s);
          ctx.restore();
          ctx.save()
          ctx.translate(this.x-this.r, this.y);
          var degree= this.count;
          ctx.rotate(Math.PI / 180 * degree*2);
          this.drawCircle(this.r,0,this.r, this.f, this.s);
          ctx.restore();
          ctx.save()
          ctx.translate(this.x-this.r, this.y);
          var degree= -this.count;
          ctx.rotate(Math.PI / 180 * degree);
          this.drawCircle(this.r,0,this.r, this.f, this.s);
          ctx.restore();

  
      }
  }
  RotatingCircle.prototype.drawCircle = drawCircle;
  RotatingCircle.prototype.distanceCheck = distanceCheck;
  RotatingCircle.prototype.drawLine = drawLine;
  RotatingCircle.prototype.drawRectangle = drawRectangle;
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
  var ctx = setupCanvas(document.querySelector('.myCanvas'));
  canvas = document.querySelector('.myCanvas');
  var width = canvas.width/2;
  var height= canvas.height/2;
//-----------------------object array ------------------------------------------------------------
objectSet=[];
buttonArray = [];
var selectedButton;
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
    ctx.lineWidth=0.5;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();
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
// check in bounds xMouseNow, yMouseNow, x,y, width, height
function inBounds(xMouseNow, yMouseNow, x,y,width, height){
if(xMouseNow > x &&
    xMouseNow < x+width &&
    yMouseNow > y &&
    yMouseNow < y+height){
        return true;
    }else{
        return false;
    }
}

//-------------------------objects -------------------------------------------------------------
class Button{
 // string name, int x, int y, int w,int h, stringrgba bC, stringrgba hC, stringrgba sC,boolean s  
constructor(name,x,y,w,h,bC, hC, sC){
    this.name = name; this.x=x; this.y=y; this.width = w; this.height = h;
    this.baseColor = bC; this.hoverColor = hC ; this.selectedColor= sC ;
    this.selected = false;  
}
update(){
    if(this.inBounds(xMouseNow, yMouseNow, this.x, this.y, this.width, this.height)){
        ctx.fillStyle= this.hoverColor;
        if(myMouseDown){
            if(selectedButton && selectedButton != this){
                selectedButton.selected =false;
            }
            selectedButton = this;
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
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height)
    ctx.fill();
}
}
Button.prototype.inBounds=inBounds;


buttonArray.push( new Button("Button1", 200,100,150,50,
makergb(200,100,50,1),makergb(200,200,50,1),makergb(50,200,50,1) ) )
for(var i = 0 ; i<100; i++){
    buttonArray.push( new Button("Button1", i*10,100,10,500,
    makergb( Math.round(255*(100-i)/100) ,
    Math.round(255*(1-Math.abs((i-50)/50))),
    Math.round(255*i/100)
    ,1),
    makergb(i*20%256,200,255,1),
    makergb(150+i,0,50,1) ) )
}







//
var count = 0;
function animate(){
    count+=1;
    for(var i = 0 ; i<buttonArray.length ; i++){
        if(selectedButton){
        selectedButton.selected = true;
    }
        buttonArray[i].update();
    }
    //console.log(count)
    window.requestAnimationFrame(animate)
}
animate();
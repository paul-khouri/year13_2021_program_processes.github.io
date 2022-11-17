console.log("hello");
var canvas=document.getElementById("myCanvas");
var c=canvas.getContext('2d');
const width = 800;
const height = 600;
canvas.width=width;
canvas.height=height;

var xMouseNow = 0;
var yMouseNow = 0;

// mouse event listeners
canvas.addEventListener("mousedown", function(e){
console.log("mouse down has happened");
//console.log(e);

});

canvas.addEventListener("mouseup", function(e){
console.log("mouse up has happened");
//console.log(e);    
    });

canvas.addEventListener("mousemove", function(e){
//console.log("mouse move has happened");
xMouseNow= e.offsetX;
yMouseNow = e.offsetY;
var posString = "x position: "+xMouseNow+"\ny position: "+yMouseNow;
c.clearRect(0, 0, width, height);

mousePos.update(xMouseNow, yMouseNow);
console.log(posString);
//console.log(e);
    });

canvas.addEventListener("click", function(e){
console.log("mouse has been clicked");
//console.log(e);    
    });

canvas.addEventListener("dblclick", function(e){
console.log("mouse has been double clicked");
console.log(e);
    });

class XYText{
    constructor(x,y,){
        this.x=x;
        this.y=y;
    

    }
    update(x,y){
        this.x=x;
        this.y=y
        this.draw();
    }
    draw(){
    c.fillStyle="rgb(0,0,255)";
    var myFont= "italic bold 30px monospace, serif";
   
    var lineOne = "x position: "+this.x;
    var lineTwo = "y position: "+this.y;
    var metric = c.measureText(lineOne);
    console.log(metric);
    c.font=myFont;
    c.textBaseline='hanging';
    var xShift= metric.width*this.x/width;
    var yShift = 60*this.y/height
    
    c.fillText(lineOne, this.x-xShift,this.y-yShift);
    c.fillText(lineTwo, this.x-xShift,this.y-yShift+30);
    }

}

var mousePos = new XYText(xMouseNow, yMouseNow);
mousePos.update(xMouseNow, yMouseNow);

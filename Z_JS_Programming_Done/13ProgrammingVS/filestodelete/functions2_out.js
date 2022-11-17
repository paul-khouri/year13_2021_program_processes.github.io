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
  // draw line
  c.strokeStyle='rgb(255,255,255)';
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(0, height/2);
  c.lineTo(width, height/2);
  c.stroke();

  //draw ellipse
c.strokeStyle=makergb(255,0,0,1);
console.log(makergb(255,0,0,1));
for(var k=0; k<=200; k+=10){ 
for(var i=0; i<=200; i+=10){
c.strokeStyle=makergb((i*30)%255,(i*30)%255,(i*30)%255,0.5);
c.beginPath();
c.lineWidth = 1;
c.ellipse(width/2, height/2, i, k, 0, 0, 2 * Math.PI);
c.stroke();
}
}

function makergb(r,g,b,a){
    var rgbString = "rgba("+r+","+g+","+b+","+a+")";
    return rgbString
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

function my_Line(x_1, y_1, x_2, y_2){
c.lineWidth=0.5;
c.beginPath();
c.moveTo(x_1, y_1);
c.lineTo(x_2,y_2);
c.stroke();
}


 // draw circle
c.fillStyle='rgb(200,200,0)';
c.strokeStyle='rgb(40,120,35)';
c.lineWidth=10;
c.beginPath()
c.arc(0,height/2, 50, 0, 2*Math.PI);
c.stroke();
c.fill();


function myText(x,y,m){
c.fillStyle = makergb(255,255,255,1);
c.strokeStyle = makergb(255,255,255,1);
drawCircle(x,y,2,true, false);
my_Line(x,y,x+100, y);
var myFont= "20px sans-serif";
c.font=myFont;
c.fillText(m, x,y);
//c.fillStyle = makergb(200,200,200,1);
}
myText(100,200,"Hello World");
myText(100,200+20,"Hello World");

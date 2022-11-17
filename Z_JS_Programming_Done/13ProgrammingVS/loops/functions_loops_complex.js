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
// -----------------general support functions--------------
  function makergb(r,g,b,a){
    var rgbString = "rgba("+r+","+g+","+b+","+a+")";
    return rgbString
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
//
function drawSquare(x,y,w,f,s){
    ctx.beginPath()
    ctx.rect(x,y, w,w);
    if(f){
        ctx.fill();
    }
    if(s){
        ctx.stroke();
    }
}
function my_Line(x_1, y_1, x_2, y_2){
    ctx.lineWidth=0.5;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();
    }
//
function myText(x,y,m){
    ctx.fillStyle = makergb(255,255,255,1);
    ctx.strokeStyle = makergb(255,255,255,1);
    drawCircle(x,y,2,true, false);
    my_Line(x,y,x+100, y);
    var myFont= "20px sans-serif";
    ctx.font=myFont;
    ctx.fillText(m, x,y);
    }
//----------------------------------------------------------------------
ctx.strokeStyle=makergb(255,255,255,1);
ctx.fillStyle=makergb(255,255,255,1);
ctx.save();
ctx.translate(width/2, height/4)
for(var k=0; k<12; k++){
    console.log(k);
ctx.rotate(30*Math.PI / 180);
drawSquare(0,0,40,false, true);
}
ctx.restore();

ctx.save();
ctx.fillStyle=makergb(255,255,255,0.1);
ctx.translate(width/4, height/4)
for(var k=0; k<12; k++){
    console.log(k);
ctx.rotate(30*Math.PI / 180);
drawSquare(-50,-50,100,true, false);
}
ctx.restore();

ctx.save();
ctx.fillStyle=makergb(255,255,255,0.1);
ctx.translate(width/4, 3*height/4)
drawCircle(0,0,10,false, true);
for(var k=0; k<12; k++){
    console.log(k);
ctx.rotate(30*Math.PI / 180);
drawCircle(20,0,20,true, false);
}
ctx.restore();
//------------------------
ctx.save();
ctx.fillStyle=makergb(255,255,255,0.1);
ctx.translate(width/2, 3*height/4)
drawCircle(0,0,10,false, true);
for(var k=0; k<12; k++){
    console.log(k);
ctx.rotate(30*Math.PI / 180);
drawCircle(20,0,40,true, false);
}
ctx.restore();
//--------------------------
ctx.save();
ctx.fillStyle=makergb(255,255,255,0.5);
ctx.translate(3*width/4, 3*height/4)
drawCircle(0,0,10,false, true);
for(var k=0; k<48 ; k++){
ctx.rotate(30*Math.PI / 180);
drawCircle(2*k,0,10,true, false);
}
ctx.restore();
//--------------------

for(var j=0 ; j<50 ; j++){
boxWidth = 100;
boxHeight = 100;
x_1 = width/4 -50;
x_2 = width/4 +boxWidth -50;
y_1= height/2+Math.round(boxWidth*Math.random())-50;
y_2= height/2+Math.round(boxWidth*Math.random())-50;
my_Line(x_1,y_1,x_2,y_2);
}




  //draw ellipse
ctx.strokeStyle=makergb(255,0,0,1);
for(var k=0; k<=100; k+=10){ 
for(var i=0; i<=100; i+=10){
ctx.strokeStyle=makergb((i*30)%255,(i*30)%255,(i*30)%255,0.5);
ctx.beginPath();
ctx.lineWidth = 1;
ctx.ellipse(3*width/4, height/4, i, k, 0, 0, 2 * Math.PI);
ctx.stroke();
}
}







//myText(3*width/4,3*height/4,"Hello World");
//myText(3*width/4,3*height/4 +20,"Hello World");

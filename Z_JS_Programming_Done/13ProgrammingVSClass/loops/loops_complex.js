
//----------------------------------------------------------------------
// loaded functions
// drawRectangle x,y,w,h, fillC, strokeC, lw, fill(boolean), stroke(boolean)
// drawCircle x,y,r, fillC, strokeC, lw, fill(boolean), stroke(boolean)
// function drawLine x_1 , y_1 , x_2, y_2, lw, strokeCol
// function writeText message, x, y, colour
//---------------

//top left
//save the context
// translate to rotation point
// run loop and rotate the context by 30 degrees 
// draw the rectangle at 0,0 which is now at 100,80
// the rectangle is rotated from its top corner
// restore the context
ctx.save();
ctx.translate(100, 80)
for(var k=0; k<12; k++){
ctx.rotate(30*Math.PI / 180);
drawRectangle(0,0,40,50,"", colArray[0][0], 1, false, true );
}
ctx.restore();

ctx.save();
ctx.translate(300, 80)
for(var k=0; k<12; k++){
ctx.rotate(30*Math.PI / 180);
drawRectangle(-50,-50,100,100,colArray[2][0], colArray[0][6], 1, true, true );
}
ctx.restore();

ctx.save();
ctx.translate(150, 300)
drawCircle(0,0,10, "", colArray[0][8], 2, false, true);
for(var k=0; k<12; k++){
ctx.rotate(30*Math.PI / 180);
drawCircle(60,0,60, colArray[2][7], colArray[2][8], 1, true, true);
}
ctx.restore();
//------------------------
ctx.save();

ctx.translate(450, 300)
drawCircle(0,0,10, "", colArray[0][8], 2, false, true);
for(var k=0; k<6; k++){
ctx.rotate(60*Math.PI / 180);
drawCircle(40,0,80, colArray[2][6], colArray[0][8], 0.5, true, true);
}
ctx.restore();
//--------------------------
ctx.save();
ctx.translate(3*width/4, 3*height/4)
drawCircle(0,0,10,false, true);
for(var k=0; k<48 ; k++){
ctx.rotate(30*Math.PI / 180);
drawCircle(2*k,0,10,true, false);
}
ctx.restore();
//--------------------
var x = 600;
var y = 250;
var w = 150;
var h = 150;


drawRectangle(x,y,w,h,"", colArray[2][6], 1, false, true );
for(var j=0 ; j<50 ; j++){
var x_1 = x;
y_1= y+Math.round(h*Math.random());
var x_2 = x+w;
y_2= y+Math.round(h*Math.random());
drawLine(x_1,y_1,x_2,y_2, 0.5, colArray[0][0]);
}




  //draw ellipse
for(var k=0; k<=100; k+=10){ 
for(var i=0; i<=100; i+=10){
ctx.strokeStyle="rgba("+(i*30)%255+","+(i*30)%255+","+(i*30)%255+","+0.5+")";
ctx.beginPath();
ctx.lineWidth = 1;
ctx.ellipse(600, 125, i, k, 0, 0, 2 * Math.PI);
ctx.stroke();
}
}
ctx.save();
ctx.translate(600,500);

for(var i =0 ; i<200; i++){
    ctx.rotate(10*Math.PI / 180);
    drawCircle(0.5*i,0,3, "", colArray[2][8], 1, false, true);
}
ctx.restore();

ctx.save();
ctx.translate(400,500);
for(var i =0 ; i<200; i++){
    ctx.rotate(-10*Math.PI / 180);
    drawCircle(0.5*i,0,3, "", colArray[2][8], 1, false, true);
}
ctx.restore();



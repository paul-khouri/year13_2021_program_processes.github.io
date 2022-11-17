console.log("clips js loaded")

//drawCircle x, y, radius, fill(boolean), stroke(boolean)
//drawRectangle x, y, width, height fill(boolean), stroke(boolean)
//drawLine takes x y start and x y end, line width

ctx.strokeStyle=colArray[0][6];
ctx.fillStyle=colArray[0][6];
console.log(colArray[0][7]);
ctx.lineWidth=6;

ctx.save();
ctx.fillStyle=colArray[0][1];
drawRectangle(100,100, 100,100, true, false);
ctx.clip();
ctx.fillStyle=colArray[0][7];
drawCircle(100,100, 40, true, false);
ctx.fillStyle=colArray[0][8];
drawCircle(200,140, 10, true, false);
ctx.restore();
drawCircle(200,180, 10, true, false);
// class myShape name, x,y, width, c_1, c_2, c_3
var myS = new myShape("myS", 300,100, 100, colArray[1][1], colArray[0][3], colArray[0][6]);
var myS_A = new myShape("myS", 400,100, 100, colArray[1][1], colArray[0][3], colArray[0][6]);
myS.update();
myS_A.update();
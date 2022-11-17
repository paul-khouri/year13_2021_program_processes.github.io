// check in rectangular bounds xMouseNow, yMouseNow, x,y, width, height
console.log(inBounds(90,60, 80,50,100,100))
//roundTo takes number and rounding level start value n>=s
console.log(roundTo(341,30,0))
console.log(roundTo(341,30,100))
//drawCircle x, y, radius, fill(boolean), stroke(boolean), fill colour, stroke colour, stroke width
drawCircle(50,100,20, true, true, colArray[0], colArray[1],3);
//drawRectangle x, y, width, height fill(boolean), stroke(boolean), 
//fill colour, stroke colour, stroke width
drawRectangle(50,200,120, 200, true, true, colArray[0], colArray[1],3);
//drawLine takes x y start and x y end,  line colour , line width
drawLine(50,450, 150,500, colArray[2], 7);

// class Grid x, y, width, height, number of x spaces, number of y spaces, stroke color, stroke width
var myGrid = new Grid(20,20, 200,300,10,10, colArray[7], 0.5);
myGrid.update();
//class CirclePunch x, y,radius, , fill(b), stroke(b), fillcolour stroke colour, stroke width
var myCirclePunch = new CirclePunch(300,100, 100, true, true, colArray[8], colArray[7], 4);
myCirclePunch.update();
//Class StarCircle x, y, width, height, fillcolour,  strokecolour, fill(b), stroke(b), l
var myStarCircle = new StarCircle(300,500, 100, 100, true, true, colArray[4], colArray[5], 2);
myStarCircle.update(); 
//class TriangleShape x, y, width, height, fillcolour stroke colour, fill(b), stroke(b), l
var myTriangleShape = new TriangleShape(200, 300, 80, 80,true,true, colArray[6], colArray[7],5);
myTriangleShape.update();
// string name, int x, int y, int w,int h, stringrgba bC, stringrgba hC, stringrgba sC,boolean s


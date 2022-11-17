console.log("main js called");
// class Grid x,y,w, h,lw, max, majTick
var x = 50
var y = 50;
var w = 400;
var max = 50;
// class Grid x,y,w, h,lw, max, majTick
var myGrid = new Grid(50,50, w, w, 0.5, max , 10);
myGrid.update();
// class Linear Plot xC, yC, width, m,c, max
xC = x+w/2;
yC = y+w/2;
var myLP = new LinearPlot(xC,yC, w, 2 ,10, max);
myLP.update();
// class Linear Plot xC, yC, width, a,b c, max
var myQP = new QuadraticPlot(xC,yC, w, 0.1 ,-1,-10, max);
myQP.update();
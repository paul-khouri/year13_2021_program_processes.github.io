console.log("main js called");

var backer = new Rectangle(0,0, 210+2,600, colArray[0][2]);

var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);
var rectButton = new Button(0,0,210,30,"Rectangle", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var ellipseButton = new Button(0,30,210,30,"Ellipse", colArray[0][0],colArray[0][1], colArray[0][2], canvas)
var swatchOne = new Swatch(0,100,30,30,colArray[0][3], colArray[0][4], canvas);

var swatchSet = []
var sWidth = 210/3
var backerCol = new Rectangle(0,100, 210,100+9*30, colArray[0][0]);

for( var i = 0; i< colArray.length; i++){
    for(j = 0 ; j < colArray[i].length ; j++){
        swatchSet.push(new Swatch(0+sWidth*(j%3),100+30*Math.floor(j/3)+90*i,sWidth,30,colArray[i][j], colArray[0][4], canvas))
    }
}



// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    backer.update();
    backerCol.update();
    drawingPage.update();
    rectButton.update();
    ellipseButton.update();
    swatchOne.update();
    for( var i= 0; i< swatchSet.length; i++){
        swatchSet[i].update();
    }


    window.requestAnimationFrame(animate);
}

animate();
console.log("main js called");

var backer = new Rectangle(0,0, 200+2,600, colArray[0][2]);
var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);
var rectButton = new Button(0,0,200,30,"Rectangle", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var ellipseButton = new Button(0,30,200,30,"Ellipse", colArray[0][0],colArray[0][1], colArray[0][2], canvas)



// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    backer.update();
    drawingPage.update();
    rectButton.update();
    ellipseButton.update();


    window.requestAnimationFrame(animate);
}

animate();
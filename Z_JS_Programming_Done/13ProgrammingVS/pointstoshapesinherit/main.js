console.log("main js file has been called for pages");
// class PointRectangle x,y,w,h, Point(Class), canvas
var myRectangleOne = new PointRectangle(50,50, 100,150, Point, canvas, colArray);
var myRectangleTwo = new RectangleCentre(250,50, 100,150, Point, canvas, colArray);
var myRectangleThree = new RectangleEllipse(450,50, 100,150, Point, canvas, colArray);
var myRectangleFour = new RectangleSquare(50,250, 100,150, Point, canvas, colArray);
var myRectangleFive = new RectangleCircle(250,250, 100,150, Point, canvas, colArray);
var myBC = new BigCircle(500,325, 50,75, Point, canvas, colArray);




function animate(){
    ctx.clearRect(0, 0, width, height);
    myRectangleOne.update();
    myRectangleTwo.update();
    myRectangleThree.update();
    myRectangleFour.update();
    myRectangleFive.update();
    myBC.update();

    

    window.requestAnimationFrame(animate);
}
animate();
console.log("main js file has been called for pages");
// class PointRectangle x,y,w,h, Point(Class), canvas
var myRectangleOne = new PointRectangle("Rectangle",50,50, 100,150, Point, canvas, colArray);
var myRectangleTwo = new PointRectangle("RectangleCentre",200,50, 100,150, Point, canvas, colArray);
var myRectangleThree = new PointRectangle("Ellipse", 350,50, 100,150, Point, canvas, colArray);
var myRectangleFour = new PointRectangle("Square", 50,250, 100,150, Point, canvas, colArray);
var myRectangleFive = new PointRectangle("Circle", 200,250, 100,150, Point, canvas, colArray);



function animate(){
    ctx.clearRect(0, 0, width, height);
    myRectangleOne.update();
    myRectangleTwo.update();
    myRectangleThree.update();
    myRectangleFour.update();
    myRectangleFive.update();
    

    window.requestAnimationFrame(animate);
}
animate();
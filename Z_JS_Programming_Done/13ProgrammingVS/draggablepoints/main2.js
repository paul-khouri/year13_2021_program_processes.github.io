console.log("main js file has been called for pages");
// class Point x,y,r, stroke, fill, over, canvas
var myPointOne = new Point(20,20,10,colArray[0][4], colArray[0][5], colArray[0][6], canvas);
var myPointTwo = new Point(100,100,10,colArray[0][5], colArray[0][6], colArray[0][7], canvas);
var points =[];
for(var k=0; k<7; k++){
    points.push(new Point(Math.round(width*Math.random()),Math.round(height*Math.random()),
    10,colArray[0][5], colArray[0][6], colArray[0][7], canvas));
}

var myCurve = new Curve(points, 3, colArray[0][0]);

function animate(){
    ctx.clearRect(0, 0, width, height);
    myCurve.update();
    //myPointTwo.update();
    //myPointOne.update();
    window.requestAnimationFrame(animate);
}
animate();
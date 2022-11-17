console.log("main js file has been called for pages");

// object Set
var objectSet = [];

// class Point x,y,r, stroke, fill, over, canvas
var PointOne = new Point(200,200,10, colArray[0][6], colArray[0][4], colArray[0][5],canvas);
var PointTwo = new Point(300,200,10, colArray[0][3], colArray[0][4], colArray[0][5],canvas);
var MROne = new MoveRectangle(400,200,10, colArray[0][3], colArray[0][4], colArray[0][6],canvas, 100, 150);
var SROne = new SelectRectangle(400,400,10, colArray[0][5], colArray[0][6], colArray[0][7],canvas,100, 150);
var SRTwo = new SelectRectangle(200,400,10, colArray[0][0], colArray[0][1], colArray[0][2],canvas,100, 150);
var SRRotOne = new SelectRectangleRotate(600,400,10, colArray[0][0], colArray[2][7], colArray[0][2],canvas,100, 25, 20);
objectSet.push(PointOne, PointTwo,MROne, SROne, SRTwo, SRRotOne);

function animate(){
    ctx.clearRect(0, 0, width, height);
    for(var i=0 ; i<objectSet.length ; i++){
        objectSet[i].update();

    }


    window.requestAnimationFrame(animate);
}
animate();
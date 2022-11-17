console.log("main js file has been called for pages");

// object Set
var objectSet = [];

// class Point x,y,r, stroke, fill, over, canvas
var PointOne = new Point(200,200,10, colArray[0][6], colArray[0][4], colArray[0][5],canvas);
var PointTwo = new Point(300,200,10, colArray[0][3], colArray[0][4], colArray[0][5],canvas);
objectSet.push(PointOne, PointTwo);

function animate(){
    ctx.clearRect(0, 0, width, height);
    for(var i=0 ; i<objectSet.length ; i++){
        objectSet[i].update();

    }


    window.requestAnimationFrame(animate);
}
animate();
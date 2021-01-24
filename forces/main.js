console.log("main js file has been called for pages");

// object Set
var objectSet = [];
// class Point xC,yC,r, stroke, fill, over, canvas 
//var POne = new Point(500,300, 20, colArray[0][0],colArray[0][1],colArray[0][2], canvas)
var AOne = new Attractor(550,400, 200,500, colArray,Point, canvas);

function animate(){
    ctx.clearRect(0, 0, width, height);
    //POne.update();
    AOne.update();



    window.requestAnimationFrame(animate);
}
animate();
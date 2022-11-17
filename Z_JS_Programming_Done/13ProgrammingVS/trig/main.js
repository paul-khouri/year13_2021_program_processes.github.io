console.log("main js file has been called for pages");
// class Point x,y,r, stroke, fill, over, canvas
var myPoint = new Point(0,0,10,colArray[2][4], colArray[2][5], colArray[0][6], canvas);
var myInertPoint = new InertPoint(width/2,height/2,10,colArray[0][5], colArray[0][6]);
var myCircleLine = new CircleLine(myInertPoint, myPoint, 0.5, colArray[0][0]);


function animate(){
    ctx.clearRect(0, 0, width, height);
    myCircleLine.update()
    window.requestAnimationFrame(animate);
}
animate();
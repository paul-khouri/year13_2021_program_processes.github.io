console.log("main move js file has been called for pages");
// class MoveRectangle x,y,w,h, Point(Class), canvas
var myMoveOne = new MoveRectangle("Move",100,200, 300, 250, Point, canvas, colArray);
var myMoveTwo = new MoveRectangle("Move",300,200, 300, 250, Point, canvas, colArray);



function animate(){
    ctx.clearRect(0, 0, width, height);
    myMoveOne.update();
    myMoveTwo.update();

    

    window.requestAnimationFrame(animate);
}
animate();
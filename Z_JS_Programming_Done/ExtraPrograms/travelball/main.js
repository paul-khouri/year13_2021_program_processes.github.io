console.log("main called");

var box = new Box(width/10, height/10, 8*width/10, 8*height/10, colArray[0][0]);
var ball = new Ball(2*width/10, 5*height/10 - 50, 10, colArray[0][0], 3, 40*Math.PI/180);
var bounce = new BounceCircle(width/2, height/2, 100, colArray[0][1]);
var control = new Control(box, ball,bounce);

function animate(){
    ctx.clearRect(0, 0, width, height);
    control.update();


    window.requestAnimationFrame(animate);
}
animate();
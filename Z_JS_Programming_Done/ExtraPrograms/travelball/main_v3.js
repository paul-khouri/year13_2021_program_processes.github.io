console.log("main called");

var ballSet = [];
var bounceSet = [];

var box = new Box(width/10, height/10, 8*width/10, 8*height/10, colArray[0][0]);
var ballOne = new Ball(2*width/10, 5*height/10 - 50, 10, colArray[0][0], 5, 40*Math.PI/180);
/*var ballTwo = new Ball(2*width/10, 5*height/10 - 50, 10, colArray[0][0], 2, 60*Math.PI/180);
var ballThree = new Ball(2*width/10, 5*height/10 - 50, 10, colArray[0][0], 3, 300*Math.PI/180);
var ballFour = new Ball(5*width/10, 5*height/10 - 100, 10, colArray[0][0], 2, 310*Math.PI/180);
var ballFive = new Ball(5*width/10, 5*height/10-5, 5, colArray[0][0], 1, 310*Math.PI/180);
var ballSix = new Ball(5*width/10, 5*height/10-75, 5, colArray[0][0], 1, 310*Math.PI/180);*/
var bounceOne = new BounceCircle(3*width/10, height/2, 100, colArray[0][1], 60*Math.PI/180, -120*Math.PI/180);
var bounceTwo = new BounceCircle(6*width/10, height/2, 100, colArray[0][1], 100*Math.PI/180, -80*Math.PI/180);
/*var bounceThree = new BounceCircle(5*width/10, height/2, 50, colArray[0][1]);
var bounceThreeOut = new BounceCircle(5*width/10, height/2, 100, colArray[0][1]);
var bounceFour = new BounceCircle(7*width/10, height/2, 50, colArray[0][1]);
var bounceFive = new BounceCircle(9*width/10, height/2, 50, colArray[0][1]);*/
ballSet.push(ballOne);
bounceSet.push( bounceOne, bounceTwo);
//ballSet.push(ballOne, ballTwo, ballThree, ballFour, ballFive, ballSix);
//bounceSet.push(bounceOne, bounceTwo, bounceThree, bounceThreeOut, bounceFour, bounceFive);

var control = new Control(box, ballSet, bounceSet);

function animate(){
    ctx.clearRect(0, 0, width, height);
    control.update();


    window.requestAnimationFrame(animate);
}
animate();
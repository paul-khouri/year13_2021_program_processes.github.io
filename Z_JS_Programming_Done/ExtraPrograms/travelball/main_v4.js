console.log("main called");

var ballSet = [];
var bounceSet = [];

var box = new Box(width/10, height/10, 8*width/10, 8*height/10, colArray[0][0]);
var ballOne = new Ball(6*width/10, 5*height/10 - 50, 10, "rgba(255,255,255,0.1)", 1, 40*Math.PI/180);
//var ballOne = new Point(150,150, 30,colArray[0][3], colArray[0][4], colArray[0][5], canvas);






function makeShape(xC, yC, R1, R2, col, startAng, endAng){
    /*
    var R1 = 80;
    var R2 = 120;
    var xC = 300;
    var yC = 300;
    var startAng = 80*Math.PI/180;
    var endAng = -50*Math.PI/180;
    var col = colArray[0][6]
    */

    var bounceOne = new BounceCircle(xC, yC, R1, col, startAng, endAng);
    var bounceTwo = new BounceCircle(xC, yC, R2, col, startAng, endAng);
    var xTip = xC + ( (R1+R2)/2 )*Math.cos(startAng) ;
    var yTip = yC + ( (R1+R2)/2 )*Math.sin(startAng) ;
    var bounceThree = new BounceCircle(xTip, yTip, (R2-R1)/2, col, -Math.PI, Math.PI);
    xTip = xC + ( (R1+R2)/2 )*Math.cos(endAng) ;
    yTip = yC + ( (R1+R2)/2 )*Math.sin(endAng) ;
    var bounceFour = new BounceCircle(xTip, yTip, (R2-R1)/2, col, -Math.PI, Math.PI);
    bounceSet.push(bounceOne, bounceTwo, bounceThree, bounceFour);





}
makeShape(200, 400, 80, 120, colArray[0][6], 10*Math.PI/180, -160*Math.PI/180 );
makeShape(700, 500, 40, 60, colArray[0][5], -70*Math.PI/180, 150*Math.PI/180 );
makeShape(600, 100, 40, 50, colArray[0][4], -150*Math.PI/180, 30*Math.PI/180 );
makeShape(150, 120, 40, 50, colArray[0][7], 120*Math.PI/180, -60*Math.PI/180 );
makeShape(450, 300, 40, 50, colArray[0][7], 60*Math.PI/180, -60*Math.PI/180 );





ballSet.push(ballOne);




var control = new Control(box, ballSet, bounceSet);

function animate(){
    ctx.clearRect(0, 0, width, height);
    control.update();


    window.requestAnimationFrame(animate);
}
animate();
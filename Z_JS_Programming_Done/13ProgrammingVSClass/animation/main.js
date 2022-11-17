console.log("main js called");

var objectSet=[];

var myRectangle = new RotatingRectangle(400,300,30,30, colArray[0][4]);
var myRC = new RotatingCircle(600, 450, 50, colArray[1][4], colArray[1][5], colArray[1][6]);
var myBC = new BounceCircle(100, 75, 200, 150, colArray[0][4], 1,3,10);
var myBCA = new BounceCircle(100, 250, 200, 150, colArray[0][5], -1,2,10);
var myBCB = new BounceCircle(100, 250, 200, 150, colArray[1][7], 0.5,-0.5,40);
var myGrowC = new GrowingCircle(400,150, 50, 0.1, colArray[0][1], colArray[0][3], colArray[0][5]);
var BB = new BallBounce(600, 75, 100, 250, colArray[0][4], 0,2,10);
var AB = new AcrossBall(350, 350, 100, 150, colArray[0][8], 1,0.5,5);
var ABone = new AcrossBall(370, 370, 60, 110, colArray[0][6], 0.5,1,5);
objectSet.push(myRectangle, myRC , myBC, myBCA, myBCB, myGrowC, BB,AB, ABone);
objectSet.push(new Counter(100,500));



function animate(){
    ctx.clearRect(0, 0, width, height);

    for(var i =0; i< objectSet.length ; i++){
        objectSet[i].update();
    }

    window.requestAnimationFrame(animate);
}

animate();

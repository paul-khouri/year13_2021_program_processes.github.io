console.log("main js called");

objectSet = []
var BB = new BouncingBall(500,200,250, 270, colArray[0][8], 10, 2);
var BBOne = new BouncingBall(100,200,30, 270, colArray[0][8], 10, 1);
var BBTwo = new BouncingBall(300,200,30, 270, colArray[0][8], 10, -3);
objectSet.push(BB);



function animate(){
    ctx.clearRect(0, 0, width, height);
    //console.log("hello");
    for( var i = 0; i <objectSet.length ; i++){
        objectSet[i].update();
    }




    window.requestAnimationFrame(animate);
}

animate();

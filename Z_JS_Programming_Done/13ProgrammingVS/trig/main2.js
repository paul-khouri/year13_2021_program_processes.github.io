console.log("main 2 js file has been called for pages");
// class CircleLine x,y, r,fill, lw, stroke,over,canvas
var myCL = new CircleLine(3, 50, 400,300,100,colArray[0][0],2,colArray[0][1],colArray[0][3], canvas);
myCL.update();



function animate(){
    ctx.clearRect(0, 0, width, height);
    myCL.update();

    window.requestAnimationFrame(animate);
}
animate();
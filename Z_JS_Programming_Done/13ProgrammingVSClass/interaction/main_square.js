console.log("main js called");


var myT = new ControlObjectSquare(canvas);



// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    myT.update();
    


    window.requestAnimationFrame(animate);
}

animate();
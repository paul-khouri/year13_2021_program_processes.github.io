console.log("main js called");


var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);



// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    drawingPage.update();
    


    window.requestAnimationFrame(animate);
}

animate();
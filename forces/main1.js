console.log("main js file has been called for pages");

// object Set
var objectSet = [];
var FC = new ForceControl(400,300,100,300, colArray, Point, canvas);


function animate(){
    ctx.clearRect(0, 0, width, height);
    FC.update();
  


    window.requestAnimationFrame(animate);
}
animate();
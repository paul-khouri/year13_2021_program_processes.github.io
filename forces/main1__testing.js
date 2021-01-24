console.log("main1__testing js file has been called for pages");

// object Set
var objectSet = [];
var FC = new ForceControl(400,300,100,300, colArray, Point, canvas);
var D =new DateModule(canvas);


function animate(){
    ctx.clearRect(0, 0, width, height);
    FC.update();
    D.update();
  


    window.requestAnimationFrame(animate);
}
animate();
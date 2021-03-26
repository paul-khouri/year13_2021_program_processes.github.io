




var S = new ColorSlider(10,200,200,10);

function animate(){
    ctx.clearRect(0, 0, width, height);
    S.update();
 
 
  


    window.requestAnimationFrame(animate);
}
animate();
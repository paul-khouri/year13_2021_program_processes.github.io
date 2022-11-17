//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
var mySliderOne = new Slider(canvas, 30,30,300, 100, colArray[0][0], colArray[0][3], colArray[0][4],
   100,0,10 );
var mySliderTwo = new Slider(canvas, 30,130,300, 100, colArray[0][0], colArray[0][3], colArray[0][4],
    10,0,8 );
var mySliderThree = new Slider(canvas, 30,230,300, 100, colArray[0][0], colArray[0][3], colArray[0][4],
    20,10,12 );
var opacity = 1;
function animate(){
    ctx.clearRect(0, 0, width, height);
    mySliderOne.update();
    mySliderTwo.update();
    mySliderThree.update();
    opacity= mySliderOne.getValue();
    window.requestAnimationFrame(animate);

}
animate();
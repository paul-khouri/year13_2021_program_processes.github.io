console.log("main js called");
// class Mixer x,y,w,h,Slider, canvas, c_1,c_2, c_3  
var myMixer = new Mixer(450,350, 400, 200,Slider, canvas, colArray[0][0], colArray[0][3], colArray[0][5]);
// class DrawingPage canvas, x,y,w,h
var myDrawingPage = new DrawingPage(canvas, 50,50, 350, 450,myMixer);
// class Button x,y,w,h,text, c_1, c_2, c_3, canvas
var RectangleButton = new Button(450, 50, 150,50, "Rectangle", 
    colArray[0][8], colArray[0][5], colArray[0][6], canvas, Rectangle);
var EllipseButton = new Button(600, 50, 150,50, "Ellipse", 
    colArray[0][8], colArray[0][5], colArray[0][6], canvas, Ellipse);
var StarButton = new Button(450, 100, 150,50, "Star", 
colArray[0][8], colArray[0][5], colArray[0][6], canvas, Star);
var CircleButton = new Button(600, 100, 150,50, "Circle", 
colArray[0][8], colArray[0][5], colArray[0][6], canvas, Circle);



function animate(){
    ctx.clearRect(0, 0, width, height);
    myMixer.update();
    myDrawingPage.update();
    RectangleButton.update();
    EllipseButton.update();
    StarButton.update();
    CircleButton.update();

    window.requestAnimationFrame(animate);
}
animate();
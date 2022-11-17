console.log("main js called");





var x = 550;
var y = 50;
var w = 150;
var h = 30;
// class Mixer x,y,w,h,Slider, canvas, c_1,c_2, c_3  
var myMixer = new Mixer(x,y+5*h, 400, 200,Slider, canvas, colArray[0][0], colArray[0][3], colArray[0][5], Button, SFButton);

// class Button x,y,w,h,text, c_1, c_2, c_3, canvas
var RectangleButton = new Button(x, y, w,h, "Rectangle", colArray[0][8], colArray[0][5], colArray[0][6], canvas, Rectangle);
var EllipseButton = new Button(x+w, y, w,h, "Ellipse", colArray[0][8], colArray[0][5], colArray[0][6], canvas, Ellipse);
var StarButton = new Button(x, y+h, w,h, "Star", colArray[0][8], colArray[0][5], colArray[0][6], canvas, Star);
var CircleButton = new Button(x+w, y+h, w,h, "Circle", colArray[0][8], colArray[0][5], colArray[0][6], canvas, Circle);
var UndoButton = new Button(x, y+2*h, w,h, "Undo", colArray[0][8], colArray[0][5], colArray[0][6], canvas, "Undo");
var ClearButton = new Button(x+w, y+2*h, w,h, "Clear", colArray[0][8], colArray[0][5], colArray[0][6], canvas, "Clear");

// class DrawingPage canvas, x,y,w,h
var myDrawingPage = new DrawingPage(canvas, 50,50, 450, 500,myMixer);

function animate(){
    ctx.clearRect(0, 0, width, height);
    myMixer.update();
    
    RectangleButton.update();
    EllipseButton.update();
    StarButton.update();
    CircleButton.update();
    UndoButton.update();
    ClearButton.update();
    myDrawingPage.update();

    window.requestAnimationFrame(animate);
}
animate();
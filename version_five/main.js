console.log("main js called");


var backer = new Rectangle(0,0, 210+2,600, colArray[0][2]);


v_m= 30
h_m = 30
var step =30
var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);
var rectButton = new Button(h_m, step * 0 + v_m, 210,30,"Rectangle", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
rectButton.setClicked();
var ellipseButton = new Button(h_m,step * 1 + v_m,210,30,"Ellipse", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var polygonButton = new Button(h_m,step * 2 + v_m,210,30,"Polygon", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var starButton = new Button(h_m,step * 4 + v_m,210,30,"Star", colArray[0][0],colArray[0][1], colArray[0][2], canvas);

var lineButton = new Button(h_m,step * 6+ v_m,210,30,"Line", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var moveButton = new Button(h_m,step * 8 + v_m,210,30,"Move", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var gridButton = new GridButton(h_m,step * 9 + v_m,210,30,"", colArray[0][0],colArray[0][1], colArray[0][2], canvas);

polygon_option_set = []
var s =30;
for(var i = 3; i < 10; i++){
    var p_opt = new PolygonOption(h_m+(i-3)*s,step * 3 + v_m,s,s,i, colArray[0][0],colArray[0][1], colArray[0][2], canvas);
    polygon_option_set.push(p_opt);
}  
polygon_option_set[2].setClicked();
line_option_set = []
for(var i = 1; i < 8; i++){
    var l_opt = new LineOption(h_m+(i-1)*s,step * 7+ v_m,s,s,i*10, colArray[0][0],colArray[0][1], colArray[0][2], canvas);
    line_option_set.push(l_opt);
}  
line_option_set[3].setClicked();

star_option_set = []
for(var i = 1; i < 8; i++){
    var s_opt = new StarOption(h_m+(i-1)*s,step * 5+ v_m,s,s,i/10, colArray[0][0],colArray[0][1], colArray[0][2], canvas);
    star_option_set.push(s_opt);
} 
star_option_set[5].setClicked();

var S = new ColorSlider(h_m,step * 11+ v_m,210,20);

var undo = new NoSelectButton(h_m,step * 15 + v_m,210,30,"Undo", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var clear = new NoSelectButton(h_m,step * 16 + v_m,210,30,"Clear", colArray[0][0],colArray[0][1], colArray[0][2], canvas);


var sWidth = 210/3
var backerCol = new Rectangle(0,200, 210,200+9*30, colArray[0][0]);










// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    //backer.update();
    //backerCol.update();
    drawingPage.update();
    rectButton.update();
    ellipseButton.update();
    polygonButton.update();
    starButton.update();
    lineButton.update();
    moveButton.update();
    gridButton.update();
    S.update();
    undo.update();
    clear.update();
    //p_opt.update();
    for(var i=0; i < polygon_option_set.length; i++){
        polygon_option_set[i].update();
    }
    for(var i=0; i < line_option_set.length; i++){
        line_option_set[i].update();
    }
    for(var i=0; i < line_option_set.length; i++){
        star_option_set[i].update();
    }
/*
    I.update();
    J.update();
    K.update();

    L.update();
    M.update();
    N.update();

    T.update();
    U.update();
    V.update();
*/



    window.requestAnimationFrame(animate);
}

animate();
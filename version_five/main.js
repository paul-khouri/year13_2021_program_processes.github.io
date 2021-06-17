console.log("main js called");
/*
var I = new InteractiveSquare(100,400,50,50,"rgb(200,0,100)", undefined, 1)
var J = new InteractiveSquare(160,400,50,50,"rgb(200,0,100)", undefined, 2)
var K = new InteractiveSquare(220,400,50,50,"rgb(200,0,100)", undefined, 3)
var group = [I,J,K]
I.setGroupMembers(group)
J.setGroupMembers(group)
K.setGroupMembers(group)
I.select();
var L = new InteractiveSquare(100,460,50,50,"rgb(200,0,100)", undefined, "S")
var M = new InteractiveSquare(160,460,50,50,"rgb(200,0,100)", undefined, "M")
var N = new InteractiveSquare(220,460,50,50,"rgb(200,0,100)", undefined, "L")
var group = [L,M,N]
L.setGroupMembers(group)
M.setGroupMembers(group)
N.setGroupMembers(group)
M.select();
var T = new LineSizes(100,340,50,50,"rgb(200,0,100)", undefined, 10)
var U = new LineSizes(160,340,50,50,"rgb(200,0,100)", undefined, 20)
var V = new LineSizes(220,340,50,50,"rgb(200,0,100)", undefined, 30)
var group = [T,U,V]
T.setGroupMembers(group)
U.setGroupMembers(group)
V.setGroupMembers(group)
T.select();
*/

var backer = new Rectangle(0,0, 210+2,600, colArray[0][2]);


v_m= 30
var step =30
var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);
var rectButton = new Button(20, step * 0 + v_m, 210,30,"Rectangle", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
rectButton.setClicked();
var ellipseButton = new Button(20,step * 1 + v_m,210,30,"Ellipse", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var polygonButton = new Button(20,step * 2 + v_m,210,30,"Polygon", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var starButton = new Button(20,step * 4 + v_m,210,30,"Star", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var lineButton = new Button(20,step * 5+ v_m,210,30,"Line", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var moveButton = new Button(20,step * 6 + v_m,210,30,"Move", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var gridButton = new GridButton(20,step * 7 + v_m,210,30,"", colArray[0][0],colArray[0][1], colArray[0][2], canvas);

polygon_option_set = []
var s =30;
for(var i = 3; i < 10; i++){
    var p_opt = new PolygonOption(20+(i-3)*s,step * 3 + v_m,s,s,i, colArray[0][0],colArray[0][1], colArray[0][2], canvas);
    polygon_option_set.push(p_opt);
}  
polygon_option_set[2].setClicked();

var S = new ColorSlider(20,step * 9+ v_m,210,20);




var sWidth = 210/3
var backerCol = new Rectangle(0,200, 210,200+9*30, colArray[0][0]);



var xM = 0;
var yM = 0;
bitmapTwo=new Image();
/*
canvas.addEventListener('mousemove', mMove);
function mMove(e){
    xM= e.offsetX;
    yM = e.offsetY;
    cty.drawImage(bitmapTwo, 0,0);
    cty.fillStyle = "rgb(0,255,0)";
    cty.beginPath();
    cty.rect(xM, yM, 10, 10);
    cty.fill();
    bitmapTwo = cv.transferToImageBitmap();
   

    console.log(xM);
}*/
/*
cty.fillStyle = "rgb(0,255,0)";
cty.beginPath();
cty.rect(0, 0, 100, 100);
cty.fill();
cty.beginPath();
cty.rect(200, 0, 100, 100);
cty.fill();
bitmapTwo = cv.transferToImageBitmap();
cty.drawImage(bitmapTwo, 0,0);
cty.beginPath();
cty.rect(400, 0, 100, 100);
cty.fill();
bitmapTwo = cv.transferToImageBitmap();
*/




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
    //p_opt.update();
    for(var i=0; i < polygon_option_set.length; i++){
        polygon_option_set[i].update();
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



    ctx.drawImage(bitmapTwo, 0,0);


    window.requestAnimationFrame(animate);
}

animate();
console.log("main js called");

var backer = new Rectangle(0,0, 210+2,600, colArray[0][2]);

var drawingPage = new DrawingPage(canvas, 300,50, 400, 500);
var rectButton = new Button(0,0,210,30,"Rectangle", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var ellipseButton = new Button(0,30,210,30,"Ellipse", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var lineButton = new Button(0,60,210,30,"Line", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var moveButton = new Button(0,90,210,30,"Move", colArray[0][0],colArray[0][1], colArray[0][2], canvas);
var gridButton = new GridButton(0,120,210,30,"", colArray[0][0],colArray[0][1], colArray[0][2], canvas);


var swatchSet = []
var sWidth = 210/3
var backerCol = new Rectangle(0,200, 210,200+9*30, colArray[0][0]);

for( var i = 0; i< colArray.length; i++){
    for(j = 0 ; j < colArray[i].length ; j++){
        swatchSet.push(new Swatch(0+sWidth*(j%3),200+30*Math.floor(j/3)+90*i,sWidth,30,colArray[i][j], colArray[0][4], canvas))
    }
}

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
    backer.update();
    backerCol.update();
    drawingPage.update();
    rectButton.update();
    ellipseButton.update();
    lineButton.update();
    moveButton.update();
    gridButton.update();

    for( var i= 0; i< swatchSet.length; i++){
        swatchSet[i].update();
    }


    ctx.drawImage(bitmapTwo, 0,0);


    window.requestAnimationFrame(animate);
}

animate();
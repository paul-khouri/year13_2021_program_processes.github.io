// width height of canvas have been declared
//width:450
//height:600

// -------------- variables 
var boundryX =25;
var boundryY =25;
var boundryWidth = 400;
var boundryHeight = 400;
var GridIntervals = 20;
var intWidth = boundryWidth/GridIntervals
var objectWidth = intWidth;

buttonArray = [];
objectSet = [];
var selectedButton;

var xMouse = 0;
var yMouse = 0;
var xMouseStart = 0;
var yMouseStart = 0;
var xRoundStart = 0;
var yRoundStart = 0;
var xRound = 0;
var yRound = 0;
var mouseDown = false;
var mouseInBounds = false;

// mouse event listeners
canvas.addEventListener("mousedown",myMouseDown);
function myMouseDown(e){
    mouseDown = true;
    xMouseStart = e.offsetX;
    yMouseStart = e.offsetY;
    xRoundStart = roundTo(xMouseStart, intWidth,boundryX);
    yRoundStart = roundTo(yMouseStart, intWidth,boundryY);
    console.log("mouse down has happened");

}

canvas.addEventListener("mouseup", myMouseUp);
function myMouseUp(e){
    if(selectedButton && selectedButton.name == "Undo" ){
        console.log("Undo");
        selectedButton.selected=false;
        if(objectSet.length > 0){
            objectSet.pop();
        }
        selectedButton = "";
    }

    if(mouseInBounds && selectedButton){

        if(selectedButton.name == "CirclePunch" ){
            console.log("Circle Punch")
            objectSet.push( new CirclePunch(xRoundStart, yRoundStart, objectWidth, true, true, 
                colArray[8], colArray[7], 1) )
            
        }
        if(selectedButton.name == "StarCircle" ){
            objectSet.push(new StarCircle(xRoundStart,yRoundStart, objectWidth,objectWidth, 
                true, true, colArray[4], colArray[5], 1));
            console.log("StarCircle");
        }
        if(selectedButton.name == "TriangleShape" ){
            objectSet.push(new TriangleShape(xRoundStart, yRoundStart, objectWidth, objectWidth,true,true, 
                colArray[6], colArray[7],1))
            console.log("TriangleShape");
        }
        if(selectedButton.name == "AnimateCircle" ){
            objectSet.push(new AnimateCircle(xRoundStart,yRoundStart,objectWidth,true, true, colArray[7], colArray[4], 2))
            console.log("AnimateCircle");
        }

        
            }

    mouseDown = false;
}

canvas.addEventListener("mousemove", myMouseMove);
function myMouseMove(e){
    xMouse = e.offsetX;
    yMouse = e.offsetY;
    xRound = roundTo(xMouse, intWidth,boundryX);
    yRound = roundTo(yMouse, intWidth,boundryY);
    mouseInBounds = inBounds(xMouse, yMouse, boundryX, boundryY, boundryWidth, boundryHeight);
}

// --------------------------
var myGrid = new Grid(boundryX,boundryY,boundryWidth, boundryHeight, GridIntervals, GridIntervals,"rgb(255,255,255)", 0.5);



var myStarCircle = new StarCircle(300,500, 100, 100, true, true, colArray[4], colArray[5], 2);
var myTriangleShape = new TriangleShape(200, 300, 80, 80,true,true, colArray[6], colArray[7],5);
//---------
var bX=25;
var bY=450;
var bWidth =80;
var myCirclePunchButton = new Button("CirclePunch", bX,bY,bWidth,bWidth,colArray[6], colArray[5], colArray[7], 
new CirclePunch(bX+10,bY+10, bWidth-20, true, true, colArray[8], colArray[7], 1) );

var myStarCircleButton = new Button("StarCircle", bX+1*bWidth, bY,bWidth,bWidth,colArray[6], colArray[5], colArray[7], 
new StarCircle(bX+1*bWidth+10,bY+10, bWidth-20, bWidth-20, true, true, colArray[4], colArray[5], 1) );

var myTriangleShapeButton = new Button("TriangleShape", bX+2*bWidth, bY,bWidth,bWidth,colArray[6], colArray[5], colArray[7], 
new TriangleShape(bX+2*bWidth+10, bY+10, bWidth-20, bWidth-20,true,true, colArray[6], colArray[7],1) );

var myAnimateCircleButton = new Button("AnimateCircle", bX+3*bWidth, bY,bWidth,bWidth,colArray[6], colArray[5], colArray[7], 
new AnimateCircle(bX+3*bWidth+10, bY+10, bWidth-20, bWidth-20,true,true, colArray[6], colArray[7],1) );

var myUndoButton = new Button("Undo", bX+4*bWidth, bY,bWidth,bWidth,colArray[6], colArray[5], colArray[7], 
new UndoPic(bX+4*bWidth+10, bY+10, bWidth-20, bWidth-20,true,true, colArray[6], colArray[7],1) );


buttonArray.push(myCirclePunchButton, myStarCircleButton, myTriangleShapeButton, myAnimateCircleButton, myUndoButton);





function animate(){
    ctx.clearRect(0, 0, width, height);
    myGrid.update();


    for(var k=0; k<buttonArray.length; k++){
        buttonArray[k].update();
    }
    for(var j=0; j<objectSet.length; j++){
        objectSet[j].update();
    }

    if(mouseDown && mouseInBounds){
        drawRectangle(xRoundStart, yRoundStart, xMouse - xRoundStart , xMouse - xRoundStart,
             false, true,"", colArray[2], 1 );
        drawRectangle(xRoundStart, yRoundStart, xRound - xRoundStart , xRound - xRoundStart,
                false, true,"", colArray[5], 1 );
            objectWidth = xRound - xRoundStart;
    }


    window.requestAnimationFrame(animate);
}
animate();
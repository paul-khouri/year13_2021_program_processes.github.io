console.log("main move js file has been called for pages");
var objectSet = [];
// class MoveRectangle x,y,w,h, Point(Class), canvas
var myfill = colArray[0][6]
var myrotation = 30
var myMoveOne = new MoveRectangle("Move",100,200, 300, 250, Point, canvas, colArray,myfill, myrotation );
 objectSet.push(myMoveOne);

canvas.addEventListener('mousedown', mDown, false);
canvas.addEventListener('mousemove', mMove);
canvas.addEventListener('mouseup', mUp);

var mouseDown = false;
var xMouse = 0;
var yMouse = 0;
var xMouseStart = 0;
var yMouseStart = 0;
var moveable = false;
var mCount = 0;


function mDown(e){
//console.log("mouse down on main");
xMouseStart = e.offsetX;
yMouseStart = e.offsetY; 
mouseDown = true;
}
function mMove(e){
xMouse = e.offsetX;
yMouse = e.offsetY; 

}
function mUp(e){
    // if moveable is false we make the object
    if(!moveable){
        myfill = colArray[0][mCount];
        objectSet.push( new MoveRectangle("Move",xMouseStart, yMouseStart, 
        xMouse - xMouseStart, yMouse -yMouseStart, 
        Point, canvas, colArray,myfill, myrotation ) );
        mCount+=1;
        if(mCount >7){
            moveable=true;
        }
    }

mouseDown = false;

}


function animate(){
    ctx.clearRect(0, 0, width, height);
    for(var i =0 ; i<objectSet.length ; i++){
        objectSet[i].update();
    }
    // if moveable is false we make an object on drag
    if(!moveable && mouseDown){
        ctx.strokeStyle = colArray[0][0];
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(xMouseStart, yMouseStart, xMouse - xMouseStart, yMouse -yMouseStart);
        ctx.stroke();
    }



    

    window.requestAnimationFrame(animate);
}
animate();
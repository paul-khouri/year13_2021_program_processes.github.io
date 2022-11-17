console.log(" draw js called")

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;

var colArray=[
    "rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)", 
    "rgb(204,0,0)","rgb(255,204,51)","rgb(51,51,255)",
    "rgb(255,102,102)","rgb(255,255,153)", "rgb(0,153,204)"
    ]


//--------------------functions---------------------------
// draw Rectangle (integers) x, y, width, height, (rgb strings), fcol, scol , +integer lineWidth
function drawRectangle(x,y,w,h,fcol,scol,lw){
    // set context and create rectangle
    ctx.fillStyle = fcol;
    ctx.strokeStyle = scol;
    ctx.lineWidth=lw;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.stroke();
    //find smaller rectangle side
    //radius must be positive
    var rad = Math.abs(h/2)
    if(Math.abs(w/2) < rad){
        rad = Math.abs(w/2);
    }
    // use rectangle stroke for circle fill
    // create the circle
    ctx.fillStyle = scol;
    ctx.beginPath();
    ctx.arc(x+w/2, y+h/2, rad, 0, 2*Math.PI);
    ctx.fill();

    // corner point marker
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.stroke();
}

drawRectangle(100, 250, -100, -200, colArray[5], colArray[6], 1);
drawRectangle(150, 250, 100, -200, colArray[5], colArray[6], 1);
drawRectangle(150, 300, 100, 200, colArray[5], colArray[6], 1);
drawRectangle(100, 300, -100, 200, colArray[5], colArray[6], 1);
//------------
drawRectangle(500, 250, -200, -100, colArray[5], colArray[6], 1);
drawRectangle(550, 250, 200, -100, colArray[5], colArray[6], 1);
drawRectangle(550, 300, 200, 100, colArray[5], colArray[6], 1);
drawRectangle(500, 300, -200, 100, colArray[5], colArray[6], 1);


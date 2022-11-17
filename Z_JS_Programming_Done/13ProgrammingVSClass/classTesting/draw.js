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

console.log( colArray[0] )
//------------------------------------------------------

// complete drawing of a rectangle
ctx.strokeStyle = colArray[3];
ctx.fillStyle=colArray[5];
ctx.lineWidth = 5;
ctx.beginPath();
ctx.rect(100,100, 300, 50);
ctx.stroke();
ctx.fill();
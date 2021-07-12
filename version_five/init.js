console.log("init js with scaling called")

//set up code

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 900;
var height = 600;
var dpr = window.devicePixelRatio || 1;
var scale = dpr
canvas.width = width*scale;
canvas.height = height*scale;
ctx.scale(scale,scale);

var my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(100,100,100)"
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(200,200,200,0.5)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(190,190,190)";
//------------------------------------------------------------------
canvasSecond = document.querySelector('#mySecondCanvas');
var ctx_s = canvasSecond.getContext('2d');
canvasSecond.width = width*scale;
canvasSecond.height = height*scale;
ctx_s.scale(scale,scale);

/*
var cv = new OffscreenCanvas(800, 600);
var cty = cv.getContext('2d');
*/



//-----------------------------
var colArray=[
    [
    "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
    "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
    "rgba(0,153,204,1)","rgba(255,255,153,1)","rgba(255,255,102,1)"
    ],
    [
        "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 
        "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",
        "rgba(0,153,204,0.67)","rgba(255,255,153,0.67)","rgba(255,255,102,0.67)"
        ],
    [
        "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 
        "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",
        "rgba(0,153,204,0.33)","rgba(255,255,153,0.33)","rgba(255,255,102,0.33)"
        ]
    ]



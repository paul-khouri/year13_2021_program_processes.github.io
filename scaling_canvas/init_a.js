console.log("init js with scaling called")

//set up code

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 1000;
var height = 600;
var scale = 4
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

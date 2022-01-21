canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
// define width and height
let width = 1000;
let height = 500;
// define scale of 1. This may be changed later to improve resolution
let scale = 2;
// set the canvas width and height
canvas.width = width*scale;
canvas.height = height*scale;
// scale the canvas
ctx.scale(scale,scale);
// get the canvas element
// style it here so it will be consistent
let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(100,100,100)"
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(200,200,200,0.5)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(190,190,190)";

/**
 * Draw a rectangle
 *
 * @param {number} x corner x
 * @param {number} y corner y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fillColour rgb string
 * @param {string} strokeColour rgb string.
 * @param {number} strokeWidth x coordinate of second point.
 * @return {null}
 */
function drawRect(x,y,w,h, fillColour, strokeColour, strokeWidth){
    ctx.fillStyle = fillColour;
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fill();
    ctx.stroke();
}

drawRect(20,20,200,130, "rgb(232,109,135)", "rgb(236,198,76)", 2);
drawRect(20,170,200,130, "rgba(234,225,144,0.83)", "rgb(80,0,80)", 4);
drawRect(20,320,200,130, "rgba(239,89,217,0.83)", "rgb(46,169,239)", 4);
drawRect(240,20,700,430, "rgba(17,96,239,0.83)", "rgb(46,169,239)", 4);

//loop
for(let i = 0; i<26; i++){
    drawRect(260+25*i,40,20,20, "rgba(170,193,238,0.83)", "rgb(46,169,239)", 1);
}
// double loop for a grid
for(let i=0; i<5 ; i++){
    for(let j = 0; j<5; j++){
        drawRect(260+25*i,100+25*j,20,20, "rgba(170,193,238,0.83)", "rgb(46,169,239)", 1);
    }
}
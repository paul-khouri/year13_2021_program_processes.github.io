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

// two dimensional array of colours
const col= [
[ // opaque
// black (0)               grey (1)               white (2)
"rgba(0,0,0,1)" , "rgba(150,150,150,1)", "rgba(255,255,255,1)" ,
// pink  (3)           purple (4)       deep blue (5)
"rgb(243,92,155,1)", "rgb(153,19,206,1)", "rgb(16,16,162,1)",
// pale blue (6)           yellow   (7)         bright yellow (7)
"rgba(135,211,243,1)", "rgba(246,244,193,1)", "rgba(250,250,0,1)"
],
[ // semi-transparent
// black (0)               grey (1)               white (2)
"rgba(0,0,0,0.5)" , "rgba(150,150,150,0.5)", "rgba(255,255,255,0.5)" ,
// pink  (3)           purple (4)       deep blue (5)
"rgb(243,92,155,0.5)", "rgb(153,19,206,0.5)", "rgb(16,16,162,0.5)",
// pale blue (6)           yellow   (7)         bright yellow (7)
"rgba(135,211,243,1,0.5)", "rgba(246,244,193,1,0.5)", "rgba(250,250,0,0.5)"
]
    ]

/**
 * Fill and or Stroke the Current Path
 *
 * @param {string} fillColour rgb string
 * @param {string} strokeColour rgb string.
 * @param {number} strokeWidth
 * @return {null}
 */
function updateContext(fillColour, strokeColour, strokeWidth){
    ctx.fillStyle = fillColour;
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    if(fillColour){
        ctx.fill();
    }
    if(strokeColour|| strokeWidth){
        ctx.stroke();
    }
}


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
function drawRectangle(x,y,w,h, fillColour, strokeColour, strokeWidth){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    updateContext(fillColour, strokeColour, strokeWidth)

}
/**
 * Draw the colours in a grid for reference
 *
 * @param {array} col colour array
 * @return {null}
 */
function drawColourGrid(col=col){
    // set a size for the colour square
    let size = 20
    // draw a background black rectangle
    drawRectangle(0,0,size*col[0].length, size*col.length, col[0][0],undefined, undefined )
    // loop through the colour array
    // the first part gets each colour array
    for(let i= 0; i< col.length; i++){
        // the second part goes through the individual colours in the array
        for(let j =0; j<col[i].length ; j++){
            drawRectangle(0+size*j,size*i, size,size,col[i][j], col[0][2], 1)
        }
    }
}

drawRectangle(20,20,200,130, col[0][3], col[0][7], 2);
drawRectangle(20,170,200,130,col[0][7], col[0][4], 4);
drawRectangle(20,320,200,130, col[0][3], col[0][6], 4);
drawRectangle(240,20,700,430, col[0][5],col[0][6], 4);

drawColourGrid(col)



// init file with canvas set up
// colours
// functions
//...
canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
// define width and height
let width = 1000;
let height = 600;
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
        "rgba(135,211,243,0.5)", "rgba(246,244,193,0.5)", "rgba(250,250,0,0.5)"
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
 * @param {number} strokeWidth
 * @return {null}
 */
function drawRectangle(x,y,w,h, fillColour, strokeColour, strokeWidth){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    updateContext(fillColour, strokeColour, strokeWidth)
}
/**
 * Draw a circle
 *
 * @param {number} x centre x
 * @param {number} y centre y
 * @param {number} r radius
 * @param {string} fillColour rgb string
 * @param {string} strokeColour rgb string.
 * @param {number} strokeWidth
 * @return {null}
 */
function drawCircle(x,y,r,  fillColour, strokeColour, strokeWidth){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    updateContext(fillColour, strokeColour, strokeWidth)
}
/**
 * Draw a line
 *
    * @param {number} x_1 start x
    * @param {number} y_1 start y
    * @param {number} x_2 end x
    * @param {number} y_2 end y
    * @param {string} strokeColour rgb string
    * @param {number} strokeWidth width of line
    * @return {null}
 */
function drawLine(x_1,y_1, x_2, y_2, strokeColour,strokeWidth){
    ctx.beginPath();
    ctx.moveTo(x_1,y_1);
    ctx.lineTo(x_2,y_2);
    ctx.lineCap = "round";
    updateContext(undefined, strokeColour, strokeWidth);
}
/**
 * Draw text
    *
    * @param {number} x top corner x
    * @param {number} y top corner y
    * @param {string} txt
    * @param {string} fillColour rgb string.
    * @param {string} font css shorthand font style
    * @return {null}
 */
function drawText(x,y,txt,fillColour, font = "bold 30px monospace" ) {
    ctx.font = font;
    ctx.fillStyle = fillColour;
    ctx.fillText(txt, x,y);
    //
}
/**
 * Draw text box
    *
    * @param {number} x top corner x
    * @param {number} y top corner y
    * @param {number} w width
    * @param {string} txt
    * @param {string} backColour rgb string.
    * @param {string} fillColour rgb string.
    * @param {string} font css shorthand font style
    * @return {null}
 */
function drawTextBox(x,y,w,txt,backColour, fillColour, font = "15px monospace"){
    let h =50;
    drawRectangle(x,y,w,h, backColour, undefined, undefined)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    drawText(x+w/2,y+h/2, txt, fillColour, font);
    //drawLine(x,y+h/2,x+w,y+h/2, col.green_t,1);

}

/**
 * Draw text box
 *
 * @param {number} x top corner x
 * @param {number} y top corner y
 * @param {number} w width
 * @param {string} txt
 * @param {string} backColour rgb string.
 * @param {string} fillColour rgb string.
 * @param {string} font css shorthand font style
 * @return {null}
 */
function roundTextBox(x,y,w, txt, backColour, fillColour, font = "bold 30px monospace"){
    let h=50;
    drawRectangle(x,y,w,h,  backColour, undefined, undefined)


    drawCircle(x,y,h,backColour, undefined, undefined)

}





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


const col={
    black:"rgba(0,0,0,1)",
    grey:"rgba(150,150,150,1)",
    white:"rgba(255,255,255,1)",
    green: "rgba(0,92,0,1)",
    pink: "rgba(243,92,155,1)",
    purple: "rgba(153,19,206)",
    dblue:"rgba(16,16,162)",
    pblue:"rgba(135,211,243,1)",
    pyellow:"rgba(246,244,193,1)",
    black_t:"rgba(0,0,0,0.5)",
    grey_t:"rgba(150,150,150,0.5)",
    white_t:"rgba(255,255,255,0.5)",
    green_t: "rgba(0,92,0,0.5)",
    pink_t: "rgba(243,92,155,0.5)",
    purple_t: "rgba(153,19,206,0.5)",
    dblue_t:"rgba(16,16,162,0.5)",
    pblue_t:"rgba(135,211,243,0.5)",
    pyellow_t:"rgba(246,244,193,0.5)",
}
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
    updateContext(fillColour, undefined, undefined);
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
function drawTextBox(x,y,w,txt,backColour, fillColour, font = "bold 30px monospace"){
    let h =50;
    drawRectangle(x,y,w,h, backColour, undefined, undefined)
    ctx.font = font;
    ctx.fillStyle = fillColour;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(txt, x+w/2,y+h/2);
    drawLine(x,y+h/2,x+w,y+h/2, col.green_t,1);

}



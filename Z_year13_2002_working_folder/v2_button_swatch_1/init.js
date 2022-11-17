// init file with canvas set up
// colours
// functions
//...
canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');
console.log(typeof ctx)
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
my_c.style.border = "0px solid rgba(200,200,200,0.5)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(190,190,190)";





// two dimensional array of colours
const col = [
    [ // opaque
// black (0)               grey (1)               white (2)
        "rgba(0,0,0,1)" , "rgba(150,150,150,1)", "rgba(255,255,255,1)" ,
// pink  (3)           purple (4)       deep blue (5)
        "rgb(243,92,155,1)", "rgb(153,19,206,1)", "rgb(16,16,250,1)",
// pale blue (6)           yellow   (7)         bright yellow (8)
        "rgba(135,211,243,1)", "rgba(246,244,193,1)", "rgba(250,250,0,1)",
// intense green (9)           pale green   (10)        dull green (11)
        "rgba(0,211,0,1)", "rgba(100,244,0,1)", "rgba(0,190,100,1)",
// red (12)           dull red   (13)        orange red (14)
        "rgba(240,0,0,1)", "rgba(200,80,0,1)", "rgba(255,100,100,1)"
    ],
    [ // semi-transparent
// black (0)               grey (1)               white (2)
        "rgba(0,0,0,0.75)" , "rgba(150,150,150,0.75)", "rgba(255,255,255,0.75)" ,
// pink  (3)           purple (4)       deep blue (5)
        "rgb(243,92,155,0.5)", "rgb(153,19,206,0.5)", "rgb(16,16,250,0.5)",
// pale blue (6)           yellow   (7)         bright yellow (7)
        "rgba(135,211,243,0.5)", "rgba(246,244,193,0.5)", "rgba(250,250,0,0.5)",
// intense green (9)           pale green   (10)        dull green (11)
        "rgba(0,211,0,0.5)", "rgba(100,244,0,0.5)", "rgba(0,190,100,0.5)",
// red (12)           dull red   (13)        orange red (14)
        "rgba(240,0,0,0.5)", "rgba(200,80,0,0.5)", "rgba(255,100,100,0.5)"
    ]
]

/**
 * Captures mouse events
 * Note that are no parameters for the constructor
 * There is no update function - events are independent of the animation frame
 */
class InteractiveObject{
    constructor(){
        // this listen for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        // variables to hold where the mouse was first clicked down
        // we will need them later
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        // it will also be helpful to know if the mouse is down
        this.mouseIsDown = false;
    }
    mClick(e){}

    mDown(e){
        // update positions so this can be used in another object
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
        //once you have got the idea, comment out these (and remove later)
        let output = "This mouse went DOWN at  x = " + e.offsetX + " and y = " + e.offsetY;
        console.log(output)
    }
    mUp(e){
        // if the mouse is up, it can't be down :)
        this.mouseIsDown = false;
        //once you have got the idea, comment out these (and remove later)
        //let output = "This mouse went UP at x = " + e.offsetX + " and y = " + e.offsetY;
        //console.log(output);

    }
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(){
        // this might be a useful safety feature
        // we could set mouseIsDown to false when the mouse leave the canvas
        console.log("Mouse has left the canvas")
        this.mouseIsDown = false;
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m > x && x_m < x + w && y_m > y && y_m < y +h){
            return true
        }else{
            return false
        }
    }
    getDistance(x_c,y_c, x_m, y_m, r){
        let d = Math.sqrt(Math.pow(x_c-x_m, 2) + Math.pow(y_c - y_m, 2))
        return d<r
    }
}





/**
 * Grid - square grid
 * @param {number} w width of canvas
 * @param {number} h height of canvas
 * @param {number} intervalWidth distance each grid unit
 * @param {string} strokeColour stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Grid{
    constructor(w,h,intervalWidth, strokeColour="rgb(255,255,255)", strokeWidth=0.25){
        this.w = w;
        this.h = h;
        this.intervalWidth=intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
    }
    draw(){
        for(let i = -this.w ; i <= this.w ; i+= this.intervalWidth){
            this.drawLine(i,-this.h, i,this.h, this.strokeColour, this.strokeWidth);
        }
        for(let j = -this.h ; j <= this.h ; j+= this.intervalWidth){
            this.drawLine(-this.w,j, this.w,j, this.strokeColour, this.strokeWidth);
        }
    }
}
Grid.prototype.drawLine = drawLine;


/**
 * Filled TextBox
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width
 * @param {string} txt text
 * @param {string} fill fill colour
 * @param {string} txtColour colour of text
 */
class TextBox{
    constructor(x,y,width, fillColour, txtColour) {
        this.x = x;
        this.y = y;
        this.w = width;
        // fixed height
        this.h = 50;
        // text managed through update
        this.txt = "Placeholder";
        console.log(this.txt)
        this.fillColour = fillColour;
        this.txtColour = txtColour;
    }
    update(txt ="Placeholder"){
        this.txt = txt
        this.draw()
    }
    draw(){
        this.basicRect(this.x,this.y,this.w,this.h, this.fillColour)
        this.centredText(this.txt, this.x+this.w/2, this.y+this.h/2, this.txtColour)
    }
}
TextBox.prototype.centredText = centredText;
TextBox.prototype.basicRect = basicRect;


/**
 * Create a Rectange Object - No Stroke
 * @param {number} xS xStart
 * @param {number} yS yStart
 * @param {number} xM current xMouse
 * @param {number} yh current xMouse
 * @param {string} fill fill Colour
 */
class Rectangle{
    constructor(xS, yS, xM, yM , fill, stroke, lw=8) {
        this.x = xS
        this.y = yS
        this.w = xM - xS
        this.h = yM - yS
        this.fill = fill
        this.stroke = stroke
        this.lw = lw
    }
    update(){
        if(this.fill) {
            if(this.stroke) {
                this.strokeFillRect(this.x, this.y, this.w, this.h, this.fill, this.stroke,this.lw)
            }
            else{this.basicRect(this.x, this.y, this.w, this.h, this.fill)}
        }else if(this.stroke){
            this.strokeRect(this.x, this.y, this.w, this.h,this.stroke,this.lw)
        }
    }
}
Rectangle.prototype.basicRect = basicRect
Rectangle.prototype.strokeRect = strokeRect
Rectangle.prototype.strokeFillRect =strokeFillRect


/**
 * Create a Ellipse Object - No Stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill Colour
 */
class Ellipse{
    constructor(xS, yS, xM, yM , fill, stroke, lw=8){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.xRad = Math.abs((xM-xS)/2);
        this.yRad = Math.abs((yM-yS)/2);
        this.fill = fill;
        this.stroke = stroke
        this.lw = lw

    }

    update(){
        this.draw();

    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xRad, this.yRad, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.lw
        if(this.fill) {
            if(this.stroke) {

                ctx.fill();
                ctx.stroke();
            }
            else{
                ctx.fill()
            }
        }else if(this.stroke){
            ctx.stroke()
        }


    }

}
/**
 * Create a Circle Object - No Stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill Colour
 */
class Circle{
    constructor(xS, yS, xM, yM , fill, stroke, lw=8){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.r = Math.min(Math.abs(xM-xS) , Math.abs(yM-yS) )/2
        this.fill = fill;
        this.stroke = stroke
        this.lw = lw

    }

    update(){
        this.draw();

    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.lw
        if(this.fill) {
            if(this.stroke) {

                ctx.fill();
                ctx.stroke();
            }
            else{
                ctx.fill()
            }
        }else if(this.stroke){
            ctx.stroke()
        }
    }

}
/**
 * Draw an Image
 * @param {image} img canvas image
 */
class CanvasImage{
    constructor(img){
        this.img = img
    }
    update(){
        ctx.drawImage(this.img, 0,0,width,height)
    }
}
// -----------------------  functions
/**
 * Draw a filled rectangle no stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} colour fill colour
 */
function basicRect(x,y,w,h,colour){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = colour;
    ctx.fill()
}

/**
 * Draw a stroked rectangle no fill
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} colour strokeColour
 * @param {number} lw line width default =1
 */
function strokeRect(x,y,w,h,colour="rgb(255,255,200)", lw=1){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.lineWidth = lw
    ctx.strokeStyle = colour;
    ctx.stroke()
}

/**
 * Draw a stroked and filled rectangle
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fillColour fill colour
 * @param {string} strokeColour stroke colour
 * @param {number} lw line width default =1
 */
function strokeFillRect(x,y,w,h,fillColour, strokeColour, lw = 1){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = fillColour;
    ctx.fill()
    ctx.lineWidth=lw
    ctx.strokeStyle = strokeColour
    ctx.stroke();
}
/**
 * Text centred on x,y
 * @param {string} txt 1x_1
 * @param {number} x_c y_1
 * @param {number} y_c x_2
 * @param {string} colour text Colour
 */
function centredText(txt, x_c, y_c, colour){
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colour;
    ctx.fillText(txt, x_c, y_c);
}
/**
 * Draw a line
 * @param {number} x_1 1x_1
 * @param {number} y_1 y_1
 * @param {number} x_2 x_2
 * @param {number} y_2 y_2
 * @param {string} strokeColour strokeColour
 * @param {number} strokeWidth default = 1
 * @param {object} ct default = ctx
 */
function drawLine(x_1,y_1, x_2, y_2, strokeColour,strokeWidth=1, ct=ctx){
    ct.beginPath();
    ct.moveTo(x_1,y_1);
    ct.lineTo(x_2,y_2);
    ct.lineCap = "round";
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.stroke()
}

/**
 * Draw a stroked circle
 * @param {number} x x centre
 * @param {number} y y centre
 * @param {number} r radius
 * @param {string} strokeColour strokeColour
 * @param {string} strokeWidth default = 1
 * @param {object} ct default = ctx
 */
function drawStrokeCircle(x,y,r,strokeColour, strokeWidth= 1,ct=ctx){
    ct.beginPath();
    ct.arc(x,y,r, 0 , 2*Math.PI)
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.stroke()
}
/**
 * Draw a stroked circle
 * @param {number} x x centre
 * @param {number} y y centre
 * @param {number} r radius
 * @param {string} fillColour fillColour
 * @param {string} strokeColour strokeColour
 * @param {string} strokeWidth default = 1
 * @param {object} ct default = ctx
 */
function drawFilledStrokeCircle(x,y,r,fillColour, strokeColour, strokeWidth= 1,ct=ctx){
    ct.beginPath();
    ct.arc(x,y,r, 0 , 2*Math.PI)
    ct.fillStyle = fillColour
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.fill()
    ct.stroke()
}
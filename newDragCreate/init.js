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
my_c.style.border = "0px solid rgba(200,200,200,0.5)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(190,190,190)";


canvasSecond = document.querySelector('#mySecondCanvas');
let ctx_s = canvasSecond.getContext('2d');
canvasSecond.width = width*scale;
canvasSecond.height = height*scale;
ctx_s.scale(scale,scale);

let my_sc = document.getElementById('mySecondCanvas');
my_sc.style.backgroundColor = "rgb(100,100,100)"
my_sc.style.width = width+"px";
my_sc.style.height = height+"px";
my_sc.style.border = "0px solid rgba(200,200,200,0.5)";
my_sc.style.display = "none";
my_sc.style.margin = "auto";


// two dimensional array of colours
const col= [
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
        "rgba(0,0,0,0.5)" , "rgba(150,150,150,0.5)", "rgba(255,255,255,0.5)" ,
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
    mUp(){
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
    }
}



class CanvasImage{
    constructor(img){
        this.img = img
    }
    update(){
        ctx.drawImage(this.img, 0,0,width,height)
    }
}


class MouseMover extends InteractiveObject{
    constructor(x,y,w,h) {
        super();
        this.brush = null;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    mMove(e){
        // update positions so this can be used in another object
        let x_0 = this.xMouse
        let y_0 = this.yMouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        let x_1 = this.xMouse
        let y_1 = this.yMouse
        //console.log("moving")
        let dx = x_1 - x_0
        let dy = y_1 - y_0
        console.log(dx)
        let x_c = width/2
        let y_c = height/2
        if(this.mouseIsDown) {
            this.drawLine(this.xMouse, this.yMouse, this.xMouse + 10 * dx, this.yMouse + 10 * dy, "rgba(255,255,255,0.4)", 1, ctx_s)
        }
    }
    mUp(){
        super.mUp()
        let img = canvasSecond.toDataURL("image/png");
        // create new JS image and set source
        let copiedImage = new Image()
        copiedImage.src = img
        // create the image object (mine) and push
        let temp = new CanvasImage(copiedImage)
        this.brush=temp;
        //ctx_s.clearRect(0,0,width,height)
    }

    update(){
        ctx.save()
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.clip()
        if(this.mouseIsDown) {
            ctx.drawImage(canvasSecond, 0, 0, width, height);
        }
        if(this.brush && !this.mouseIsDown){

            this.brush.update()
        }
        ctx.restore()

    }
}
MouseMover.prototype.drawLine = drawLine



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

function basicRect(x,y,w,h,colour){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fillStyle = colour;
    ctx.fill()
}

function strokeRect(x,y,w,h,colour="rgb(255,255,200)", l=1){
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.lineWidth = l
    ctx.strokeStyle = colour;
    ctx.stroke()
}

function centredText(txt, x_c, y_c, colour){
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.txtColour;
    ctx.fillText(txt, x_c, y_c);

}

function drawLine(x_1,y_1, x_2, y_2, strokeColour,strokeWidth, ct=ctx){
    ct.beginPath();
    ct.moveTo(x_1,y_1);
    ct.lineTo(x_2,y_2);
    ct.lineCap = "round";
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.stroke()
}
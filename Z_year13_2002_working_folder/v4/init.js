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
my_sc.style.display = "block";
my_sc.style.margin = "auto";


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

//---------------------  Objects
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
 * Slider
 * @param {number} x left x
 * @param {number} y middle y
 * @param {number} w width
 * @param {number} r radius dragger
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Slider extends InteractiveObject{
    // all the functions of InteractiveObject are part of InteractiveBall
    constructor(x,y,w,r,fill, stroke, strokeWidth){
        // super initialises the constructor of InteractiveObject
        super()
        this.x = x;
        this.y = y;
        this.minV = 3
        this.maxV = 10


        this.w = w;
        this.r = r;

        this.x_s = x+w/2;
        this.y_s = y;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.value = this.getValue()


    }
// we are now overriding the mouse down function in the original interactive object
// because we need to add to it
    mDown(e){
        // call the super function so the variables update
        super.mDown(e)
        // introduce a get boundary call
        // passing the x, y of the ball and the mouse position and the radius
        if( this.getDistance(this.x_s, this.y_s, this.xMouse, this.yMouse, this.r) ){
            // if the mouse goes down and we are in the boundary
            // then we can say the ball is selected
            Slider.taken = this;
        }
    }

    update(){
        this.value = this.getValue()
        this.draw();

        // if selected is true all good for ball to follow mouse
        if(Slider.taken === this){
            this.x_s = this.xMouse;
            if(this.x_s < this.x){
                this.x_s= this.x
            }else if(this.x_s > this.x +this.w){
                this.x_s= this.x +this.w
            }

        }
        if(!this.mouseIsDown){
            Slider.taken="";
        }
    }
    getValue(){
        return Math.round(this.minV +(this.maxV-this.minV)*(this.x_s - this.x)/this.w )
    }

    draw(){
        this.drawLine(this.x, this.y, this.x+ this.w, this.y, "rgb(255,255,255)")
        let fill = this.fill
        if(Slider.taken === this){
            fill = "rgb(255,255,255)"
        }
        this.drawCircle(this.x_s, this.y_s, this.r, fill, this.stroke, this.strokeWidth)
        this.centredText(this.value.toString(), this.x_s, this.y, "rgb(200,200,0)")
    }

}
Slider.prototype.drawCircle= drawFilledStrokeCircle
Slider.prototype.drawLine = drawLine
Slider.prototype.centredText = centredText
// create a static variable this will hold the point that is selected
// only one point can ever be selected
Slider.taken = ""



/**
 * Grid - square grid
 * @param {number} x left x
 * @param {number} y top y
 * @param {number} w width of canvas
 * @param {number} h height of canvas
 * @param {number} intervalWidth distance each grid unit
 * @param {string} strokeColour stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Grid{
    constructor(x,y,w,h,intervalWidth, strokeColour="rgb(255,255,255)", strokeWidth=0.25){
        this.x = x;
        this.y= y;
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
        //vertical line
        for(let i = 0 ; i <= this.w ; i+= this.intervalWidth){
            this.drawLine(i+this.x,this.y, i+this.x,this.y + this.h, this.strokeColour, this.strokeWidth);
        }
        //horizontal line
        for(let j =0 ; j <= this.h ; j+= this.intervalWidth){
            this.drawLine(this.x,j+this.y, this.x +this.w,j+this.y, this.strokeColour, this.strokeWidth);
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
    constructor(xS, yS, xM, yM , fill) {
        this.x = xS
        this.y = yS
        this.w = xM - xS
        this.h = yM - yS
        this.fill = fill
    }
    update(){
        this.basicRect(this.x, this.y,this.w, this.h, this.fill )
    }
}
Rectangle.prototype.basicRect = basicRect


/**
 * Create a Ellipse Object - No Stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill Colour
 */
class Ellipse{
    constructor(xS, yS, xM, yM , fill){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.xRad = Math.abs((xM-xS)/2);
        this.yRad = Math.abs((yM-yS)/2);
        this.fill = fill;

    }

    update(){
        this.draw();

    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xRad, this.yRad, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

}
/**
 * Create a Circle Object - No Stroke
 * @param {number} xS x Mouse Start
 * @param {number} yS y Mouse Start
 * @param {number} xM current x Mouse
 * @param {number} yM current y Mouse
 * @param {string} fillColour fill Colour
 */
class Circle{
    constructor(xS, yS, xM, yM , fillColour){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.r = Math.min(Math.abs(xM-xS) , Math.abs(yM-yS) )/2
        this.fillColour = fillColour;
        console.log("Circle Instantiated")

    }

    update(){
        this.draw();

    }

    draw(){
        ctx.fillStyle = this.fillColour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }

}
/**
 * Create a Polygon Object - No Stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill Colour
 */
class Polygon extends Circle{
    constructor(xS, yS, xM, yM , fillColour,n) {
        super(xS, yS, xM, yM , fillColour);
        this.n = n
        this.points = this.computePoints(this.r,this.n)
        console.log("Polygon Instantiated")

    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.beginPath()
        let x = this.points[0][0]
        let y = this.points[0][1]
        ctx.moveTo(x,y)
        for(let i=1; i<this.points.length; i++){
            x=this.points[i][0]
            y=this.points[i][1]
            ctx.lineTo(x,y)
        }
        ctx.closePath()
        ctx.fillStyle = this.fillColour
        ctx.fill()


        ctx.restore()
    }
    computePoints(r,n){
        let points = []
        let x = 0
        let y = 0
        for(let i =0; i<n; i++){
            x = r*Math.cos(i*2*Math.PI/n + Math.PI/2 + 2*Math.PI/(2*n))
            y = r*Math.sin(i*2*Math.PI/n + Math.PI/2 + 2*Math.PI/(2*n))
            points.push([x,y])
        }
        return points
    }
}
class Star extends Polygon{
    constructor(xS, yS, xM, yM , fillColour,n, prop = 0.5) {
        super(xS, yS, xM, yM , fillColour,n);
        this.r_inner= 0.5*this.r
        this.n = n
        this.points = this.computePoints(this.r,this.n)


    }
    computePoints(r,n){

        let points = []
        let p=2*n
        let x = 0
        let y = 0
        for(let i =0; i<p; i++){
            let rad=0
            if(i%2===0){
                rad = this.r_inner
            }
            else{
                rad = r
            }
            x = rad*Math.cos(i*2*Math.PI/p + Math.PI/2 )
            y = rad*Math.sin(i*2*Math.PI/p + Math.PI/2 )
            points.push([x,y])
        }
        return points
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
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colour;
    ctx.fillText(txt, x_c, y_c);
}
/**
 * Draw a line
 * @param {number} x_1 x_1
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

function roundedRect(x,y,w,h,fill,stroke){
    let r = h/4
    let x_l = x+r
    let y_l = y+r
    ctx.beginPath()
    ctx.arc(x_l, y_l, r, Math.PI/2, 3*Math.PI/2)
    ctx.lineTo(x+w-2*r, y)
    ctx.arc(x_l+w-2*r, y_l, r, 3*Math.PI/2, Math.PI/2)
    ctx.closePath()
    ctx.strokeStyle = stroke
    ctx.lineWidth = 1;
    ctx.stroke()


}
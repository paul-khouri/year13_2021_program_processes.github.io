/**
 * Grid - square grid
 * @param {number} w width of canvas
 * @param {number} h height of canvas
 * @param {number} intervalWidth height of canvas
 * @param {string} strokeColour stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Grid{
    constructor(w,h,intervalWidth, strokeColour, strokeWidth){
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
        this.drawCircle(0,0,20,undefined,col.pink, 5);
        this.drawLine(-this.w,0, this.w, 0, col.pink, 4);
        this.drawLine(0, -this.h, 0, this.h, col.pink, 4);
    }
}
Grid.prototype.drawCircle = drawCircle
Grid.prototype.drawLine = drawLine
Grid.prototype.updateContext = updateContext



/**
 * Filled Ball
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Ball{
    constructor(x,y,r,fill, stroke, strokeWidth){
        this.x = x;
        this.y = y;
        this.r=r;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        this.mouseIsDown = false;
    }
    mDown(e){

        let output = "This mouse went down at  x = " + e.offsetX + " and y = " + e.offsetY;
        this.mouseIsDown = true;
        console.log(output)

    }
    mUp(e){
        let output = "This mouse went up at x = " + e.offsetX + " and y = " + e.offsetY;
        console.log(output);
        this.mouseIsDown = false;


    }
    mMove(e){
        this.x = e.offsetX;
        this.y = e.offsetY;
        console.log("moving")
        if(this.mouseIsDown) {
            ctx.clearRect(0,0,width, height);
            this.draw();
        }

    }
    update(){
        this.draw();
    }
    draw(){
        this.drawCircle(this.x, this.y, this.r, this.fill, this.stroke, this.strokeWidth)
    }
}
Ball.prototype.drawCircle = drawCircle
Ball.prototype.updateContext = updateContext

/**
 * Filled Rectangle
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Rectangle{
    constructor(x,y,w,h,fill, stroke, strokeWidth){
        this.x = x;
        this.y = y;
        this.w=w;
        this.h=h;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
    }
    draw(){
        this.drawRectangle(this.x, this.y, this.w, this.h, this.fill, this.stroke, this.strokeWidth)
    }
}
Rectangle.prototype.drawRectangle = drawRectangle
Rectangle.prototype.updateContext = updateContext





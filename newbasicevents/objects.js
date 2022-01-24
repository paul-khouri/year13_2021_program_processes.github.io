/**
 * Interactive Ball
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} r radius of ball
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class InteractiveBall{
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
        this.xMouse = 0
        this.yMouse = 0
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
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        console.log("moving")
    }
    update(){
        this.draw();
    }
    draw(){
        this.drawCircle(this.x, this.y, this.r, this.fill, this.stroke, this.strokeWidth)
    }
    drawCircle(x,y,r,f,s,l){
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fillStyle = f
        ctx.strokeStyle = s
        ctx.lineWidth = l
        ctx.fill();
        ctx.stroke()
    }
}
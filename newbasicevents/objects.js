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
    mDown(e){
        // update positions so this can be used in another object
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
        //once you have got the idea, comment out these (and remove later)
        let output = "This mouse went DOWN at  x = " + e.offsetX + " and y = " + e.offsetY;
       // console.log(output)
    }
    mUp(e){
        // if the mouse is up, it can't be down :)
        this.mouseIsDown = false;
        //once you have got the idea, comment out these (and remove later)
        let output = "This mouse went UP at x = " + e.offsetX + " and y = " + e.offsetY;
        //console.log(output);

    }
    mMove(e){
        // update positions so this can be used in another object

        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;

        //console.log("moving")



    }
    mLeave(e){
        // this might be a useful safety feature
        // we could set mouseIsDown to false when the mouse leave the canvas
        console.log("Mouse has left the canvas")
    }
}


/**
 * Interactive Ball
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} r radius of ball
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class InteractiveBall extends InteractiveObject{
    // all the functions of InteractiveObject are part of InteractiveBall
    constructor(x,y,r,fill, stroke, strokeWidth){
        // super initialises the constructor of InteractiveObject
        super()
        this.x = x;
        this.y = y;
        this.r=r;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw();
        // check if mouse is down and update x, y coordinates of the ball
        // to be the same as the x,y mouse positions
        if(this.mouseIsDown){
            this.x = this.xMouse;
            this.y = this.yMouse;
        }
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

/**
 * Interactive Ball Better
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} r radius of ball
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class InteractiveBallBetter extends InteractiveObject{
    // all the functions of InteractiveObject are part of InteractiveBall
    constructor(x,y,r,fill, stroke, strokeWidth){
        // super initialises the constructor of InteractiveObject
        super()
        this.x = x;
        this.y = y;
        this.r=r;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.selected = false;
        this.group = [];
    }
// we are now overriding the mouse down function in the original interactive object
// because we need to add to it
    mDown(e){
        // call the super function so the variables update
        super.mDown(e)
        // introduce a get boundary call
        // passing the x, y of the ball and the mouse position and the radius
        if( this.getBoundary(this.x, this.y, this.xMouse, this.yMouse, this.r) ){
            // if the mouse goes down and we are in the boundary
            // then we can say the ball is selected
            InteractiveBallBetter.taken = this;
        }
    }

    update(){
        this.draw();

        // if selected is true all good for ball to follow mouse
        if(InteractiveBallBetter.taken === this){
            this.x = this.xMouse;
            this.y = this.yMouse;
        }
        if(!this.mouseIsDown){
            InteractiveBallBetter.taken="";
        }
    }
    // boundary check function
    getBoundary(x_c, y_c, x_m, y_m, r){
        let d= Math.sqrt(Math.pow(x_m - x_c , 2) + Math.pow(y_m - y_c , 2) )
        if(d<r){
            return true
        }else{
            return false
        }
    }
    draw(){
        let fill = this.fill
        if(this.selected){
            fill = "rgb(255,255,255)"
        }
        this.drawCircle(this.x, this.y, this.r, fill, this.stroke, this.strokeWidth)
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
// create a static variable this will hold the point that is selected
// only one point can ever be selected
InteractiveBallBetter.taken = ""



/**
 * Orbiting Circle
 * @param {number} x circle centre
 * @param {number} y circle centre
 * @param {number} r radius
 * @param {number} width range for horizontal movement
 * @param {number} height range for vertical movement
 * @param {string} fillcolour ball colour
 */
class MovingCircle{
    constructor(x,y,radius, width, height, fillcolour){
        // initial variables
        this.x_s = x;
        this.y_s = y;
        this.r = radius;
        this.h = height;
        this.A = height/2
        this.w = width

        // current variables
        this.x = x;
        this.y = y;

        // styling
        this.fill=fillcolour;
        // timer and rate
        this.t = 0;
        this.B = 200
    }

    update(){
        this.draw()
        this.t += 1
    }
    draw(){
        this.drawRect();
        this.x = this.x + Math.sign(Math.sin((2*Math.PI / (2*this.w)) * this.t))

        this.y = this.y_s + this.A*Math.cos((2*Math.PI / (this.B)) * this.t) + this.A
        this.drawCircle();
    }
    drawCircle(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
        ctx.fillStyle = this.fill
        ctx.fill();
    }

    drawRect(){
        ctx.beginPath()
        ctx.rect(this.x_s, this.y_s, this.w, this.h)
        ctx.strokeStyle = this.fill;
        ctx.stroke()
    }

}
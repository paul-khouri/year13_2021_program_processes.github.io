console.log(" ellipse js called");

class Ellipse{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour){
    this.x = xMouseStart;
    this.y = yMouseStart;
    this.w = xMouse - xMouseStart;
    this.h = yMouse - yMouseStart;
    this.xC = this.x + this.w/2;
    this.yC = this.y + this.h/2;
    this.xR = Math.abs(this.w/2);
    this.yR = Math.abs(this.h/2);
    this.fcolour = fcolour;
    }

    update(){
        this.draw()
    }

    draw(){
        ctx.fillStyle = this.fcolour;
        ctx.beginPath();
        ctx.ellipse(this.xC, this.yC, this.xR, this.yR, 0, 0,2*Math.PI);
        ctx.fill();
    }
}
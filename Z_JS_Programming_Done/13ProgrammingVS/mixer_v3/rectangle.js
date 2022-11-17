console.log(" rectangle js called");

class Rectangle{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour, scolour, lw){
    this.x = xMouseStart;
    this.y = yMouseStart;
    this.w = xMouse - xMouseStart;
    this.h = yMouse - yMouseStart;
    this.fcolour = fcolour;
    this.scolour = scolour;
    this.lw = lw;
    }

    update(){
        this.draw()
    }

    draw(){
        ctx.fillStyle = this.fcolour;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.lineWidth = this.lw;
        ctx.strokeStyle= this.scolour;
        ctx.fill();
        ctx.stroke();
        
    }
}
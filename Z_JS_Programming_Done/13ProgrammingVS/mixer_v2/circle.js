console.log("star js loaded");
class Circle{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour){
    this.x = xMouseStart;
    this.y = yMouseStart;
    this.w = xMouse - xMouseStart;
    this.h = yMouse - yMouseStart;
    this.xC = this.x + this.w/2;
    this.yC = this.y + this.w/2;
    this.R = Math.abs(this.w/2);
    this.fcolour = fcolour;

    if(this.h < 0 ){
        this.yC = this.y - Math.abs(this.w/2);
    }
    if(this.h > 0 && this.w < 0){
        this.yC = this.y + Math.abs(this.w/2);
    }


    }

    update(){
        this.draw()
    }

    draw(){
        ctx.fillStyle = this.fcolour;
        ctx.beginPath();
        ctx.arc(this.xC , this.yC, this.R, 0, 2*Math.PI);
        ctx.fill();
    }
}
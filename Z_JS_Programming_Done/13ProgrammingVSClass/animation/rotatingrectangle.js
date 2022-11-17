console.log("rotating js rectangle called");

class RotatingRectangle{
    constructor(xC,yC,w,h, fcol){
        this.xC = xC;
        this.yC = yC;
        this.w = w;
        this.h = h;
        this.fcol = fcol;
        this.degrees = 45;


    }


    update(){
        this.degrees +=10;
        this.draw();

    }

    draw(){
        ctx.save();
        ctx.translate(this.xC, this.yC);
        ctx.rotate(this.degrees*Math.PI/180);
        ctx.beginPath();
        ctx.rect(-this.w/2 ,  -this.h/2, this.w, this.h);
        ctx.fillStyle=this.fcol;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0,0, 30, 0, 2*Math.PI);
        ctx.strokeStyle='rgb(255,255,255)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }


}
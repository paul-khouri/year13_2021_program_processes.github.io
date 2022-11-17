console.log(" rotating circles js loaded")

class RotatingCircle{
    constructor(xC, yC, R, c1, c2, c3){
        this.xC = xC;
        this.yC = yC;
        this.R = R;
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.angle = 0;
    }

    update(){
    this.angle +=1;
    this.draw();

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.xC, this.yC, this.R, 0, 2*Math.PI);
        ctx.fillStyle = this.c1;
        ctx.strokeStyle = this.c3;
        ctx.lineWidth = this.R/2;
        ctx.fill();
        ctx.stroke();
        this.drawRotatedCircle(3*this.angle);
        this.drawRotatedCircle(-4*this.angle);
        this.drawRotatedCircle(-1*this.angle);

    }

    drawRotatedCircle(ang){
        ctx.save();
        ctx.translate(this.xC, this.yC);
        ctx.rotate(ang*Math.PI/180);
        ctx.beginPath();
        ctx.arc(this.R/2, 0, this.R/2, 0, 2*Math.PI);
        ctx.fillStyle=this.c2;
        ctx.fill();
        ctx.restore();
        

    }


}
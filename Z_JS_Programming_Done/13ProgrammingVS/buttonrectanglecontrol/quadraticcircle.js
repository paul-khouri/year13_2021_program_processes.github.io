console.log('quadratic circle js called');
class QuadraticCircle{
    constructor(x,y, r, h, fill, interval){
        this.x = x;
        this.y = y;
        this.r = r;
        this.h = h;
        this.y_0 = this.y +0;
        this.fill = fill;
        this.T = interval;
        this.count = 0;


    }

    update(){
        this.count += 1;
        this.count = this.count%this.T;
        if(this.count <= this.T/2){
            this.y_0 = this.y + Math.pow(this.count,2)*4*this.h/Math.pow(this.T,2);
        }else{
            this.y_0 = this.y + Math.pow( (this.count-this.T), 2)*4*this.h/Math.pow(this.T,2);

        }

        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y_0, this.r, 0, 2*Math.PI);
        ctx.fill();
    }
}
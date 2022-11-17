console.log("bouncing ball js called")

class BouncingBall{
    constructor(x,y,w,h,c1, R, dy){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = c1;
        this.R = R;
        this.dy = dy;
        this.xC = x + w/2;
        this.yC = y +h/2;
    }

    update(){
       /* if(this.yC > this.y + this.h  || this.yC < this.y){
            this.dy = -this.dy;

        }
*/
        this.yC += this.dy;

        this.draw();


    }
    draw(){
        this.drawRect(this.x, this.y, this.w, this.h,this.col);
        this.drawCircle(this.xC, this.yC, this.R,this.col);
    }
    drawRect(x,y,w,h, col){
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.strokeStyle = col;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    drawCircle(x,y,R,col){
        ctx.beginPath();
        ctx.arc(x,y,R, 0, 2*Math.PI);
        ctx.fillStyle=col;
        ctx.fill();

    }



}
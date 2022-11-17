class BounceCircle{
    constructor(xC,yC, R, col){
        this.xC = xC;
        this.yC = yC;
        this.R = R;
        this.col = col;
    }

    update(){
        this.draw();
    }


    draw(){
        ctx.beginPath();
        ctx.arc(this.xC, this.yC, this.R, 0, 2*Math.PI);
        ctx.strokeStyle = this.col;
        ctx.lineWidth = 1;
        ctx.stroke();
  
    }

    getX(){
        return this.xC;

    }
    getY(){
        return this.yC;

    }

    getR(){
        return this.R;
    }


}
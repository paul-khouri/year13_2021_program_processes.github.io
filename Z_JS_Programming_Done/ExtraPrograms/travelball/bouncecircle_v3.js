class BounceCircle{
    constructor(xC,yC, R, col,start, end){
        this.xC = xC;
        this.yC = yC;
        this.R = R;
        this.col = col;
        this.startAngle = start;
        this.endAngle = end;
    }

    update(){
        this.draw();
    }


    draw(){
        ctx.beginPath();
        ctx.arc(this.xC, this.yC, this.R, this.startAngle, this.endAngle);
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

    getOpen(a){
        if(this.startAngle > this.endAngle){
        
            if( a < this.startAngle  &&  a > this.endAngle){
            
            return true;

        }else{

            return false;
        }
    }else{

        if( a < this.startAngle  ||  a > this.endAngle){
            
            return true;

        }else{
            return false;
        }


    }

    }

    getR(){
        return this.R;
    }


}
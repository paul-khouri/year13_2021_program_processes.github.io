class Ball{
    constructor(xC,yC, R, col, speed, travelAngle) {
        this.xC = xC;
        this.yC = yC;
        this.R = R;
        this.col = col;
        this.speed = speed;
        this.travelAngle = travelAngle;
        
    }

    update(){
        this.xC += this.speed*Math.cos(this.travelAngle);
        this.yC += this.speed*Math.sin(this.travelAngle);
        this.drawLine(this.xC, this.yC, this.xC+ 10*this.speed*Math.cos(this.travelAngle), this.yC+ 10*this.speed*Math.sin(this.travelAngle) )
        this.draw();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.xC, this.yC, this.R, 0, 2*Math.PI);
        ctx.fillStyle= this.col;
        ctx.fill();
    }

    getTravelAngle(){
        return this.travelAngle
    }

    setTravelAngle(a){
        this.travelAngle = a;
    }

    setSpeed(s){
        this.speed = s;
    }

    getSpeed(){
        return this.speed;
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


    
    drawLine(x1,y1,x2,y2, lineWidth){
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this.colOne;
        ctx.stroke();
        
    }

}
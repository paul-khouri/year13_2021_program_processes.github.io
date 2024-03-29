console.log("point js file has been called");

class Point{
    constructor(){

    }
}


class MoveRectangle{
// class  MoveRectangle xS, yS, xM, yM, col, canvas
constructor(xS, yS, xM, yM, col, canvas){
    this.xC = (xS+xM)/2;
    this.yC = (yS+yM)/2;
    this.w = Math.abs(xM-xS);
    this.h = Math.abs(yM-yS);
    this.fill = col;
    if( this.w < this.h){
        this.r = this.w/2;
    }else{
        this.r = this.h/2;
    }

    this.stroke = "rgb(0,0,255)"
  

    this.inBounds = false;

    this.element = canvas;
    this.xMouse = 0;
    this.yMouse = 0;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));
  
}

mDown(e){
    if(this.inBounds){
        Point.taken = this;
    }

}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.xC, this.yC, this.r);
}
mUp(e){
    Point.taken = "";
}
update(){

 

    this.drawRect(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill);
    if(Button.shape == "Move" ){
        if(Point.taken == this){
            this.xC=this.xMouse;
            this.yC=this.yMouse;
        }

        this.draw();

    }
    
}
draw(){
    
    
    
    
    if(this.inBounds || Point.taken == this){
        ctx.fillStyle= "rgba(255,0,0, 0)";
    }else{
        ctx.fillStyle= "rgba(0,255,0, 0)";
    }
 
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 1;
    ctx.beginPath()
    ctx.arc(this.xC,this.yC, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

drawRect(x,y,w,h,col){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = col;
    ctx.fill();
}

boundsCheck(x_1, y_1, x_2, y_2, r){
        var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        if(d<r){
            return true;
        }else{
            return false;
        }

}
// these allow other parts of the program to get the xC  and yC values of the point
getX(){
    return this.xC;
}

getY(){
    return this.yC;
}

}
Point.taken="";





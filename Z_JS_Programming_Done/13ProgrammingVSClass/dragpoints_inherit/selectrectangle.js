console.log("point js file has been called");
class SelectRectangle{
// class Point xC,yC,w,h,r, stroke, fill, over, canvas 
constructor(xC,yC,w,h,r, stroke, fill, over, canvas){
    this.xC = xC;
    this.yC = yC;
    this.r = r;
    this.w = w;
    this.h = h;
    this.stroke = stroke;
    this.fill = fill;
    this.over = over;
    this.inBounds = false;

    this.element = canvas;
    this.xMouse = 0;
    this.yMouse = 0;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));

    if( Math.abs(this.w)< Math.abs(this.h)){
        this.r = Math.abs(this.w/2);
    }else{
        this.r = Math.abs(this.h/2);
    }
    console.log(this.r);
  
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

    if(Point.taken == this){
        this.xC=this.xMouse;
        this.yC=this.yMouse;
    }

    this.draw();
}
draw(){
    var toStroke = false;
    if(this.inBounds || Point.taken == this){
        ctx.fillStyle= this.over;
        toStroke = true;
    }else{
        ctx.fillStyle= this.fill;
    }
    this.drawRect(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke);
    ctx.fillStyle = "rgba(255,255,255,0)";
    ctx.beginPath()
    ctx.arc(this.xC,this.yC, this.r, 0, 2*Math.PI);
    ctx.fill();
   
}

drawRect(x,y,w,h,col, toStroke){
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = col;
    ctx.fill();
    if(toStroke){
        ctx.stroke()
    }
    ctx.restore();
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

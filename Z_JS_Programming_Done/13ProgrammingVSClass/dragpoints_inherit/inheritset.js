console.log("point js file has been called");
// super class
class Point{
// class Point xC,yC,r, stroke, fill, over, canvas 
constructor(xC,yC,r, stroke, fill, over, canvas){
    this.xC = xC;
    this.yC = yC;
    this.r = r;
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
    if(this.inBounds || Point.taken == this){
    ctx.fillStyle= this.over;
    }else{
        ctx.fillStyle= this.fill;
    }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(this.xC,this.yC, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

drawRect(x,y,w,h,col, toStroke){
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = col;
    ctx.fill();
    if(toStroke){
        ctx.strokeStyle = this.stroke;
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

//-------------------------------------------------------------

class MoveRectangle extends Point{
    constructor(xC,yC,r, stroke, fill, over, canvas,w,h){
        super(xC,yC,r, stroke, fill, over, canvas)
        this.w = w;
        this.h = h;
    }

    draw(){
        super.drawRect(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill);
        super.draw();
    }
}
//--------------------------------------------------------------

class SelectRectangle extends Point{
    constructor(xC,yC,r, stroke, fill, over, canvas,w,h){
        super(xC,yC,r, stroke, fill, over, canvas)
        this.w = w;
        this.h = h;

        if( Math.abs(this.w)< Math.abs(this.h)){
            this.r = Math.abs(this.w/2);
        }else{
            this.r = Math.abs(this.h/2);
        }
    }

    draw(){
        var toStroke = false;
        if(this.inBounds || Point.taken == this){
            ctx.fillStyle= this.over;
            toStroke = true;
        }else{
            ctx.fillStyle= this.fill;
        }
        super.drawRect(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke);
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.beginPath()
        ctx.arc(this.xC,this.yC, this.r, 0, 2*Math.PI);
        ctx.fill();
       
    }
}

//--------------------------------------------------------------------

class SelectRectangleRotate extends Point{
    constructor(xC,yC,r, stroke, fill, over, canvas,w,h, ang){
        super(xC,yC,r, stroke, fill, over, canvas)
        this.w = w;
        this.h = h;
        this.ang = ang;

        if( Math.abs(this.w)< Math.abs(this.h)){
            this.r = Math.abs(this.w/2);
        }else{
            this.r = Math.abs(this.h/2);
        }
    }

    update(){
        super.update();
        this.ang += 0.5;
    }

    draw(){
        var toStroke = false;
        if(this.inBounds || Point.taken == this){
            ctx.fillStyle= this.over;
            toStroke = true;
        }else{
            ctx.fillStyle= this.fill;
        }
        this.drawShape(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke, this.ang);
        this.drawShape(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke, -0.5*this.ang);
        this.drawShape(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke, -0.25*this.ang);
        this.drawShape(this.xC - this.w/2, this.yC - this.h/2, this.w, this.h, this.fill, toStroke, 0.5*this.ang);
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.beginPath()
        ctx.arc(this.xC,this.yC, this.r, 0, 2*Math.PI);
        ctx.fill();
       
    }



    drawShape(x,y,w,h,col, toStroke, ang){
        ctx.save();
        ctx.translate(x+w/2, y+h/2);
        ctx.rotate(ang*Math.PI/180);
        ctx.beginPath();
        ctx.rect(-w/2, -h/2, w, h);
        ctx.fillStyle = col;
        ctx.fill();
        if(toStroke){
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = this.stroke;
            ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(w/2+2*Math.abs(w/5),0, Math.abs(w/5), 0, 2*Math.PI);
        if(toStroke){
            ctx.stroke();
        }
        ctx.fill();
        ctx.beginPath()
        ctx.arc(-w/2-2*Math.abs(h/5),0, Math.abs(h/5), 0, 2*Math.PI);
        if(toStroke){
            ctx.stroke();
        }
        ctx.fill();
        ctx.restore();
    }
}
console.log("point js file has been called");
class Point{
// class Point x,y,r, stroke, fill, over, canvas 
constructor(x,y,r, stroke, fill, over, canvas){
    this.x = x;
    this.y = y;
    this.r = r;
    this.stroke = stroke;
    this.fill = fill;
    this.over = over;
    this.inBounds = false;
    this.mouseDown = false;
    this.element = canvas;
    this.xMouse = 0;
    this.yMouse = 0;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));
    this.dragging = false;
}

mDown(e){
    this.mouseDown = true;

}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.r);
}
mUp(e){
    this.mouseDown = false;
    this.dragging = false;
    Point.taken = "";

}
update(){
    if(Point.taken == "" && this.inBounds && this.mouseDown){
        this.dragging = true;
        Point.taken = this;
    }
    if(this.dragging){
        this.x=this.xMouse;
        this.y=this.yMouse;
    }

    this.draw();
}
draw(){
    if(this.inBounds && Point.taken == ""){
    ctx.fillStyle= this.over;
    }else{
        ctx.fillStyle= this.fill;
    }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(this.x,this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

boundsCheck(x_1, y_1, x_2, y_2, r){
        var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        if(d<r){
            return true;
        }else{
            return false;
        }

}

getX(){
    return this.x;
}

getY(){
    return this.y;
}

setX(x){
    if(this.mouseDown == false){
    this.x = x;
}

}
setY(y){
    if(this.mouseDown == false){
    this.y = y;
}
}

}
Point.taken="";
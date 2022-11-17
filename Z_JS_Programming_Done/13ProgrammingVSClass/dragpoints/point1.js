console.log("point js file has been called");

// does not have static variable to ensure only one point is selected
class Point{
// class Point x,y,r, stroke, fill, over, canvas 
constructor(x,y,r, stroke, fill, over, canvas){
    this.x = x;
    this.y = y;
    this.r = r;
    this.stroke = stroke;
    this.fill = fill;
    this.over = over;

    this.xMouse = 0;
    this.yMouse = 0;

    this.element = canvas;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));

    this.inBounds = false;
    this.dragging = false;
  
}

mDown(e){
    console.log("mouse down");
    if(this.inBounds){
        this.dragging = true;
    }

}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.r);
}
mUp(e){
    console.log("mouse up");
    this.dragging = false;

 

}
update(){

    if(this.dragging){
        this.x=this.xMouse;
        this.y=this.yMouse;
    }

    this.draw();
}
draw(){
    if(this.inBounds || this.dragging){
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
// these allow other parts of the program to get the x  and y values of the point
getX(){
    return this.x;
}

getY(){
    return this.y;
}

}
Point.taken="";

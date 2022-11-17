console.log("point js file has been called");
class InertPoint{
// class Point x,y,r, stroke, fill
constructor(x,y,r, stroke, fill){
    this.x = x;
    this.y = y;
    this.r = r;
    this.stroke = stroke;
    this.fill = fill;

}

update(){
    this.draw();
}
draw(){
    ctx.fillStyle= this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(this.x,this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}

getX(){
    return this.x;
}

getY(){
    return this.y;
}

}

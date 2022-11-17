console.log("rectangle js called");


class Rectangle{
constructor(xS,yS,xM,yM, col){
this.x = xS;
this.y = yS;
this.w = xM-xS;
this.h = yM-yS;
this.fill = col;
}

update(){
    this.draw();
}

draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.fill;
    ctx.fill();
}


}
class Box{
constructor(x,y,w,h,col){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;

}
update(){
    this.draw();

}


draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = this.col;
    ctx.stroke();

}


getDimensions(){
    return { 
            xMin: this.x ,
            xMax: this.x+ this.w,
            yMin: this.y,
            yMax: this.y+this.h
        }

}


}
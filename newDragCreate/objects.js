class DrawingPage extends InteractiveObject{
constructor(x,y,w,h,col) {
    super();
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = col
}
update(){
    this.basicRect(this.x, this.y, this.w, this.h, this.c)
    if(this.mouseIsDown){
        this.strokeRect(this.xStart, this.yStart, this.xMouse - this.xStart, this.yMouse-this.yStart)
    }
}
}
DrawingPage.prototype.basicRect = basicRect
DrawingPage.prototype.strokeRect = strokeRect
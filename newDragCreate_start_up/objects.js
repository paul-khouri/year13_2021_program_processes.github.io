class Rectangle{
    constructor(x,y,w,h, fill) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.fill = fill

    }
    update(){
        this.basicRect(this.x, this.y,this.w, this.h, this.fill )
    }

}
Rectangle.prototype.basicRect = basicRect

class DrawingPage extends InteractiveObject{
constructor(x,y,w,h,col) {
    super();
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = col
    this.objectSet = []
}
    mUp(){
        super.mUp()
        let temp = new Rectangle(this.xStart, this.yStart, this.xMouse-this.xStart, this.yMouse - this.yStart, col[1][7])
        this.objectSet.push(temp)
        console.log(this.objectSet)
    }
update(){
    //this.basicRect(this.x, this.y, this.w, this.h, this.c)
    if(this.mouseIsDown){
        this.strokeRect(this.xStart, this.yStart, this.xMouse - this.xStart, this.yMouse-this.yStart)
    }

    for(let i =0 ; i< this.objectSet.length; i++){
        this.objectSet[i].update()
    }
}
}
DrawingPage.prototype.basicRect = basicRect
DrawingPage.prototype.strokeRect = strokeRect
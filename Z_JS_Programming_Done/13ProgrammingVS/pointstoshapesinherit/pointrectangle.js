console.log(" point rectangle js called")
// class PointRectangle x,y,w,h, Point(Class), canvas
class PointRectangle{
    constructor(x,y,w,h, Point, canvas, colourA){
// class Point x,y,r, stroke, fill, over, canvas 
        this.P_1 = new Point(x,y, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.P_2 = new Point(x+w,y+h, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.colArray = colourA;
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;

    }

    update(){
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.P_1.update();
        this.P_2.update();
        this.draw();
    }

    draw(){

        ctx.strokeStyle=this.colArray[0][7];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke(); 
    }

}


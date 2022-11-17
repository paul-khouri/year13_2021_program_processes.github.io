console.log("inheritedset js called");
//-----------------------------------
class RectangleCentre extends PointRectangle{
    constructor(x,y,w,h, Point, canvas, colourA){
        super(x,y,w,h, Point, canvas, colourA);
    }

    update(){
        super.update();
        this.drawCenter();
    }

    drawCenter(){
        ctx.strokeStyle=this.colArray[0][7];
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.arc(this.x+this.w/2,this.y+this.h/2, 3, 0, 2*Math.PI);
        ctx.stroke();
    }

}
//-------------------------------------
class RectangleEllipse extends RectangleCentre{
    constructor(x,y,w,h, Point, canvas, colourA){
        super(x,y,w,h, Point, canvas, colourA);
    }

    update(){
        super.update();
        this.drawEllipse();
    }

    drawEllipse(){
        ctx.fillStyle = this.colArray[1][4];
        ctx.beginPath();
        ctx.ellipse(this.x+this.w/2, this.y+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), 0, 0,2*Math.PI);
        ctx.fill();
    }
}

//--------------------------------

class RectangleSquare extends RectangleCentre{
    constructor(x,y,w,h, Point, canvas, colourA){
        super(x,y,w,h, Point, canvas, colourA);
        this.side = 0;
        this.xC = 0; 
        this.yC = 0;
    }

    update(){
        super.update();
        this.drawSquare();
    }

    drawSquare(){
        this.xC = this.x + this.w/2;
        this.yC = this.y + this.h/2;
        if( Math.abs(this.w) < Math.abs(this.h) ){
            this.side = Math.abs(this.w);
        }else{
            this.side = Math.abs(this.h);
        }

        ctx.strokeStyle=this.colArray[0][0];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.xC-this.side/2,this.yC-this.side/2,this.side,this.side);
        ctx.stroke();
    }

}

//---------------------------------------------

class RectangleCircle extends RectangleSquare{

    constructor(x,y,w,h, Point, canvas, colourA){
        super(x,y,w,h, Point, canvas, colourA);
    }

    drawSquare(){
        super.drawSquare();
        this.drawCircle(this.xC, this.yC, this.side/2);
        


    }

    drawCircle(x,y,r){
        ctx.fillStyle = this.colArray[0][3];
        ctx.beginPath()
        ctx.arc(x,y,r, 0, 2*Math.PI);
        ctx.fill();
    }

}
//----------------------------------------------


class BigCircle extends PointRectangle{
    constructor(x,y,w,h, Point, canvas, colourA){
        super(x,y,w,h, Point, canvas, colourA);
        this.r = 0;
        this.xC = 0;
        this.yC = 0;
        this.xR = 0;
        this.yR = 0;
    }

    update(){
        this.xC = this.P_1.getX();
        this.yC = this.P_1.getY();
        this.xR = this.P_2.getX();
        this.yR = this.P_2.getY();
        this.P_1.update();
        this.P_2.update();
        this.r = Math.sqrt( Math.pow( this.xC - this.xR , 2 ) + Math.pow( this.yC - this.yR , 2) )
        this.draw();

    }

    draw(){

        ctx.strokeStyle = this.colArray[0][0];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(this.xC, this.yC,this.r, 0, 2*Math.PI);
        ctx.stroke();


    }



}

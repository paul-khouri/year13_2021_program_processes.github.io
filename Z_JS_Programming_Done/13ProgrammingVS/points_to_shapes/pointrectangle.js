console.log(" point rectangle js called")
// class PointRectangle x,y,w,h, Point(Class), canvas
class PointRectangle{
    constructor(name,x,y,w,h, Point, canvas, colourA){
// class Point x,y,r, stroke, fill, over, canvas 
        this.P_1 = new Point(x,y, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.P_2 = new Point(x+w,y+h, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.colArray = colourA;
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.name = name;

    }

    update(){
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.P_1.update();
        this.P_2.update();
        if(this.name == "Rectangle"){
        this.draw();
     }
     if(this.name == "RectangleCentre"){
        this.draw();
        this.drawCenter();
     }
     if(this.name == "Ellipse"){
        this.draw();
        this.drawCenter();
        this.drawEllipse();
     }
     if(this.name == "Square" || this.name=="Circle"){
        this.draw();
        this.drawCenter();
        this.drawSquare();
     }
        

    }

    draw(){

        ctx.strokeStyle=this.colArray[0][7];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke(); 
    }

    drawCenter(){
        ctx.strokeStyle=this.colArray[0][7];
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.arc(this.x+this.w/2,this.y+this.h/2, 3, 0, 2*Math.PI);
        ctx.stroke();


    }
    drawEllipse(){
        ctx.fillStyle = this.colArray[1][4];
        ctx.beginPath();
        ctx.ellipse(this.x+this.w/2, this.y+this.h/2, Math.abs(this.w/2), Math.abs(this.h/2), 0, 0,2*Math.PI);
        ctx.fill();
    }
    drawSquare(){
        var squareWidth = 0;
        var squareHeight = 0;
        if( Math.abs(this.w) < Math.abs(this.h) ){
            squareWidth = Math.abs(this.w);
            squareHeight = Math.abs(this.w);
        }else{
            squareWidth = Math.abs(this.h);
            squareHeight = Math.abs(this.h);
        }
        if(this.w < 0){
            squareWidth = - squareWidth;

        }
        if(this.h < 0){
            squareHeight = - squareHeight;

        }


        ctx.strokeStyle=this.colArray[0][0];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,squareWidth,squareHeight);
        ctx.stroke();
        if(this.name == "Circle"){
        this.drawCircle(this.x+squareWidth/2, this.y+squareHeight/2, Math.abs(squareHeight/2));
        }
    }

    drawCircle(x,y,r){
        ctx.fillStyle = this.colArray[0][3];
        ctx.beginPath()
        ctx.arc(x,y,r, 0, 2*Math.PI);
        ctx.fill();
    }




}
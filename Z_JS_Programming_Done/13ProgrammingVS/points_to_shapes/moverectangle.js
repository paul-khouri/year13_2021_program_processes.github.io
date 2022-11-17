console.log(" move rectangle js called")
// class MoveRectangle x,y,w,h, Point(Class), canvas
class MoveRectangle{
    constructor(name,x,y,w,h, Point, canvas, colourA){
// class Point x,y,r, stroke, fill, over, canvas 
        this.P_1 = new Point(x,y, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.P_2 = new Point(x+w,y+h, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.controlP = new Point(x+w/2,y+h/2, 10, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.colArray = colourA;
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.name = name;
        this.firstHit = true;
        this.controlX = 0;
        this.controlY = 0;
        this.P_1_X = 0;
        this.P_1_Y = 0;
        this.P_2_X = 0;
        this.P_2_Y = 0;

    }
    update(){
// updating rectangle parameters using the point coordinates
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.controlP.setX(this.x + this.w/2);
        this.controlP.setY(this.y + this.h/2);
        this.P_1.update();
        this.P_2.update();
        this.controlP.update();
        this.draw();

    if(Point.taken == this.controlP){
        console.log("control is taken");
        
        if(this.firstHit){
            // collect starting coordinates of all points
            this.controlX = this.controlP.getX();
            this.controlY = this.controlP.getY();
            this.P_1_X = this.P_1.getX();
            this.P_1_Y = this.P_1.getY();
            this.P_2_X = this.P_2.getX();
            this.P_2_Y = this.P_2.getY();
            this.firstHit = false;
        }else{
            // get updated coordinate of control point
            var controlXNew = this.controlP.getX();
            var controlYNew = this.controlP.getY();
            // find the change from the start coordinates of the control
            var dx = controlXNew - this.controlX;
            var dy = controlYNew - this.controlY;
            // update controlled point coordinates follwoing change in control point coordinates
            this.P_1.setX( this.P_1_X + dx);
            this.P_1.setY( this.P_1_Y + dy);
            this.P_2.setX( this.P_2_X + dx);
            this.P_2.setY( this.P_2_Y + dy);
        }
    }else{
        this.firstHit = true;
    }


    }


    draw(){

        ctx.strokeStyle=this.colArray[0][7];
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke(); 
    }
}
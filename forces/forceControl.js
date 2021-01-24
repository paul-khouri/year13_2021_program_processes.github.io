console.log("force controjs loaded");

class ForceControl{
    constructor(x_1,y_1,x_2,y_2, colSet, Point, canvas){
        this.colSet = colSet;
        // class Point xC,yC,r, stroke, fill, over, canvas 
        this.ForcePoint = new Point(x_1, y_1,20, colSet[0][0],colSet[0][1],colSet[0][2],canvas);
        this.Attracted = new Point(x_2, y_2,20, colSet[0][0],colSet[0][1],colSet[0][2],canvas);
       
        this.xStart = this.ForcePoint.getX()
        this.t = 0;
        this.dt = 0.05;
        this.velocity = 0;
        this.mass = 1;
        this.k = 1;
        this.x = this.Attracted.getX()-this.ForcePoint.getX();
    }


    update(){

        this.velocity = this.velocity + (-this.k*(this.Attracted.getX()-this.ForcePoint.getX())/this.mass)*this.dt;
        this.x = this.x + this.velocity*this.dt;
        this.ForcePoint.update();
        this.Attracted.setX(this.x+this.xStart);
        this.Attracted.update();
    }

}
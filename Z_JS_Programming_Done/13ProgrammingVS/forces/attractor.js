console.log("attractor js loaded")

class Attractor{
    constructor(x_1,y_1,x_2,y_2, colSet, Point, canvas){
        this.colSet = colSet;
        // class Point xC,yC,r, stroke, fill, over, canvas 
        this.ForcePoint = new Point(x_1, y_1,20, colSet[0][0],colSet[0][1],colSet[0][2],canvas);
        this.Attracted = new Point(x_2, y_2,20, colSet[0][0],colSet[0][1],colSet[0][2],canvas);
        this.dx = 0;
        this.dy = 0;
        this.theta = 0;
        this.Force = 200;

    }

    update(){
        this.ForcePoint.update();
        this.Attracted.update();
        this.dx =  this.ForcePoint.getX() - this.Attracted.getX();
        this.dy =  this.ForcePoint.getY() - this.Attracted.getY();
        this.theta = this.angle(this.dx, this.dy);
        this.writeText("Force Point", 30+this.ForcePoint.getX(), this.ForcePoint.getY());
        this.writeText("Attracted", 30+this.Attracted.getX(), this.Attracted.getY());
        this.writeText(this.theta, this.Attracted.getX(), this.Attracted.getY()+40);
        this.drawArc(this.Attracted.getX(), this.Attracted.getY(), 50, this.theta, 2);

        this.draw();


    }

    draw(){

        this.drawLine(this.ForcePoint.getX(), this.ForcePoint.getY(), this.Attracted.getX(), this.Attracted.getY(), 0.5);
        // vectors
        //this.drawLine(this.Attracted.getX(), this.Attracted.getY(), this.Attracted.getX()+this.dx, this.Attracted.getY(), 0.5);
        //this.drawLine(this.Attracted.getX(), this.Attracted.getY(), this.Attracted.getX(), this.Attracted.getY()+this.dy, 0.5);
        // axes
        //this.drawLine(this.Attracted.getX(), this.Attracted.getY()-50, this.Attracted.getX(), this.Attracted.getY()+50, 1);
        //this.drawLine(this.Attracted.getX()-50, this.Attracted.getY(), this.Attracted.getX()+50, this.Attracted.getY(), 1);
        // force vector
        this.drawLine(this.Attracted.getX(), this.Attracted.getY(), this.Attracted.getX()+this.Force*Math.cos(this.theta), this.Attracted.getY(), 2);
        this.drawLine(this.Attracted.getX(), this.Attracted.getY(), this.Attracted.getX(), this.Attracted.getY()+this.Force*Math.sin(this.theta), 2);
        this.drawLine(this.Attracted.getX(), this.Attracted.getY(), this.Attracted.getX()+this.Force*Math.cos(this.theta), this.Attracted.getY()+this.Force*Math.sin(this.theta), 2);


    }

     writeText(m,x,y){
        var myFont= "10px monospace";
        ctx.fillStyle = "rgb(255,255,255)"
        ctx.font=myFont;
        ctx.fillText(m, x,y);
    }


        // takes x y start and x y end
    drawLine(x_1,y_1,x_2,y_2, lw){
        ctx.lineWidth = lw;
        ctx.strokeStyle= "rgb(255,255,255)";
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2 , y_2);
        ctx.stroke();
    }

    // xC, yC , r, angle, lw
    drawArc(xC,yC,r,ang,lw){
        ctx.lineWidth = lw;
        ctx.strokeStyle= "rgb(255,255,255)";
        ctx.beginPath()
        if(ang<0){
            ctx.arc(xC,yC, r, 0, ang, true);
        }else{
            ctx.arc(xC,yC, r, 0, ang, false);
        }
        ctx.stroke();
        
    }

    getDistance(x_1, y_1, x_2, y_2){
        var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        return d;
    }

    angle(dx, dy){
        // get the angle between the centre and the mouse position
        // quadrants go with coordinate system: Q1 is lower right
        // Q3 | Q4
        //  -----
        // Q2 | Q1 
    var ang = Math.atan(dy/dx);
    
    if(dx > 0 && dy>= 0){
        //console.log("Q1");
        ang = ang;
    }else if(dx < 0 && dy >= 0){
        //console.log("Q2");
        ang = Math.PI + ang;
    }else if(dx < 0 && dy < 0){
        //console.log("Q3");
        //(Math.PI + ang);
        ang = ang- Math.PI;
    }else if(this.dx > 0 && this.dy <=0){
        //console.log("Q4");
        ang = ang;
    }else if(this.dx == 0 && this.dy < 0){
        //console.log("on y below 0");
        ang = -Math.PI/2
    }else if(this.dx == 0 && this.dy > 0){
        //console.log("on y above 0");
        ang = Math.PI/2
    }else{
        // is over the centre
        console.log("no solution");
        ang = 0;
    }
    return ang;
    }



}
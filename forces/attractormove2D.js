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
        this.Force = 100;
        //Force point is 0 point of system
        this.xStart = this.ForcePoint.getX();
        this.yStart = this.ForcePoint.getY();

        this.t = 0;
        this.dt = 0.05;
        this.velocityX = 0;
        this.velocityY = 0;
        this.mass = 10;
        this.k = 0.5;
        this.x = this.Attracted.getX()-this.ForcePoint.getX();
        this.y = this.Attracted.getY()-this.ForcePoint.getY();

        this.distance = this.getDistance(this.Attracted.getX(), this.Attracted.getY(), this.ForcePoint.getX(), this.ForcePoint.getY())
        this.R = this.distance;
    }

    update(){
        this.distance = this.getDistance(this.Attracted.getX(), this.Attracted.getY(), this.ForcePoint.getX(), this.ForcePoint.getY())
        this.Force =  (this.k*this.distance);
        // acceleration vectors
        var xA = (this.k*this.distance/this.mass)*Math.cos(this.theta);
        var yA = (this.k*this.distance/this.mass)*Math.sin(this.theta);
        this.velocityX = this.velocityX + xA*this.dt;
        this.x = this.x + this.velocityX*this.dt;
        this.velocityY = this.velocityY + yA*this.dt;
        this.y = this.y + this.velocityY*this.dt;

        // if the point is moved do a full reset
        if(Point.taken == this.Attracted){
            this.velocityX = 0;
            this.velocityY = 0;
            this.x = this.Attracted.getX()-this.ForcePoint.getX();
            this.y = this.Attracted.getY()-this.ForcePoint.getY();
            this.xStart = this.ForcePoint.getX();
            this.yStart = this.ForcePoint.getY();
        }

        this.ForcePoint.update();
        this.Attracted.setX(this.x+this.xStart);
        this.Attracted.setY(this.y+this.yStart);
        this.Attracted.setY(this.Attracted.getY());
        this.Attracted.update();
        // get dx dy and angle for vector lines
        this.dx =  this.ForcePoint.getX() - this.Attracted.getX();
        this.dy =  this.ForcePoint.getY() - this.Attracted.getY();
        this.theta = this.angle(this.dx, this.dy);


        this.draw();


    }

    draw(){
        this.drawArc(this.ForcePoint.getX(), this.ForcePoint.getY(), this.R, 2*Math.PI, 0.1);
        this.writeText("Force Point", 30+this.ForcePoint.getX(), this.ForcePoint.getY());
        this.writeText("Attracted", 30+this.Attracted.getX(), this.Attracted.getY());
        this.writeText(this.theta, this.Attracted.getX(), this.Attracted.getY()+40);
        this.drawArc(this.Attracted.getX(), this.Attracted.getY(), 50, this.theta, 2);


// line between points
        this.drawLine(this.ForcePoint.getX(), this.ForcePoint.getY(), this.Attracted.getX(), this.Attracted.getY(), 0.5);

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
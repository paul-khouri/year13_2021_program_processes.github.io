class Control{
constructor(box, ball, bounce){
    this.box = box;
    this.ball = ball;
    this.bounce = bounce;
    this.boxDimensions = box.getDimensions();
    this.colOne = "rgb(255,255,255)";
}

update(){
    //--------------------
    var xMin = this.boxDimensions.xMin;
    var xMax = this.boxDimensions.xMax;
    var yMin = this.boxDimensions.yMin;
    var yMax = this.boxDimensions.yMax;
    //--------------------
    this.box.update();
    this.ball.update();
    this.bounce.update();
    // managing ball travel
    var xC = this.ball.getX();
    var yC = this.ball.getY();
    var R = this.ball.getR();


    // hitting vertical edges angle -> 2*Pi - angle
    if(xC <= xMin+R  || xC >= xMax-R){
    this.ball.setTravelAngle( Math.PI-this.ball.getTravelAngle());
    }
    if(yC <= yMin+R  || yC >= yMax-R){
        this.ball.setTravelAngle( 2*Math.PI-this.ball.getTravelAngle());
        }

    



// information about bounce circle
    var xCircle = this.bounce.getX();
    var yCircle = this.bounce.getY();
    var rC = this.bounce.getR();
    var dx = xC - xCircle;
    var dy = yC - yCircle;
    var dxNext = xC + this.ball.getSpeed()*Math.cos(this.ball.getTravelAngle()) - xCircle;
    var dyNext = yC + this.ball.getSpeed()*Math.sin(this.ball.getTravelAngle()) - yCircle;
    //  angle of ball to circle centre vector 
    var angle = this.getAngle(dx,dy);
    var reflectAngle =2*angle -this.ball.getTravelAngle() -Math.PI;

    // collision check
    var d = this.getDistance(dx,dy);
    var dNext = this.getDistance(dxNext,dyNext);
    if( (d >= rC + R  && dNext <= rC + R) || (d <= rC - R  && dNext >= rC - R)    ){
        //collison
        this.ball.setTravelAngle(reflectAngle);
        console.log(Math.round(reflectAngle*180/Math.PI))
    }

    this.drawDiagram(xC, yC, xCircle, yCircle, rC, angle, reflectAngle);






}

drawDiagram(xC, yC, xCircle, yCircle,rC, angle, reflectAngle){
        // line from ball to circle centre
        this.drawLine(xC,yC,xCircle,yCircle);
        // angle drawn at circle centre
        this.drawArc(xCircle,yCircle, 20, angle);
        // point on radius
        var xR = xCircle+rC*Math.cos(angle)
        var yR = yCircle+rC*Math.sin(angle)
        // draw point on centre
        this.drawArc(xR,yR, 10, 2*Math.PI);
        // angle of tangent vector
        var perpAng = angle+Math.PI/2;
        // tangent line
        this.drawLine(xR+ rC*Math.cos(perpAng), yR + rC*Math.sin(perpAng), xR- rC*Math.cos(perpAng), yR - rC*Math.sin(perpAng) );
        // vector of ball drawn at tangent line
        this.drawLine(xR, yR, xR - rC*Math.cos(this.ball.getTravelAngle()), yR - rC*Math.sin(this.ball.getTravelAngle()) );
       
        this.drawLine(xR, yR, xR +rC*Math.cos(reflectAngle), yR + rC*Math.sin(reflectAngle) );


}

drawLine(x1,y1,x2,y2, lineWidth){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = this.colOne;
    ctx.stroke();
    
}

drawArc(x,y,R,ang){
    ctx.beginPath();
    ctx.arc(x, y, R, 0, ang);
    ctx.strokeStyle = this.colOne;
    ctx.lineWidth = 1;
    ctx.stroke();

}

getDistance(dx,dy){
    return Math.sqrt(Math.pow(dx, 2)+ Math.pow(dy,2));
}

getAngle(dx, dy){
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
    }else if(dx > 0 && dy <=0){
        //console.log("Q4");
        ang = ang;
    }else if(dx == 0 && dy < 0){
        //console.log("on y below 0");
        ang = -Math.PI/2
    }else if(dx == 0 && dy > 0){
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
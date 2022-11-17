console.log("line js called");
class CircleLine{
constructor(p_1, p_2, lw, stroke){
    this.p_1 = p_1;
    this.p_2 = p_2;
    this.lw = lw;
    this.stroke = stroke;
    this.r = 100;
    this.x_1 = this.p_1.getX();
    this.y_1 = this.p_1.getY();
    this.x_2 = this.p_2.getX();
    this.y_2 = this.p_2.getY();
    this.dx = this.x_2 - this.x_1;;
    this.dy = this.y_2 - this.y_1;
    this.ang = 0;
    this.outang = 0;
    this.dist =0;


}
update(){
    this.draw();
    this.p_1.update();
    this.p_2.update();
    this.x_1 = this.p_1.getX();
    this.y_1 = this.p_1.getY();
    this.x_2 = this.p_2.getX();
    this.y_2 = this.p_2.getY();
    this.dx = this.x_2 - this.x_1;
    this.dy = this.y_2 - this.y_1;
    this.ang = Math.atan(this.dy/this.dx);
    
    if(this.dx > 0 && this.dy>= 0){
        //console.log("Q1");
        this.ang = this.ang;
    }else if(this.dx < 0 && this.dy >= 0){
        //console.log("Q2");
        this.ang = Math.PI + this.ang;
    }else if(this.dx < 0 && this.dy < 0){
        //console.log("Q3");
        this.ang = this.ang - Math.PI;
    }else if(this.dx > 0 && this.dy <=0){
        //console.log("Q4");
        this.ang = this.ang;
    }else if(this.dx == 0 && this.dy < 0){
        //console.log("on y below 0");
        this.ang = -Math.PI/2
    }else if(this.dx == 0 && this.dy > 0){
        //console.log("on y above 0");
        this.ang = Math.PI/2
    }else{
        console.log("no solution");
    }
 
    this.outang = - this.ang;
    if(this.outang < 0){
        this.outang=this.outang + 2*Math.PI;
    }  
 
}

getValue(){
    return this.outang;
}

draw(){
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lw;
    ctx.beginPath();
    ctx.moveTo(this.x_1+this.r, this.y_1);
    ctx.lineTo(this.x_1-this.r, this.y_1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x_1, this.y_1, this.r, 0, 2*Math.PI);
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(this.x_1, this.y_1);
    ctx.arc(this.x_1, this.y_1, this.r/2, 0, this.ang, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()

    ctx.beginPath();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth=this.lw;
    ctx.moveTo(this.x_1, this.y_1);
    ctx.lineTo(this.x_2 , this.y_2);
    ctx.stroke();
    this.writeText(Math.round(this.outang*180/Math.PI),this.x_1+this.r, this.y_1);
    //---------
    var t = this.r/Math.sqrt(    (Math.pow(this.dx, 2)+ Math.pow(this.dy, 2))  );
    var x = this.x_1 + t*this.dx;
    var y = this.y_1 + t*this.dy;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();
    this.p_2.setX(x);
    this.p_2.setY(y);



}

writeText(m, x,y){
    ctx.fillStyle=this.stroke;
    var myFont= "20px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.font=myFont;
    ctx.fillText(m, x,y);
    
}


}




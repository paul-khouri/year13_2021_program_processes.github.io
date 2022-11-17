console.log("line js called");
class CircleLine{
// class CircleLine x,y, r,fill, lw, stroke,over
constructor(x,y, r,fill, lw, stroke,over, canvas){
    this.lw = lw;
    this.r = r;
    this.littleR = 10;
    this.xMouse = 0;
    this.yMouse = 0;
    this.x_1 = x;
    this.y_1 = y;
    this.x_2 = x+ this.r;
    this.y_2 = y;
    this.dx = this.r
    this.dy = 0;
    this.ang = 0;
    this.outang = 0;
    this.dist =0;
    this.stroke = stroke;
    this.fill = fill;
    this.over = over;
    this.inBounds = false;
    this.mouseDown = false;
    this.dragging = false;

    this.element = canvas;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));
    

}

mDown(e){
    this.mouseDown = true;
    if(this.inBounds){
        this.dragging = true;
    }

}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x_2, this.y_2, this.littleR);
}
mUp(e){
    this.mouseDown = false;
    this.dragging = false;
}



update(){
    this.draw();
    if(this.dragging){
    this.dx = this.xMouse - this.x_1;
    this.dy = this.yMouse - this.y_1;
}
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
    // draw horizontal line
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.lw;
    ctx.beginPath();
    ctx.moveTo(this.x_1+this.r, this.y_1);
    ctx.lineTo(this.x_1-this.r, this.y_1);
    ctx.stroke();
    ctx.beginPath();
    // draw large circle
    ctx.arc(this.x_1, this.y_1, this.r, 0, 2*Math.PI);
    ctx.stroke();
    // angle sector
    ctx.strokeStyle = this.over;
    ctx.beginPath();
    ctx.moveTo(this.x_1, this.y_1);
    ctx.arc(this.x_1, this.y_1, this.r, 0, this.ang, true);
    ctx.closePath();
    ctx.stroke();
// draw line from centre to xMouse yMouse
 /*   ctx.beginPath();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth=this.lw;
    ctx.moveTo(this.x_1, this.y_1);
    ctx.lineTo(this.xMouse , this.yMouse);
    ctx.stroke();*/
    this.writeText(Math.round(this.outang*180/Math.PI),this.x_1, this.y_1+this.r);
    //---------
    this.drawLittleC();





}
drawLittleC(){
    var t = this.r/Math.sqrt(    (Math.pow(this.dx, 2)+ Math.pow(this.dy, 2))  );
    this.x_2 = this.x_1 + t*this.dx;
    this.y_2 = this.y_1 + t*this.dy;
    ctx.strokeStyle = this.stroke;
    if(this.inBounds || this.dragging){
        ctx.fillStyle = this.over;
    }else{
        ctx.fillStyle = this.fill;
    }
    ctx.beginPath();
    ctx.arc(this.x_2, this.y_2, this.littleR, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

}

writeText(m, x,y){
    ctx.fillStyle=this.fill;
    var myFont= "40px monospace";
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(m, x,y);
    
}

boundsCheck(x_1, y_1, x_2, y_2, r){
    var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
    if(d<r){
        return true;
    }else{
        return false;
    }

}


}




console.log("circle line 2 js called");
class CircleLine{
//class CircleLine value, max, x,y, r,fill, lw, stroke,over, canvas
constructor(value,max,x,y, r,fill, lw, stroke,over, canvas){
    this.value = value;
    this.max = max
    this.lw = lw;
    this.r = r;
    // radius of active point
    this.littleR = 10;
    // resets as soon as mouse is in
    this.xMouse = 0;
    this.yMouse = 0;
    // central point
    this.x_1 = x;
    this.y_1 = y;
    // will be reset on on load
    this.dx = 0;
    this.dy = 0;
    this.x_2 = 0;
    this.y_2 = 0;
    // working angle in radians
    this.ang = 0;
    // coverts to readable value
    this.outang = 0;
    // colours
    this.stroke = stroke;
    this.fill = fill;
    this.over = over;
    // inside the dot and okay to drag??
    this.inBounds = false;
    this.dragging = false;
    // listeners
    this.element = canvas;
    this.element.addEventListener('mousedown', this.mDown.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.element.addEventListener('mouseup', this.mUp.bind(this));
    window.addEventListener('load', this.myLoad.bind(this));
}

myLoad(e){
    console.log("loaded");
    // set dx dy based on given start value and maximum value
    // should have a validation check.
    var setAng = this.value*360*Math.PI/(180*this.max);
    this.dx = Math.cos(setAng);
    this.dy = -Math.sin(setAng);
    // set the dot position
    this.drawLittleC();
}


mDown(e){
    // good to go?
    if(this.inBounds){
        this.dragging = true;
    }

}
mMove(e){
    // obvious
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    // checking in dot on every move
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x_2, this.y_2, this.littleR);
}
mUp(e){
    // once up, stop
    this.dragging = false;
}



update(){
    this.draw();
  // update dx dy between centre and mouse position  only if dragging active
    if(this.dragging){
    this.dx = this.xMouse - this.x_1;
    this.dy = this.yMouse - this.y_1;
}
// get the angle between the centre and the mouse position
// quadrants go with coordinate system: Q1 is lower right
// Q3 | Q4
//  -----
// Q2 | Q1 
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
        // is over the centre
        console.log("no solution");
    }
// flipping the angle due to mirrored coordinate plane
    this.outang = - this.ang;
    if(this.outang < 0){
        // converting to get 0 --> 2pi
        this.outang=this.outang + 2*Math.PI;
    }   
    //lets convert to numbers!!
        this.outang = Math.round( this.outang*180/Math.PI )
        this.outang = Math.round( this.outang*this.max/360 );
 
}

getValue(){
    // anybody else need this value??
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
    this.writeText(this.outang,this.x_1, this.y_1+this.r);
    //---------
    this.drawLittleC();
}



drawLittleC(){
    // vector length r 
    // maths action here !!!
    var t = this.r/Math.sqrt(    (Math.pow(this.dx, 2)+ Math.pow(this.dy, 2))  );
    this.x_2 = this.x_1 + t*this.dx;
    this.y_2 = this.y_1 + t*this.dy;
    ctx.strokeStyle = this.stroke;
    // user feedback about dot
    if(this.inBounds || this.dragging){
        ctx.fillStyle = this.over;
    }else{
        ctx.fillStyle = this.fill;
    }
    //whew!! let's draw the dot
    ctx.beginPath();
    ctx.arc(this.x_2, this.y_2, this.littleR, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

}
// text on screen 
writeText(m, x,y){
    ctx.fillStyle=this.fill;
    var myFont= "40px monospace";
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(m, x,y);
    
}
// circular bounds check
boundsCheck(x_1, y_1, x_2, y_2, r){
    var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
    if(d<r){
        return true;
    }else{
        return false;
    }

}
}
// thank the loooord!




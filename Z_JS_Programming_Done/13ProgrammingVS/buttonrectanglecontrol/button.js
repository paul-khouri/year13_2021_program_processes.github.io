console.log(" button js has been called")

class Button{
// class Button x,y,w,h,text, c_1, c_2, c_3, canvas
constructor(name, x,y,w,h,fillC, strokeC, strokeC_over, targetObject, canvas){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = name;
    this.outline = strokeC;
    // taarget colour
    this.fill = fillC;
    this.over = strokeC_over;
    this.target = targetObject;
    this.element = canvas;
    this.element.addEventListener('click', this.mClick.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.inBounds = false;
}

mClick(e){
    if(this.inBounds){
      console.log("in bounds");
      this.target.setColour(this.fill);
    }
}
mMove(e){
    this.xMouse= e.offsetX;
    this.yMouse = e.offsetY;
    this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
}

inBoundsCheck(xM, yM, x, y, w, h){
    if( xM > x && xM < x+w && yM > y && yM < y+h){
        return true;
    }else{
        return false;
    }

}
update(){
    this.draw();
}
draw(){
    ctx.strokeStyle = this.outline;
    ctx.fillStyle = this.fill;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.fill();
    if(this.inBounds){
        ctx.strokeStyle = this.over;
        ctx.stroke();
    }else{
        ctx.strokeStyle = this.outline;
        ctx.stroke();

    }
    ctx.fillStyle = this.outline;
    var myFont= "bold 20px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(this.text, this.x+ this.w/2 ,this.y+this.h/2);
}
}



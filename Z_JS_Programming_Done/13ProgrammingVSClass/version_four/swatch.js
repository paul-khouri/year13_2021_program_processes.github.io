console.log(" swatch js has been called")

class Swatch{
// class Button x,y,w,h,fill, stroke, canvas
constructor(x,y,w,h,col, strk,canvas){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.outline = strk;
    this.fill = col;
    this.element = canvas;
    this.element.addEventListener('click', this.mClick.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.inBounds = false;
  

}

mClick(e){

    if(this.inBounds){
        Swatch.colour= this.fill;

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
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.fill();
    if(this.inBounds){
        ctx.stroke();
    }

}

}
Swatch.colour = "rgba(0,0,0, 1)"





console.log(" button js has been called")

class Button{
// class Button x,y,w,h,text, c_1, c_2, c_3, canvas
constructor(x,y,w,h,text, c_1, c_2, c_3, canvas){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.outline = c_1;
    this.fill = c_2;
    this.over = c_3;
    this.element = canvas;
    this.clicked = false;
    this.element.addEventListener('click', this.mClick.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.inBounds = false;

}

mClick(e){
    //console.log("Clicked");
    if(this.inBounds){
       this.clicked = true;

    }

}
mMove(e){
    //console.log("Moved");
    //console.log(this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h));
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
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.stroke();
    if(this.inBounds || this.clicked){
        ctx.fillStyle = this.over;
        ctx.fill();
    }else{
        ctx.fillStyle = this.fill;
        ctx.fill();

    }
    ctx.fillStyle = this.outline;
    var myFont= "20px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(this.text, this.x+ this.w/2 ,this.y+this.h/2);
}
// returns boolean
getClicked(){
    if(this.clicked == true){
    this.clicked = false;
    return true;
}else{
    return false;}
}
// takes boolean
setClicked(b){
    this.clicked = b;

}
setX(x){
    this.x = x;
}
setY(y){
    this.y = y;
}


}



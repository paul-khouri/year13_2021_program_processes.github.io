console.log(" button js has been called")

class SuperButton{
// class Button x,y,w,h,text, c_1(outline and text), c_2(fill), c_3(over and selected), canvas
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
    this.element.addEventListener('click', this.mClick.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.inBounds = false;
  

}

mClick(e){

    if(this.inBounds){
        SuperButton.clicked = this;
        SuperButton.shape = this.text;
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
    this.draw(Button);
    this.drawText();
}
draw(C){
    ctx.strokeStyle = this.outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.stroke();
    if(this.inBounds || C.clicked == this){
        ctx.fillStyle = this.over;
        ctx.fill();
    }else{
        ctx.fillStyle = this.fill;
        ctx.fill();

    }
   
}
drawText(){
    ctx.fillStyle = this.outline;
    var myFont= "15px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(this.text, this.x+ this.w/2 ,this.y+this.h/2);

}

}


class Button extends SuperButton{

    mClick(e){
        if(this.inBounds){
           Button.clicked = this;
           Button.shape = this.text;
        }
    }
    update(){
        this.draw(Button);
        this.drawText();
    }

    setClicked(){
        Button.clicked=this;
        Button.shape = this.text;
    }

}
Button.clicked = ""
Button.shape = ""

class PolygonOption extends SuperButton{

    mClick(e){
        if(this.inBounds){
            PolygonOption.clicked = this;
            PolygonOption.value = this.text;
        }
    }
    update(){
        this.draw(PolygonOption);
        this.drawText();
    }

    setClicked(){
        PolygonOption.clicked=this;
        PolygonOption.value = this.text;
    }

}
PolygonOption.clicked = ""
PolygonOption.value = 3

class GridButton extends Button{
    constructor(x,y,w,h,text, c_1, c_2, c_3, canvas){
        super(x,y,w,h,text, c_1, c_2, c_3, canvas)
        this.onText = "Grid on"
        this.offText = "Grid off"


    }
    mClick(e){
        if(this.inBounds){

        if(GridButton.on){
            GridButton.on = false
        }else{
            GridButton.on = true
        }
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
        if(this.inBounds){
            ctx.fillStyle = this.over;
            ctx.fill();
        }else{
            ctx.fillStyle = this.fill;
            ctx.fill();
    
        }
        ctx.fillStyle = this.outline;
        var myFont= "15px monospace";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        if(GridButton.on){
            ctx.fillText(this.onText, this.x+ this.w/2 ,this.y+this.h/2);
        }else{
            ctx.fillText(this.offText, this.x+ this.w/2 ,this.y+this.h/2);
        }
    }


}
GridButton.on = false




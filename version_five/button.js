console.log(" button js has been called")
// super class for ineractive buttons
class SuperButton{
// class Button x,y,w,h,text, c_1(outline and text), c_2(fill), c_3(over and selected), canvas
constructor(x,y,w,h,text, c_1, c_2, c_3, canvas){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    //colour
    this.outline = c_1;
    this.fill = c_2;
    this.over = c_3;
    //listeners
    this.element = canvas;
    this.element.addEventListener('click', this.mClick.bind(this));
    this.element.addEventListener('mousemove', this.mMove.bind(this));
    // mouse and in boundary values
    this.xMouse = 0;
    this.yMouse = 0;
    this.inBounds = false; // bool
}

mClick(e){

    if(this.inBounds){
        // set this to clicked => only one can be selected at a time
        // classes that inherit can have their own static clicked variable
        SuperButton.clicked = this;
        // allows the control object to access name of the button
        SuperButton.shape = this.text;
    }

}
mMove(e){
    // update mouse values and whether mouse is inside boundary of the button rectangle
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
    // draw rectangle and text
    // needs to be overridden in the inherit classes
    this.draw(SuperButton);
    this.drawText(this.text);
}
draw(C){
    ctx.strokeStyle = this.outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.stroke();
    // over state chosen if either mouse in bounds or the button is the selected button
    if(this.inBounds || C.clicked == this){
        ctx.fillStyle = this.over;
        ctx.fill();
    }else{
        ctx.fillStyle = this.fill;
        ctx.fill();

    }
   
}
drawText(T){
    ctx.fillStyle = this.outline;
    var myFont= "15px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(T, this.x+ this.w/2 ,this.y+this.h/2);
}

}

// standard buttons to chose shapes and some other options
class Button extends SuperButton{

    mClick(e){
        if(this.inBounds){
           Button.clicked = this;
           Button.shape = this.text;
        }
    }
    update(){
        this.draw(Button);
        this.drawText(this.text);
    }

    setClicked(){
        Button.clicked=this;
        Button.shape = this.text;
    }

}
Button.clicked = ""
Button.shape = ""

// standard buttons to chose shapes and some other options
class NoSelectButton extends SuperButton{

    mClick(e){
        if(this.inBounds){
           NoSelectButton.clicked = this;
           NoSelectButton.shape = this.text;
        }
    }
    update(){
        this.draw(NoSelectButton);
        this.drawText(this.text);
    }

    setClicked(){
        NoSelectButton.clicked=this;
        NoSelectButton.shape = this.text;
    }

    static setUnClicked(){
        NoSelectButton.clicked="";
        NoSelectButton.shape = "";
    }

}
NoSelectButton.clicked = ""
NoSelectButton.shape = ""


//button to set number of sides for polygon
class PolygonOption extends SuperButton{

    mClick(e){
        if(this.inBounds){
            PolygonOption.clicked = this;
            PolygonOption.value = this.text;
        }
    }
    update(){
        this.draw(PolygonOption);
        this.drawText(this.text);
    }

    setClicked(){
        PolygonOption.clicked = this;
        PolygonOption.value = this.text;
    }
}
PolygonOption.clicked = ""
PolygonOption.value = 3

// button to set line width
class LineOption extends SuperButton{

    mClick(e){
        if(this.inBounds){
            LineOption.clicked = this;
            LineOption.value = this.text;
        }
    }
    update(){
        this.draw(LineOption);
        this.drawText(this.text);
    }

    setClicked(){
        LineOption.clicked = this;
        LineOption.value = this.text;
    }
}
LineOption.clicked = ""
LineOption.value = 10

// button to set line width
class StarOption extends SuperButton{
    mClick(e){
        if(this.inBounds){
            StarOption.clicked = this;
            StarOption.value = this.text;
        }
    }
    update(){
        this.draw(StarOption);
        this.drawText(this.text);
    }

    setClicked(){
        StarOption.clicked = this;
        StarOption.value = this.text;
    }
}
StarOption.clicked = ""
StarOption.value = 0.5
// special button to turn grid on or off

class GridButton extends Button{
    constructor(x,y,w,h,text, c_1, c_2, c_3, canvas){
        super(x,y,w,h,text, c_1, c_2, c_3, canvas)
        this.onText = "Grid on"
        this.offText = "Grid off"
    }
    mClick(e){
        if(this.inBounds){
        // set on off state, do not set to clicked in a static variable
        if(GridButton.on){
            GridButton.on = false
        }else{
            GridButton.on = true
        }
        }
    }
    update(){
        this.draw(GridButton);
        var T;
        if (GridButton.on){
            T = this.onText;
        }else{
            T = this.offText;
        }
        this.drawText(T);
    }
}
GridButton.on = false




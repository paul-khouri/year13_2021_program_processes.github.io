console.log(" swatch js has been called")
class InteractiveSquare{
    // class Button x,y,w,h,fill, stroke, canvas
    constructor(x,y,w,h,background_col, text_col="rgb(255,255,255", value){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = background_col;
        this.outline = "rgb(0,0,200)";
        this.text_col = text_col;
        this.value = value;
        canvas.addEventListener('click', this.mClick.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        this.selected = false;
        this.groupMembers = [];
    }
    
    mClick(e){
        if(this.inBounds){
            console.log("clicked in square")
            this.selected = true;
            for(var i =0 ; i < this.groupMembers.length; i++){
                if(this.groupMembers[i] != this){
                    this.groupMembers[i].deselect(); 
                }
            }
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
        
        ctx.fillStyle = this.fill;
        
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        if(this.selected == true){
            ctx.lineWidth = 8; 
            ctx.strokeStyle = "rgb(255,255,255)"
            ctx.stroke();
        }
        ctx.fill();
        ctx.strokeStyle = this.outline;
        ctx.lineWidth = 2;
        if(this.inBounds){
            ctx.stroke();
        }

        ctx.fillStyle = this.text_col;
        var myFont= "30px monospace";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.value, this.x+ this.w/2 ,this.y+this.h/2);

    
    }

    setGroupMembers(G){
        this.groupMembers = G

    }
    deselect(){
        this.selected = false;
    }
    select(){
        this.selected = true;
    }
    getValue(){
        return this.value;
    }
    
    }

class LineSizes extends InteractiveSquare{

    mClick(e){
        if(this.inBounds){
            console.log("clicked in LineSizes")
            LineSizes.linesize = this.value;
            this.selected = true;
            for(var i =0 ; i < this.groupMembers.length; i++){
                if(this.groupMembers[i] != this){
                    this.groupMembers[i].deselect(); 
                }
            }
        }
    
    }

}
LineSizes.linesize = 10;





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





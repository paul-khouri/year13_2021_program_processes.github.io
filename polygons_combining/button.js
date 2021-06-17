console.log("button js called")
class Button{
    constructor(x,y,w,h,text, c_1, c_2, c_3, target){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c_1;
        this.fill = c_2;
        this.over = c_3;
        canvas.addEventListener('click', this.mClick.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        this.target = target;
        this.targetColour = c_2;
    }
    
    mClick(e){
        if(this.inBounds){
            Button.clicked = this;
            this.target.setColor(this.targetColour)
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
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);

        if(this.inBounds || C.clicked == this){
            ctx.lineWidth = 2;
            ctx.fillStyle = this.over;
            ctx.fill();
            // set fill for text
            ctx.fillStyle = this.fill;
        }else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // set fill for text
            
    
        }

        ctx.stroke()
        
    }
    drawText(){
        ctx.fillStyle = this.outline;
        var myFont= "bold 20px 'Trebuchet MS', Verdana, sans-serif  ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.text, this.x+ this.w/2 ,this.y+this.h/2);

    }
    }
    Button.clicked = ""
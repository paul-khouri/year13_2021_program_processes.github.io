console.log("radiobutton js called")

class RadioButton{
// class RadioButton x,y,w,h,text, c_1, c_2, c_3, canvas
    constructor(x,y,w,h,text, c_1, c_2, c_3, canvas){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text=text;
        this.c_1 = c_1;
        this.c_2 = c_2;
        this.c_3 = c_3;
        this.r = h/4; 
        this.xCircle = x+ w/5;
        this.yCircle = y + h/2;
        this.element = canvas;
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        RadioButton.clicked = "";

        this.element.addEventListener('click', this.mClick.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));

    }

    mClick(e){
        console.log("Clicked");
        if(this.inBounds){
            RadioButton.clicked = this;

        }

    }
    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.distanceCheckBoolean(this.xCircle, this.yCircle, this.xMouse, this.yMouse, this.r);
    }

    update(){
        this.draw();

    }

    draw(){
        ctx.strokeStyle = this.c_1;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke();
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.arc(this.xCircle,this.yCircle, this.r, 0, 2*Math.PI);
        ctx.fillStyle = this.c_2;
        if(this.inBounds){
            ctx.strokeStyle = this.c_3;
        }else{
            ctx.strokeStyle = this.c_1;
        }
        if(RadioButton.clicked == this){
            ctx.fillStyle = this.c_1;
        }else{
            ctx.fillStyle = this.c_2;
        }
       
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = this.c_1;
        var myFont= "20px monospace";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.font=myFont;
        ctx.fillText(this.text, this.x + this.w/2,this.y+this.h/2);

    }

    distanceCheckBoolean(x_1, y_1, x_2, y_2, d){
       
        var dist = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        if(dist<= d){
            return true;
        }else{
            return false;
        }

    }




}
RadioButton.getClicked = function(){
    return RadioButton.clicked.text;
}
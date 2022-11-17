console.log("slider js file has been called");

class Slider{
//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
    constructor(canvas,x,y,w,h, c_1, c_2, c_3, max, min, start){
        this.x = x;
        this.y = y;
        this.c_1 = c_1;
        this.c_2 = c_2;
        this.c_3 = c_3;
        this.w = w;
        this.h = h;
        this.r = h/10;
        this.min = min;
        this.max = max;
        this.value = start;
        this.xCircle = x + w*(start-min)/(max-min);
        this.yCircle = y + h/2;
        this.xMouse = 0;
        this.yMouse = 0;
        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.mousedown = false;
        this.inBounds= false;
        this.dragging = false;

    }

    mDown(e){
        this.mousedown = true;
    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
        var check = this.distanceCheckBoolean(this.xMouse, this.yMouse, this.xCircle, this.yCircle, this.r);
        if(check){
            this.inBounds = true;
        }else{
            this.inBounds = false;
        }
        if(this.inBounds && this.mousedown){
           this.dragging = true; 
        }
        if(this.dragging && this.xMouse > this.x && this.xMouse < this.x + this.w){
            this.xCircle = this.xMouse;
            this.value = this.min+Math.round((this.max - this.min)*(this.xCircle - this.x)/this.w);
        }
    }

    mUp(e){
        this.mousedown = false;
        this.dragging = false;
    }

    getValue(){
        return this.value;
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
        this.drawLine(this.x, this.y +this.h/2, this.x+this.w, this.y+ this.h/2, 3, this.c_1);
        ctx.beginPath()
        ctx.arc(this.xCircle,this.yCircle, this.r, 0, 2*Math.PI);
        ctx.fillStyle = this.c_2;
        ctx.strokeStyle = this.c_3;
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = this.c_1;
        var myFont= "30px monospace";
        ctx.textBaseline = 'hanging';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.value, this.x + this.w/2,this.y);
    }

    distanceCheckBoolean(x_1, y_1, x_2, y_2, d){
       
        var dist = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        if(dist<= d){
            return true;
        }else{
            return false;
        }

    }

    drawLine(x_1,y_1,x_2,y_2,w,sc){
        ctx.beginPath();
        ctx.strokeStyle = sc;
        ctx.lineWidth=w;
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2 , y_2);
        ctx.stroke();
    }
}




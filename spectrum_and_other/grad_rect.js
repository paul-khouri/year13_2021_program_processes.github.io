class GradRectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        this.taken = "";
        this.stroke = "rgb(255,255,255)";
        this.overstroke = "rgb(200,200,200)";
        this.x_c = this.x +this.w/2
        this.y_c = this.y +this.h/2
        this.r = this.h;
        this.xMouse = 0;
        this.yMouse = 0;
        this.selected_colour = "rgb(255,0,0)"
        
    }

    mDown(e){
        if(this.inBounds){
            this.taken = this;
        }

        console.log("down")
    
    }
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY; 
        this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x_c, this.y_c, this.r);
    
    }
    mUp(e){
        this.taken = "";
    }

update(){
    this.draw();
    if(this.taken == this){

        this.x_c=this.xMouse;
        //this.y_c=this.yMouse;
    }
    if(this.x_c < this.x){
        this.x_c = this.x;
    }else if(this.x_c > this.x +this.w){
        this.x_c = this.x + this.w;
    }
    this.selected_colour = this.getColor(this.x_c-this.x, this.w)
    this.drawCirc(this.x_c, this.y_c, this.r, true);
    //this.drawCirc(this.x_c, this.y_c-2*this.r, this.r, true);


}

draw(){
    var lingrad = ctx.createLinearGradient(this.x, this.y, this.x+this.w, this.y);
    lingrad.addColorStop(0, 'rgb(255,0,0)');
    lingrad.addColorStop(1/6, 'rgb(255,0,255)');
    lingrad.addColorStop(2/6, 'rgb(0,0,255)');
    lingrad.addColorStop(3/6, 'rgb(0,255,255)');
    lingrad.addColorStop(4/6, 'rgb(0,255,0)');
    lingrad.addColorStop(5/6, 'rgb(255,255,0)');
    lingrad.addColorStop(1, 'rgb(255,0,0)');
    ctx.fillStyle = lingrad;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.fill()
}

drawCirc(x,y,r, f){
    if(this.inBounds || this.taken == this){
 
            ctx.strokeStyle = this.overstroke;
    
    }else{
        ctx.strokeStyle = this.stroke;
    }
    
    ctx.lineWidth = 5;
    ctx.beginPath()
    ctx.arc(x,y, r, 0, 2*Math.PI);
    if(f){
        ctx.fillStyle = this.selected_colour;
        ctx.stroke();
        ctx.fill();
        

    }else{
        ctx.stroke();
    }
}

boundsCheck(x_1, y_1, x_2, y_2, r){
    var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
    if(d<r){
        return true;
    }else{
        return false;
    }

}
}
GradRectangle.prototype.getColor = getColor;
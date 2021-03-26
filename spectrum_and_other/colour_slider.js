console.log("colour slider called")

class ColorSlider{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.P = new slidingPoint(x,y,w,h, 0.5*this.h);
        this.step = 2*h;
        this.Q = new slidingPoint(x, y+this.step,w,h, 0.5*this.h )
        
        this.selected_colour = "rgb(0,0,0)";
        this.shadeColour = "rgb(0,0,0)"


    }

    update(){
        this.draw();
        this.drawHues();
        this.drawShades();
        this.drawColour();
        
        
        this.selected_colour = this.getColor(this.P.getX()-this.x, this.w)
        this.P.setColour(this.selected_colour)
        this.shadeColour = this.getShade(this.selected_colour, this.Q.getX() - this.x, this.w )
        this.Q.setColour(this.shadeColour )
        this.P.update()
        this.Q.update()

    }

    drawHues(){
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

    drawShades(){
        var lingrad = ctx.createLinearGradient(this.x, this.y, this.x+this.w, this.y);
        lingrad.addColorStop(0, 'rgb(0,0,0)');
        lingrad.addColorStop(3/6, this.selected_colour);
        lingrad.addColorStop(1, 'rgb(255,255,255)');
        ctx.fillStyle = lingrad;
        ctx.beginPath();
        ctx.rect(this.x, this.y+this.step, this.w, this.h)
        ctx.fill()


    }

    drawColour(){
        ctx.fillStyle = this.shadeColour;
        ctx.beginPath();
        ctx.rect(this.x, this.y+2*this.step, this.w, this.h)
        ctx.fill()
    }

    draw(){
        ctx.fillStyle = "rgb(10,10,10)";
        ctx.beginPath();
        ctx.rect(this.x-this.step, this.y-this.step, this.w+2*this.step, this.h+4*this.step)
        ctx.fill()

    }

    getColor(){
        return this.shadeColour
    }

    


}
ColorSlider.prototype.getColor = getColor;
ColorSlider.prototype.getShade = getShade;


class slidingPoint{
constructor(x,y,w, h, r){
    this.x_c = x + w/2;
    this.y_c = y + h/2;
    this.x = x;
    this.w = w;
    this.r = r;
    canvas.addEventListener('mousedown', this.mDown.bind(this));
    canvas.addEventListener('mousemove', this.mMove.bind(this));
    canvas.addEventListener('mouseup', this.mUp.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.taken = ""
    this.selected_colour = "rgb(255,255,255)";
    this.stroke = "rgb(255,255,255)";
    this.overstroke = "rgb(200,200,200)";
}

mDown(e){
    if(this.inBounds){
        this.taken = this;
    }
   
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
    
    if(this.taken == this){
        this.x_c=this.xMouse;
    }
    if(this.x_c < this.x){
        this.x_c = this.x;
    }else if(this.x_c > this.x +this.w){
        this.x_c = this.x + this.w;
    }
    this.draw(this.x_c, this.y_c, this.r);

}

draw(x,y,r){
    if(this.inBounds || this.taken == this){
        ctx.strokeStyle = this.overstroke;
    }else{
        ctx.strokeStyle = this.stroke;
    }
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.fillStyle = this.selected_colour;
    
    ctx.fill();
    ctx.stroke();
    

}

setColour(c){
    this.selected_colour = c
}

getColor(){
    return this.selected_colour;
}

getX(){
    return this.x_c
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
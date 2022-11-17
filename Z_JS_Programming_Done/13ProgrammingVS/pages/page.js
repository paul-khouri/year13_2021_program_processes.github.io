class Page{
 // class Page width, height, title, Button
    constructor(width, height, title, Button){
        this.x =0+0.1*width;
        this.w = 0.8*width;
        this.y =0+0.1*height;
        this.h =0.8*height;
        this.title = title;
        this.b = Button;
        this.b.setX(0.6*width);
        this.b.setY(0.7*height);
        this.stroke = "rgb(255,255,255)";
    }

    update(){
        this.b.update();
        this.draw();
    }

    getClicked(){
        if(this.b.getClicked()== true){
            return true;
        }else{
            return false;}
    }
    draw(){
        ctx.strokeStyle = this.outline;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.stroke();
        ctx.fillStyle = this.stroke;
        var myFont= "40px verdana";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.title, this.x+ this.w/2 ,this.y+0.2*this.h);
    }
}
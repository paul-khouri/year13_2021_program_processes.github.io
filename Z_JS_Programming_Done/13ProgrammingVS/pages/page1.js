class Page{
 // class Page width, height, title, Button
    constructor(width, height, title, Button, c_1, c_2, c_3){
        this.x =0+0.1*width;
        this.w = 0.8*width;
        this.y =0+0.1*height;
        this.h =0.8*height;
        this.title = title;
        this.b = Button;
        this.b.setX(0.6*width);
        this.b.setY(0.7*height);
        this.stroke = c_1;
        this.fill = c_2;
        this.extra = c_3
        this.count = 0;
    }

    update(){
        this.count+=16;
       
        this.draw();
        this.b.update();
    }

    getClicked(){
        if(this.b.getClicked()== true){
            this.count = 0;
            return true;
        }else{
            return false;}
    }
    draw(){
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 2;
        ctx.beginPath();
        var rW = this.count;
        var rH = this.count;
        if(this.count > this.w ){
            rW = this.w;
        }
        if(this.count > this.h ){
            rH = this.h;
        }
        ctx.rect(this.x,this.y,rW,rH);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = this.stroke;
        var myFont= "40px verdana";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(this.title, this.x+ this.w/2 ,this.y+0.2*this.h);
    }
}
console.log('Rectangle js is loaded')

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = "rgb(255,255,255)";
        this.count = 0;
        this.y_0 = this.y +0;
        this.T = 300;



    }

    update(){
        
        this.count += 1;
        this.count = this.count%this.T;
        if(this.count <= this.T/2){
            this.y_0 = this.y + this.count*2*this.h/this.T;
        }else{
            this.y_0 = this.y + -this.count*2*this.h/this.T + 2*this.h;

        }

        this.draw();


    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        //ctx.fillStyle = "rgb(0,0,0)"
        //ctx.beginPath();
        //ctx.arc(this.x+this.w/2, this.y_0, 5, 0, 2*Math.PI);
        //ctx.fill();
    }

    setColour(c){
        this.fill = c;
    }

}
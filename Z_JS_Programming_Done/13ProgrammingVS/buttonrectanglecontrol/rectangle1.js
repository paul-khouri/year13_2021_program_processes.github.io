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
        this.c_1 = new LinearCircle(this.x+this.w/4, this.y, 5, this.h, "rgba(0,255,255,0.5)", 200);
        this.c_2 = new LinearCircle(this.x+this.w/4, this.y, 10, this.h, "rgba(0,255,255,0.5)", 300);
        this.c_3 = new LinearCircle(this.x+this.w/4, this.y, 15, this.h, "rgba(0,255,255,0.5)", 400);
        this.c_4 = new LinearCircle(this.x+this.w/4, this.y, 20, this.h, "rgba(0,255,255,0.5)", 500);
        this.c_5 = new LinearCircle(this.x+this.w/4, this.y, 25, this.h, "rgba(0,255,255,0.5)", 600);
        this.c_6 = new LinearCircle(this.x+this.w/4, this.y, 30, this.h, "rgba(0,255,255,0.5)", 700);
        this.q_1 = new QuadraticCircle(this.x+3*this.w/4, this.y, 5, this.h, "rgba(255,0,255,0.5)", 200);
        this.q_2 = new QuadraticCircle(this.x+3*this.w/4, this.y, 10, this.h, "rgba(255,0,255,0.5)", 300);
        this.q_3 = new QuadraticCircle(this.x+3*this.w/4, this.y, 15, this.h, "rgba(255,0,255,0.5)", 400);
        this.q_4 = new QuadraticCircle(this.x+3*this.w/4, this.y, 20, this.h, "rgba(255,0,255,0.5)", 500);
        this.q_5 = new QuadraticCircle(this.x+3*this.w/4, this.y, 25, this.h, "rgba(255,0,255,0.5)", 600);
        this.q_6 = new QuadraticCircle(this.x+3*this.w/4, this.y, 30, this.h, "rgba(255,0,255,0.5)", 700);


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
        this.c_1.update();
        this.c_2.update();
        this.c_3.update();
        this.c_4.update();
        this.c_5.update();
        this.c_6.update();
        this.q_1.update();
        this.q_2.update();
        this.q_3.update();
        this.q_4.update();
        this.q_5.update();
        this.q_6.update();

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
console.log('Rectangle 2 js is loaded')

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = "rgb(255,255,255)";

        this.objectSet = [];
        for(var i = 0 ; i < 6; i++){
            this.objectSet.push(new LinearCircle(this.x+Math.round(this.w*Math.random()), this.y, 5+10*i, 
                this.h, "rgba(0,255,255,0.5)", 300+20*i));
        }

        for(var i = 0 ; i < 6; i++){
            this.objectSet.push(new QuadraticCircle(this.x+Math.round(this.w*Math.random()), this.y, 5+10*i, 
                this.h, "rgba(255,0,255,0.5)", 200+50*i)  );
        }


    }

    update(){
        ctx.save();
        this.draw();
        for(var k =0; k< this.objectSet.length; k++){
            this.objectSet[k].update();
        }
        ctx.restore();
        
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.clip();
        ctx.fill();
    }

    setColour(c){
        this.fill = c;
    }


}
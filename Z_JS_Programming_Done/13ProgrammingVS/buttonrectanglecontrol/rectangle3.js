console.log('Rectangle 3 js is loaded')

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = "rgb(255,255,255)";
        // space circle xrect, yrect, w, h,rsmall, rbig, fill, interval
        /*this.c_1 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(0,0,0, 0.5)", 500,1);
        this.c_2 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(255,100,0,0.5)", 300,1);
        this.c_3 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(100,100,255,0.5)", 400,1);
        this.c_4 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(80,0,80, 0.75)", 600,1);
        this.c_5 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(255,100,0,0.5)", 700,1);
        this.c_6 = new SpaceCircle(this.x, this.y, this.w,this.h, 2,26, "rgba(100, 0,50,0.5)", 800,1);*/
        this.objectSet=[]
        for(var k = 0; k<20; k++){
            var mycol = "rgba("+ 255*Math.random()+","+ 255*Math.random()+","+ 255*Math.random()+"," +Math.random()+ ")";
            this.objectSet.push(new SpaceCircle(this.x, this.y, this.w,this.h,
                 2,26, mycol, 20*20-20*k+30,1));

        }



    }

    update(){
        ctx.save();
        this.draw();
        /*this.c_1.update();
        this.c_2.update();
        this.c_3.update();
        this.c_4.update();
        this.c_5.update();
        this.c_6.update();*/
        for( var k = 0 ; k<this.objectSet.length; k++){
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
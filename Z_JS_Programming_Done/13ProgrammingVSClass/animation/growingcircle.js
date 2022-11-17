console.log("growing circle js called")

class GrowingCircle{
    constructor(x,y,r, dr, c1, c2,c3){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dr = dr;
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.currentRadius = 0;
    }

    update(){
        this.currentRadius = (this.currentRadius + this.dr)%this.r;

        this.draw()


    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentRadius, 0, 2*Math.PI);
        ctx.fillStyle = this.c2;
        ctx.fill();


    }

}
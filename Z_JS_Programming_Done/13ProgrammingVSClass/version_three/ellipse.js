console.log("ellipse js called");

class Ellipse{
    constructor(xS, yS, xM, yM , col){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.xRad = Math.abs((xM-xS)/2);
        this.yRad = Math.abs((yM-yS)/2);
        this.fill = col;

    }

    update(){
        this.draw();

    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xRad, this.yRad, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

}
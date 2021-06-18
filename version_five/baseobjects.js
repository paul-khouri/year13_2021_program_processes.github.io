console.log("ellipse js called");

console.log("rectangle js called");


class Rectangle{
constructor(xS,yS,xM,yM, col){
this.x = xS;
this.y = yS;
this.w = xM-xS;
this.h = yM-yS;
this.fill = col;
}

update(){
    this.draw();
}

draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = this.fill;
    ctx.fill();
}


}

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


class DrawImage{
    constructor(im){
        this.im = im;
    }

    update(){
        //ctx.drawImage(this.tempBitMap,0,0);
        ctx.drawImage(this.im,0,0);
    }
}

class CanvasImage{
    constructor(img){
        this.img = img
    }
    update(){
        ctx.drawImage(this.img, 0,0,width,height)
    }
}
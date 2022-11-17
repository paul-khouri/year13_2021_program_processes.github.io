console.log("across ball js loaded");

class AcrossBall{
constructor(x,y, w, h, c1, dx, dy, R){
    // boundaries    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // circle coordinates (in the middle of the boundaries)
    this.xCirc = this.x + this.w/2;
    this.yCirc = this.y + this.h/2;
    // radius
    this.R = R;
    this.c1 = c1;
    // speeds
    this.dx = dx;
    this.dy = dy;
    this.xCount = this.w/2;
    this.yCount = this.h/2;
}

update(){

    this.xCount += this.dx;
    this.xCirc = this.x +this.xCount%this.w;
    this.yCount += this.dy;
    this.yCount = this.yCount%this.h;
    this.yCirc = this.y +this.yCount;
    this.draw();

}

draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "rgb(255,255,255,0.3)";
    ctx.strokeStyle = this.c1;
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.clip();
    this.drawCircle(this.xCirc, this.yCirc);
    ctx.restore();
}

drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y, this.R, 0, 2*Math.PI);
    ctx.fillStyle = this.c1;
    ctx.fill();
}


}
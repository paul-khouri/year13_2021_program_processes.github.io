console.log("bouncecircle js loaded");

class BounceCircle{
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
}

update(){
    if( this.yCirc <= this.y || this.yCirc >= this.y + this.h){
            // swap direction
            this.dy = -this.dy;
    }
    if( this.xCirc <= this.x || this.xCirc >= this.x + this.w){
        // swap direction
        this.dx = -this.dx;
}
    this.yCirc += this.dy;
    this.xCirc += this.dx;
    this.draw();

}

draw(){
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = this.c1;
    ctx.lineWidth = 1;
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
console.log('space circle js called');
class SpaceCircle{
    // space circle xrect, yrect, w, h,rsmall, rbig, fill, interval
    constructor(xrect, yrect, wRect, hRect,rsmall, rbig, fill, interval,i){
        this.xR = xrect;
        this.yR = yrect;
        this.wR = wRect;
        this.hR = hRect
        this.x = xrect+wRect/2;
        this.y = yrect+hRect/2;
        this.r_s = rsmall;
        this.r_b = rbig;
        this.fill = fill;
        this.T = interval;
        this.count = 0;
        this.r = rbig-rsmall;
        this.i = i;


    }

    update(){
        this.count += this.i;

        this.x = this.xR+this.wR/8 + (3*this.wR/8)*(Math.sin(2*Math.PI*this.count/this.T) +1 );
        this.r=((this.r_b - this.r_s)/2)*Math.sin(2*Math.PI*(this.count - this.T/4)/this.T)+
        ((this.r_b - this.r_s)/2)+this.r_s;
        this.y = this.yR+this.hR/2 + (this.hR/8)*Math.sin(2*Math.PI*(this.count - this.T/4)/this.T)

        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
    }
}
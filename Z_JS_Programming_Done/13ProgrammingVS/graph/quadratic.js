console.log("quadratic js called");

class QuadraticPlot{
// class Linear Plot xC, yC, width, a,b c, max
constructor(xC, yC, w, a,b,c, max){
    this.xC = xC;
    this.yC = yC;
    this.scale = w/(2*max);
    this.w = w;
    this.a = a;
    this.b = b;
    this.c = c;
    this.max = max;
}

update(){
    this.draw();

}
draw(){
    // y=2x+10
    console.log("draw called");
    ctx.fillStyle = "rgba(255,255,0,1)";
    for( var t = -this.max; t<= this.max ; t++){
        
        var x = t*this.scale;
        var y = -(this.a*t*t + this.b*t +this.c)*this.scale;
        if( y <= this.max*this.scale && y >= -this.max*this.scale ){
        ctx.beginPath();
        ctx.arc(this.xC + x,this.yC + y, 2 , 0, 2*Math.PI);
        ctx.fill();}
    }
}

}
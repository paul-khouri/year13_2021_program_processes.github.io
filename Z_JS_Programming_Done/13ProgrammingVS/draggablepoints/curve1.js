console.log("line js called");
class Curve{
// class LineSet array of points
constructor(p, lw, stroke){
    this.p = p;
    this.lw = lw;
    this.stroke = stroke;


}
update(){
    this.draw();
    for( var i=0 ; i < this.p.length ; i++){
        this.p[i].update();
    }
   
    
}
draw(){
    ctx.beginPath();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth=this.lw;
    ctx.moveTo(this.p[0].getX(), this.p[0].getY());
    ctx.bezierCurveTo(this.p[1].getX(), this.p[1].getY(),
    this.p[2].getX(), this.p[2].getY(),
    this.p[3].getX(), this.p[3].getY());
    ctx.bezierCurveTo(this.p[4].getX(), this.p[4].getY(),
    this.p[5].getX(), this.p[5].getY(),
    this.p[6].getX(), this.p[6].getY());
    ctx.moveTo(this.p[0].getX(), this.p[0].getY());
    ctx.lineTo(this.p[1].getX(), this.p[1].getY());
    ctx.moveTo(this.p[2].getX(), this.p[2].getY());
    ctx.lineTo(this.p[3].getX(), this.p[3].getY());
    ctx.lineTo(this.p[4].getX(), this.p[4].getY());
    ctx.moveTo(this.p[5].getX(), this.p[5].getY());
    ctx.lineTo(this.p[6].getX(), this.p[6].getY());
    ctx.stroke();

    
}
}




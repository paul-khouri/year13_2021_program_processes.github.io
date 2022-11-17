console.log("line js called");
class LineSet{
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
    for( var i=1; i < this.p.length ; i++){
    ctx.lineTo(this.p[i].getX() , this.p[i].getY());
    }
    ctx.closePath();
    ctx.stroke();
    
}
}




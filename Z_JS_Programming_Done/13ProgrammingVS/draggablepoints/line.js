console.log("line js called");
class Line{
constructor(p_1, p_2, lw, stroke){
    this.p_1 = p_1;
    this.p_2 = p_2;
    this.lw = lw;
    this.stroke = stroke;


}
update(){
    this.draw();
    this.p_1.update();
    this.p_2.update();
    
}
draw(){
    ctx.beginPath();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth=this.lw;
    ctx.moveTo(this.p_1.getX(), this.p_1.getY());
    ctx.lineTo(this.p_2.getX() , this.p_2.getY());
    ctx.stroke();
}
}




console.log("grid js called")

class Grid{
// class Grid x,y,w, h,lw, max, majTick
constructor(x,y,w, h,lw, max, majTick){
    this.x = x;
    this.y = y;
    this.w =w;
    this.h = h;
    this.lw = lw;
    this.max = max;
    this.majTick = majTick;
    this.lines = max/majTick;
    this.xCentre = x+w/2;
    this.yCentre = y+h/2;
    this.stroke = 'rgba(255,255,255,1)';
}

update(){
    this.draw();

}

getX(){
    return xCentre;
}
getY(){
    return yCentre;
}

draw(){
    //ctx.strokeStyle = this.stroke;
    //ctx.beginPath();
    //ctx.rect(this.x, this.y, this.w, this.h);
    //ctx.stroke();
    for( var i = -this.lines ; i<= this.lines ; i++){
        var x = this.xCentre + i*this.w/(2*this.lines);
        var y_1 = this.yCentre + this.h/2; 
        var y_2 = this.yCentre - this.h/2;
        this.drawLine(x,y_1, x, y_2, this.lw);
        ctx.fillStyle = this.stroke;
        var myFont= "10px monospace";
        ctx.textBaseline = 'hanging';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        ctx.fillText(i*this.majTick, x,this.yCentre+this.h/2+10); 
        var x_1 = this.xCentre - this.w/2;
        var y = this.yCentre + i*this.h/(2*this.lines); 
        var x_2 = this.xCentre + this.w/2;
        this.drawLine(x_1,y, x_2, y, this.lw);
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(i*this.majTick, this.xCentre+this.w/2+10, y); 
        this.drawLine(this.xCentre, this.yCentre - this.h/2, this.xCentre, this.yCentre + this.h/2, 3*this.lw);
        this.drawLine(this.xCentre - this.w/2, this.yCentre, this.xCentre + this.w/2, this.yCentre, 3*this.lw);
    }



}

drawLine(x_1,y_1,x_2,y_2, lw){
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    ctx.stroke();
}


}
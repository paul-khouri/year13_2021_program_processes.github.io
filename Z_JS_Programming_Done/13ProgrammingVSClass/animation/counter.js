console.log(" count js called")

class Counter{
constructor(x,y){
    this.x = x;
    this.y = y;
    this.count = 0
}

update(){
    this.count += 1;
    this.writeText()
}

writeText(){
    ctx.fillStyle="rgb(255,255,255)";
    var myFont= "small-caps 30px/1 sans-serif";
    ctx.font=myFont;
    ctx.fillText(this.count, this.x,this.y);
    this.drawLine(this.x, this.y, this.x+100, this.y);
    ctx.fillText(this.count%360, this.x,this.y+30);
    this.drawLine(this.x, this.y+30, this.x+100, this.y+30);
    
    // cycling numbers (this is linear)
    var I = 360;  // interval
    var M = 180; // maximum number
    var num=0;
    if(this.count%I < I/2){
        num = 2*M*(this.count%I)/I;

    }else{
        num = -2*M*(this.count%I)/I+2*M;
    }
    ctx.fillText(num, this.x,this.y+60);
    this.drawLine(this.x, this.y+60, this.x+100, this.y+60);



}
drawLine(x_1, y_1, x_2, y_2){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle="rgb(255,255,255)";
    ctx.moveTo(x_1, y_1)
    ctx.lineTo(x_2,y_2);
    ctx.stroke();
}

}

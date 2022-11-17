console.log("star js loaded");
class Star{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour, scolour, lw){
    this.x = xMouseStart;
    this.y = yMouseStart;
    this.w = xMouse - xMouseStart;
    this.h = yMouse - yMouseStart;
    this.xC = this.x + this.w/2;
    this.yC = this.y + this.w/2;
    this.RLarge = Math.abs(this.w/2);
    this.RSmall = this.RLarge/3;
    this.fcolour = fcolour;
    this.scolour = scolour;
    this.lw = lw;

    if(this.h < 0 ){
        this.yC = this.y - Math.abs(this.w/2);
    }
    if(this.h > 0 && this.w < 0){
        this.yC = this.y + Math.abs(this.w/2);
    }


    }

    update(){
        this.draw()
    }

    draw(){
        var p = 10;
        ctx.fillStyle = this.fcolour;
        ctx.save(); 
        ctx.translate(this.xC,this.yC);
        ctx.beginPath();   
        ctx.moveTo(this.RLarge, 0);
        for(var i=1; i<2*p ; i++){
                ctx.rotate(Math.PI/p);
                if(i%2 == 1){
                ctx.lineTo(this.RSmall, 0);
                
                }else{
                    ctx.lineTo(this.RLarge, 0);
    
                }
        }
        ctx.closePath();
        ctx.strokeStyle = this.scolour;
        ctx.lineWidth = this.lw;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
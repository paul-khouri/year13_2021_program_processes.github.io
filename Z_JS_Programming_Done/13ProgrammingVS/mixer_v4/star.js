console.log("star js loaded");
class Star{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour, scolour, lw){
    this.x = xMouseStart;
    this.y = yMouseStart;

    this.fcolour = fcolour;
    this.scolour = scolour;
    this.lw = lw;

    this.circleCoords = this.centreSquare(xMouseStart, yMouseStart,xMouse,yMouse); 
    this.xC = this.circleCoords.xC;
    this.yC = this.circleCoords.yC;
    this.RLarge =this.circleCoords.s/2;
    this.RSmall = this.RLarge/3;
    }

    update(){
        this.draw()
    }

    draw(){
        var p = 8;
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



    centreSquare(xMS, yMS, xM, yM){
        // center of rectangle
       var xC = (xMS+xM)/2;
       var yC = (yMS+yM)/2;
       // find smaller of width and height
       var absW = Math.abs(xM - xMS);
       var absH = Math.abs(yM - yMS);
       var sideS = 0;
       if(absW < absH){
           sideS = absW;
       }else{
           sideS = absH;
       }

       return { xC : xC, yC: yC, s: sideS }


   }
}
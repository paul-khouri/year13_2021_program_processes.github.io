console.log("circle js loaded");
class Circle{
    constructor(xMouseStart, yMouseStart, xMouse, yMouse, fcolour, scolour, lw){
    this.x = xMouseStart;
    this.y = yMouseStart;
    this.fcolour = fcolour;
    this.scolour = scolour;
    this.lw = lw;

    this.circleCoords = this.centreSquare(xMouseStart, yMouseStart,xMouse,yMouse); 
    this.xC = this.circleCoords.xC;
    this.yC = this.circleCoords.yC;
    this.R =this.circleCoords.s/2;
    
    }

    update(){
        this.draw()
    }

    draw(){
        ctx.fillStyle = this.fcolour;
        ctx.beginPath();
        ctx.arc(this.xC , this.yC, this.R, 0, 2*Math.PI);
        ctx.strokeStyle = this.scolour;
        ctx.lineWidth = this.lw;
        ctx.fill();
        ctx.stroke();
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
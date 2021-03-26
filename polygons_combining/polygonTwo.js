console.log("polygon js called")

class Polygon{
    constructor(x,y,R, fc, sc, lw, n){
        console.log("update")
        this.x_c = x
        this.y_c = y
        this.R = R
        this.n = 5
        this.fill = fc
        this.stroke = sc
        this.lw = lw
        this.n = n;

    }
    update(){
        this.draw()
    }
    draw(){

        var x
        var y
        var n = this.n;
        var R = this.R;
         ctx.strokeStyle = this.stroke
         ctx.fillStyle = this.fill
         ctx.lineWidth = this.lw;
         ctx.beginPath()
         for(var i=0; i<n; i++){
             x= Math.round(  this.x_c + R*Math.cos(i*2*Math.PI/n)  )
             y= Math.round(  this.y_c + R*Math.sin(i*2*Math.PI/n)  )
             if(i== 0){
                 ctx.moveTo(x,y)
             }else{
                 ctx.lineTo(x, y)
             }
         }
         ctx.closePath();
         ctx.fill();
         ctx.stroke();
    }

    setColor(c){
        this.fill = c;
    }

 

}
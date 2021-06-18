class Polygon{
    constructor(xS,yS,xM,yM, fc, n=5){
        console.log("update")
        this.x_c = xS+(xM-xS)/2
        this.y_c = yS+(yM-yS)/2
        this.R = Math.min(Math.abs(xM-xS),Math.abs(yM-yS))/2
        this.n = n;
        this.fill = fc;
        this.stroke = "rgb(200,200,200)";
        this.lw = 2;
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
        var rot = 0
        if(n%4 == 0){
            rot = -Math.PI/n
        }else if((n+2)%4==0){
            rot = 0
        }
        else{
            rot = -Math.PI/2
        }
        
         ctx.strokeStyle = this.stroke
         ctx.fillStyle = this.fill
         ctx.lineWidth = this.lw;
         ctx.beginPath()
         var pointSet = []
         for(var i=0; i<n; i++){
             x= Math.round(  this.x_c + R*Math.cos(i*2*Math.PI/n + rot)  )
             y= Math.round(  this.y_c + R*Math.sin(i*2*Math.PI/n + rot)  )
             if(i== 0){
                 ctx.moveTo(x,y)
             }else{
                 ctx.lineTo(x, y)
             }
             pointSet.push({x:x, y:y})
         }
         ctx.closePath();
         ctx.fill();
         ctx.stroke();
         //console.log(pointSet)
         for(var i = 0; i< pointSet.length; i++){
             x = pointSet[i].x; 
             y = pointSet[i].y; 
             for (var j = i + 1; j<pointSet.length; j++){
                 this.draw_line(x,y, pointSet[j].x, pointSet[j].y)
             }
         }
    }
    draw_line(x_1, y_1, x_2,y_2){
        ctx.strokeStyle=this.stroke;
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2,y_2);
        ctx.stroke();
    }

}

class Star{
    constructor(xS,yS,xM,yM, fc, n=5, ratio){
        console.log("update")
        this.x_c = xS+(xM-xS)/2
        this.y_c = yS+(yM-yS)/2
        this.R = Math.min(Math.abs(xM-xS),Math.abs(yM-yS))/2
        this.n = n;
        this.fill = fc;
        this.stroke = "rgb(200,200,200)";
        this.lw = 2;
        this.n = n;
        this.ratio = ratio;
    }
    update(){
        this.draw()
     
    }
    draw(){

        var x
        var y
        var n = 2*this.n;
        var R = this.R;
        var rot = 0
        if(n%4 == 0){
            rot = -Math.PI/(this.n)
        }else if((n+2)%4==0){
            rot = 0
        }
        else{
            rot = -Math.PI/2
        }
        
         ctx.strokeStyle = this.stroke
         ctx.fillStyle = this.fill
         ctx.lineWidth = this.lw;
         ctx.beginPath()
         var pointSet = []
         for(var i=0; i<n; i++){
             if(i%2 == 0){
                 R = this.R;
             }else{
                 R = this.R*this.ratio;
             }
             x= Math.round(  this.x_c + R*Math.cos(i*2*Math.PI/n - Math.PI/2)  )
             y= Math.round(  this.y_c + R*Math.sin(i*2*Math.PI/n - Math.PI/2)  )
             
             if(i== 0){
                 ctx.moveTo(x,y)
             }else{
                 ctx.lineTo(x, y)
             }
             pointSet.push({x:x, y:y})
         }
         ctx.closePath();
         ctx.fill();
         ctx.stroke();
         //console.log(pointSet)
         for(var i = 0; i< pointSet.length; i++){
             x = pointSet[i].x; 
             y = pointSet[i].y; 
             for (var j = i + 1; j<pointSet.length; j++){
                 this.draw_line(x,y, pointSet[j].x, pointSet[j].y)
             }
         }
    }
    draw_line(x_1, y_1, x_2,y_2){
        ctx.strokeStyle=this.stroke;
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2,y_2);
        ctx.stroke();
    }

}
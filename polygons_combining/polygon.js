console.log("polygon js called")

class Polygon{
    constructor(){}
    update(){
        console.log("update")
        var x_c = 500
        var y_c = 300
        var R =100
        var [x,y] = [0,0]
        var n = 5
/*
        for(var i=0; i<6; i++){
            x= Math.round(  x_c + R*Math.cos(i*2*Math.PI/6)  )
            y= Math.round(  y_c + R*Math.sin(i*2*Math.PI/6)  )
            console.log(x,y)
        }

        ctx.strokeStyle = "rgb(255,255,255)"
        ctx.lineWidth = 3;
        ctx.beginPath()
        ctx.moveTo(500,300)
        ctx.lineTo(600, 400)
        ctx.lineTo(600, 500)
        ctx.closePath()
        ctx.stroke();

        */
        ctx.strokeStyle = "rgb(255,255,255)"
        ctx.fillStyle = "rgb(0,255,255)"
        ctx.lineWidth = 3;
        ctx.beginPath()
        for(var i=0; i<n; i++){
            x= Math.round(  x_c + R*Math.cos(i*2*Math.PI/n)  )
            y= Math.round(  y_c + R*Math.sin(i*2*Math.PI/n)  )
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

 

}
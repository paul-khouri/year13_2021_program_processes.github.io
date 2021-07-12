console.log("Animations")

class CircleAnimation{
    constructor(xS,yS,xM,yM, fc){
        console.log("update")
        this.x_c = xS+(xM-xS)/2
        this.y_c = yS+(yM-yS)/2
        this.R = Math.min(Math.abs(xM-xS),Math.abs(yM-yS))/2;
        this.fill = "rgba("+255*Math.random()+","+255*Math.random()+","+255*Math.random()+","+ (0.5+0.5*Math.random()) +")";

        this. t = 0
        this.B = 50 + 200*Math.random();
        this.c = this.B*Math.random();
        this.increment = 2*Math.round(Math.random())-1

        this.xS = xS;
        this.yS = yS;
        this.xM = xM;
        this.yM = yM;
    }

    update(){
        this.t += this.increment;
        this.draw();
        this.t = this.t%this.B;

    }
    draw(){


        var t = this.t
        var B = 2*Math.PI/this.B
        var c = this.c
        var R = this.R

        var x= Math.round(  this.x_c + R*Math.cos( B*(t-c))  )
        var y= Math.round(  this.y_c + R*Math.sin( B*(t-c))  )
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(x, y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
    }

    getR(){
        return this.R
    }
}

class ManyCircles{
    constructor(xS,yS,xM,yM, fc){
        this.circleSet = [];
        for (var i=0; i<25; i++){
            var temp = new CircleAnimation(xS,yS,xM,yM, fc);
            this.circleSet.push(temp)

        }

        this.x_c = xS+(xM-xS)/2
        this.y_c = yS+(yM-yS)/2
        this.R = Math.min(Math.abs(xM-xS),Math.abs(yM-yS))/2
        this.fill = fc;
    }

    update(){
        for(var i=0; i< this.circleSet.length ; i++){
            this.circleSet[i].update();
        }
        /*
        ctx.strokeStyle = this.fill;
        ctx.beginPath();
        ctx.ellipse(this.x_c, this.y_c, this.R, this.R, 0, 0, 2 * Math.PI);
        ctx.stroke();
        */
    }

}
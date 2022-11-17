/**
 * Create a Circle Object - No Stroke
 * @param {number} xS x Mouse Start
 * @param {number} yS y Mouse Start
 * @param {number} xM current x Mouse
 * @param {number} yM current y Mouse
 * @param {string} fillColour fill Colour
 */
class SPCircle{
    constructor(xS, yS, xM, yM , fillColour,strokeColour){
        this.x = (xS + xM)/2;
        this.y = (yS + yM)/2;
        this.r = Math.min(Math.abs(xM-xS) , Math.abs(yM-yS) )/2
        this.fillColour = fillColour;
        this.strokeColour = strokeColour
        console.log("Circle Instantiated")
    }
    update(){
        this.draw();

    }
}
/**
 * Create a Polygon Object - No Stroke
 * @param {number} x x
 * @param {number} y y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill Colour
 */
class Polygon extends SPCircle{
    constructor(xS, yS, xM, yM , fillColour,strokeColour,n,lw=5) {
        super(xS, yS, xM, yM , fillColour,strokeColour);
        this.n = n
        this.points = this.computePoints(this.r,this.n)
        console.log("Polygon Instantiated")
        this.lw = lw

    }
    draw(){
        ctx.save()
        ctx.translate(this.x,this.y)
        ctx.beginPath()
        let x = this.points[0][0]
        let y = this.points[0][1]
        ctx.moveTo(x,y)
        for(let i=1; i<this.points.length; i++){
            x=this.points[i][0]
            y=this.points[i][1]
            ctx.lineTo(x,y)
        }
        ctx.closePath()
        ctx.fillStyle = this.fillColour
        ctx.strokeStyle = this.strokeColour
        ctx.lineWidth= this.lw
        if(this.fillColour) {
            if(this.strokeColour) {

                ctx.fill();
                ctx.stroke();
            }
            else{
                ctx.fill()
            }
        }else if(this.strokeColour){
            ctx.stroke()
        }

/*
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fill();*/

        ctx.restore()
    }
    computePoints(r,n){
        let points = []
        let x = 0
        let y = 0
        for(let i =0; i<n; i++){
            x = r*Math.cos(i*2*Math.PI/n + Math.PI/2 + 2*Math.PI/(2*n))
            y = r*Math.sin(i*2*Math.PI/n + Math.PI/2 + 2*Math.PI/(2*n))
            points.push([x,y])
        }
        return points
    }
}
class Star extends Polygon{
    constructor(xS, yS, xM, yM , fillColour,strokeColour,n,lw=5, prop = 0.5) {
        super(xS, yS, xM, yM , fillColour,strokeColour,n,lw);
        this.r_inner= prop*this.r
        this.n = n
        this.points = this.computePoints(this.r,this.n)
        console.log(prop)
    }

    computePoints(r,n){
        let points = []
        let p=2*n
        let x = 0
        let y = 0
        for(let i =0; i<p; i++){
            let rad=0
            if(i%2===0){
                rad = this.r_inner
            }
            else{
                rad = r
            }
            x = rad*Math.cos(i*2*Math.PI/p + Math.PI/2 )
            y = rad*Math.sin(i*2*Math.PI/p + Math.PI/2 )
            points.push([x,y])
        }
        return points
    }
}
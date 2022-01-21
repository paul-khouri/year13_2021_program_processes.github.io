



 /**
 * Filled Polygon
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width of bounding box
 * @param {number} h height of bounding box
 * @param {object} c mini object of type {f: fillColour}
 * @param {number} n number of sides
 * @param {number} rotation rotation
 * @return Null
 */
class Polygon{
    constructor(x,y,w,h,c,n=5,rotation = 10){
        this.x_c = x+w/2;
        this.y_c = y+h/2;
        this.r = this.getabsolutesmaller(w,h)/2;
        this.n = n;
        this.c = c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        this.draw()
    }
    draw(){
        //console.log(this.c)
        var x
        var y
        var n = this.n;
        var R = this.r;
        var rot = 0
        if(n%4 == 0){
            rot = -Math.PI/n
        }else if((n+2)%4==0){
            rot = 0
        }
        else{
            rot = -Math.PI/2
        }
        ctx.save();
        ctx.translate(this.x_c, this.y_c);
        ctx.rotate(this.rotation);
        ctx.beginPath()
         var pointSet = []
         for(var i=0; i<n; i++){
             x= Math.round( R*Math.cos(i*2*Math.PI/n + rot) )
             y= Math.round( R*Math.sin(i*2*Math.PI/n + rot) )
             if(i== 0){
                 ctx.moveTo(x,y)
             }else{
                 ctx.lineTo(x, y)
             }
             pointSet.push({x:x, y:y})
         }
         ctx.closePath();
         ctx.restore();
         this.updateContext(this.c);

    }

}
Polygon.prototype._line = _line
Polygon.prototype.updateContext = updateContext
Polygon.prototype.getabsolutesmaller = getabsolutesmaller

class Rectangle{
    constructor(x,y,w,h,c, rotation = 0){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c=c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y+this.h/2);
        ctx.rotate(this.rotation)
        this._rect(0-this.w/2, 0 - this.h/2, this.w, this.h, this.c);
        ctx.restore();
    }
}
Rectangle.prototype._rect = _rect

class Ellipse{
    constructor(x,y,w,h,c, rotation = 0){
        this.x = x+w/2;
        this.y = y+h/2;
        this.xRad = Math.abs(w/2);
        this.yRad = Math.abs(h/2);
        this.c=c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation)
        this._ellipse(0, 0, this.xRad, this.yRad, this.c)
        ctx.restore();
    }
}
Ellipse.prototype._ellipse = _ellipse

class CanvasImage{
    constructor(img){
        this.img = img
    }
    update(){
        ctx.drawImage(this.img, 0,0,width,height)
    }
}
/**
 * Orbiting Circle
 * @param {number} x circle centre
 * @param {number} y circle centre
 * @param {number} orbit_r big radius
 * @param {number} circle_r radius of little circle
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class OrbitingCircle{
    constructor(x,y,orbit_r, circle_r, fill, stroke, strokeWidth){
        // initial variables
        this.x_s = x;
        this.y_s = y;
        this.o_r = orbit_r;
        this.c_r = circle_r;
        // current variables
        this.x = x;
        this.y = y;

        // styling
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        // timer and rate
        this.t = 0;
        this.B = 0.005
    }

    update(){
        this.draw()
        this.t += 1

        //console.log(this.r)
    }
    draw(){
        this.x = this.x_s + this.o_r*Math.cos(2*Math.PI * this.B * this.t)
        this.y = this.y_s + this.o_r*Math.sin(2*Math.PI * this.B * this.t)
        // central circle
        this.drawCircle(this.x_s, this.y_s, this.o_r, undefined, this.stroke, this.strokeWidth)

        this.drawCircle(this.x, this.y, this.c_r, this.fill, this.stroke, this.strokeWidth)
    }

}
OrbitingCircle.prototype.drawCircle = drawCircle
OrbitingCircle.prototype.updateContext = updateContext

/**
 * Multiple Orbiting Circle
 * @param {number} x circle centre
 * @param {number} y circle centre
 * @param {number} orbit_r big radius
 * @param {number} circle_r radius of little circle
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class MultipleOrbitingCircle extends OrbitingCircle{

    draw(){

        // central circle
        this.drawCircle(this.x_s, this.y_s, this.o_r, undefined, this.stroke, this.strokeWidth)

        for(let i = 0 ; i< 10; i++){

            this.x = this.x_s + this.o_r*Math.cos(2*Math.PI * this.B * (this.t+20*i))
            this.y = this.y_s + this.o_r*Math.sin(2*Math.PI * this.B * (this.t+20*i))

            this.drawCircle(this.x, this.y, this.c_r, this.fill, this.stroke, this.strokeWidth)
        }
    }
}


/**
 * Multiple Orbiting Circle
 * @param {number} x circle centre
 * @param {number} y circle centre
 * @param {number} orbit_r big radius
 * @param {number} circle_r radius of little circle
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class PulsingMultipleOrbitingCircle extends OrbitingCircle{

    draw(){

        this.B = 0.002


        this.r = 0.5*(this.o_r*Math.cos(2*Math.PI * this.B * this.t) + this.o_r);



        // central circle
        this.drawCircle(this.x_s, this.y_s, this.r, this.fill, this.stroke, this.strokeWidth)

        let n = 5
        for(let i = 0 ; i< n; i++){

            this.x = this.x_s + this.r*Math.cos(2*Math.PI * this.B * (this.t+1/(n*this.B)*i))
            this.y = this.y_s + this.r*Math.sin(2*Math.PI * this.B * (this.t+1/(n*this.B)*i))

            this.drawCircle(this.x, this.y, (this.o_r - this.r), undefined, this.stroke, this.strokeWidth)
        }
    }
}
/**
 * Pulsing Circle
 * @param {number} x circle centre
 * @param {number} y circle centre
 * @param {number} r radius
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class PulsingCircle{
    constructor(x,y,r,fill, stroke, strokeWidth){
        // initial variables
        this.x_s = x;
        this.y_s = y;
        this.r_s = r;
        // current variables
        this.x = x;
        this.y = y;
        this.r = r;
        // styling
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        // timer and rate
        this.t = 0;
        this.B = 0.005
    }

    update(){
        this.draw()
        this.t += 1
        this.r = 0.5*this.r_s*Math.sin(2*Math.PI *this.B* this.t) + 0.5*this.r_s;
        //console.log(this.r)

    }
    draw(){
        this.drawCircle(this.x, this.y, this.r, this.fill, this.stroke, this.strokeWidth)
    }
}
PulsingCircle.prototype.drawCircle = drawCircle
PulsingCircle.prototype.updateContext = updateContext

/**
 * Filled Ball
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Ball{
    constructor(x,y,r,fill, stroke, strokeWidth){
        this.x = x;
        this.y_s = y;
        this.y = y;
        this.x_s = x;
        this.r_s =r;
        this.r = r;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.t = 0;
        this.dx = 0;
        this.dy = 1;
        this.A_s = 2*this.r
        this.A= 2*this.r
        this.B = 0.001
    }
    update(){
        this.t += 1
        this.A = this.A_s*Math.sin(this.B*2*Math.PI*this.t) + this.A_s
        this.r = this.r_s*Math.sin(this.B*2*Math.PI*(this.t - 0.25/this.B)) + this.r_s



        //this.y = this.A * Math.sin(this.B*2*Math.PI*this.t) +this.y_s
        //this.x = this.A * Math.cos(this.B*2*Math.PI*this.t) +this.x_s
        this.draw()
    }
    draw(){
        this.drawCircle(this.x_s, this.y_s, 2.70*this.A_s,this.fill, this.stroke, this.strokeWidth)
        this.drawCircle(this.x_s, this.y_s, this.A, this.fill, this.stroke, this.strokeWidth)
        for(let i = 0 ; i<1 ; i+=0.05){
            this.drawCircle(this.A * Math.cos(this.B*2*Math.PI*(this.t + i/this.B)) +this.x_s,
                this.A * Math.sin(this.B*2*Math.PI*(this.t +i/this.B)) +this.y_s,
                this.r, undefined, this.stroke, this.strokeWidth )

        }

    }

}
Ball.prototype.drawCircle = drawCircle
Ball.prototype.updateContext = updateContext

/**
 * Filled Rectangle
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Rectangle{
    constructor(x,y,w,h,fill, stroke, strokeWidth){
        this.x = x;
        this.y = y;
        this.w=w;
        this.h=h;
        this.fill=fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
    }
    draw(){
        this.drawRectangle(this.x, this.y, this.w, this.h, this.fill, this.stroke, this.strokeWidth)
    }
}
Rectangle.prototype.drawRectangle = drawRectangle
Rectangle.prototype.updateContext = updateContext
/**
 * Filled TextBox
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width
 * @param {string} txt text
 * @param {string} fill fill colour
 * @param {string} txtColour colour of text
 */
class TextBox{
    constructor(x,y,width,txt, fillColour, txtColour) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.txt = txt;
        this.fillColour = fillColour;
        this.txtColour = txtColour;
    }
    update(txt){
        this.txt = txt
        this.draw()
    }

    draw(){
        this.drawTextBox(this.x, this.y,this.w,this.txt, this.fillColour, this.txtColour)

    }
}
TextBox.prototype.drawTextBox = drawTextBox;


/**
 * Grid - square grid
 * @param {number} w width of canvas
 * @param {number} h height of canvas
 * @param {number} intervalWidth distance each grid unit
 * @param {string} strokeColour stroke colour
 * @param {number} strokeWidth  width of outline
 */
class Grid{
    constructor(w,h,intervalWidth, strokeColour, strokeWidth){
        this.w = w;
        this.h = h;
        this.intervalWidth=intervalWidth;
        this.strokeColour = strokeColour;
        this.strokeWidth = strokeWidth;
    }
    update(){
        this.draw()
    }
    draw(){

        for(let i = -this.w ; i <= this.w ; i+= this.intervalWidth){

            this.drawLine(i,-this.h, i,this.h, this.strokeColour, this.strokeWidth);
        }
        for(let j = -this.h ; j <= this.h ; j+= this.intervalWidth){
            this.drawLine(-this.w,j, this.w,j, this.strokeColour, this.strokeWidth);
        }
        this.drawCircle(0,0,20,undefined,col[0][4], 5);
        this.drawLine(-this.w,0, this.w, 0, col[0][4], 4);
        this.drawLine(0, -this.h, 0, this.h, col[0][4], 4);
    }
}
Grid.prototype.drawCircle = drawCircle
Grid.prototype.drawLine = drawLine
Grid.prototype.updateContext = updateContext





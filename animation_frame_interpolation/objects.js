/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class MovingBall{
    constructor(x_b,y_b,r, fillcolour, T, H){
        this.x_b = x_b;
        this.y_b = y_b;
        this.r = r;
        this.fillColour = fillcolour;
        // animation variables
        this.t = 0;
        this.T = T;
        this.H = H;
    }
    update(){
        // add one to the value of little t each time update is called
        this.t +=1
        this.draw()
    }
    draw(){
        // get y value from the piecewise function
        let y = this.linearinterpolate(this.t, this.T, this.H)
        this.drawCircle(this.x_b,y+this.y_b, this.r)
    }

    linearinterpolate(t,T,H){
        // takes parameter t , T, H
        // we could hard code in this.T etc but is more fexible to have parameters
        // make sure t is between 0 and T
        t = t%T;  // modulus operator
        // set y variable and use to get value from equations
        let y;
        if(t<T/2){
            y = (-2*H*t)/(T) + H
        }else{
            y = (2*H*t)/(T) - H
        }
        return y
    }
    drawCircle(x,y,r){
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fillStyle = this.fillColour
        ctx.fill();
    }
}

/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 * @param {number} xIS x interval shift (to make a different interval for left right movement
 */
class MovingBallBoth{
    constructor(x_b,y_b,r, fillcolour, T, H, xIS){
        this.x_b = x_b;
        this.y_b = y_b;
        this.r = r;
        this.fillColour = fillcolour;
        // animation variables
        // set a random starting point (while be helpful when we have lots of moving balls)
        this.t = T*Math.random();
        this.T = T;
        this.H = H;
        // introduce an interval shift for the x interval
        // this will make the ball behave more naturalistically
        this.xIntervalShift = xIS
    }
    update(){
        // add one to the value of little t each time update is called
        this.t +=1
        this.draw()
    }
    draw(){
        // get y value from the piecewise function
        let y = this.linearinterpolate(this.t, this.T, this.H)
        // the interval is multiplied by the x interval shift
        let x = this.linearinterpolate(this.t, this.T*this.xIntervalShift, this.H)
        this.drawCircle(x+this.x_b,y+this.y_b, this.r)
    }

    linearinterpolate(t,T,H){
        // takes parameter t , T, H
        // we could hard code in this.T etc but is more fexible to have parameters
        // make sure t is between 0 and T
        t = t%T;  // modulus operator
        // set y variable and use to get value from equations
        let y;
        if(t<T/2){
            y = (-2*H*t)/(T) + H
        }else{
            y = (2*H*t)/(T) - H
        }
        return y
    }
    drawCircle(x,y,r){
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fillStyle = this.fillColour
        ctx.fill();
    }
}
/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class BallGroup{
    constructor(x_b,y_b,r, fillColour, T, H){
        this.x_b = x_b
        this.y_b = y_b
        this.H = H
        this.fillColour = fillColour
        // create a list that is going to hold a whole set of ball objects
        this.BSet = []
        //run a loop (in this case x50)
        for(let i=0; i<50; i++){
            // randomly set the amount of x interval shift
            let xIS = 1+5*Math.random()
            // randomly adjust the interval
            let randT = T + 2*T*Math.random()
            // create random red, green, blue
            let red = 255*Math.random();
            let green = 255*Math.random();
            let blue = 255*Math.random();
            // create random transparency
            let alpha = Math.random();
            // concatenate to make a rgb string
            let randColour = "rgba("+ red + ","+ green + "," + blue + "," + alpha +")"
            // randomly adjust the radius size
            let radius = r*7*Math.random()+r
            // create a moving ball using these values
            let temp = new MovingBallBoth(x_b,y_b,radius, randColour, randT, H, xIS)
            // push it into the BSet list
            this.BSet.push(temp)
        }
    }
    update(){
        // this is an extra bit
        // save the canvas
        ctx.save()
        // draw and fill a background rectangle
        this.drawRect(this.x_b, this.y_b, this.H, this.H)
        // the clip method will "clip out" anything outside the rectangle
        ctx.clip()
        // run a loop through the BSet
        for(let i=0; i<this.BSet.length ; i++){
            // call update on each moving ball
            this.BSet[i].update()
        }
        // restore the context (this removes the clip)
        ctx.restore()
    }

    drawRect(x,y,w,h){
        ctx.beginPath()
        ctx.rect(x,y,w,h);
        ctx.fillStyle = this.fillColour
        ctx.fill()
    }
}

/**
 * Ball that moves parabolically
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 * @param {number} xIS x interval shift (to make a different interval for left right movement
 */
class QuadraticBall extends MovingBallBoth{
    draw(){
        // get y value from the piecewise function
        let y = this.quadraticInterpolate(this.t, this.T, this.H)
        // the interval is multiplied by the x interval shift
        let x = this.linearinterpolate(this.t +this.T*this.xIntervalShift/2, this.T*this.xIntervalShift, this.H)
        this.drawCircle(x+this.x_b,y+this.y_b, this.r)
    }
    quadraticInterpolate(t,T,H){
        // takes parameter t , T, H
        // we could hard code in this.T etc but is more fexible to have parameters
        // make sure t is between 0 and T
        t = t%T;  // modulus operator
        // set y variable and use to get value from equations
        let y;
        if(t<T/2){
            y = ( 4*H*Math.pow(t,2) )/( Math.pow(T,2) )
        }else{
            y = ( 4*H*Math.pow(t-T,2) )/( Math.pow(T,2) )
        }
        return y
    }
}

/**
 *Group of Quadratically moving balls
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class QuadraticBallGroup{
    constructor(x_b,y_b,r, fillColour, T, H){
        this.x_b = x_b
        this.y_b = y_b
        this.H = H
        this.fillColour = fillColour
        // create a list that is going to hold a whole set of ball objects
        this.BSet = []
        //run a loop (in this case x50)
        for(let i=0; i<10; i++){
            // randomly set the amount of x interval shift
            let xIS = 1+20*Math.random()
            // randomly adjust the interval
            let randT = T + 2*T*Math.random()
            // create random red, green, blue
            let red = 255*Math.random();
            let green = 255*Math.random();
            let blue = 255*Math.random();
            // create random transparency
            let alpha = Math.random();
            // concatenate to make a rgb string
            let randColour = "rgba("+ red + ","+ green + "," + blue + "," + alpha +")"
            // randomly adjust the radius size
            let radius = r*10*Math.random()+r
            // create a moving ball using these values
            let temp = this.getObject(x_b,y_b,radius, randColour, randT, H, xIS)
            // push it into the BSet list
            this.BSet.push(temp)
        }
    }
    getObject(x_b,y_b,radius, randColour, randT, H, xIS){
        return  new QuadraticBall(x_b,y_b,radius, randColour, randT, H, xIS)
    }
    update(){
        // this is an extra bit
        // save the canvas
        ctx.save()
        // draw and fill a background rectangle
        this.drawRect(this.x_b, this.y_b, this.H, this.H)
        // the clip method will "clip out" anything outside the rectangle
        ctx.clip()
        // run a loop through the BSet
        for(let i=0; i<this.BSet.length ; i++){
            // call update on each moving ball
            this.BSet[i].update()
        }
        // restore the context (this removes the clip)
        ctx.restore()
    }
    drawRect(x,y,w,h){
        ctx.beginPath()
        ctx.rect(x,y,w,h);
        ctx.fillStyle = this.fillColour
        ctx.fill()
    }
}

/**
 * Ball that moves trigonometrically
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 * @param {number} xIS x interval shift (to make a different interval for left right movement
 */
class TrigBall extends MovingBallBoth{
    draw(){
        // get y value from the piecewise function
        let y = this.trigInterpolate(this.t, this.T, this.H)
        // the interval is multiplied by the x interval shift
        // see what happens with this commented out code
        //let x = this.trigInterpolate(this.t + this.T/4, this.T, this.H)
        let x = this.linearinterpolate(this.t +this.T*this.xIntervalShift/2, this.T*this.xIntervalShift, this.H)
        this.drawCircle(x+this.x_b,y+this.y_b, this.r)
    }
    trigInterpolate(t,T,H){
        let y = (H/2) * Math.cos( (2*Math.PI/T) *t) + H/2
        return y
    }
}
/**
 *Group of trigonometrically moving balls
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class TrigBallGroup extends QuadraticBallGroup{
    getObject(x_b,y_b,radius, randColour, randT, H, xIS){
        return new TrigBall(x_b,y_b,radius, randColour, randT, H, xIS)
    }
}

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

    }

    drawLine(x_1,y_1, x_2, y_2, strokeColour,strokeWidth){
        ctx.beginPath();
        ctx.moveTo(x_1,y_1);
        ctx.lineTo(x_2,y_2);
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeColour;
        ctx.lineWidth = strokeWidth;
        ctx .stroke()
    }
}

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
    constructor(x,y,width, fillColour, txtColour) {
        this.x = x;
        this.y = y;
        this.w = width;
        // fixed height
        this.h = 50;
        // text managed through update
        this.txt = "Placeholder";
        console.log(this.txt)
        this.fillColour = fillColour;
        this.txtColour = txtColour;
    }
    update(txt ="Placeholder"){
        this.txt = txt
        this.draw()
    }

    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fillStyle= this.fillColour;
        ctx.fill();
        ctx.font = "20px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = this.txtColour;
        ctx.fillText(this.txt, this.x+this.w/2, this.y+this.h/2);
    }
}
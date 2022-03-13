/**
 * Captures mouse events
 * Note that are no parameters for the constructor
 * There is no update function - events are independent of the animation frame
 */
class InteractiveObject{
    constructor(){
        // this listen for a mouse event - anywhere on the canvas
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        // variables to hold where the mouse was first clicked down
        // we will need them later
        this.xStart = 0
        this.yStart = 0
        // variables to hold the current mouse position
        this.xMouse = 0;
        this.yMouse = 0;
        // it will also be helpful to know if the mouse is down
        this.mouseIsDown = false;
    }
    mClick(e){}

    mDown(e){
        // update positions so this can be used in another object
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
        // yes the mouse is down
        this.mouseIsDown = true;
        //once you have got the idea, comment out these (and remove later)
        //let output = "This mouse went DOWN at  x = " + e.offsetX + " and y = " + e.offsetY;
        // console.log(output)
    }
    mUp(){
        // if the mouse is up, it can't be down :)
        this.mouseIsDown = false;
        //once you have got the idea, comment out these (and remove later)
        //let output = "This mouse went UP at x = " + e.offsetX + " and y = " + e.offsetY;
        //console.log(output);

    }
    mMove(e){
        // update positions so this can be used in another object
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }
    mLeave(){
        // this might be a useful safety feature
        // we could set mouseIsDown to false when the mouse leave the canvas
        console.log("Mouse has left the canvas")
    }
}

/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x ball centre x
 * @param {number} y ball centre y
 * @param {number} w radius of ball
 * @param {number} h radius of ball
 * @param {string} fill fill colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text  button text
 * @param {string} text  button text colour
 */
class InteractiveButton extends InteractiveObject{
    constructor(x,y, w, h, fill, over, selected, stroke, text, textColour){
        super()
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
        this.over=over;
        this.selected = selected;
        this.stroke=stroke;
        this.text = text;
        this.textColour = textColour
        this.inBounds = false
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.fill
        if(InteractiveButton.selected === this){
            fill = this.selected
        }else if(this.inBounds ){
            fill = this.over
        }
        this.draw(this.x, this.y, this.w, this.h, fill, this.stroke, this.text,this.textColour )
    }
    mClick() {
        // check mouse in bounds
        if(this.inBounds){
           InteractiveButton.selected = this;
        }
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m > x && x_m < x + w && y_m > y && y_m < y +h){
            return true
        }else{
            return false
        }
    }
    draw(x,y, w,h,c,s, txt, txtCol){
        ctx.beginPath()
        ctx.rect(x,y,w,h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = s;
        ctx.fillStyle = c;
        ctx.fill();
        ctx.stroke();

        let myFont= "bold 20px 'Trebuchet MS', Verdana, sans-serif  ";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;

        ctx.fillStyle = txtCol;
        ctx.fillText(txt,  x+ w/2 ,y+h/2);
    }
}
InteractiveButton.selected = null;


class Rectangle{
    constructor(x,y,w,h, fill){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.fill=fill
        this.objectSet = [];
        for(let i = 0; i <=50 ; i++){
            let x_b = this.x + this.w*Math.random()
            let T = 200+1000*Math.random()
            let R = 5+50*Math.random()
            let index = Math.floor(13*Math.random())
            let temp = new MovingBall(x_b, y, R, col[1][index], T, h)
            this.objectSet.push(temp)
        }
    }
    update(){
        ctx.save()
        this.draw()
        ctx.clip()
        for(let i = 0; i< this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        ctx.restore()
    }
    draw(){
        ctx.beginPath()
        ctx.rect(this.x,this.y,this.w,this.h)
        ctx.fillStyle=this.fill
        ctx.fill()
    }
    setFill(f){
        this.fill=f
    }
}

class Manager extends InteractiveObject{
    constructor(){
        super()
        this.leftRectangle = new Rectangle(50,50,300,500,col[0][7])
        this.rightRectangle = new Rectangle(650,50,300,500,col[0][7])
        this.text = ""
    }
    update(){
        this.leftRectangle.update()
        this.rightRectangle.update()

    }
    //"Green", "Pale Yellow", "Blue", "Red"
    mClick(){
        let l = this.leftRectangle
        let r = this.rightRectangle
        let text = InteractiveButton.selected.text
        switch(text){
            case 'Pink':
                console.log('Pink')
                l.setFill(col[0][3])
                break
            case 'Green':
                console.log('Green')
                r.setFill(col[0][9])
                break
            case 'Pale Yellow':
                console.log('Pale Yellow')
                l.setFill(col[0][7])
                break
            case 'Blue':
                console.log('Blue')
                r.setFill(col[0][5])
                break
            case 'Red':
                console.log('Red')
                l.setFill(col[0][14])
                break
            default:
                console.log("Nothing found")
        }
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

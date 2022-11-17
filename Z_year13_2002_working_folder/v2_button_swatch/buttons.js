//---------------------  Objects
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
        let output = "This mouse went DOWN at  x = " + e.offsetX + " and y = " + e.offsetY;
        console.log(output)
    }
    mUp(e){
        // if the mouse is up, it can't be down :)
        this.mouseIsDown = false;
        //once you have got the idea, comment out these (and remove later)
        //let output = "This mouse went UP at x = " + e.offsetX + " and y = " + e.offsetY;
        //console.log(output);

    }
    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(){
        // this might be a useful safety feature
        // we could set mouseIsDown to false when the mouse leave the canvas
        console.log("Mouse has left the canvas")
        this.mouseIsDown = false;
    }
    getBoundary(x,y,w,h,x_m,y_m){
        if(x_m > x && x_m < x + w && y_m > y && y_m < y +h){
            return true
        }else{
            return false
        }
    }
    getDistance(x_c,y_c, x_m, y_m, r){
        let d = Math.sqrt(Math.pow(x_c-x_m, 2) + Math.pow(y_c - y_m, 2))
        return d<r
    }
}


/**
 * Clickable Button
 * Includes all functions from interactive object
 * @param {number} x  x
 * @param {number} y  y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {string} text  button text
 * @param {string} text  button text colour
 */
class Button extends InteractiveObject{
    constructor(x,y,w,h,fillColour, strokeColour){
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColour = fillColour;
        this.strokeColour= strokeColour;
        this.inBounds = false
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h,this.xMouse, this.yMouse)
    }

    drawRect(x,y,w,h,fillColour,strokeColour){

        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.strokeStyle = strokeColour
        ctx.fillStyle= fillColour
        ctx.lineWidth = 4
        ctx.fill()
        ctx.stroke()
    }

    centredText(txt, x_c, y_c, colour){
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = colour;
        ctx.fillText(txt, x_c, y_c);
    }
}



/**
 * Basic, selectable options button
 * Includes all functions from interactive object and button base
 * @param {number} x  x
 * @param {number} y  y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} text  button text
 * @param {string} textColour  button text colour
 */
class OptionsButton extends Button{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour) {
        super(x,y,w,h,fillColour, strokeColour);
        this.overColour = overColour
        this.selectedColour = selectedColour
        this.text = text
        this.textColour = textColour
    }
    mClick() {
        if(this.inBounds){
            console.log("Click call from Options Button: " + this.text)
            OptionsButton.selected = this;
        }
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)

        let fill = this.fillColour

        if(this.inBounds){
            fill = this.overColour
            console.log(this.fillColour)
        }

        if(OptionsButton.selected === this){
              fill = this.selectedColour
           }



        this.drawRect(this.x, this.y, this.w, this.h, fill, this.strokeColour)
        this.centredText(this.text,this.x+this.w/2,this.y+this.h/2,this.textColour)
    }


}
OptionsButton.selected = null;

/**
 * Basic, selectable swatch button
 * Includes all functions from interactive object and button base
 * @param {number} x  x
 * @param {number} y  y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 * @param {string} stroke stroke colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} text  button text
 * @param {string} textColour  button text colour
 */
class SwatchButton extends Button{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour)  {
        super(x,y,w,h,fillColour, strokeColour);
        this.overColour = overColour
        this.selectedColour = selectedColour
    }
    mClick(e) {
        if(this.inBounds){
            SwatchButton.colour = this.fillColour
            SwatchButton.selected = this
        }
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)

        let stroke = this.strokeColour

        if(this.inBounds){
            stroke = this.overColour
            console.log(this.fillColour)
        }

        if(SwatchButton.selected === this){
            stroke = this.selectedColour
        }



        this.drawRect(this.x, this.y, this.w, this.h, this.fillColour,stroke)

    }

}

SwatchButton.colour = "rgb(0,0,0)"
SwatchButton.selected = ""




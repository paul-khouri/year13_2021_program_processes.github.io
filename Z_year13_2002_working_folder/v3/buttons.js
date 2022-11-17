// noinspection DuplicatedCode


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
class ButtonBase extends InteractiveObject{
    constructor(x,y, fillColour, overColour, selectedColour, strokeColour){
        super();
        this.x = x;
        this.y = y;
        this.fillColour = fillColour;
        this.overColour=overColour;
        this.selectedColour = selectedColour;
        this.strokeColour=strokeColour;
        this.inBounds = false
    }
}



/**
 * Basic, selectable options button
 * Includes all functions from interactive object and button base
 * @param {number} x  x
 * @param {number} y  y
 * @param {string} fill fill colour
 * @param {string} over hover over  colour
 * @param {string} selected button has been clicked colour
 * @param {string} stroke stroke colour
 * @param {number} w width
 * @param {number} h height
 * @param {string} text  button text
 * @param {string} textColour  button text colour
 */
class OptionsButton extends ButtonBase{
    constructor(x,y, fillColour, overColour, selectedColour, strokeColour,w,h, text, textColour) {
        super(x,y,fillColour, overColour, selectedColour, strokeColour);
        this.w = w
        this.h = h
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
            //console.log(this.fillColour)
        }

        if(OptionsButton.selected === this){
              fill = this.selectedColour
           }

        this.draw(this.x, this.y, this.w, this.h, fill, this.strokeColour, this.text,this.textColour )
    }

    draw(x,y, w,h,fillColour,strokeColour, txt, txtCol){
        this.strokeFillRect(x,y,w,h,fillColour, strokeColour, 0.5)
        this.centredText(txt, x+w/2,  y+h/2, txtCol)
    }
}
OptionsButton.prototype.strokeFillRect = strokeFillRect
OptionsButton.prototype.centredText = centredText
OptionsButton.selected = null;

/**
 * Basic, selectable circlular swatch button
 * Includes all functions from interactive object and button base
 * @param {number} x  x
 * @param {number} y  y
 * @param {string} fillColour fill colour
 * @param {string} strokeColour stroke colour
 * @param {string} overColour hover over colour on stroke
 * @param {string} selectedColour colour of stroke when selected
 * @param {number} strokeWidth stroke width
 * @param {number} r radius
 */
class SwatchButton extends ButtonBase{
    constructor(x,y,fillColour, strokeColour, overColour, selectedColour, strokeWidth, r) {
        super(x,y,fillColour, overColour, selectedColour, strokeColour);
        this.r = r;
        this.strokeWidth = strokeWidth;
        this.inBounds = false

    }
    mClick(e) {
        if(this.inBounds){
            SwatchButton.colour = this.fillColour
        }
    }
    update(){
        this.draw()
        this.inBounds=this.getDistance(this.x, this.y, this.xMouse, this.yMouse, this.r)
    }
    draw(){
       let currentStroke = this.strokeColour
        let strokeW = this.strokeWidth
        if(this.inBounds){
            currentStroke = this.overColour
            strokeW *= 2
        }
        if(this.fillColour === SwatchButton.colour){
            currentStroke = this.fillColour
            strokeW *= 2
        }
        this.filledStrokedCircle(this.x,this.y,this.r, this.fillColour,currentStroke, strokeW)
    }

}
SwatchButton.prototype.filledStrokedCircle = drawFilledStrokeCircle
SwatchButton.colour = "rgb(0,0,0)"



/**
 * Basic, selectable circlular swatch button
 * Includes all functions from interactive object and button base
 * @param {number} x  x
 * @param {number} y  y
 * @param {string} fillColour fill colour
 * @param {string} strokeColour stroke colour
 * @param {string} overColour hover over colour on stroke
 * @param {string} selectedColour colour of stroke when selected
 * @param {number} strokeWidth stroke width
 * @param {number} r radius
 */
class SwitchButton extends OptionsButton {
    constructor(x, y, fillColour, overColour, selectedColour, strokeColour, w, h, text, textColour) {
        super(x, y, fillColour, overColour, selectedColour, strokeColour, w, h, text, textColour);
        this.state = 0;
    }

    mClick(e) {
        if(this.inBounds){
            this.state = (this.state+1)%2
        }
        console.log(this.state)
    }

    update(){

        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.fillColour

        if(this.inBounds){
            fill = this.overColour

        }

        if(OptionsButton.selected === this){
            fill = this.selectedColour
        }
        this.draw(this.x, this.y, this.w, this.h, this.fillColour, this.strokeColour, this.text,this.textColour )
        let x = this.x+this.w / 2-this.h/4
        let r = this.h/4
        this.roundedRect(x-r,this.y+this.h/2,4*r,this.h,this.fillColour, this.strokeColour)
        if(this.state=== 1) {
             x+=  2*this.h / 4
        }
        this.drawFilledStrokeCircle(x, this.y+this.h/2+r ,r , fill, this.strokeColour)


    }

    draw(x,y, w,h,fillColour,strokeColour, txt, txtCol){
        console.log("switchdraw")
        this.strokeFillRect(x,y,w,h,fillColour, strokeColour, 0.5)
        this.centredText(txt, x+w/2,  y+h/4, txtCol)
        //this.drawLine(x,y+h/2, x+w,y+h/2, strokeColour)
    }


}
SwitchButton.prototype.drawFilledStrokeCircle = drawFilledStrokeCircle
SwitchButton.prototype.drawLine = drawLine
SwitchButton.prototype.roundedRect = roundedRect




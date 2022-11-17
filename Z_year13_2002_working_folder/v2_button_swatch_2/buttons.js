//---------------------  Objects



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
        ctx.lineWidth = 2
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
        this.name = OptionsButton
    }
    mClick() {
        console.log(this.text +"Clicked")
    }
    mUp(e) {
        super.mUp(e);
        if(this.inBounds){
            console.log(this.text +"Mouse up")

            this.name.selected = this;
        }

    }

    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)

        let fill = this.fillColour
        if(this.inBounds){
            fill = this.overColour

        }
        if(this.name.selected === this){
              fill = this.selectedColour
           }
        this.drawRect(this.x, this.y, this.w, this.h, fill, this.strokeColour)
        this.centredText(this.text,this.x+this.w/2,this.y+this.h/2,this.textColour)
    }


}
OptionsButton.selected = null;

class StarPolygonSides extends OptionsButton{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour) {
        super(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour);
        this.name=StarPolygonSides
    }
}
StarPolygonSides.selected=null

class StarRatio extends OptionsButton{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour) {
        super(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour);
        this.name=StarRatio
    }
}
StarRatio.selected=null





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
class ChildButton extends Button{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour,text, textColour) {
        super(x,y,w,h,fillColour, strokeColour);
        this.overColour = overColour
        this.selectedColour = selectedColour
        this.text = text
        this.textColour = textColour
        this.parent = null
        this.state=true
    }
    mClick() {
        if(this.inBounds){
            console.log("Click call from Options Button: " + this.text)
            //this.parent.selectedButton = this;
            if(this.state){
                this.state = false
            }else{
                this.state=true
            }
        }
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        let fill = this.fillColour

        let stroke = this.strokeColour

        if(this.inBounds){
            stroke = this.overColour
            console.log(stroke)
        }

        if(this.parent) {

            /*
            if (this.parent.selectedButton === this) {
                fill = this.selectedColour
            }
             */
            if(this.state){
                fill = this.selectedColour
            }
        }
        let txt = this.text
        if(this.state){
            txt = txt + " is on"

        }else{
            txt = txt + " is off"

        }



        this.drawRect(this.x, this.y, this.w, this.h, fill, stroke)
        this.centredText(txt,this.x+this.w/2,this.y+this.h/2,this.textColour)
    }

    setParent(p){
        this.parent= p
    }


}


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
class ChildSwatch extends Button{
    constructor(x,y, w,h,fillColour, strokeColour, overColour, selectedColour)  {
        super(x,y,w,h,fillColour, strokeColour);
        this.overColour = overColour
        this.selectedColour = selectedColour
        this.parent = null
    }
    mClick(e) {
        if(this.inBounds){
           this.parent.selectedSwatch = this
        }
    }
    update(){
        this.inBounds = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)

        let stroke = this.strokeColour

        if(this.inBounds){
            stroke = this.overColour
            console.log(this.fillColour)
        }

        if(this.parent) {

            if (this.parent.selectedSwatch === this) {
                stroke = this.selectedColour
            }

        }



        this.drawRect(this.x, this.y, this.w, this.h, this.fillColour,stroke)

    }
    setParent(p){
        this.parent= p
    }

}

class Panel{
    constructor(x,y,w,h,txt){
        let s= 2
        this.B = new ChildButton(x+s,y+s,w-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2],  txt, col[0][9])
        this.selectedButton = null
        this.selectedSwatch = null
        this.B.setParent(this)

        this.swatchSet = []


        let sWidth = w/4
        for(let j=0 ; j<6; j++) {
            for (let i = 0; i < 4; i++) {
                let c = this.getRandomColour()
                let temp = new ChildSwatch(x + s + i * sWidth, y+s +h + j*h, sWidth-2*s, sWidth-2*s, c, col[0][0], col[0][6], col[0][2])
                temp.setParent(this)
                this.swatchSet.push(temp)
            }
        }
       // this.E = new ChildSwatch(x+w/2, y+h, w/2, h, col[0][4], col[0][0], col[0][6], col[0][2])


    }
    update(){
        this.B.update()
        for(let i = 0; i < this.swatchSet.length; i++){
            this.swatchSet[i].update()
        }

        //this.E.update()
    }
    getRandomColour(){
        let R = 255*Math.random()
        let G = 255*Math.random()
        let B = 255*Math.random()
        return "rgb("+ R + "," + G +"," +B +")"
    }
}

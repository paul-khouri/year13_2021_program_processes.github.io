
/**
 * Draw a dynamic rectangle and add new objects
 */
class Centre extends InteractiveObject{
    constructor(x,y,w,h){
        super()
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.objectSet = [];
        this.chosenShape = OptionsButton.selected.text
        this.brush = null
        this.okayForDraw = false
    }
    mClick(e) {
        super.mClick(e);
        this.chosenShape = OptionsButton.selected.text

    }

    mUp(e) {
        super.mUp(e);
        let chosenColour = SwatchButton.colour
        let chosenShape = this.chosenShape
        console.log(chosenShape)
        if(this.okayForDraw) {
            if (chosenShape === "Rectangle") {
                let temp = new Rectangle(this.xStart, this.yStart, this.xMouse, this.yMouse, chosenColour)
                this.objectSet.push(temp)
            } else if (chosenShape === "Ellipse") {
                let temp = new Ellipse(this.xStart, this.yStart, this.xMouse, this.yMouse, chosenColour)
                this.objectSet.push(temp)
            } else if (chosenShape === "Circle") {
                let temp = new Circle(this.xStart, this.yStart,  this.xMouse, this.yMouse, chosenColour)
                this.objectSet.push(temp)
            }
        }
        this.brush = null
        this.okayForDraw = false

    }
    mDown(e) {
        super.mDown(e);
        this.okayForDraw = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)

    }

    update(){
        ctx.save()
        this.drawBackground()
        ctx.clip()

        for(let i = 0; i< this.objectSet.length; i++){
            this.objectSet[i].update()
        }

        if(this.okayForDraw && !this.brush ){
            this.drawGuideBox();
        }
        ctx.restore()
    }

    drawBackground(){
        this.basicRect(this.x,this.y, this.w,this.h, col[1][2])
    }

    drawGuideBox() {
        let x = this.xStart
        let y = this.yStart
        let w = this.xMouse - this.xStart;
        let h= this.yMouse - this.yStart;
        let c = col[0][7]
        this.strokeRect(x, y, w, h, c);
        this.drawLine(x,y, x+w, y+h, c);
        this.drawLine(x,y+h, x+w, y, c);
        let r= Math.min(Math.abs(w),Math.abs(h) )/2
        this.drawStrokeCircle(x+w/2, y+h/2, r,c)
    }
}
Centre.prototype.strokeRect = strokeRect
Centre.prototype.basicRect = basicRect
Centre.prototype.drawLine = drawLine
Centre.prototype.drawStrokeCircle = drawStrokeCircle
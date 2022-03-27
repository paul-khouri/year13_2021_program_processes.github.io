
/**
 * Draw a dynamic rectangle and add new objects
 */
class Centre extends InteractiveObject{
    constructor(){
        super()
        this.x = 300;
        this.y = 25;
        this.w = 675;
        this.h = 550;

        this.objectSet = [];

        this.x_d = 300;
        this.y_d = 25;
        this.chosenShape = OptionsButton.selected.text
        this.brush = null
    }
    mClick(e) {
        super.mClick(e);
        this.chosenShape = OptionsButton.selected.text
        console.log("Click call from central: " + this.chosenShape)
        if(this.chosenShape === "Brush1" ){
            this.brush = new MouseMover()
            this.objectSet.push(this.brush)
        }
    }

    mUp(e) {
        super.mUp(e);

        let chosenShape = this.chosenShape
        console.log(chosenShape)
        if(chosenShape === "Rectangle") {
            let temp = new Rectangle(this.xStart, this.yStart, this.xMouse, this.yMouse, col[1][6])
            this.objectSet.push(temp)
        }else if(chosenShape === "Ellipse"){
            let temp = new Ellipse(this.xStart, this.yStart, this.xMouse, this.yMouse, col[1][7])
            this.objectSet.push(temp)
        }else if(chosenShape === "Brush1"){

        }

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




        if(this.mouseIsDown && this.chosenShape !== "Brush1"){
            this.drawGuideBox();
        }
        ctx.restore()
    }

    drawBackground(){
        this.basicRect(this.x,this.y, this.w,this.h, col[0][1])
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
        this.drawStrokeCircle(x+w/2, y+h/2, Math.abs(w/20),c)
    }
}
Centre.prototype.strokeRect = strokeRect
Centre.prototype.basicRect = basicRect
Centre.prototype.drawLine = drawLine
Centre.prototype.drawStrokeCircle = drawStrokeCircle
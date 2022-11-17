
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
        this.firstShape = OptionsButton.selected
        this.chosenShape = OptionsButton.selected.text
        this.brush = false
        this.okayForDraw = false
    }
    mClick(e) {
        super.mClick(e);

        console.log("Central Click")

    }

    mUp(e) {
        super.mUp(e);
        this.chosenShape = OptionsButton.selected.text



        let fillColour = P.selectedSwatch.fillColour

        //fillColour="rgba(255,50,130,0.5)"
        //console.log(fillColour)
        var digits= fillColour.match( /\d+(?=,)|(\d+(\.\d+))+/g);
        //console.log(digits)
        let strokeColour = Q.selectedSwatch.fillColour
        let fillState = P.selectedButton.state
        let strokeState = Q.selectedButton.state
        if(!fillState){
            fillColour = undefined
        }
        if(!strokeState){
            strokeColour = undefined
        }

        let chosenShape = this.chosenShape
        console.log("Central Up")
        console.log(OptionsButton.selected.text)
        console.log(chosenShape)

        if(this.okayForDraw) {
            if (chosenShape === "Rectangle") {
                let temp = new Rectangle(this.xStart, this.yStart, this.xMouse, this.yMouse, fillColour,strokeColour)
                this.objectSet.push(temp)
            } else if (chosenShape === "Ellipse") {
                let temp = new Ellipse(this.xStart, this.yStart, this.xMouse, this.yMouse, fillColour,strokeColour)
                this.objectSet.push(temp)
            } else if (chosenShape === "Circle") {
                let temp = new Circle(this.xStart, this.yStart,  this.xMouse, this.yMouse, fillColour,strokeColour)
                this.objectSet.push(temp)
            }else if (chosenShape === "Star") {
                let points = StarPolygonSides.selected.text
                let ratio = StarRatio.selected.text
                let temp = new Star(this.xStart, this.yStart,  this.xMouse, this.yMouse, fillColour,strokeColour,points, 5,ratio)
                this.objectSet.push(temp)
            }else if (chosenShape === "Polygon") {
                let sides = StarPolygonSides.selected.text
                let temp = new Polygon(this.xStart, this.yStart,  this.xMouse, this.yMouse, fillColour,strokeColour,sides,5)
                this.objectSet.push(temp)
            }
        }

        this.brush = false
        this.okayForDraw = false

    }
    mDown(e) {
        super.mDown(e);
        this.okayForDraw = this.getBoundary(this.x, this.y, this.w, this.h, this.xMouse, this.yMouse)
        if(this.okayForDraw && this.chosenShape === "Brush1"){
            this.brush = true
            let temp = new BlurryCircle()
            this.objectSet.push(temp)
        }

    }

    update(){
        if(OptionsButton.selected) {
            if (OptionsButton.selected.text === "Undo") {
                this.objectSet.pop()
                OptionsButton.selected = this.firstShape
            }else if(OptionsButton.selected.text === "Clear") {
                this.objectSet = []
                OptionsButton.selected = this.firstShape
            }
        }
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
        this.basicRect(0,0,this.x,height, col[1][2])
        this.basicRect(this.x+25,this.y, this.w,this.h, col[1][2])
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

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

        this.gridInterval = 15
        this.G = new Grid(x,y,w,h,this.gridInterval, "rgb(0,0,0)")

        this.objectSet = [];

        this.chosenShape = OptionsButton.selected
        this.brush = null
        this.okayForDraw = false
        this.guideSwitch = ""
        this.gridSwitch = ""
        this.ratioSlider =""
        this.numberSlider =""
        this.x_s = this.xStart
        this.y_s = this.yStart
        this.x_f = this.xMouse
        this.y_f = this.yMouse
    }

    mClick(e) {
        super.mClick(e);
        this.chosenShape = OptionsButton.selected
        let chosenColour = SwatchButton.colour
        console.log("Click call from central: " + this.chosenShape)
        if(this.chosenShape.text === "Brush1" ){
            this.brush = new MouseMover(chosenColour)
            this.objectSet.push(this.brush)
        }else if(this.chosenShape.text === "Brush2"){
            this.brush = new BlurryCircle(chosenColour)
            this.objectSet.push(this.brush)
        }else if(this.chosenShape.text === "Brush3"){
            this.brush = new BlurredLine()
            this.objectSet.push(this.brush)
        }
    }

    mUp(e) {
        super.mUp(e);
        let chosenColour = SwatchButton.colour
        let chosenShape = this.chosenShape
        console.log(chosenShape)
        if(this.okayForDraw) {
            if (chosenShape.text === "Rectangle") {
                let temp = new Rectangle(this.x_s, this.y_s, this.x_f, this.y_f, chosenColour)
                this.objectSet.push(temp)
            } else if (chosenShape.text === "Ellipse") {
                let temp = new Ellipse(this.x_s, this.y_s, this.x_f, this.y_f, chosenColour)
                this.objectSet.push(temp)
            } else if (chosenShape.text === "Circle") {
                let temp = new Circle(this.x_s, this.y_s, this.x_f, this.y_f, chosenColour)
                this.objectSet.push(temp)
            }else if (chosenShape.text === "Polygon") {
                let temp = new Polygon(this.x_s, this.y_s, this.x_f, this.y_f, chosenColour, this.numberSlider.value)
                this.objectSet.push(temp)
            }
            else if (chosenShape.text === "Star") {
                let temp = new Star(this.x_s, this.y_s, this.x_f, this.y_f, chosenColour, this.numberSlider.value, this.ratioSlider.value)
                this.objectSet.push(temp)
            }

        }
        this.brush = null
        this.okayForDraw = false

    }
    mDown(e) {
        super.mDown(e);
        this.okayForDraw = this.getBoundary(this.x-1, this.y-1, this.w+1, this.h+1, this.xMouse, this.yMouse)


    }

    update(){

        if(this.gridSwitch.state){

            this.xStart = this.roundTo(this.x, this.xStart,this.gridInterval )
            this.yStart = this.roundTo(this.x, this.yStart,this.gridInterval )

            this.xMouse = this.roundTo(this.x, this.xMouse,this.gridInterval )
            this.yMouse = this.roundTo(this.y, this.yMouse,this.gridInterval )


        }

        if(this.guideSwitch.state){
            this.x_s = this.xStart + this.xStart-this.xMouse
            this.y_s = this.yStart + this.yStart-this.yMouse
            this.x_f = this.xMouse
            this.y_f = this.yMouse
        }else{
            this.x_s = this.xStart
            this.y_s = this.yStart
            this.x_f = this.xMouse
            this.y_f = this.yMouse
        }
        // rendering drawing area section
        ctx.save()
        this.drawBackground()
        ctx.clip()
        if(this.gridSwitch.state){
            this.G.update()
        }


        for(let i = 0; i< this.objectSet.length; i++){
            this.objectSet[i].update()
        }

        if(this.okayForDraw && !this.brush ){
            this.drawGuideBox(this.x_s, this.y_s,this.x_f,this.y_f);
        }
        ctx.restore()
    }

    drawBackground(){
        this.basicRect(this.x,this.y, this.w,this.h, "rgb(220,220,220)")
    }

    drawGuideBox(x_s,y_s,x_f,y_f) {
        let w = x_f - x_s;
        let h = y_f - y_s;
        let c = col[0][1]
        this.strokeRect(x_s, y_s, w, h, c);
        this.drawLine(x_s, y_s, x_s+w, y_s+h, c);
        this.drawLine(x_s, y_s+h, x_s+w, y_s, c);
        let r= Math.min(Math.abs(w),Math.abs(h) )/2
        this.drawStrokeCircle(x_s+w/2, y_s+h/2, r,c)
    }

    setGuideSwitch(s){
        this.guideSwitch = s
    }
    setGridSwitch(s){
        this.gridSwitch = s
    }
    setRatioSlider(s){
        this.ratioSlider = s
    }
    setNumberSlider(s){
        this.numberSlider = s
    }

    roundTo(start,p,n){
        // divide by n
        // round
        // multiply by n

        // add difference
        return n*Math.round( (p- start)/n ) + start

    }
}
Centre.prototype.strokeRect = strokeRect
Centre.prototype.basicRect = basicRect
Centre.prototype.drawLine = drawLine
Centre.prototype.drawStrokeCircle = drawStrokeCircle
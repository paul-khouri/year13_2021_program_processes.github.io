
class MouseMover extends InteractiveObject{
    constructor() {
        console.log("Mouse Mover Instantiated")
        super();
        this.brushImage = null;
        this.completed = false;
    }

    mMove(e){
        // update positions so this can be used in another object
        let x_0 = this.xMouse
        let y_0 = this.yMouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        let x_1 = this.xMouse
        let y_1 = this.yMouse
        //console.log("moving")
        let dx = x_1 - x_0
        let dy = y_1 - y_0
        console.log(dx)
        let x_c = width/2
        let y_c = height/2
        if(this.mouseIsDown && !this.completed) {
            console.log("Mouse is down on Mover")
            this.drawLine(this.xMouse, this.yMouse, this.xMouse + 10 * dx, this.yMouse + 10 * dy, "rgba(255,255,255,0.1)", 5, ctx_s)
        }
    }
    mUp(){
        if(!this.completed) {
            super.mUp()
            let img = canvasSecond.toDataURL("image/png");
            // create new JS image and set source
            let copiedImage = new Image()
            copiedImage.src = img
            // create the image object (mine) and push
            let temp = new CanvasImage(copiedImage)
            this.brushImage = temp;
            this.completed = true
            ctx_s.clearRect(0, 0, width, height)
            //ctx_s.clearRect(0,0,width,height)
        }
    }

    update(){
        if(this.mouseIsDown && !this.completed) {
            ctx.drawImage(canvasSecond, 0, 0, width, height);
        }
        if(this.completed){
            this.brushImage.update()
        }
    }
}
MouseMover.prototype.drawLine = drawLine

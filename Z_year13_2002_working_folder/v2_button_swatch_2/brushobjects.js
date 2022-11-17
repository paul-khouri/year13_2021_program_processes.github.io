
class MouseMover extends InteractiveObject{
    constructor(c) {
        console.log("Mouse Mover Instantiated")
        super();
        this.brushImage = null;
        this.completed = false;
        this.colour = c
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
        //console.log(dx)
        let x_c = width/2
        let y_c = height/2
        if(this.mouseIsDown && !this.completed) {
            console.log("Mouse is down on Mover")
            this.drawLine(this.xMouse, this.yMouse, this.xMouse + 10 * dx, this.yMouse + 10 * dy, this.colour, 2, ctx_s)
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

class BlurryCircle extends InteractiveObject{
    constructor() {
        console.log("Blurry Circle Instantiated")
        super();
        this.brushImage = null;
        this.completed = false;
    }

    mMove(e){
        // update positions so this can be used in another object
        //let x_0 = this.xMouse
        //let y_0 = this.yMouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        let x_1 = this.xMouse
        let y_1 = this.yMouse

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
            this.blurredCircle(this.xMouse, this.yMouse,4, ctx_s)
            ctx.drawImage(canvasSecond, 0, 0, width, height);
        }
        if(this.completed){
            this.brushImage.update()
        }
    }
}
BlurryCircle.prototype.blurredCircle = blurredCircle

function blurredCircle(x,y,r, ct=ctx){
    // Create a radial gradient
// The inner circle is at x=110, y=90, with radius=30
// The outer circle is at x=100, y=100, with radius=70
    let gradient = ct.createRadialGradient(x,y,0, x,y, r);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ct.fillStyle = gradient;

    ct.beginPath()
    ct.arc(x,y,r, 0, 2*Math.PI)
    ct.fill();
}

class BlurredLine extends InteractiveObject{
    constructor() {
        console.log("Mouse Mover Instantiated")
        super();
        this.brushImage = null;
        this.completed = false;
    }

    mMove(e) {
        // update positions so this can be used in another object
        let x_0 = this.xMouse
        let y_0 = this.yMouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        let x_1 = this.xMouse
        let y_1 = this.yMouse

        if(this.mouseIsDown && !this.completed) {
            this.blurryLine(x_0, y_0,x_1, y_1, ctx_s)
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
BlurredLine.prototype.blurryLine = blurryLine



function blurryLine(x_1, y_1, x_2, y_2, ct = ctx){
    let x_mid = (x_1+x_2)/2
    let y_mid = (y_1 +y_2)/2
    let w = x_2 - x_1
    let h = y_2 - y_1
    let ang = Math.atan2(h,w);
    console.log(ang*180/Math.PI)
    let length = Math.sqrt(Math.pow(w,2) + Math.pow(h, 2))
    let thickness = 5


    ct.save()
    ct.translate(x_mid, y_mid)
    ct.rotate(ang)

    let gradient = ct.createLinearGradient(0,0+thickness,0,0-thickness);
    gradient.addColorStop(0, 'rgba(0,255,255,0)');
    gradient.addColorStop(0.5, 'rgba(0,255,255,1)');
    gradient.addColorStop(1, 'rgba(0,255,255,0)');



    ct.beginPath()
    ct.rect(0 -length/2,0-thickness, length, 2*thickness)
    ct.strokeStyle = "rgb(255,255,255)"
    ct.fillStyle = gradient
    ct.fill()
    //ctx.stroke()
    ct.restore()


}

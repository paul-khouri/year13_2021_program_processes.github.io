canvasSecond = document.querySelector('#mySecondCanvas');
let ctx_s = canvasSecond.getContext('2d');
canvasSecond.width = width*scale;
canvasSecond.height = height*scale;
ctx_s.scale(scale,scale);

let my_sc = document.getElementById('mySecondCanvas');
my_sc.style.backgroundColor = "rgb(100,100,100)"
my_sc.style.width = width+"px";
my_sc.style.height = height+"px";
my_sc.style.border = "0px solid rgba(200,200,200,0.5)";
my_sc.style.display = "block";
my_sc.style.margin = "auto";



class BlurryCircle extends InteractiveObject {
    constructor(fillColour) {
        console.log("Blurry Circle Instantiated")
        super();
        this.brushImage = null;
        this.completed = false;
        this.mouseIsDown = true
        this.fillColour = fillColour
    }

    mMove(e) {
        // update positions so this can be used in another object
        //let x_0 = this.xMouse
        //let y_0 = this.yMouse
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        console.log("mouse move")
    }


    mUp(){
        if (!this.completed) {
            super.mUp()
            let img = canvasSecond.toDataURL("image/png");
            // create new JS image and set source
            let copiedImage = new Image()
            copiedImage.src = img
            // create the image object (mine) and push
            this.brushImage = copiedImage;
            this.completed = true
            ctx_s.clearRect(0, 0, width, height)
            //ctx_s.clearRect(0,0,width,height)
        }
    }
    mDown(e) {
        super.mDown(e);
        console.log(this.mouseIsDown)
    }

    update() {
        //console.log(this.mouseIsDown)
        if (this.mouseIsDown && !this.completed) {
            //console.log("blur")
            this.draw()
            ctx.drawImage(canvasSecond, 0, 0, width, height);
        }
        if (this.completed) {
            //console.log("complete")
            ctx.drawImage(this.brushImage, 0,0,width,height)
        }
    }

    draw(){
        this.blurredCircle(this.xMouse, this.yMouse, 20, ctx_s)

    }

    blurredCircle(x, y, r, ct = ctx) {

        let fillColour = this.fillColour
        // Create a radial gradient
        // The inner circle is at x=110, y=90, with radius=30
        // The outer circle is at x=100, y=100, with radius=70
        let digits= fillColour.match( /\d+(?=,)|(\d+(\.\d+))+/g);
        let trans =`rgba(${digits[0]},${digits[1]},${digits[2]},0)`
        let gradient = ct.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, fillColour);
        gradient.addColorStop(1, trans);
        ct.fillStyle = gradient;

        ct.beginPath()
        ct.arc(x, y, r, 0, 2 * Math.PI)
        ct.fill();
    }

}

class Spatter extends BlurryCircle{
    constructor(fillcolour) {
        super(fillcolour);
        this.c =0
    }

    draw(){
        this.c += 1
        if(this.c%5 === 0) {
            this.spatter();
        }
    }

    spatter(ct=ctx_s){
        let r = 2
        let x_s = this.xMouse;
        let y_s = this.yMouse;
        let theta = 0
        let R = 50

        for(let i=0; i<30; i++){
            theta = Math.random()*2*Math.PI

            let x = x_s + R*Math.cos(theta)
            let y = y_s + R*Math.sin(theta)


            ct.beginPath()
            ct.arc(x, y, r, 0, 2 * Math.PI)
            ct.fillStyle = this.fillColour
            ct.fill();

        }


    }
}


class SuperSpatter extends BlurryCircle{
    constructor(fillcolour) {
        super(fillcolour)
        this.c =0
    }

    draw(){
        this.c += 1
        if(this.c%2 === 0) {
            this.spatter();
        }
    }

    spatter(ct=ctx_s){
        let r = 2
        let x_s = this.xMouse;
        let y_s = this.yMouse;
        let theta = 0
        let R_Max = 50

        for(let i=0; i<30; i++){
            theta = Math.random()*2*Math.PI
            let R = R_Max*Math.pow(Math.random(), 4)
            let x = x_s + R*Math.cos(theta)
            let y = y_s + R*Math.sin(theta)
            ct.beginPath()
            ct.arc(x, y, r, 0, 2 * Math.PI)
            ct.fillStyle = this.fillColour
            ct.fill();

        }


    }
}





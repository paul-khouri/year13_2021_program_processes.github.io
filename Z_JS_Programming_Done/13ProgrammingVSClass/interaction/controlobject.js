console.log("testobject js called")


class ControlObject{
    constructor(canvas){

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.mouseDown = false;

        this.w = 0;
        this.h = 0;


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

    }

    mDown(e){
        this.xMouseStart= e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseDown = true;



    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
    }

    mUp(e){
        this.mouseDown = false;

    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        if(this.mouseDown){
            console.log("mouse is down");
            this.draw();
        }


    }

    draw(){
        this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h);


    }

    drawRect(x,y, w,h){
        ctx.beginPath();
        ctx.rect(x, y, w,h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(200, 230, 20)";
        ctx.stroke();
    }


}
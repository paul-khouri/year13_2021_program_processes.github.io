console.log("testobject js called")


class ControlObjectPush{
    constructor(canvas){

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.mouseDown = false;
        this.sh = 0;
        this.sw = 0;

        this.w = 0;
        this.h = 0;

        this.objectSet = [];


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
        // should pass the class through but have not just to keep things simple
        this.objectSet.push(new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, "rgba(200,250,180,0.5)"));
        console.log(this.objectSet);


    }

    update(){
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        if(Math.abs(this.w) < Math.abs(this.h)){
            this.sw = this.w;
            this.sh = this.w;

            if( (this.w < 0 && this.h > 0) || (this.w > 0 && this.h < 0)){
                this.sh = -this.w ;
            }
            
        }else{
            this.sh = this.h;
            this.sw = this.h;

            if( (this.w < 0 && this.h > 0) || (this.w > 0 && this.h < 0)){
                this.sw = -this.h ;
            }
        }

        if(this.mouseDown){
            console.log("mouse is down");
            this.draw();
        }

        for(var i=0 ; i< this.objectSet.length ; i++){
            this.objectSet[i].update();

        }


    }

    draw(){
        this.drawRect(this.xMouseStart, this.yMouseStart, this.w, this.h, "rgb(200, 230, 20)");
        this.drawRect(this.xMouseStart, this.yMouseStart, this.sw, this.sh, "rgb(20, 230, 200)");


    }

    drawRect(x,y, w,h,f){
        ctx.beginPath();
        ctx.rect(x, y, w,h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = f;
        ctx.stroke();
    }


}
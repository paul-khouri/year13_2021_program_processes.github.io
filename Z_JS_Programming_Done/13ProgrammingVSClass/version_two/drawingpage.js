console.log("testobject js called")


class DrawingPage{
    constructor(canvas, x, y, w, h){

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
  

        this.x=x;
        this.y=y;
        this.w = w;
        this.h = h;

        this.objectSet = [];


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

        this.dragging = false;

    }

    mDown(e){
        this.xMouseStart= e.offsetX;
        this.yMouseStart = e.offsetY;
        if(this.boundaryCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h)){
            this.dragging = true;
        }
        console.log(Button.shape);
    



    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
        if(!this.boundaryCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h)){
            if(this.dragging){
                if(this.xMouse < this.x){
                    this.xMouse = this.x;
                }
                if(this.xMouse > this.x + this.w){
                    this.xMouse = this.x + this.w;
                }
                if(this.yMouse < this.y){
                    this.yMouse = this.y;
                }
                if(this.yMouse > this.y + this.h){
                    this.yMouse = this.y+this.h;
                }

            }
            
            
            //this.dragging = false;
        }
 
    }

    mUp(e){
        if(this.dragging){
            if(Button.shape == "Rectangle"){
                this.objectSet.push(new Rectangle(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, "rgba(255,100,0,0.2)"))
            }else if(Button.shape == "Ellipse"){
                this.objectSet.push(new Ellipse(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, "rgba(255,100,0,0.2)"))

            }
        }
        this.dragging = false;
    }

    update(){
        this.draw();
        for(var i=0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if(this.dragging){
            var w = this.xMouse - this.xMouseStart;
            var h = this.yMouse - this.yMouseStart;
            this.drawRect(this.xMouseStart, this.yMouseStart, w, h, "rgba(255,255,0,1)", false);

        }
        
       


    }

    draw(){
        this.drawRect(this.x, this.y, this.w, this.h, "rgba(255,255,255,0.8)", true);



    }
// takes x, y, one colour and true for fill (false means stroke)
    drawRect(x,y, w,h,col,fbool){
        ctx.beginPath();
        ctx.rect(x, y, w,h);
        ctx.lineWidth = 1;
        if(!fbool){
            ctx.strokeStyle = col;
            ctx.stroke();
        }else{
            ctx.fillStyle = col;
            ctx.fill();
    }
        
    }
// takes x, y, one colour and true for fill (false means stroke)
    boundaryCheck(xM, yM, x, y, w, h){
        if(xM>x && xM<x+w && yM>y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }


}
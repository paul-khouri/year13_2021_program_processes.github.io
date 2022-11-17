console.log("drawing page js called")

class DrawingPage{
// class DrawingPage canvas, x,y,w,h
    constructor(canvas, x,y,w,h, mix){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.element=canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseDown = false;
        this.inBounds = false;
        this.pictureSet = [];
        this.mixer = mix;


    }

    mDown(e){
        this.mouseDown = true;
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;


    }
    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;

    }

    mUp(e){
        this.mouseDown = false;
  
        if(Button.selectedClass == "Clear"){
            this.pictureSet=[];
        }else if(Button.selectedClass == "Undo"){
            this.pictureSet.pop();
        }

        if(this.inBounds && Button.selectedClass !=""){

            if(typeof Button.selectedClass == "function"){

var newObject = new Button.selectedClass(this.xMouseStart, this.yMouseStart, 
    this.xMouse, this.yMouse, this.mixer.getColour(), 
    this.mixer.getStrokeColour(), this.mixer.getLineWidth());

                this.pictureSet.push(newObject);

            }

        }

    }

    update(){
        this.inBounds=this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
        if(this.inBounds){
            //console.log("inside");
        }
        this.draw();

    }

    draw(){
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.save();
        ctx.clip();

        for( var i =0; i<this.pictureSet.length; i++){
            this.pictureSet[i].update();
        }

        if(this.inBounds && this.mouseDown){
            this.drawLine(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse);

            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,0,1)";
            var squareW = this.xMouse - this.xMouseStart;
            var squareH = this.xMouse - this.xMouseStart;
            if( this.yMouse - this.yMouseStart < 0 ){
                squareH = -squareH;
            }
            if(this.xMouse - this.xMouseStart < 0 ){
                squareH = -squareH;
            }
            ctx.rect(this.xMouseStart, this.yMouseStart, squareW, squareH);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,0,0,1)";
            ctx.rect(this.xMouseStart, this.yMouseStart, 
                this.xMouse - this.xMouseStart, this.yMouse - this.yMouseStart);
            ctx.stroke();
        }
        ctx.restore();

    }

    drawLine(x_1,y_1,x_2,y_2){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(100,100,100,1)";
        ctx.lineWidth=0.5;
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2 , y_2);
        ctx.stroke();
    }


    inBoundsCheck(xM, yM, x, y, w, h){
        if( xM > x && xM < x+w && yM > y && yM < y+h){
            return true;
        }else{
            return false;
        }
    
    }
}
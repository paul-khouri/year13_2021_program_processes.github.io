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
        // run clear drawing rectangle and undo // needs cleaning up
        if(Button.selectedClass == "Clear"){
            this.pictureSet=[];
            Button.selectedClass = "";
            Button.clicked = "";
        }else if(Button.selectedClass == "Undo"){

            this.pictureSet.pop();
            Button.selectedClass = "";
            Button.clicked = "";
        }
        // run push on new object
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
        this.draw();

    }

    draw(){
        // draw canvas rectangle
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.save();
        // clip so all drawings inside
        ctx.clip();

        // run update on all objects
        for( var i =0; i<this.pictureSet.length; i++){
            this.pictureSet[i].update();
        }


        // draw user guides 
        if(this.inBounds && this.mouseDown){
            // diagonal line
            this.drawLine(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse);
            // centre circle
            var circleCoords = this.centreSquare(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse); 
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0,255,255)";
            ctx.lineWidth = 1;
            ctx.arc(circleCoords.xC, circleCoords.yC, circleCoords.s/2, 0, 2*Math.PI);
            ctx.stroke();
            // rectangle
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,0,0,1)";
            ctx.rect(this.xMouseStart, this.yMouseStart, 
                this.xMouse - this.xMouseStart, this.yMouse - this.yMouseStart);
            ctx.stroke();
        }
        // restore clip
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

    // return XC yC and sideS give xMouse, yMouse, xMouseStart, yMouseStart
    centreSquare(xMS, yMS, xM, yM){
         // center of rectangle
        var xC = (xMS+xM)/2;
        var yC = (yMS+yM)/2;
        // find smaller of width and height
        var absW = Math.abs(xM - xMS);
        var absH = Math.abs(yM - yMS);
        var sideS = 0;
        if(absW < absH){
            sideS = absW;
        }else{
            sideS = absH;
        }

        return { xC : xC, yC: yC, s: sideS }


    }


}
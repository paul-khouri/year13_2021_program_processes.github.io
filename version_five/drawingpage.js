console.log("testobject js called")


class DrawingPage{
    constructor(canvas, x, y, w, h){

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        // rounded mouse variables for grid
        this.xSRound = 0
        this.ySRound = 0
        this.xMRound = 0
        this.yMRound = 0
        //number of grid rectangles 
        this.xN = 16;
        this.yN = 20;
  
  

        this.x=x;
        this.y=y;
        this.w = w;
        this.h = h;
        // contains all objects drawn on the drawing page area
        this.objectSet = [];


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        //this.element.addEventListener('mouseleave', this.mLeave.bind(this));
        // if mouse is down and inside drawing boundary, dragging will be true
        this.dragging = false;
      


        this.tempBitMap = new Image();

        this.currentColor = "rgb(0,0,0)"
        this.dragColor = "rgb(0,0,0)"
    }

    mDown(e){
        this.xMouseStart= e.offsetX;
        this.yMouseStart = e.offsetY;
        if(this.boundaryCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h)){
            this.dragging = true;

        }
    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
    }

    mUp(e){
        if(this.dragging){
            if(Button.shape == "Rectangle"){
                //MoveRectangle xS, yS, xM, yM, col, canvas
                if(!GridButton.on){
                this.objectSet.push(new MoveRectangle(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.currentColor, canvas))
                }else{
                    this.objectSet.push(new MoveRectangle(this.xSRound, this.ySRound, this.xMRound, this.yMRound, this.currentColor, canvas))
                }
            }else if(Button.shape == "Ellipse"){
                if(!GridButton.on){
                    this.objectSet.push(new Ellipse(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.currentColor, canvas))
                    }else{
                        this.objectSet.push(new Ellipse(this.xSRound, this.ySRound, this.xMRound, this.yMRound, this.currentColor, canvas))
                    }

            }else if(Button.shape == "Polygon"){
                if(!GridButton.on){
                    this.objectSet.push(new Polygon(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.currentColor,PolygonOption.value))
                    }else{
                        this.objectSet.push(new Polygon(this.xSRound, this.ySRound, this.xMRound, this.yMRound, this.currentColor,PolygonOption.value))
                    }
            
            }else if(Button.shape == "Star"){
                if(!GridButton.on){
                    this.objectSet.push(new Star(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, this.currentColor,PolygonOption.value))
                    }else{
                        this.objectSet.push(new Star(this.xSRound, this.ySRound, this.xMRound, this.yMRound, this.currentColor,PolygonOption.value))
                    }
            
            }else if(Button.shape == "Line"){
                
                this.objectSet.push(new DrawImage(this.tempBitMap))
                this.tempBitMap = new Image();



            }

        }
        this.dragging = false;
    }

    update(){
        //------------background
        ctx.save();
        this.draw();
        ctx.clip();
        //-------------- grid
        if(GridButton.on){
        this.grid(this.x, this.y, this.w, this.h, this.xN, this.yN)
        }
        // get current color from color slider and update
        this.currentColor = ColorSlider.color



        //-------------------------
        for(var i=0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }

        
        if(this.dragging && Button.shape != "Move"){
            var w = this.xMouse - this.xMouseStart;
            var h = this.yMouse - this.yMouseStart;
           
            this.xSRound = this.grid_round(this.xMouseStart, this.w/this.xN)
            this.ySRound = this.grid_round(this.yMouseStart, this.h/this.yN)
            this.xMRound = this.grid_round(this.xMouse, this.w/this.xN)
            this.yMRound = this.grid_round(this.yMouse, this.h/this.yN)
            if(Button.shape == "Line"){
                var l = LineSizes.linesize;
                console.log("okay");
                cty.drawImage(this.tempBitMap, 0,0);
                console.log(this.tempBitMap)
                var circGradient = ctx.createRadialGradient(this.xMouse,this.yMouse,0, this.xMouse,this.yMouse,l);
                // Add three color stops
                circGradient.addColorStop(0, this.currentColor);
                var col_nums= this.currentColor.match(/\d+/g).map(Number);
                var grad_edge = "rgba("+col_nums[0]+","+col_nums[1]+","+col_nums[2]+",0)"
                var grad_center="rgba("+col_nums[0]+","+col_nums[1]+","+col_nums[2]+",1)"
                circGradient.addColorStop(0, grad_center);
                circGradient.addColorStop(1, grad_edge);
                // Set the fill style and draw a circle
                cty.fillStyle = circGradient;
                //cty.fillStyle = this.currentColor;
                cty.strokeStyle = this.currentColor;
                cty.lineWidth = 5;
                cty.beginPath();
                cty.arc(this.xMouse, this.yMouse, 30, 0, 2*Math.PI);
                cty.fill();
                //cty.moveTo(this.xMouseStart, this.yMouseStart);
                //cty.lineTo(this.xMouse,this.yMouse);
               //cty.stroke();
                this.tempBitMap = cv.transferToImageBitmap();
                //this.tempBitMap.src = cv.toDataURL();
                ctx.drawImage(this.tempBitMap,0,0);
            }else if(GridButton.on){
                this.drawRect(this.xSRound, this.ySRound, this.xMRound - this.xSRound, this.yMRound - this.ySRound, this.dragColor, false);
                var r = this.getRadius(this.xMRound - this.xSRound, this.yMRound - this.ySRound)
                this.drawCircle(0.5*(this.xMRound + this.xSRound),0.5*(this.yMRound + this.ySRound),r, this.dragColor)
            }else{
                this.drawRect(this.xMouseStart, this.yMouseStart, w, h, "rgba(255,255,0,1)", false);
            }

        }

        ctx.restore();
        
    }

    draw(){
        //background rectangle of drawing page
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

    drawCircle(x,y,r,s){
        ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI)
        ctx.strokeStyle = s;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    getRadius(w,h){
        if(Math.abs(w)< Math.abs(h)){
            return Math.abs(w/2)
        }
        else{
            return Math.abs(h/2)
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

    grid(x,y,w,h,xN, yN){
    
        var xTick = w/xN;
        var yTick = h/yN;
        ctx.strokeStyle = "rgba(0,0,0, 0.2)";
        for(var i=0 ; i <= xN ; i++){
            ctx.beginPath();
            ctx.moveTo(x+ i*xTick, y);
            ctx.lineTo(x+ i*xTick, y+h);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        for(var j=0 ; j <= yN ; j++){
            ctx.beginPath();
            ctx.moveTo(x, y+j*yTick);
            ctx.lineTo(x+ w, y+j*yTick);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }


    }

    grid_round(M,N){
        var rounded = N*Math.round(M/N)
        return rounded
    }


}
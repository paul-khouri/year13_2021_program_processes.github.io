console.log(" move rectangle js called")
// class MoveRectangle x,y,w,h, Point(Class), canvas
class MoveRectangle{
    constructor(name,x,y,w,h, Point, canvas, colourA, fillA, myRotation){
        this.pRad = 10; 
        this.fillA = fillA;
        this.rotAng = myRotation;

        // class Point x,y,r, stroke, fill, over, canvas 
        this.P_1 = new Point(x,y, this.pRad, colArray[0][1], colArray[0][2], colArray[0][3], canvas);
        this.P_2 = new Point(x+w,y+h, this.pRad, colArray[0][6], colArray[0][7], colArray[0][5], canvas);
        this.controlP = new Point(x+w/2,y+h/2, this.pRad, colArray[0][4], colArray[0][5], colArray[0][6], canvas);
        
        this.colArray = colourA;
        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.name = name;

        this.firstHit = true;
        this.controlX = 0;
        this.controlY = 0;
        this.P_1_X = 0;
        this.P_1_Y = 0;
        this.P_2_X = 0;
        this.P_2_Y = 0;

        this.element = canvas;
        this.xMouse = 0;
        this.yMouse = 0;
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.inBounds = false;

        this.pointsVisible=false;

    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY; 
        var x;
        var y;
        var w;
        var h;
        if(this.w<0){
            x = this.x+this.pRad;
            w = this.w-2*this.pRad;
        }else{
            x = this.x-this.pRad;
            w = this.w+2*this.pRad;
        }
        if(this.h<0){
            y = this.y+this.pRad;
            h = this.h-2*this.pRad;
        }else{
            y = this.y-this.pRad;
            h = this.h+2*this.pRad;
        }
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, x, y, w, h);
        
        if(this.inBounds && Point.taken == "" && moveable){
            this.pointsVisible = true;
        }else{

        if(Point.taken!=this.P_1 && Point.taken!=this.P_2 && Point.taken!=this.controlP ){
            this.pointsVisible = false;
        }else{
            //console.log("a point is taken");
        }

        }

    }


    update(){
        //console.log(this.inBounds);
        this.draw();

        this.x = this.P_1.getX();
        this.y = this.P_1.getY();
        this.w = this.P_2.getX() - this.x;
        this.h = this.P_2.getY() - this.y;
        this.controlP.setX(this.x + this.w/2);
        this.controlP.setY(this.y + this.h/2);


        if(this.pointsVisible){
        this.P_1.update();
        this.P_2.update();
        this.controlP.update();
    }
        // updating rectangle parameters using the point coordinates


    if(Point.taken == this.controlP){
        //console.log("control is taken");
        
        if(this.firstHit){
            // collect starting coordinates of all points
            this.controlX = this.controlP.getX();
            this.controlY = this.controlP.getY();
            this.P_1_X = this.P_1.getX();
            this.P_1_Y = this.P_1.getY();
            this.P_2_X = this.P_2.getX();
            this.P_2_Y = this.P_2.getY();
            this.firstHit = false;
        }else{
            // get updated coordinate of control point
            var controlXNew = this.controlP.getX();
            var controlYNew = this.controlP.getY();
            // find the change from the start coordinates of the control
            var dx = controlXNew - this.controlX;
            var dy = controlYNew - this.controlY;
            // update controlled point coordinates follwoing change in control point coordinates
            this.P_1.setX( this.P_1_X + dx);
            this.P_1.setY( this.P_1_Y + dy);
            this.P_2.setX( this.P_2_X + dx);
            this.P_2.setY( this.P_2_Y + dy);
        }
    }else{
        this.firstHit = true;
    }


    }


    draw(){

        ctx.strokeStyle=this.colArray[0][0];
        ctx.fillStyle=this.fillA;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        //ctx.stroke(); 
        //rotated rectangle
        ctx.strokeStyle=this.colArray[0][2];
        ctx.save();
        ctx.translate(this.x+this.w/2, this.y+this.h/2);
        ctx.rotate(this.rotAng*Math.PI/180);
        ctx.beginPath();
        ctx.rect(0-this.w/2,0-this.h/2,this.w,this.h);
        ctx.fill();
        //ctx.stroke();
        ctx.restore();

    }
// a more complete boundary check taking into account
// that w and h may be negative
    inBoundsCheck(xM, yM, x, y, w, h){
        var inX = false;
        var inY = false;

        if(w>0){
            if(xM > x && xM < x+w){
                inX = true;
            }
        }else{
            if(xM < x && xM > x+w){
                inX = true;
            }
        }

        if(h > 0){
            if(yM > y && yM < y+h){
                inY = true;
            }
        }else{
            if(yM < y && yM > y+h){
                inY = true;
            }
        }

        if(inX && inY){
            return true;
        }else{
            return false;
        }


    }

}
class Button{
    // class Button string name, int x, int y, int w,int h, stringrgba bC, 
    //stringrgba hC, stringrgba sC, object
   constructor(name,x,y,w,h,bC, hC, sC, ob_name){
       this.name = name; 
       this.x=x; 
       this.y=y; 
       this.width = w; 
       this.height = h;
       this.baseColor = bC; 
       this.hoverColor = hC ; 
       this.selectedColor= sC ;
       this.selected = false; 
       this.currentColour = bC;
       this.ob = ob_name;  
   }
   update(){
       if(this.inBounds(xMouse, yMouse, this.x, this.y, this.width, this.height)){
        this.currentColour = this.hoverColor;
           if(mouseDown){
               if(selectedButton && selectedButton != this){
                   selectedButton.selected =false;
               }
               selectedButton = this;
               this.selected = true;
           }
       }else{
            this.currentColour = this.baseColor;
       }
       if(this.selected){
            this.currentColour = this.selectedColor;
       }
       this.draw();
   }
   draw(){
       //drawRectangle x, y, width, height fill(boolean), stroke(boolean), 
        //fill colour, stroke colour, stroke width
    this.drawRectangle(this.x, this.y, this.width, this.height, true, true, 
       this.currentColour, "rgb(255,255,153)", 2 );
       this.ob.update();
   }
   }
   Button.prototype.inBounds=inBounds;
   Button.prototype.drawRectangle=drawRectangle;



// object requires class name, constructor, encapsulated functions
//class CirclePunch x, y,radius, , fill(b), stroke(b), fillcolour stroke colour, stroke width
class CirclePunch{
	constructor(x,y,w,f,s, f_col, s_col, l){
		this.x = x;
        this.y = y;
        this.w= w
        this.r = w/2;
        this.f_col = f_col;
        this.s_col = s_col;
		this.s = s;
        this.f = f;
        this.l=l
    }
    // encapsulated functions (owned only by circle)
    update(){
        this.draw();
    }

    draw(){
        this.drawRectangle(this.x,this.y,this.w,this.w, false,true, 
            this.f_col, this.s_col, this.l);
        ctx.beginPath()
        ctx.arc(this.x+this.r,this.y+this.r, Math.abs(this.r), 0, 2*Math.PI,false);
        ctx.arc(this.x+this.r,this.y+this.r,Math.abs(this.r/2),0,Math.PI*2, true);
    if(this.f){
        ctx.fillStyle = this.f_col;
        ctx.fill();
    }
    if(this.s){
        ctx.strokeStyle = this.s_col;
        ctx.lineWidth=this.l;
        ctx.stroke();
    }

        }
}
CirclePunch.prototype.drawRectangle = drawRectangle;
//Class StarCircle x, y, width, height, fillcolour,  strokecolour, fill(b), stroke(b), l
class StarCircle{
    constructor(x,y,w,h,f,s,f_col,s_col,l){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.f_col=f_col;
        this.s_col = s_col;
        this.f=f;
        this.s=s;
        this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;
        ctx.lineWidth = this.l;

        this.drawRectangle(this.x,this.y,this.w,this.h, true,true, 
            this.f_col, this.s_col, this.l);
        this.drawCircle(this.x+this.w/2, this.y+this.h/2, Math.abs(this.h/4), 
            true, true, this.f_col, this.s_col, this.l )
        this.drawLine(this.x, this.y, this.x+this.w, this.y+this.h, this.s, 2);
        this.drawLine(this.x+this.w, this.y, this.x, this.y+this.h, this.s, 2);
        
    }
}
StarCircle.prototype.drawCircle = drawCircle;
StarCircle.prototype.drawLine = drawLine;
StarCircle.prototype.drawRectangle = drawRectangle;
//class TriangleShape x, y, width, height, fill(b), stroke(b), fillcolour , stroke colour,  l
class TriangleShape{
    constructor(x,y,w,h,f,s,f_col,s_col,l){
        this.x=x+l;
        this.y=y+l;
        this.w=w-2*l;
        this.h=h-2*l;
        this.f_col=f_col;
        this.s_col = s_col;
        this.f=f;
        this.s=s;
        this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){
        ctx.fillStyle = this.f_col;
        ctx.strokeStyle = this.s_col;

        ctx.lineWidth = this.l;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x,this.y+this.h);
        ctx.lineTo(this.x+this.w, this.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        
    }
}

class Grid{
// class Grid x, y, width, height, number of x spaces, number of y spaces, stroke color, stroke width
constructor(x,y,w,h,x_num, y_num, s_col, l){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.x_num =x_num;
    this.y_num = y_num;
    this.s_col=s_col;
    this.l=l;
    }
    update(){
        this.draw();

    }
    draw(){

        for(var i=0; i<=this.x_num ; i++){
            ctx.beginPath();
            var xPos=this.x+i*this.w/this.x_num;
           //drawLine takes x y start and x y end,  line colour , line width
           this.drawLine(xPos, this.y, xPos, this.y+this.h, this.s_col, this.l );
        } 
        for(var j=0; j<=this.y_num ; j++){
            ctx.beginPath();
            var yPos=this.y+j*this.h/this.y_num;
            //drawLine takes x y start and x y end,  line colour , line width
           this.drawLine(this.x, yPos, this.x+this.w, yPos, this.s_col, this.l );
        }
    }
}
Grid.prototype.drawLine = drawLine;
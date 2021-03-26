class Ball{
    constructor(x,y,r,col){
        this.x = x;
        this.y = y;
        this.rad = r;
        this.col= col;
        console.log("A ball has been instantiated");
    }
    update(){
        this.draw();
    }
    
    draw(){
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.fill();
    }
    
    area(){
        var a = Math.PI*Math.pow(this.rad, 2)
        var output = "Area is: "+ a + " pixels (squared?)";
        console.log(output);
    }
    }


class Rectangle{
        constructor(x,y,w,h,fill){
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.fill = fill;
        }
        update(){
            this.draw();
        }
        draw(){
            ctx.clearRect(this.x, this.y, this.w, this.h)
            ctx.fillStyle = this.fill;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fill();
        }
        setColour(c){
            this.fill = c;
            this.update();
        }
        
        }


class TextBox{
    constructor(x,y,w,h,rect_context, text_context, output){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h
        this.rect_context = rect_context;
        this.text_context = text_context;
        this.output = output;
    
        
    }
    update(){
        this.draw(this.x, this.y,this.w, this.h );
    }
    
    draw(x,y,w,h){
    
        this.updateContext(this.rect_context);
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        if(ctx.lineWidth >= 1 ){
        ctx.stroke();
        }
        ctx.fill();
        this.updateContext(this.text_context)
        var myFont= "bold 15px sans-serif";
        ctx.font=myFont;
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillText(this.output, x+w/2,y+h/2);
    
    
    }
    
    updateMessage(m){
        this.output = m;
        this.update();
    
    }
    
    }
    TextBox.prototype.updateContext = updateContext;
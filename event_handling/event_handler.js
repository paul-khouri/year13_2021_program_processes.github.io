console.log("js file has been called");
// Now this line will be the same size on the page
canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
var scale = 2
canvas.width = width*scale;
canvas.height = height*scale;
ctx.scale(scale,scale);

console.log(width);
console.log(height);
// -------------------
var colArray=[

    [ "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 

      "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",

      "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)",

      "rgba(137,255,0,1)","rgba(255,165,0,1)"

    ],

    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 

       "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",

       "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)",

       "rgba(137,255,0,0.67)","rgba(255,165,0,0.67)"

     ],

     [ "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 

       "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",

       "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)",

       "rgba(137,255,0,0.33)","rgba(255,165,0,0.33)"

      ]

        ]
//----------------------------

//functions
function drawRect_Stroked(x, y, w, h,l_w, c_f, c_s){
    ctx.strokeStyle = c_s;
    ctx.fillStyle = c_f;
    ctx.lineWidth = l_w;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.stroke()
}
function drawOutline_Rect(x, y, w, h,l_w, c_s){
    ctx.strokeStyle = c_s;
    ctx.lineWidth = l_w;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.stroke()
}

function drawRect_Filled(x, y, w, h,c_f){
    ctx.fillStyle = c_f;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
}
function drawText_Boxed(x,y,w,h,text,c){
    ctx.fillStyle = c;
    var myFont= "bold 15px 'Trebuchet MS', Verdana, sans-serif  ";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font=myFont;
    ctx.fillText(text, x+ w/2 ,y+h/2);
    //drawOutline_Rect(x,y,w,h,2,"rgb(200,200,200)")
}

function drawLine(x_1,y_1,x_2,y_2,w,sc){
    ctx.beginPath();
    ctx.strokeStyle = sc;
    ctx.lineWidth=w;
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    ctx.stroke();
}
function fill_stroke_circle(x,y,r,c_f, c_s, l_w){
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI);
    ctx.lineWidth = l_w
    ctx.fillStyle = c_f;
    ctx.strokeStyle = c_s;
    ctx.stroke();
    ctx.fill();
}

function stroke_circle(x,y,r, c_s, l_w){
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI);
    ctx.lineWidth = l_w
    ctx.strokeStyle = c_s;
    ctx.stroke();
}

//------

class Handler{
    constructor(canvas){
        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('touchmove', this.tMove.bind(this));
        this.element.addEventListener('wheel', this.wMove.bind(this));
        this.mouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    mDown(e){
        this.mouseDown = true;
        var output = "The mouse has gone DOWN at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());
    }

    mUp(e){
        this.mouseDown = false;
        var output = "The mouse has gone UP at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());
    }

    mMove(e){
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        if(this.mouseDown == true){
        //console.log("Mouse move")
        }
    }

    tMove(e){
        console.log(e)
    }
    wMove(e){
        //console.log(e)
    }

    dataPack(){
        return {down: this.mouseDown , x:this.mouseX , y:this.mouseY}
    }
    // check mouse inside  given x,y,w,h rectangle
    boundsCheck(x, y, w, h){
        if( this.mouseX > x && this.mouseX < x+w && this.mouseY > y && this.mouseY < y+h){
            return true;
        }else{
            return false;
        }
    
    }
    // check mouse inside  given x,y,r circle
    distanceCheckBoolean(x, y, d){
        var dist = Math.sqrt( Math.pow(x - this.mouseX, 2) + Math.pow(y - this.mouseY, 2) );
        if(dist<= d){
            return true;
        }else{
            return false;
        }

    }

}



class Slider{
//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
    constructor(x,y,w,h, c_1, c_2, c_3, max, min, start){
        this.x = x;
        this.y = y;
        this.c_1 = c_1;
        this.c_2 = c_2;
        this.c_3 = c_3;
        this.w = w;
        this.h = h;
        this.r = h/8;
        this.min = min;
        this.max = max;
        this.value = start;
        this.xCircle = x + w*(start-min)/(max-min);
        this.yCircle = y + h/2;
        this.xCircle_T = x + w*(start-min)/(max-min);
        this.yCircle_T = y + 3*h/4;
        this.dragging = false;
    }

    getValue(){
        return this.value;
    }

    update(){
        var state = my_Handler.dataPack()
        var check = my_Handler.distanceCheckBoolean(this.xCircle, this.yCircle, this.r);
        if(state.down && check){
            this.dragging = true;
        }
        if(!state.down){
            this.dragging = false;
        }
        if(this.dragging){
            if(state.x <= this.x ){
                this.xCircle = this.x;
            }else if(state.x >= this.x + this.w){
                this.xCircle = this.x + this.w;

            }else{
                this.xCircle = state.x;
            }
        }

        this.draw();

        // colour value
        var pixel = ctx.getImageData(2*this.xCircle,2*this.yCircle,1,1)
        var data = pixel.data;
        //console.log(data);
        const rgba= `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
        this.value = rgba;

    }

    draw(){
        this.drawRect_Filled(this.x-2, this.y, this.w+4, this.h, this.c_1)
        this.drawLine(this.x, this.y +this.h/2, this.x+this.w, this.y+ this.h/2, 3, this.c_3);
        this.drawHues(this.x, this.y + this.h/2 - this.r, this.w, 2*this.r)
        this.drawText_Boxed(this.x,this.y+this.h/8,this.w,2*this.r,this.value, this.c_3)
        this.drawRect_Filled(this.x-2,this.y+this.h/2 + this.r,this.w+4,this.h/4,this.value)
        this.stroke_circle(this.xCircle, this.yCircle,this.r,this.c_2,4)
    }

    drawHues(x,y,w,h){
        var lingrad = ctx.createLinearGradient(x, y, x+w, y);
        lingrad.addColorStop(0, 'rgb(255,0,0)');
        lingrad.addColorStop(1/6, 'rgb(255,0,255)');
        lingrad.addColorStop(2/6, 'rgb(0,0,255)');
        lingrad.addColorStop(3/6, 'rgb(0,255,255)');
        lingrad.addColorStop(4/6, 'rgb(0,255,0)');
        lingrad.addColorStop(5/6, 'rgb(255,255,0)');
        lingrad.addColorStop(1, 'rgb(255,0,0)');
        ctx.fillStyle = lingrad;
        ctx.beginPath();
        ctx.rect(x-2, y, w+4, h)
        ctx.fill()
    }

}
Slider.prototype.drawLine = drawLine;
Slider.prototype.drawRect_Stroked = drawRect_Stroked
Slider.prototype.stroke_circle = stroke_circle
Slider.prototype.drawText_Boxed = drawText_Boxed;
Slider.prototype.drawRect_Filled = drawRect_Filled








class Button{
constructor(x,y,w,h,l_w,c_f, c_s, c_over, c_selected, c_text, text){
    this.x = x; 
    this.y = y; 
    this.w = w;
    this.h = h; 
    this.l_w= l_w;
    this.c_f = c_f; 
    this.c_s = c_s;
    this.c_over = c_over; 
    this.c_selected = c_selected;
    this.c_text = c_text;
    this.text = text;
}

update(){

    var c_f;
    var state = my_Handler.dataPack()
    if(Button.selected == this){
        c_f = this.c_selected
    }
    else if ( my_Handler.boundsCheck(this.x, this.y, this.w, this.h) ){
        if(state.down){
            Button.selected = this;
        }
       
        
        c_f = this.c_over
    }else{
        c_f = this.c_f
    }
    this.drawRect_Stroked(this.x, this.y, this.w, this.h, this.l_w, c_f, this.c_s);
    this.drawText_Boxed(this.x, this.y, this.w, this.h, this.text, this.c_text)
}
}
Button.selected = ""
Button.prototype.drawRect_Stroked = drawRect_Stroked;
Button.prototype.drawText_Boxed = drawText_Boxed;


class DrawingPage{
    constructor(x,y,w,h, shade){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.shade = shade;
        this.dragging = true;
        this.previous_state_down = false 
        this.current_state_down = false 
        this.xmouseS = 0;
        this.ymouseS = 0;
    }

    update(){
        this.previous_state_down = this.current_state_down
        var state = my_Handler.dataPack()
        this.current_state_down = state.down
        // first moment mouse goes down
        if(this.current_state_down == true && this.previous_state_down == false){
            this.xmouseS = state.x;
            this.ymouseS = state.y;

            if( my_Handler.boundsCheck(this.x,this.y,this.w,this.h) ){
                console.log("inside")
                if(state.down){
                    this.dragging = true;
                }
            }
        
        }

        this.drawRect_Filled(this.x, this.y, this.w, this.h, this.shade)
        
        if(!state.down){
            this.dragging = false
        }

        if(this.dragging){
            var w = state.x - this.xmouseS;
            var h = state.y - this.ymouseS;
            this.drawOutline_Rect(this.xmouseS, this.ymouseS,w,h,2,"rgb(50,50,50)")
        }


    }


}
DrawingPage.prototype.drawRect_Filled = drawRect_Filled;
DrawingPage.prototype.drawOutline_Rect = drawOutline_Rect



var my_Handler = new Handler(canvas);
console.log(my_Handler.dataPack());

object_set =[]
// (x,y,w,h,l_w,c_f, c_s, c_over, c_selected, c_text, text)
names = ["Button One", "Button Two", "Button Three"]
let yStep = 50
for(let i=0 ; i< names.length ; i++){
    let temp = new Button(10,10+i*yStep,250, yStep, 5, colArray[0][5], colArray[0][6], colArray[0][4], 
        colArray[0][8],colArray[0][0], names[i])
    object_set.push(temp);

}

//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
var S = new Slider(10,163, 250, 100,colArray[0][1], colArray[0][0], colArray[0][0],255,0,100)
var D = new DrawingPage(300, 20, 480, 560,colArray[0][0] )


function animate(){
    ctx.clearRect(0, 0, width, height);
    D.update()
    S.update();
    for(let i=0; i<object_set.length; i++){
        object_set[i].update()

    }
    

 



    window.requestAnimationFrame(animate);
}
animate();
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

canvasSecond = document.querySelector('#myCanvas');
var ctx_s = canvas.getContext('2d');
canvasSecond.width = width*scale;
canvasSecond.height = height*scale;
ctx_s.scale(scale,scale);

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

/**
 * Updates the context using small data object
 * @param mini object of type {l: lineWidth, s: strokeColour,  f: fillColour} can be empty , can be ordered
 * @return Null
 */
 function updateContext(ob,){
   
    for (const [key, value] of Object.entries(ob)) {
        switch(key) {
            case "f":
              ctx.fillStyle = value;
              ctx.fill()
              //console.log("fill")
              break;
            case "s":
                ctx.strokeStyle = value;
                ctx.stroke();
                //console.log("stroke")
              break;
            case "l":
                ctx.lineWidth = value;
                //console.log("line")
              break;
            default:
                console.log("unrecognised");
          }
      }

}
//_rect(300,300,10,10, {f: "rgb(255,255,255)",l: 5, s: "rgb(0,0,0)" })
function _rect(x,y,w,h, c){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    updateContext(c);
}
function _circ(x,y,r,c){
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI);
    updateContext(c)
}
function _line(x_1,y_1,x_2,y_2,c){
    
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    updateContext(c)
}

function _ellipse(x, y, xR,yR, c){
        ctx.beginPath();
        ctx.ellipse(x, y, xR, yR, 0, 0, 2 * Math.PI);
        updateContext(c)
   
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


/**
 * Draw a grid  line in a rectangular boundary
 * uses the _line function 
 * @param {number} x width and height of each grid square
 * @param {number} y width and height of each grid square
 * @param {number} w width and height of each grid square
 * @param {number} h width and height of each grid square
 * @param {number} n side length each grid square
 * @return {null} 
 */
 function draw_grid(x,y,w,h,n, c = {l: 0.5, s:"rgb(255,255,255)"}){ 
    var grid_interval = n;
    //vertical lines
    for(var i=1; i< w/grid_interval; i++){
        _line(x + i*grid_interval, y, x + i*grid_interval,y+h, c);
    }
    // horizontal lines
    for(var i=1; i< h/grid_interval; i++){
        _line(x ,y + i*grid_interval,x+w,y+ i*grid_interval, c);
    }
    
}

/**
 * Draw a grid  line in a rectangular boundary
 * uses the _line function 
 * @param {number} x width and height of each grid square
 * @param {number} y width and height of each grid square
 * @param {number} w width and height of each grid square
 * @param {number} h width and height of each grid square
 * @param {number} xN number of x ticks
 * @param {number} yN number of y ticks
 * @return {null} 
 */
function grid(x,y,w,h,xN, yN, c={ l:0.5, s:"rgba(0,0,0,0.2)"} ){
    var xTick = w/xN;
    var yTick = h/yN;
 // vertical;
    for(var i=0 ; i <= xN ; i++){
        _line(x+ i*xTick, y,x+ i*xTick, y+h, c)
    }
 //horizontal
    for(var j=0 ; j <= yN ; j++){
        _line(x, y+j*yTick, x+ w, y+j*yTick,c)
    }
}

class Rectangle{
    constructor(x,y,w,h,c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c=c;
    }
    update(){
        this._rect(this.x, this.y, this.w, this.h, this.c)
    }
}
Rectangle.prototype._rect = _rect

class Ellipse{
    constructor(x,y,w,h,c){
        this.x = x+w/2;
        this.y = y+h/2;
        this.xRad = Math.abs(w/2);
        this.yRad = Math.abs(h/2);
        this.c=c;
    }
    update(){
        this._ellipse(this.x, this.y, this.xRad, this.yRad, this.c)
    }
}
Ellipse.prototype._ellipse = _ellipse



//--------------------------------------------------------

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
        //console.log(output);
        //console.log(this.dataPack());
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



class ColourSlider{
//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
    constructor(x,y,w,h, background_col, text_col, slider_col_object, max, min, start){
        this.x = x;
        this.y = y;
        this.background_col = background_col;
        this.slider_col_object = slider_col_object;
        this.text_col = text_col;
        this.w = w;
        this.h = h;
        this.r = h/8;
        this.min = min;
        this.max = max;
        this.value = start;
        this.xCircle = x + w*(start-min)/(max-min);
        this.yCircle = y + h/2;
        this.dragging = false;
        this.P_1 = new SlidingPoint(x,y+3*h/8,w,this.r, slider_col_object,max,min,start)
        this.P_2 = new SlidingPoint(x,y+5*h/8,w,this.r, slider_col_object,max,min,max)
        this.zero_stop = "rgba(255,0,0,0)"
        this.one_stop = "rgba(255,0,0,1)"
    }

    getValue(){
        return { f:this.value };
    }

    update(){
        this.draw();
        this.P_1.update()
        this.P_2.update()

        // colour value
        var pixel = ctx.getImageData(2*this.P_1.getX(),2*(this.y+3*this.h/8),1,1)
        var data = pixel.data;
        //console.log(data);
        const rgba= `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
        
        this.zero_stop = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${0})`
        this.one_stop = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${1})`

        this.value = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${this.P_2.getProportion()})`;

    }

    draw(){
        this._rect(this.x-2, this.y, this.w+4, this.h, {f:this.background_col})
        this.draw_grid(this.x, this.y + this.h/2, this.w, 2*this.r,5, {l:0.5, s:"rgb(50,50,50)"})
        this.drawHues(this.x, this.y + this.h/4, this.w, 2*this.r)
        this.drawText_Boxed(this.x,this.y,this.w,2*this.r,this.value, this.text_col)
        this.drawTransparent(this.x, this.y + this.h/2, this.w, 2*this.r)
        this._rect(this.x-2,this.y+3*this.h/4,this.w+4,this.h/4,{f:this.value})
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

    drawTransparent(x,y,w,h){
        var lingrad = ctx.createLinearGradient(x, y, x+w*0.9, y);
        lingrad.addColorStop(0, this.zero_stop);
        lingrad.addColorStop(1, this.one_stop);
        ctx.fillStyle = lingrad;
        ctx.beginPath();
        ctx.rect(x-2, y, w+4, h)
        ctx.fill()
    }

}
ColourSlider.prototype._rect = _rect
ColourSlider.prototype.drawText_Boxed = drawText_Boxed;
ColourSlider.prototype.draw_grid = draw_grid


//class Slider (x,y,w,r, c_1,c_2, c_3, max, min, start)
class SlidingPoint{
constructor(x,y,w, r, colours, max, min, start){
    this.x = x;
    this.y = y;
    this.w = w;
    this.colours = colours
    this.r = r;
    this.min = min;
    this.max = max;
    this.value = start;
    this.xCircle = x + w*(start-min)/(max-min);
    this.yCircle = y;
    this.dragging = false;
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
}
draw(){
    this._circ(this.xCircle, this.yCircle,this.r,this.colours)
}
getX(){
    return this.xCircle
}
getProportion(){
    return Math.round(   ((this.xCircle - this.x)/(this.w - this.x)*10) )/10
}
}
SlidingPoint.prototype._circ = _circ;




class Button{
constructor(x,y,w,h, base_style_obj, c_over, c_selected, c_text, text){
    this.x = x; 
    this.y = y; 
    this.w = w;
    this.h = h; 
    this.base_style_obj = base_style_obj;
    this.f= this.base_style_obj.f;
    this.c_over = c_over; 
    this.c_selected = c_selected;
    this.c_text = c_text;
    this.text = text;
}
update(){
    var c_f = this.base_style_obj;
    var state = my_Handler.dataPack()
    if(Button.selected == this){
        c_f.f = this.c_selected;
    }
    else if ( my_Handler.boundsCheck(this.x, this.y, this.w, this.h) ){
        c_f.f = this.c_over
        if(state.down){
            Button.selected = this;
            Button.shape = this.text;
        }
    }
    else{
        c_f.f = this.f

    }
    this._rect(this.x, this.y, this.w, this.h, c_f);
    this.drawText_Boxed(this.x, this.y, this.w, this.h, this.text, this.c_text)
}
}
Button.selected = ""
Button.shape = ""
Button.prototype.drawText_Boxed = drawText_Boxed;
Button.prototype._rect = _rect;

class SwitchButton{
    constructor(x,y,w,h, base_style_obj, c_over, background, c_text, text){
        this.x = x; 
        this.y = y; 
        this.w = w;
        this.h = h; 
        this.base_style_obj = base_style_obj;
        this.f= this.base_style_obj.f;
        this.c_over = c_over; 
        this.c_background = background;
        this.c_text = c_text;
        this.text = text;
        // on off state
        this.switch_state = false;
        this.handler_state = false;
    }

    update(){
        //check for click from handler
    }

}


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
        this.xN = 18;
        this.yN = 22;
        this.grid_on = true;
        this.object_set = [];
        this.S = new ColourSlider(10,193, 250, 100,colArray[0][0], colArray[0][8], {l:2,s:colArray[0][0]},255,0,100)
        
    }

    update(){
        this.S.update();
        var colour = this.S.getValue()
        this.previous_state_down = this.current_state_down
        var state = my_Handler.dataPack()
        this.current_state_down = state.down
        // first moment mouse goes down
        if(this.current_state_down == true && this.previous_state_down == false){
            this.xmouseS = state.x;
            this.ymouseS = state.y;
            if( my_Handler.boundsCheck(this.x,this.y,this.w,this.h) ){
                if(state.down){
                    this.dragging = true;
                }
            }
        }



        this._rect(this.x, this.y, this.w, this.h, {f:this.shade})
        //this.draw_grid(this.x, this.y, this.w, this.h,10,{l:0.25, s:"rgb(150,150,150)"})
        this.grid(this.x, this.y, this.w, this.h,this.xN,this.yN, {l:0.25, s:"rgb(150,150,150)"})
        for(var i=0; i<this.object_set.length; i++){
            this.object_set[i].update();
        }
        


        if(this.dragging){
            var w = state.x - this.xmouseS;
            var h = state.y - this.ymouseS;
            var x = this.xmouseS;
            var y = this.ymouseS;
            if(this.grid_on){
                // rounded coordinates for snapping to grid
                x = this.grid_round(this.xmouseS-this.x, this.w/this.xN) + this.x
                y = this.grid_round(this.ymouseS-this.y, this.h/this.yN) + this.y
                w = this.grid_round(w, this.w/this.xN)
                h = this.grid_round(h, this.h/this.yN)

            }
            this._rect(x, y,w,h, {l:0.5, s: "rgb(0,0,0)"})
        }

        // mouse  goes up
        if(this.current_state_down == false && this.previous_state_down == true && this.dragging){

            console.log(Button.shape)
            if(Button.shape == "Rectangle"){
            var temp = new Rectangle(x,y,w,h, colour)
            this.object_set.push(temp);
            }
            else if(Button.shape == "Ellipse"){
                var temp = new Ellipse(x,y,w,h, colour)
                this.object_set.push(temp);
                }
            else if(Button.shape == "Brush"){

                var circGradient = ctx.createRadialGradient(state.x,state.y,0, state.x,state.y,30);
                // Add three color stops
                circGradient.addColorStop(0, this.currentColor);
                var col_nums= this.currentColor.match(/\d+/g).map(Number);
                var grad_edge = "rgba("+col_nums[0]+","+col_nums[1]+","+col_nums[2]+",0)"
                var grad_center="rgba("+col_nums[0]+","+col_nums[1]+","+col_nums[2]+",1)"
                circGradient.addColorStop(0, grad_center);
                circGradient.addColorStop(1, grad_edge);

            }

        }

        if(!state.down){
            this.dragging = false
        }



    }

    grid_round(M,N){
        var rounded = N*Math.round(M/N)
        return rounded
    }


}
DrawingPage.prototype._rect = _rect;
DrawingPage.prototype._line = _line;
DrawingPage.prototype.draw_grid = draw_grid
DrawingPage.prototype.grid = grid




var my_Handler = new Handler(canvas);


object_set =[]
// (x,y,w,h,l_w,c_f, c_s, c_over, c_selected, c_text, text)
names = ["Rectangle", "Ellipse", "Polygon","Brush","Clear"]
let yStep = 35
for(let i=0 ; i< names.length ; i++){
    let temp = new Button(10,10+i*yStep,100, yStep, 
        {f:colArray[0][5], l:2, s:colArray[0][6] }, 
        colArray[0][4], colArray[0][8],colArray[0][0], names[i])
    object_set.push(temp);

}

//class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
//var S = new ColourSlider(10,163, 250, 100,colArray[0][0], colArray[0][8], {l:2,s:colArray[0][0]},255,0,100)
var D = new DrawingPage(300, 20, 450, 550,colArray[0][0] )
var R = new Rectangle(100,100,300,200, {l:3,s:colArray[0][5], f:colArray[0][4]})


function animate(){
    ctx.clearRect(0, 0, width, height);
    D.update()
   // S.update();
  

    for(let i=0; i<object_set.length; i++){
        object_set[i].update()

    }

   window.requestAnimationFrame(animate);
}
animate();
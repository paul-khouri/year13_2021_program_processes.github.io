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

canvasSecond = document.querySelector('#mySecondCanvas');
var ctx_s = canvasSecond.getContext('2d');
canvasSecond.width = width*scale;
canvasSecond.height = height*scale;
ctx_s.scale(scale,scale);
/*
ctx_s.beginPath();
ctx_s.arc(100, 100, 30, 0, 2*Math.PI);
ctx_s.fill();
*/




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
 * @param {object} ob mini object of type {l: lineWidth, s: strokeColour,  f: fillColour} can be empty , can be ordered
 * @return Null
 */
 function updateContext(ob, cx=ctx){
   
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

 /**
 * Draw a Rectangle
 * @param {number} x top corner
 * @param {number} y top corner
 * @param {number} w width
 * @param {number} h height
 * @param {object} c mini object of type {l: lineWidth, s: strokeColour,  f: fillColour}
 * @param {number} rotation 0- 360
 * @return Null
 */
function _rect(x,y,w,h, c, rotation = 0){
    ctx.save();
    ctx.translate(x+w/2,y+h/2);
    ctx.rotate(rotation*Math.PI/180)
    ctx.beginPath();
    ctx.rect(0-w/2,0-h/2,w,h);
    updateContext(c);
    ctx.restore()
}

 /**
 * Draw a circle
 * @param {number} x top corner
 * @param {number} y top corner
 * @param {number} r radius (must be positive)
 * @param {object} c mini object of type {l: lineWidth, s: strokeColour,  f: fillColour}
 * @return Null
 */
function _circ(x,y,r,c){
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI);
    updateContext(c)
}


function _line(x_1,y_1,x_2,y_2,c,rotation = 0){
    ctx.save();
    ctx.translate(x_1,y_1)
    ctx.rotate(rotation*Math.PI/180)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x_2-x_1 , y_2-y_1);
    ctx.restore();
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
 * Get smaller magnitude of two numbers
 * @param {number} w top corner
 * @param {number} h top corner
 * @return {number} positive
 */
function getabsolutesmaller(w,h){
    if(Math.abs(w)<Math.abs(h)){
        return Math.abs(w);
    }else{
        return Math.abs(h);
    }
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

 /**
 * Filled Polygon
 * @param {number} x top corner of bounding box
 * @param {number} y top corner of bounding box
 * @param {number} w width of bounding box
 * @param {number} h height of bounding box
 * @param {object} c mini object of type {f: fillColour}
 * @param {number} n number of sides
 * @param {number} rotation rotation
 * @return Null
 */
class Polygon{
    constructor(x,y,w,h,c,n=5,rotation = 10){
        this.x_c = x+w/2;
        this.y_c = y+h/2;
        this.r = this.getabsolutesmaller(w,h)/2;
        this.n = n;
        this.c = c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        this.draw()
    }
    draw(){
        //console.log(this.c)
        var x
        var y
        var n = this.n;
        var R = this.r;
        var rot = 0
        if(n%4 == 0){
            rot = -Math.PI/n
        }else if((n+2)%4==0){
            rot = 0
        }
        else{
            rot = -Math.PI/2
        }
        ctx.save();
        ctx.translate(this.x_c, this.y_c);
        ctx.rotate(this.rotation);
        ctx.beginPath()
         var pointSet = []
         for(var i=0; i<n; i++){
             x= Math.round( R*Math.cos(i*2*Math.PI/n + rot) )
             y= Math.round( R*Math.sin(i*2*Math.PI/n + rot) )
             if(i== 0){
                 ctx.moveTo(x,y)
             }else{
                 ctx.lineTo(x, y)
             }
             pointSet.push({x:x, y:y})
         }
         ctx.closePath();
         ctx.restore();
         this.updateContext(this.c);

    }

}
Polygon.prototype._line = _line
Polygon.prototype.updateContext = updateContext
Polygon.prototype.getabsolutesmaller = getabsolutesmaller

class Rectangle{
    constructor(x,y,w,h,c, rotation = 0){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c=c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y+this.h/2);
        ctx.rotate(this.rotation)
        this._rect(0-this.w/2, 0 - this.h/2, this.w, this.h, this.c);
        ctx.restore();
    }
}
Rectangle.prototype._rect = _rect

class Ellipse{
    constructor(x,y,w,h,c, rotation = 0){
        this.x = x+w/2;
        this.y = y+h/2;
        this.xRad = Math.abs(w/2);
        this.yRad = Math.abs(h/2);
        this.c=c;
        this.rotation = rotation*Math.PI/180;
    }
    update(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation)
        this._ellipse(0, 0, this.xRad, this.yRad, this.c)
        ctx.restore();
    }
}
Ellipse.prototype._ellipse = _ellipse

class CanvasImage{
    constructor(img){
        this.img = img
    }
    update(){
        ctx.drawImage(this.img, 0,0,width,height)
    }
}



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


// slider section ------------------------------------------------------------------------
class GeneralSlider{
    constructor(x,y,w,h,general_col_object, sliding_point_col_object,max,min,start){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.g = general_col_object;
        this.s = sliding_point_col_object
        this.min = min;
        this.max = max;
        this.start = start;
        this.r = h/6
        this.P = new SlidingPoint(x,y+2*h/3,w,this.r, sliding_point_col_object,max,min,start)
        console.log(this.P.max)

    }

    update(){
        this._rect(this.x, this.y,this.w,this.h, this.g)
        this._line(this.x, this.y+2*this.h/3, this.x+this.w, this.y+2*this.h/3, this.g )
        this.P.update();
        this.drawText_Boxed(this.x/2, this.y, this.w, this.h/3,this.P.getValue(),this.s)
    }
    getValue(){
        return this.P.getValue()
    }
}
GeneralSlider.prototype._rect = _rect
GeneralSlider.prototype._line = _line;
GeneralSlider.prototype.drawText_Boxed = drawText_Boxed;



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


/**
 * Create a point that can dragged horizontally between x and x+w
 * @param {number} x left
 * @param {number} y top
 * @param {number} w width 
 * @param {number} r radius of pont
 * @param {object} colours {f: rgb, l: num, s: rgb}
 * @param {number} max maximum number value
 * @param {number} min maximum number value
 * @param {number} start between min and max
 * @return {number} getX() x position of point 
 * @return {number} getProportion() proportional position of point on its line 
 */
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
    return Math.round(   ((this.xCircle - this.x)/(this.w)*10) )/10
}
getValue(){
    return Math.round (this.min + ((this.xCircle - this.x)/(this.w))*(this.max-this.min));
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
        this.xN = 9;
        this.yN = 11;
        this.grid_on = true;
        this.object_set = [];
        this.S = new ColourSlider(10,193, 250, 100,colArray[0][0], colArray[0][8], {l:2,s:colArray[0][0]},255,0,100)
        this.R = new GeneralSlider(10,400,250,37.5,{l:6, s:colArray[0][4], f:colArray[0][3]},
            {l:4, s:colArray[0][5], f:colArray[0][7]},180,0,0)
        this.N = new GeneralSlider(10,500,250,37.5,{l:6, s:colArray[0][4], f:colArray[0][3]},
            {l:4, s:colArray[0][5], f:colArray[0][7]},20,3,5)
        
    }

    update(){
        this.S.update();
        var colour = this.S.getValue()
        this.R.update();
        var rot = this.R.getValue()
        this.N.update()
        var n = this.N.getValue();
        //console.log(rot)
        // update previous state before getting current state
        this.previous_state_down = this.current_state_down
        // get current state from Handler
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


        ctx.save()
        this._rect(this.x, this.y, this.w, this.h, {f:this.shade})
        ctx.clip()
        //this.draw_grid(this.x, this.y, this.w, this.h,10,{l:0.25, s:"rgb(150,150,150)"})
        this.grid(this.x, this.y, this.w, this.h,this.xN,this.yN, {l:0.25, s:"rgb(150,150,150)"})
        for(var i=0; i<this.object_set.length; i++){
            this.object_set[i].update();
        }
        ctx.restore()
        


        if(this.dragging){
            var w = state.x - this.xmouseS;
            var h = state.y - this.ymouseS;
            var x = this.xmouseS;
            var y = this.ymouseS;
            var r
            if(Math.abs(w)<Math.abs(h)){
                r = Math.abs(w/2);
            }else{
                r = Math.abs(h/2);
            }
            if(this.grid_on){
                // rounded coordinates for snapping to grid
                x = this.grid_round(this.xmouseS-this.x, this.w/this.xN) + this.x
                y = this.grid_round(this.ymouseS-this.y, this.h/this.yN) + this.y
                w = this.grid_round(w, this.w/this.xN)
                h = this.grid_round(h, this.h/this.yN)
                if(Math.abs(w)<Math.abs(h)){
                    r = Math.abs(w/2);
                }else{
                    r = Math.abs(h/2);
                }
            }
            if(Button.shape == "Brush"){
                // drawing the brush on the second canvas
                ctx_s.beginPath();
                ctx_s.arc(state.x, state.y, 5, 0, 2*Math.PI);
                ctx_s.fillStyle = colour.f
                ctx_s.fill();
                //blank rectangle on ctx canvas as clipping //f:"rgba(0,0,0,0)"
                // empty object for colour so it will not draw
                ctx.save()
                this._rect(this.x, this.y, this.w, this.h, {})
                ctx.clip()
                // draw second canvas clipped to drawing area
                ctx.drawImage(canvasSecond,0,0, width,height);
                ctx.restore()
            }
            else{
            //drawing main bounding box for shapes
            this._rect(x, y,w,h, {l:0.5, s: "rgb(0,0,0)"})
            this._line(x+w/2, y+h/2, x+w, y+h,{l:3, s: "rgb(0,255,0)"} )
            this._rect(x, y,w,h, {l:0.5, s: "rgb(0,0,0)"}, rot)
            this._line(x+w/2, y+h/2, x+w, y+h,{l:3, s: "rgb(255,0,0)"} , rot)
            this._circ(x+w/2,y+h/2,r, {l:0.5, s: "rgb(0,0,0)"})
    
        }
        }

        // mouse  goes up and dragging
        if(this.current_state_down == false && this.previous_state_down == true && this.dragging){
            // if a shape has been set by the buttons, create object and push
            console.log(Button.shape)
            if(Button.shape == "Rectangle"){
            var temp = new Rectangle(x,y,w,h, colour, rot)
            this.object_set.push(temp);
            }
            else if(Button.shape == "Ellipse"){
                var temp = new Ellipse(x,y,w,h, colour,rot)
                this.object_set.push(temp);
                }
            else if(Button.shape == "Polygon"){
                var temp = new Polygon(x,y,w,h, colour,n,rot)
                this.object_set.push(temp);
            }
            else if(Button.shape == "Brush"){
                // create image of second canvas
                var img = canvasSecond.toDataURL("image/png");
                // create new JS image and set source
                var copiedImage = new Image()
                copiedImage.src = img
                // create the image object (mine) and push
                var temp = new CanvasImage(copiedImage)
                this.object_set.push(temp);
                // clear second canvas
                ctx_s.clearRect(0,0,width,height);
                }

        }// up state outside of drawing page
        else if(this.current_state_down == false && this.previous_state_down == true){
            if(Button.shape == "Clear"){
                console.log("Clear")
                this.object_set = [];
                }
        }
        // as soon as mouse not down set all dragging to false
        if(!state.down){
            this.dragging = false
        }
    }
//rounding number M to the nearest N
    grid_round(M,N){
        var rounded = N*Math.round(M/N)
        return rounded
    }
}
DrawingPage.prototype._rect = _rect;
DrawingPage.prototype._circ = _circ;
DrawingPage.prototype._line = _line;
DrawingPage.prototype.draw_grid = draw_grid
DrawingPage.prototype.grid = grid




var my_Handler = new Handler(canvas);


object_set =[]
// (x,y,w,h,l_w,c_f, c_s, c_over, c_selected, c_text, text)
names = ["Rectangle", "Ellipse", "Polygon", "Brush", "Clear"]
let yStep = 35
for(let i=0 ; i< names.length ; i++){
    let temp = new Button(10,10+i*yStep,100, yStep, 
        {f:colArray[0][5], l:2, s:colArray[0][6] }, 
        colArray[0][4], colArray[0][8],colArray[0][0], names[i])
    object_set.push(temp);

}


var D = new DrawingPage(300, 20, 450, 550,colArray[0][0] )



function animate(){
    ctx.clearRect(0, 0, width, height);
    D.update();
  

    for(let i=0; i<object_set.length; i++){
        object_set[i].update()

    }

   window.requestAnimationFrame(animate);
}
animate();
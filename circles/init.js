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
var my_Handler = new Handler(canvas);




/**
 * Create a point that can dragged horizontally between x and x+w
 * @param {number} x centre
 * @param {number} y centre
 * @param {number} r radius of point
 * @param {object} colours {f: rgb, l: num, s: rgb}
 */
 class DragPoint{
    constructor(x,y, r, colours, activecolours){
        this.x = x;
        this.y = y;
        this.colours = colours;
        this.activecolours = activecolours;
        this.r = r;
        this.dragging = false;
        this.pre_state_down = false;
        this.group_members = [];
        this.dx = 0;
        this.dy = 0;
    }
    update(){
        var colours = this.colours
        var state = my_Handler.dataPack()
        var check = my_Handler.distanceCheckBoolean(this.x, this.y, this.r);
        if(check && !state.down){
            colours = this.activecolours;
            }
        // mouse has gone from being up to down
        if(!this.pre_state_down && state.down && check ){
            this.dragging = true;
            console.log("mouse gone down")
            this.runSelection();
            this.dx = state.x - this.x;
            this.dy = state.y - this.y;
        }
        this.pre_state_down = state.down
 
        if(!state.down){
            this.dragging = false;
        }
        if(this.dragging){
            this.x = state.x - this.dx;
            this.y = state.y - this.dy;
            colours = this.activecolours;
        }
        this.draw(colours);
    }
    runSelection(){
        for(var i =0 ; i < this.group_members.length; i++){
            if(this.group_members[i] != this){
                this.group_members[i].deselect(); 
            }
        }
    }
    draw(colours){
        this._circ(this.x, this.y,this.r, colours)
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setGroup(g){
        this.group_members = g
    }
    deselect(){
        this.dragging = false;
    }

    }
    DragPoint.prototype._circ = _circ;

/**
 * Create a point that can dragged horizontally between x and x+w
 * @param {number} x centre
 * @param {number} y centre
 * @param {number} r radius of point
 * @param {object} colours {f: rgb, l: num, s: rgb}
 * @param {object} activecolours {f: rgb, l: num, s: rgb}
 * @param {number} d distance from centre
 * @param {number} ang angle in degrees
 */
 class CircularDragPoint{
    constructor(x,y, r, colours, activecolours, d, ang){
        this.xC = x;
        this.yC = y;
        this.x = x + d*Math.cos(ang*Math.PI/180);
        this.y = y + d*Math.sin(ang*Math.PI/180);
        this.d = d;
        this.colours = colours;
        this.activecolours = activecolours;
        this.r = r;
        this.dragging = false;
        this.pre_state_down = false;
        this.group_members = [];
        this.dx = 0;
        this.dy = 0;
    }
    update(){
        var colours = this.colours
        var state = my_Handler.dataPack()
        var check = my_Handler.distanceCheckBoolean(this.x, this.y, this.r);
        if(check && !state.down){
            colours = this.activecolours;
            }
        // mouse has gone from being up to down
        if(!this.pre_state_down && state.down && check ){
            this.dragging = true;
            console.log("mouse gone down")
            this.runSelection();
            this.dx = state.x - this.x;
            this.dy = state.y - this.y;
        }
        this.pre_state_down = state.down
 
        if(!state.down){
            this.dragging = false;
        }
        if(this.dragging){
            //this.x = state.x;
            //this.y = state.y;
            var v_x = state.x - this.dx - this.xC;
            var v_y = state.y - this.dy - this.yC;
            var to_unit  = 1/Math.sqrt( Math.pow(v_x, 2) + Math.pow(v_y, 2) )
            this.x = this.xC+v_x*to_unit*this.d;
            this.y = this.yC+v_y*to_unit*this.d;

            this._line(this.xC, this.yC, state.x, state.y, {l:0.5 , s:"rgb(0,255,255"})
            //console.log(ctx.lineWidth)
  
        }
        this.draw(colours);
    }
    runSelection(){
        for(var i =0 ; i < this.group_members.length; i++){
            if(this.group_members[i] != this){
                this.group_members[i].deselect(); 
            }
        }
    }
    draw(colours){
        this._circ(this.xC, this.yC,this.d, {l:0.5 , s:"rgb(0,255,255"})
        this._circ(this.x, this.y,this.r, colours)
        //this._circ(this.xC, this.yC,this.r, this.colours)
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setGroup(g){
        this.group_members = g
    }
    deselect(){
        this.dragging = false;
    }

    }
    CircularDragPoint.prototype._circ = _circ;
    CircularDragPoint.prototype._line = _line;

/**
 * Create a point that can dragged horizontally between x and x+w
 * @param {number} x centre
 * @param {number} y centre
 * @param {number} r radius of point
 * @param {object} circlecolours {f: rgb, l: num, s: rgb}
 * @param {object} activecolours {f: rgb, l: num, s: rgb}
 * @param {array} angles array of angles
 * @param {object} CircularDragPoint 
 */
class CircleWithPoints{
    constructor(x,y,r, angles){
        this.S = []
        for(var i= 0; i< angles.length ; i++){
            var temp = new CircularDragPoint(x,y,10,{f:colArray[0][2], l:3, s:colArray[0][6]},{f:colArray[0][7], l:3, s:colArray[0][4]}, r,angles[i])
            this.S.push(temp)
        }
        for(var i =0; i<this.S.length; i++){
            this.S[i].setGroup(this.S);
        }
    
    }
    update(){
        for( var i = 0; i<this.S.length; i++){
            this.S[i].update();
        }
    }
}


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




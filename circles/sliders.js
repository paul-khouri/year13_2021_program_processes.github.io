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
console.log("colour slider and sliding point objects")

class ColorSlider{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.P = new SlidingPoint(x,y,w,h, 0.5*this.h);
        this.step = 2*h;
        this.Q = new SlidingPoint(x, y+this.step,w,h, 0.5*this.h )
        
        this.selected_colour = "rgb(0,0,0)";
        this.shadeColour = "rgb(0,0,0)"
    }

    update(){
        this.draw();
        this.drawHues();
        this.drawShades();
        this.drawColour();
        
        // get x value across lenth L of the sliding point
        // use this to determine hue using get colour function
        this.selected_colour = this.getColor(this.P.getX()-this.x, this.w)
        // and send back to sliding point to set colour of the point
        this.P.setColour(this.selected_colour)
        // same process but now determining shade
        this.shadeColour = this.getShade(this.selected_colour, this.Q.getX() - this.x, this.w )
        this.Q.setColour(this.shadeColour )
        this.P.update()
        this.Q.update()
        // update to accessible static variable
        ColorSlider.color = this.shadeColour
    }

    drawHues(){
        var lingrad = ctx.createLinearGradient(this.x, this.y, this.x+this.w, this.y);
        lingrad.addColorStop(0, 'rgb(255,0,0)');
        lingrad.addColorStop(1/6, 'rgb(255,0,255)');
        lingrad.addColorStop(2/6, 'rgb(0,0,255)');
        lingrad.addColorStop(3/6, 'rgb(0,255,255)');
        lingrad.addColorStop(4/6, 'rgb(0,255,0)');
        lingrad.addColorStop(5/6, 'rgb(255,255,0)');
        lingrad.addColorStop(1, 'rgb(255,0,0)');
        ctx.fillStyle = lingrad;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h)
        ctx.fill()
    }

    drawShades(){
        var lingrad = ctx.createLinearGradient(this.x, this.y, this.x+this.w, this.y);
        lingrad.addColorStop(0, 'rgb(0,0,0)');
        lingrad.addColorStop(3/6, this.selected_colour);
        lingrad.addColorStop(1, 'rgb(255,255,255)');
        ctx.fillStyle = lingrad;
        ctx.beginPath();
        ctx.rect(this.x, this.y+this.step, this.w, this.h)
        ctx.fill()
    }

    drawColour(){
        ctx.fillStyle = this.shadeColour;
        ctx.beginPath();
        ctx.rect(this.x, this.y+2*this.step, this.w, this.h)
        ctx.fill()
    }

    draw(){
        ctx.fillStyle = "rgb(10,10,10)";
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, 4*this.h)
        ctx.fill()
    }

    getColor(){
        return this.shadeColour
    }
}
ColorSlider.prototype.getColor = getColor;
ColorSlider.prototype.getShade = getShade;
ColorSlider.color ="rgb(0,0,0)";

// basic sliding point for use in colour slider
class SlidingPoint{
constructor(x,y,w, h, r){
    this.x_c = x + w/1.5;
    this.y_c = y + h/2;
    this.x = x;
    this.w = w;
    this.r = r;
    canvas.addEventListener('mousedown', this.mDown.bind(this));
    canvas.addEventListener('mousemove', this.mMove.bind(this));
    canvas.addEventListener('mouseup', this.mUp.bind(this));
    this.xMouse = 0;
    this.yMouse = 0;
    this.taken = ""
    this.selected_colour = "rgb(255,255,255)";
    this.stroke = "rgb(255,255,255)";
    this.overstroke = "rgb(200,200,200)";
}

mDown(e){
    if(this.inBounds){
        this.taken = this;
    }
   
}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x_c, this.y_c, this.r);

}
mUp(e){
    this.taken = "";
}
update(){
    
    if(this.taken == this){
        this.x_c=this.xMouse;
    }
    if(this.x_c < this.x){
        this.x_c = this.x;
    }else if(this.x_c > this.x +this.w){
        this.x_c = this.x + this.w;
    }
    this.draw(this.x_c, this.y_c, this.r);

}

draw(x,y,r){
    if(this.inBounds || this.taken == this){
        ctx.strokeStyle = this.overstroke;
    }else{
        ctx.strokeStyle = this.stroke;
    }
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.fillStyle = this.selected_colour;
    
    ctx.fill();
    ctx.stroke();
    

}

setColour(c){
    this.selected_colour = c
}

getColor(){
    return this.selected_colour;
}

getX(){
    return this.x_c
}

boundsCheck(x_1, y_1, x_2, y_2, r){
    var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
    if(d<r){
        return true;
    }else{
        return false;
    }

}

}



/**
 * get a colour given Hue by interval 0 -> L
 * @param  0 <= x <= L  (number)
 * @param L (number)
 * @return string rgb( , , )
 */
 function getColor(x,L){
    var R, G, B, rgbstring
    switch(true){
        case x < 0:
            console.log("x invalid, less than 0")
            R=255;
            G=0;
            B=0;
            rgbstring = "rgb("+R+","+G+","+B+")";
            break;
        case x <= L/6:
            R= 255
            G = 0
            B = Math.round(((6*255)/L)*x)
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 2*L/6:
            R= Math.round(  (-(6*255)/L)*(x-L/6) +255 )
            G = 0
            B = 255
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 3*L/6:
            R= 0
            G = Math.round(  ((6*255)/L)*(x-2*L/6)   )
            B = 255
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 4*L/6:
            R= 0
            G = 255
            B = Math.round(  (-(6*255)/L)*(x-3*L/6) +255 )
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 5*L/6:
            R= Math.round(  ((6*255)/L)*(x-4*L/6)   )
            G = 255
            B = 0
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 6*L/6:
            R= 255
            G = Math.round(  (-(6*255)/L)*(x-5*L/6) +255 )
            B = 0
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        default:
            console.log("Default")
            R=0;
            G=0;
            B=0;
            rgbstring = "rgb("+R+","+G+","+B+")"
    }
    return rgbstring;
}

/**
 * Alter the shading or brighness of a Hue given x on interval 0 -> L
 * @param  0 <= x <= L  (number)
 * @param L (number)
 * @param rgbstring (string of Hue)
 * @return string rgb( , , )
 */
function getShade(rgbstring, x, L){
    // -L/2 < x < L/2
var xValue = x - L/2
var numbers = rgbstring.match(/\d+/g).map(Number);
var colset={r:numbers[0], g:numbers[1], b:numbers[2]}
var rgbstring = "rgb(100,100,100)"
switch(true){
    case xValue < -L/2:
        console.log("error xValue is too low");
        console.log(xValue)
        R=0;
        G=0;
        B=0;
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    case xValue <= 0:
        R = getShadeValueLeft(xValue,L, colset.r);
        G = getShadeValueLeft(xValue,L, colset.g);
        B = getShadeValueLeft(xValue,L, colset.b);
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    case 0< xValue <= L/2:
        R = getShadeValueRight(xValue,L, colset.r);
        G = getShadeValueRight(xValue,L, colset.g);
        B = getShadeValueRight(xValue,L, colset.b);
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    default:
        R=255;
        G=255;
        B=255;
        rgbstring = "rgb("+R+","+G+","+B+")";
}
return rgbstring;
}

function getShadeValueLeft(xValue,L, c){
    return Math.round( (c/(L/2))*xValue + c )
}
function getShadeValueRight(xValue,L, c){
    return Math.round( ((255 -c)/(L/2))*xValue +c )
}
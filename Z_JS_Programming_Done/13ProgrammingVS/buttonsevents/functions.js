// ------------------ functions 
// check in rectangular bounds xMouseNow, yMouseNow, x,y, width, height
function inBounds(xMouse, yMouse, x,y,width, height){
    if(xMouse > x &&
        xMouse < x+width &&
        yMouse > y &&
        yMouse < y+height){
            return true;
        }else{
            return false;
        }
    }
// takes number and rounding level start value n>=s
function roundTo(n, r, s){
    return (Math.floor((n-s)/r)*r)+s
}

//drawCircle x, y, radius, fill(boolean), stroke(boolean), 
//fill colour, stroke colour, stroke width
function drawCircle(x,y,r,f,s, fc, sc, lw){
    ctx.beginPath()
    ctx.arc(x,y, r, 0, 2*Math.PI);
    if(f){
        ctx.fillStyle = fc;
        ctx.fill();
    }
    if(s){
        ctx.lineWidth = lw;
        ctx.strokeStyle = sc;
        ctx.stroke();
    }
    }
//drawRectangle x, y, width, height fill(boolean), stroke(boolean), 
//fill colour, stroke colour, stroke width
function drawRectangle(x,y, w,h,f,s, fc, sc, lw){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(f){
        ctx.fillStyle = fc;
        ctx.fill();
    }
    if(s){
        ctx.lineWidth = lw;
        ctx.strokeStyle = sc;
        ctx.stroke();
    }
    }


//drawLine takes x y start and x y end,  line colour , line width
function drawLine(x_1,y_1,x_2,y_2,sc,w){
    ctx.beginPath();
    ctx.strokeStyle = sc;
    ctx.lineWidth=w;
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2 , y_2);
    ctx.stroke();
}
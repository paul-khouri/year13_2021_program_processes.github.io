console.log(" functions js file has been called");


// ---------------functions

// drawCircle x,y,r, fillC, strokeC, lw, fill(boolean), stroke(boolean)
function drawCircle(x,y,r, fillC, strokeC, lw, fill, stroke ){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    if(fill == true){
        ctx.fillStyle = fillC;
        ctx.fill();

    }
    if(stroke == true){
        ctx.lineWidth = lw;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }

}

// drawRectangle x,y,w,h, fillC, strokeC, lw, fill(boolean), stroke(boolean)
function drawRectangle(x,y,w,h, fillC, strokeC, lw, fill, stroke ){
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    if(fill == true){
        ctx.fillStyle = fillC;
        ctx.fill();

    }
    if(stroke == true){
        ctx.lineWidth = lw;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }

}



// function drawLine x_1 , y_1 , x_2, y_2, lw, strokeCol
function drawLine(x_1, y_1, x_2, y_2, lw, strokeCol){
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.stroke();
    
}


// function writeText message, x, y, colour
function writeText(m, x,y, col){
    ctx.fillStyle=col;
    var myFont= "bold 15px sans-serif";
    ctx.font=myFont;
    ctx.fillText(m, x,y);
}


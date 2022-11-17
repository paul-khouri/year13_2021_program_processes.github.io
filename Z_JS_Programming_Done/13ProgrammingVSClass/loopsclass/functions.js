console.log(" functions js file has been called");

 // Set up canvas

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;

var colArray=[
    "rgb(255,255,255)", "rgb(153,153,153)", "rgb(0,0,0)", 
    "rgb(204,0,0)","rgb(255,204,51)","rgb(51,51,255)",
    "rgb(255,102,102)","rgb(255,255,153)", "rgb(0,153,204)"
    ]

// ---------------functions

// funnction draw star x,y, RLarge, RSmall, col, number of points
function drawStar(x,y,RLarge, RSmall, col, p){
    
    ctx.save(); 
    ctx.translate(x,y);
    ctx.beginPath();   
    ctx.moveTo(RLarge, 0);
    for(i=1; i<2*p ; i++){
            ctx.rotate(Math.PI/p);
            if(i%2 == 1){
            ctx.lineTo(RSmall, 0);
            
            }else{
                ctx.lineTo(RLarge, 0);

            }
    }
    ctx.closePath();
    ctx.fillStyle = col;
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();   
    ctx.moveTo(RLarge, 0);
    for(i=1; i<2*p ; i++){
            ctx.rotate(Math.PI/p);
            if(i%2 == 1){
                console.log(i);
                ctx.beginPath();
                ctx.arc(RSmall+40, 0, 2, 0, 2*Math.PI);
                ctx.closePath();
                ctx.fillStyle=col;
                ctx.fill();
               
            }else{
                ctx.beginPath();
                ctx.arc(RLarge, 0, 4, 0, 2*Math.PI);
                ctx.closePath();
                ctx.fillStyle=col;
                ctx.fill();

            }
    }

    ctx.restore();


}



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



// function drawLine x_1 , y_1 , x_2, y_2, lw
function drawLine(x_1, y_1, x_2, y_2, lw, strokeCol){
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.stroke();
    
}


// function draw text message, x,y, text colour
function writeText(m, x,y, col){
    ctx.fillStyle=col;
    var myFont= "bold 30px sans-serif";
    ctx.font=myFont;
    ctx.fillText(m, x,y);
}


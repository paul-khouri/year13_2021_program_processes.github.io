console.log(" functions_rotation js file has been called");

 // Set up canvas

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;

var colArray=[
    ["rgba(255,255,255,1,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
    "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
    "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)"
    ],
    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 
        "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",
        "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)"
        ],
        [
            "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 
            "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",
            "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)"
            ]
        ]

// ---------------functions
drawRectangleRot(400-100,300-50, 200,100, 45, colArray[1][3], colArray[1][5], 3, true, true);
drawRectangle(400-100,300-50, 200,100, colArray[2][3], colArray[2][5], 3, true, true);

// drawing circles rotated around the point 200, 300
// save the context so it can be restored at the end
ctx.save();
// tranlate it to 200,300 so this is now 0,0
ctx.translate(200,300);
// draw a little circle (note the 0,0)
drawCircle(0,0, 10, colArray[0][5], colArray[0][6], 6, true, false);
// rotate
ctx.rotate(Math.PI / 180 * 50);
// draw but move centre off 0,0 
drawCircle(0+50,0, 50, colArray[1][6], colArray[1][7], 6, true, true);
// rotate again
ctx.rotate(Math.PI / 180 * 50);
drawCircle(0+50,0, 50, colArray[1][7], colArray[1][8], 6, false, true);
// put everything back
ctx.restore();


// drawRectangle(x,y,w,h, rotion around center fillC, strokeC, lw, fill(b), stroke(b) )
function drawRectangleRot(x,y,w,h, rot, fillC, strokeC, lw, fill, stroke ){
    ctx.save()
    ctx.translate(x+w/2, y+h/2);
    ctx.rotate(Math.PI / 180 * rot);
    ctx.beginPath();
    ctx.rect(-w/2,-h/2,w,h);
    if(fill == true){
        ctx.fillStyle = fillC;
        ctx.fill();
    }
    if(stroke == true){
        ctx.lineWidth = lw;
        ctx.strokeStyle = strokeC;
        ctx.stroke();
    }
    ctx.restore();

}


// drawRectangle(x,y,w,h, fillC, strokeC, lw, fill(b), stroke(b) )
function drawRectangle(x,y,w,h, fillC, strokeC, lw, fill, stroke ){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
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

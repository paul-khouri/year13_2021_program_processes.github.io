console.log("gradient js file has been called");

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


// function writetext m, x, y, fillcolour
function writeText(m, x,y, col){
    ctx.fillStyle=col;
    var myFont= "bold 30px sans-serif";
    ctx.font=myFont;
    ctx.fillText(m, x,y);
}






// define an x_1, y_1 start point and an x_2, y_2 end point for the gradient
// this one has three colour stops but the ones at each end are the same colour
function makeLinearGradient(x_1,y_1, x_2,y_2, c_1,c_2){
    var myGradient = ctx.createLinearGradient(x_1,y_1,x_2,y_2);
    // Add three color stops
    myGradient.addColorStop(0, c_1);
    myGradient.addColorStop(.5, c_2);
    myGradient.addColorStop(1, c_1);
    return myGradient;
    
}

// uses an inner circle of a particular radius and an outer circle of a 
// particular radius
// this one has three colour stops but the ones at each end are the same colour
function makeRadialGradient(x_1, y_1, r_1, x_2, y_2, r_2, c_1, c_2){
var circGradient = ctx.createRadialGradient(x_1,y_1,r_1, x_2,y_2,r_2);
// Add three color stops
circGradient.addColorStop(0, c_1);
circGradient.addColorStop(.5, c_2);
circGradient.addColorStop(1, c_1);
return circGradient;
}



//----------- first radial  
var cGrad = makeRadialGradient(150, 150, 30, 150, 150, 70, colArray[0][5], colArray[0][7])
// drawCircle x,y,r, fillC, strokeC, lw, fill(boolean), stroke(boolean)
drawCircle(150,150, 100, cGrad, colArray[1][0], 5, true, true );

//----------- second radial 
// in this case the function to make the gradient isn't going to be useful
// as I would like 3 different colours
// in this case have declared the centre co-ordinates as variable
var x = 400
var y = 150
// the +90 shifts the centre of the gradient
var circGradient = ctx.createRadialGradient(x+80,y,1, x,y,100);
// Add three color stops
circGradient.addColorStop(0, colArray[0][6]);
circGradient.addColorStop(.5, colArray[0][7]);
circGradient.addColorStop(1, colArray[2][3]);
// Set the fill style and draw a circle
drawCircle(x,y, 100, circGradient, "", "", true, false );


//---------------------- third radial
x = 650
y = 150
// over write the previous gradient
circGradient = ctx.createRadialGradient(x+70,y,1, x,y,100);
// Add two color stops
circGradient.addColorStop(0, colArray[0][7]);
circGradient.addColorStop(1, colArray[2][3]);
// x, y, radius, fill(boolean), stroke(boolean)
drawCircle(x,y, 100, circGradient, "", "", true, false );
//---------------------------------------

// the gradient needs to be lined up so it goes inside the rectangle
var linGrad = makeLinearGradient(90,0,110,0, colArray[1][3], colArray[0][4]);
drawRectangle(50, 400, 100,50, linGrad, colArray[0][0], 2,true, true );
drawRectangle(75, 450, 100,50, linGrad, colArray[0][0], 2,true, true );
drawRectangle(100, 500, 100,50, linGrad, colArray[0][0], 2,true, true );


//this one is with a rotation
ctx.save();
ctx.translate(400, 400);
// this just draws a circle at the new translated point
drawCircle(0,0, 10, "", colArray[0][3], 1 , false, true );
var degree= 30;
ctx.rotate(Math.PI / 180 * degree);
linGrad = makeLinearGradient(50,0,100,0, colArray[1][3], colArray[0][4]);
drawRectangle(0, 0, 150,75, linGrad, colArray[0][0], 2,true, true );
ctx.restore(); 
//------------------------------------


//------------------- star like shape
 ctx.save();
ctx.translate(700, 400);

drawCircle(0,0, 150, colArray[1][6],"", "" , true, false );
drawCircle(0,0, 10, colArray[0][4],"", "" , true, false );

linGrad = makeLinearGradient(-5,0,5,0,colArray[2][3], colArray[0][4]);
for(var i=0; i<360; i+=15 ){
    var degree= 15;
    ctx.rotate(Math.PI / 180 * degree);
    // the y = 50 pushes it away from the rotation point
    drawRectangle(-50, 50, 100,100, linGrad, colArray[1][0], 1,true, true );
}
ctx.restore(); 




 
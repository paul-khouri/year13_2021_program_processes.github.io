// loaded functions
// drawRectangle x,y,w,h, fillC, strokeC, lw, fill(boolean), stroke(boolean)
// drawCircle x,y,r, fillC, strokeC, lw, fill(boolean), stroke(boolean)
// function drawLine x_1 , y_1 , x_2, y_2, lw, strokeCol
// function writeText message, x, y, colour
//---------------


// single loop j = 0,1,2,3,4
// the x value increases by 50 each time

for(var j=0; j<5; j++){
drawCircle(50+50*j, 100, 10,colArray[0][4], "","", true, false);
}


// the y value increases by 30 each time

for(var k=0; k<8; k++){
    drawLine(10, 200+30*k, 300, 200+30*k, 6, colArray[0][0]);
}


// the x value increases by 12 each time
// the y value decreases by 3 each time

for(var i=0; i<40; i++){
    drawRectangle(10+12*i, 580-3*i, 10,10, colArray[1][3], "", "", true, false);
}

// double loop
  // for each step of i, run another loop on k  
  // note that the i appears inside the k loop
  
for(var i=0; i<10; i++){
    for(var k=0; k<10; k++){
    drawRectangle(400+20*i, 20+20*k, 10,10, colArray[0][7], "", "", true, false);
    }
}




console.log("loops js is called");

// drawRectangle x,y,w,h, fillC, strokeC, lw, fill(boolean), stroke(boolean)
/*var i=0;
drawRectangle(100+100*i,50, 50,50,colArray[3], colArray[4],8, false, true);
i = 1;
drawRectangle(100+100*i,50, 50,50,colArray[3], colArray[4],8, false, true);
i = 2;
drawRectangle(100+100*i,50, 50,50,colArray[3], colArray[4],8, false, true);*/
/*
var j = 0;
for(var i = 0 ; i<7 ; i++){
    //console.log(i);
    drawRectangle(100+50*i,150+100*j, 50,50,colArray[3], colArray[4],8, false, true);
}
j=1;
for(var i = 0 ; i<7 ; i++){
    //console.log(i);
    drawRectangle(100+50*i,150+100*j, 50,50,colArray[3], colArray[4],8, false, true);
}
j=2;
for(var i = 0 ; i<7 ; i++){
    //console.log(i);
    drawRectangle(100+50*i,150+100*j, 50,50,colArray[3], colArray[4],8, false, true);
}*/

for(j = 0; j<7 ; j++){
    for(var i = 0 ; i<7 ; i++){
        drawRectangle(50+50*i,150+50*j, 50,50,colArray[3], colArray[4],1, false, true);
    }
}

function drawGrid(x,y,s){
    for(j = 0; j<7 ; j++){
        for(var i = 0 ; i<7 ; i++){
            drawRectangle(x+i*s/7,y+j*s/7, s/7,s/7,colArray[3], colArray[4],1, false, true);
        }
    }
}

drawGrid(400, 100, 140);
drawGrid(400, 100, 49);
drawGrid(400, 100, 280);
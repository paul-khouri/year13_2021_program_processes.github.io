console.log("loops js called");
var col_one= {f:colArray[0][4], s:colArray[2][6], l:8}
var col_two= {f:colArray[2][7], s:colArray[2][5], l:1}
var col_three= {f:colArray[1][6], s:colArray[1][8], l:1}
var col_four= {s:colArray[0][0], l:1}


var step = 25;
var start_x = 0;
var start_y = 50;
var num = 20
for(var i=0; i<num; i++){
    drawRect(start_x+i*step, start_y, 20, 20, true, true, col_one);
}
start_x = 600;
start_y = 0;
for(var i=0; i<num; i++){
    drawRect(start_x, start_y+i*step, 20, 20, true, true, col_one);
}
num =5
start_y = 200;
start_x = 100;
for(var i=0; i<num; i++){

    for(var j=0; j<num; j++){
        drawRect(start_x+j*step, start_y+i*step, 10, 10, true, true, col_one);
    }

}
start_y = 100;
start_x = 400;
var x_width = 100;
var y_height = 200;
//drawCircle(300,300,20,true, true, col_two)
num = 8;
for(var i=0; i<num; i++){

    for(var j=0; j<num; j++){
        var x = start_x + x_width*Math.random()
        var y= start_y + y_height*Math.random();
        var r = 5+25*Math.random();
        drawCircle(x,y,r,true, false, col_two)
        
    }

}
var R = 100;
start_x = 750;
start_y =300;
num = 15;
var points_array=[];
drawCircle(start_x,start_y,R,true, false, {f:"rgba(255,255,255,0.5)"})
for(var i =0 ; i<num ; i++){
    var x = start_x + R*Math.cos(i*2*Math.PI/num);
    var y = start_y + R*Math.sin(i*2*Math.PI/num);
    points_array.push({x:x , y:y});
    drawCircle(x,y,20,true, true, col_three)


}
console.log(points_array)
updateContext(col_four);
for(var i=0 ; i<points_array.length; i++){

    for(j=i+1; j<points_array.length; j++){
        var x_1 = points_array[i].x
        var y_1 = points_array[i].y
        var x_2 = points_array[j].x
        var y_2 = points_array[j].y
        draw_line(x_1,y_1, x_2,y_2);

    }


}


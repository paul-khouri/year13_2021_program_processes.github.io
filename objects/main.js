console.log("main js called")


var B = new Ball(200, 200, 50, colArray[0][8]);
B.area();
B.update();



var ball_set = [];
for(var i = 0; i<10; i++){
    var c = i%colArray[0].length
    var temp = new Ball(200+i*60, 400, 25, colArray[0][c])
    ball_set.push(temp);
}

for( var j=0 ; j<ball_set.length; j++){
    //ball_set[j].update();
}


var ball_set = []
for(var i = 0 ; i<colArray.length; i++){
 for(var j = 0 ; j< colArray[i].length; j++){
     var temp = new Ball(200 + 60*j, 300 + 60*i, 25, colArray[i][j])
     ball_set.push(temp);
 }
}
for(var i = 0; i<ball_set.length; i++){
    ball_set[i].update();
}

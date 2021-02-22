console.log("main js called")
var shift = 300;
var x_start = 200
var object_set = []


for(var i =0; i <30 ; i++){
var temp = new Ball(x_start,50,1+2*i, colArray[1][i%colArray[0].length], "q", 800+5*i, 500);
object_set.push(temp);
temp = new Ball(x_start+shift,50,1+2*i, colArray[1][i%colArray[0].length], "l", 1600+10*i, 500);
object_set.push(temp);
temp = new Ball(x_start+2*shift,50,1+2*i, colArray[1][i%colArray[0].length], "t", 800+10*i, 500);
object_set.push(temp);
}

object_set.push( new Rectangle(x_start-50,50, 100, 500, colArray[0][0]) );
object_set.push( new Rectangle(x_start-50+shift,50, 100, 500, colArray[0][0]) );
object_set.push( new Rectangle(x_start-50+2*shift,50, 100, 500, colArray[0][0]) );


function animate(){
    ctx.clearRect(0, 0, width, height);
  
    for(var i=object_set.length-1 ; i>=0; i--){
        object_set[i].update();
    }
   

    window.requestAnimationFrame(animate);
}

animate();

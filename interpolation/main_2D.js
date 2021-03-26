console.log("main js called")
var shift = 300;
var x_start = 200;
var y_start = 200;
var RWidth = 300;
var RHeight = 300;
var rad = 10
var object_set = []
var c_set=[]
for(var i=0; i< colArray.length; i++){
 
  c_set=c_set.concat(colArray[i])

}



var bg = new Rectangle(x_start, y_start, RWidth, RHeight, colArray[0][7] )
for(var i=0; i<20; i++){
// constructor(x,y,r,col, f, T_x, T_y, W,H)
var min = 200;
var max = 800
var T_x = min+Math.round((max-min)*Math.random())
var T_y = min+Math.round((max-min)*Math.random())
rad = 20*Math.random();
var temp = new Ball(x_start,y_start,rad, colArray[0][0], "t", T_x, T_y , RWidth, RHeight,c_set);
temp.count = Math.round(1000*Math.random());
object_set.push(temp);
}


var D = new DateModule();





function animate(){
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  bg.update()
  ctx.clip()
 for(var i=0; i<object_set.length; i++){
   object_set[i].update();
 }
 ctx.restore();
 D.update();
   

    window.requestAnimationFrame(animate);
}

animate();

var P = new DragPoint(200,200,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var Q = new DragPoint(200,250,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var R = new DragPoint(200,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var groupMembers = [P,Q,R]
P.setGroup(groupMembers)
Q.setGroup(groupMembers)
R.setGroup(groupMembers)

var C = new CircleWithPoints(400,300,200,[0,90, 180,270])
var D = new CircularDragPoint(100,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]},{f:colArray[0][7], l:3, s:colArray[0][4]}, 200,90)
var E = new CircularDragPoint(400,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]},{f:colArray[0][7], l:3, s:colArray[0][4]}, 200,180)
function animate(){
    ctx.clearRect(0, 0, width, height);
  //P.update();
  //Q.update();
  //R.update();
  C.update();
  //D.update();
  //E.update();
 //grid(300,300,100,200,2,2)
 //draw_grid(0,0,100,300,10)
// _line(0,0,100,100,{ l:0.5, s:"rgba(255,255,255,1)"})
  
   window.requestAnimationFrame(animate);
}
animate();
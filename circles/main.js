var P = new DragPoint(200,200,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var Q = new DragPoint(200,250,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var R = new DragPoint(200,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]}, {f:colArray[0][6], l:4, s:colArray[0][5]})
var groupMembers = [P,Q,R]
P.setGroup(groupMembers)
Q.setGroup(groupMembers)
R.setGroup(groupMembers)

var C = new CircleWithPoints(400,300,200,[45,60, 75,90])
var D = new CircularDragPoint(100,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]},{f:colArray[0][7], l:3, s:colArray[0][4]}, 200,90)
var E = new CircularDragPoint(400,300,10,{f:colArray[0][2], l:3, s:colArray[0][6]},{f:colArray[0][7], l:3, s:colArray[0][4]}, 200,180)
function animate(){
    ctx.clearRect(0, 0, width, height);
  //P.update();
  //Q.update();
  //R.update();
  C.update();
  D.update();
  //E.update();
  
   window.requestAnimationFrame(animate);
}
animate();
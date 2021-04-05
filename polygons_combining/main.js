console.log("main called")

//var P = new Polygon()
//P.update()
var x= 500
var y =200
var r= 200
var w= r/2
var h = w
var S = new Slider(x-w/2 -w,y+r+h,3*w,h,colArray[0][4], colArray[0][6],colArray[0][8],50)
var P = new Polygon(x,y,r, colArray[0][8], colArray[0][7], 1, 5, S)
var R = new Button(x-w/2 -w,y+r,w,h,"R", colArray[0][0], colArray[0][3],colArray[1][3], P)
var G = new Button(x-w/2,y+r,w,h,"G", colArray[0][0], colArray[0][9],colArray[1][9], P)
var B = new Button(x- w/2+w,y+r,w,h,"B", colArray[0][0], colArray[0][5],colArray[1][5], P)



function animate(){
    ctx.clearRect(0, 0, width, height);
  
P.update()
R.update()
G.update()
B.update()
S.update()

    window.requestAnimationFrame(animate);
}
animate();
console.log("main called")

//var P = new Polygon()
//P.update()

var P = new Polygon(500,300, 100, colArray[0][8], colArray[0][7], 5, 5)
var R= new Button(200,300,50,50,"R", colArray[0][0], colArray[0][3],colArray[1][3], P)
var G= new Button(250,300,50,50,"G", colArray[0][0], colArray[0][9],colArray[1][9], P)
var B= new Button(300,300,50,50,"B", colArray[0][0], colArray[0][5],colArray[1][5], P)


function animate(){
    ctx.clearRect(0, 0, width, height);
  
P.update()
R.update()
G.update()
B.update()

    window.requestAnimationFrame(animate);
}
animate();
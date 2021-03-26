console.log("main js called")
// class Point x,y,r, stroke, fill, over
var P= new Point(200,200,20, colArray[0][2], colArray[0][3],colArray[0][9])
var Q= new Point(200,300,20, colArray[0][2], colArray[0][3],colArray[0][9])
// class Slider x,y,w,h, stroke, fill, over, max_value 
var S= new Slider(100,400, 300, 50,20,colArray[0][1], colArray[0][3],colArray[0][9], 100)


var G = new Grid(width, height, 50,50);
var C = new showColours(colArray, 800,500,200);
function animate(){
    ctx.clearRect(0, 0, width, height);
    G.update();
    C.update();
    P.update();
    Q.update();
    S.update();
 
 

    window.requestAnimationFrame(animate);
}
animate();



//var S = new Slider(200, 400,300,60, 10, colArray[0][3], colArray[0][4],colArray[0][8], 100)
  // S.update();
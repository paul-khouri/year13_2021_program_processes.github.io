console.log("drag js called")
ctx.lineWidth=10;
//class Circle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke
myCircle_A = new Circle("A", 100,100, 10, true, true, colArray[0][6], colArray[1][7]);
myCircle_B = new Circle("B", 200,200, 10, true, true, colArray[0][6], colArray[1][7]);
myCircle_C = new Circle("C", 300,300, 10, true, true, colArray[0][6], colArray[1][7]);

console.log(distanceCheck(0,0, 3,4));


function animate(){
ctx.clearRect(0, 0, width, height);



myCircle_A.update();
myCircle_B.update();
myCircle_C.update();
    window.requestAnimationFrame(animate);

}
animate();
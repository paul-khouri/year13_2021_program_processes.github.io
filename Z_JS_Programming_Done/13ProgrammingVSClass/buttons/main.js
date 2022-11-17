console.log("main js called");

// class Button x,y,w,h,text, c_1(outline and text), c_2(fill), c_3(over and selected), canvas
var BOne = new Button(200,50,200,75, "Red", colArray[0][0], "rgb(150, 0, 0)", "rgb(255, 0, 0)" , canvas)
var BTwo = new Button(200,125,200,75, "Green", colArray[0][0], "rgb(0, 150, 0)", "rgb(0, 255, 0)" , canvas)
var BThree = new Button(200,200,200,75, "Blue", colArray[0][0], "rgb(0, 0, 150)", "rgb(0, 0, 255)" , canvas)
var letters =["A", "B", "C"];

objectSet = [];






// this is the base code for the animation loop
// it is running but at present is not having any impact
// the listeners in the object are independent of the animation loop.

function animate(){
    ctx.clearRect(0, 0, width, height);
    BOne.update();
    BTwo.update();
    BThree.update();
    window.requestAnimationFrame(animate);
}

animate();
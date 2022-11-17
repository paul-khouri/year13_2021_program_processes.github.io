console.log("main js called");
// class RadioButton x,y,w,h,text, c_1, c_2, c_3, canvas
var rBDummy = new RadioButton(10,10, 300, 50, "Waiting", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var rBOne = new RadioButton(10,10, 300, 50, "Harry", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var rBTwo = new RadioButton(10,60, 300, 50, "Kate", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var rBThree = new RadioButton(10,110, 300, 50, "William", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var rBFour = new RadioButton(10,160, 300, 50, "Megan", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
RadioButton.clicked = rBDummy
var selected = ""
function animate(){
    ctx.clearRect(0, 0, width, height);
    rBOne.update();
    rBTwo.update();
    rBThree.update();
    rBFour.update();
    selected=RadioButton.getClicked();
    console.log(selected);
    window.requestAnimationFrame(animate);

}
animate();
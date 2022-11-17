console.log("main js called");
// class RadioButton x,y,w,h,text, c_1, c_2, c_3, canvas
let gA = RadioButton;
var gADummy = new gA(10,10, 300, 50, "Waiting gA", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAOne = new gA(10,10, 300, 50, "Harry", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gATwo = new gA(10,60, 300, 50, "Kate", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAThree = new gA(10,110, 300, 50, "William", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAFour = new gA(10,160, 300, 50, "Megan", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
gA.clicked = gADummy;
var gAselected = "";

let gB = RadioButton;
var gBDummy = new gB(200,10, 300, 50, "Waiting gB", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gBOne = new gB(200,10, 300, 50, "Katie", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gBTwo = new gB(200,60, 300, 50, "Britney", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gBThree = new gB(200,110, 300, 50, "Beyonce", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gBFour = new gB(200,160, 300, 50, "Rhianna", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
gB.clicked = gBDummy
var gBselected = ""

function animate(){
    ctx.clearRect(0, 0, width, height);
    gAOne.update();
    gATwo.update();
    gAThree.update();
    gAFour.update();
    gAselected=gA.getClicked();
    console.log(gAselected);
    window.requestAnimationFrame(animate);

}
animate();
console.log(" main group js called");
let gA = RadioButton;
var gADummy = new gA(10,10, 300, 50, "Waiting gA", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAOne = new gA(10,10, 300, 50, "Harry", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gATwo = new gA(10,60, 300, 50, "Kate", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAThree = new gA(10,110, 300, 50, "William", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAFour = new gA(10,160, 300, 50, "Megan", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var groupOne = new RadioGroup(gAOne, gATwo, gAThree, gAFour);
gAOne.setGroup(groupOne);
gATwo.setGroup(groupOne);
gAThree.setGroup(groupOne);
gAFour.setGroup(groupOne);
var gAFive = new gA(400,10, 300, 50, "Katie", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gASix = new gA(400,60, 300, 50, "Britney", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gASeven = new gA(400,110, 300, 50, "Beyonce", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var gAEight = new gA(400,160, 300, 50, "Rhianna", colArray[0][0], colArray[0][4], colArray[0][5], canvas);
var groupTwo = new RadioGroup(gAFive, gASix, gASeven, gAEight);
gAFive.setGroup(groupTwo);
gASix.setGroup(groupTwo);
gASeven.setGroup(groupTwo);
gAEight.setGroup(groupTwo);

function animate(){
    ctx.clearRect(0, 0, width, height);
    groupOne.update();
    groupTwo.update();
    //console.log(groupOne.getSelected());
    window.requestAnimationFrame(animate);

}
animate();
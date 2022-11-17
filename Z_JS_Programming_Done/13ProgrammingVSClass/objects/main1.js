console.log("main js called");

var objectSet = []

var FDOne = new FiveDot(400, 100, 60, colArray[1][8], colArray[1][0], colArray[0][6]);
var FDTwo = new FiveDot(200, 300, 100, colArray[1][3], colArray[1][6], colArray[1][3]);
var FDThree = new FiveDot(600, 300, 120, colArray[1][5], colArray[1][8], colArray[1][3]);
var FDFour = new FiveDot(400, 400, 80, colArray[1][8], colArray[1][6], colArray[1][4]);
objectSet.push( FDOne, FDTwo, FDThree, FDFour );
objectSet.push(new FiveDotRotate(150,100, 80, colArray[0][3], colArray[0][4], colArray[0][5], 60 ) )

for( var i = 0 ; i< objectSet.length ; i++ ){
objectSet[i].update();
}



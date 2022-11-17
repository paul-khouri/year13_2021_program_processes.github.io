console.log("main js called");

var objectSet = []

var FDOne = new Rectangle(400, 100, 150, 100,colArray[1][8]);
var FDTwo = new Rectangle(200, 300, 100, 300, colArray[1][3]);
var FDThree = new Rectangle(600, 300, 120, 400, colArray[1][5]);
var FDFour = new Rectangle(400, 400, 80, 200,colArray[1][8]);
objectSet.push( FDOne, FDTwo, FDThree, FDFour );
objectSet.push( new Rectangle(150,100, 80, 150, colArray[0][3]) )

for( var i = 0 ; i< objectSet.length ; i++ ){
objectSet[i].update();
}



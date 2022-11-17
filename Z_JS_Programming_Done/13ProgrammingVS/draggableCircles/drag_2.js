console.log("drag js called")
var objectSet = [];


//class Circle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke




for(var k=0; k<10; k++){
    for(var j=0; j<2; j++){
        var myName = "Circle"+k+","+j;
        objectSet.push( new Circle(myName, 60*k+100,60*j+100, 20, true, true, colArray[0][3], colArray[1][7], 10));
    }
}
//console.log(objectSet);
console.log(distanceCheck(0,0, 3,4));


function animate(){
ctx.clearRect(0, 0, width, height);
if(myMouseDown){
    console.log("Mouse is down");
    objectSet.push( new Circle(myName, xMouse,yMouse, 20, true, true, colArray[0][3], colArray[1][7], 10));
    myMouseDown=false;
}

for(var i =0 ; i<objectSet.length; i++){
    objectSet[i].update();
}
    window.requestAnimationFrame(animate);

}
animate();
console.log("drag js called")
var objectSet = [];


//class Circle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke

//MoveLine takes two draggable circles
var myMoveLine= new MoveLine(new Circle(myName, 500, 300, 5, true, true, colArray[0][0], colArray[1][6], 10),
new Circle(myName, 600,400, 5, true, true, colArray[0][0], colArray[1][6], 10));
objectSet.push(myMoveLine);


for(var k=0; k<2; k++){
    for(var j=0; j<2; j++){
        var myName = "Circle"+k+","+j;
        objectSet.push( new Circle(myName, 60*k+100,60*j+100, 20, true, true, colArray[0][3], colArray[1][7], 10));
    }
}
//console.log(objectSet);
console.log(distanceCheck(0,0, 3,4));


function animate(){
ctx.clearRect(0, 0, width, height);
//drawRectangle x, y, width, height fill(boolean), stroke(boolean)
if(myMouseDown){
    ctx.strokeStyle=colArray[0][1];
    ctx.lineWidth=1;
    drawRectangle(xMouseStart, yMouseStart, xMouse - xMouseStart , yMouse - yMouseStart , false, true )
}

for(var i =0 ; i<objectSet.length; i++){
    objectSet[i].update();
}
    window.requestAnimationFrame(animate);

}
animate();
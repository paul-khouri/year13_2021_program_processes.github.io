console.log("animation js called")
//class AnimateCircle string x, y, r, boolean for fill, boolean for stroke, rgba string for fill , rgba string for stroke, strokewidth
var myAC = new AnimateCircle("myAC", 100,100, 80, true, true, colArray[1][0], colArray[1][4], 5); 
var myRC = new RotatingCircle("myRC", 200,400, 60, true, true, colArray[1][0], colArray[1][4], 5);
var myMC = new MoveCircle("myMC",400,120+20, 30, colArray[1][4], 1,0.5, 240, 240); 
var myMC_A = new MoveCircle("myMC_A",400,120+20, 30, colArray[1][5], -1,0.5, 240, 240); 
var myMC_B = new MoveCircle("myMC_B",400,120+20, 30, colArray[1][6], 1,-2, 240, 240); 
var block=[];
for(var i=0; i<100; i++){
    block.push(new MoveCircle("myMC_B",700,120+20, 5, colArray[1][Math.round(9*Math.random())], 
    2*Math.random()-1,2*Math.random()-1, 240, 240));

}
var myMC_C = new MoveCircle("myMC_B",400,120+20+260, 30, colArray[1][6], 1,-2, 240, 240); 
function animate(){
    ctx.clearRect(0, 0, width, height);
    myAC.update();
    myRC.update();
    myMC.update();
    myMC_A.update();
    myMC_B.update();
    myMC_C.update();
    for(var i=0; i<block.length; i++){
        block[i].update();


    }


    window.requestAnimationFrame(animate);
    }
    animate();
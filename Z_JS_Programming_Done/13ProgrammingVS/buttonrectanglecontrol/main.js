console.log(' main js has been called')

var h=54;
var x = 350;

var objectArray = [];
var rLeft = new Rectangle(50,100, 250, 6*h);
var rRight = new Rectangle(600,100, 250, 6*h);
objectArray.push(rLeft, rRight);


var Red = new Button("Red", x, 100, 200,50, "rgb(255,0,0,1)", 
"rgb(255,255,255,0.75)", "rgba(255,0,0, 0.5)", rLeft, canvas );
var Green = new Button("Green", x, 100+h, 200,50, "rgb(0,255,0,1)", 
"rgb(255,255,255,0.75)", "rgba(0,255,0, 0.5)", rLeft, canvas );
var Blue = new Button("Blue", x, 100+2*h, 200,50, "rgb(0,0,255,1)", 
"rgb(255,255,255,0.75)", "rgba(0,0,255, 0.5)", rLeft, canvas );
objectArray.push(Red,Green, Blue);
var Pink = new Button("Pink", x, 100+3*h, 200,50, "rgba(255,128,128, 1)", 
"rgb(255,255,255,0.75)", "rgba(255,128,128, 0.5)", rRight, canvas );
var Yellow = new Button("Yellow", x, 100+4*h, 200,50, "rgb(255,255,0,1)", 
"rgb(255,255,255,0.75)", "rgb(255,255,0,0.5)", rRight, canvas );
var Orange = new Button("Orange", x, 100+5*h, 200,50, "rgb(255,128,0,1)", 
"rgb(255,255,255,0.75)", "rgb(255,128,0,0.5)", rRight, canvas );
objectArray.push(Pink,Yellow, Orange);

function animate(){
    ctx.clearRect(0, 0, width, height);
    for(var i = 0 ; i<objectArray.length ; i++){
        objectArray[i].update();
    }

    window.requestAnimationFrame(animate);
}
animate();
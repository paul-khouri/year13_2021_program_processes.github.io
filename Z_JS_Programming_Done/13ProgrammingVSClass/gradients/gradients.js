console.log("gradient js file has been called");

var colArray=[
[
"rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
"rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
"rgba(0,153,204,1)","rgba(255,255,153,1)","rgba(255,255,102,1)"
],
[
    "rgba(255,255,255,0.5)", "rgba(153,153,153,0.5)", "rgba(0,0,0,0.5)", 
    "rgba(204,0,0,0.5)","rgba(255,204,51,0.5)","rgba(51,51,255,0.5)",
    "rgba(0,153,204,0.5)","rgba(255,255,153,0.5)","rgba(255,255,102,0.5)"
    ],
[
    "rgba(255,255,255,0)", "rgba(153,153,153,0)", "rgba(0,0,0,0)", 
    "rgba(204,0,0,0)","rgba(255,204,51,0)","rgba(51,51,255,0)",
    "rgba(0,153,204,0)","rgba(255,255,153,0)","rgba(255,255,102,0)"
    ]
]

// x, y, radius, fill(boolean), stroke(boolean)
function drawCircle(x,y,r,f,s){
    ctx.beginPath()
    ctx.arc(x,y, r, 0, 2*Math.PI);
    if(f){
        ctx.fill();
    }
    if(s){
        ctx.stroke();
    }
    }

function drawRectangle(x,y, w,h,f,s){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(f){
        ctx.fill();
    }
    if(s){
        ctx.stroke();
    }
    }


function makeGradient(x_1,y_1, x_2,y_2, c_1,c_2){
    var myGradient = ctx.createLinearGradient(x_1,y_1,x_2,y_2);
    // Add three color stops
    myGradient.addColorStop(0, c_1);
    myGradient.addColorStop(.5, c_2);
    myGradient.addColorStop(1, c_1);
    ctx.fillStyle = myGradient;
    
}


//-------------------------Rotated rectangle (top left)
ctx.strokeStyle = colArray[0][3]
makeGradient(90,0,110,0, colArray[2][3], colArray[0][4])
ctx.save();
ctx.translate(100, 50);
var degree= 30;
ctx.rotate(Math.PI / 180 * degree);
// x, y, radius, fill(boolean), stroke(boolean)
drawRectangle(0,0,200,100,true, true);
ctx.fillStyle = colArray[0][3];
drawCircle(0,0,5,true, false);
ctx.restore();
//------------------------------------


//------------------- star like shape
ctx.save();
ctx.translate(175, 400);
ctx.fillStyle = colArray[1][6];
drawCircle(0,0,150,true, false);
ctx.fillStyle = colArray[0][4];
drawCircle(0,0,5,true, false);
makeGradient(-5,0,5,0, colArray[2][3], colArray[0][4])
for(var i=0; i<360 ; i+=15 ){
    var degree= 15;
    ctx.rotate(Math.PI / 180 * degree);
    drawRectangle(-100,50,200,100,true, false);
}
ctx.restore();
// 900 x 600
//----------- first radial  
// Create a radial gradient
// The inner circle is at x_1, y_1, with radius_1
// The outer circle is at x_2, y_2, with radius_2
var x_1 =450
var y_1 =150
var circGradient = ctx.createRadialGradient(x_1,y_1,30, x_1,y_1,70);
// Add three color stops
circGradient.addColorStop(0, colArray[0][6]);
circGradient.addColorStop(.5, colArray[0][7]);
circGradient.addColorStop(1, colArray[0][6]);
// Set the fill style and draw a circle
ctx.fillStyle = circGradient;
// x, y, radius, fill(boolean), stroke(boolean)
drawCircle(x_1,y_1,100,true, false);

//----------- second radial 
x_1 = 450
y_1 = 400
var circGradient = ctx.createRadialGradient(x_1+90,y_1,1, x_1,y_1,100);
// Add three color stops
circGradient.addColorStop(0, colArray[0][6]);
circGradient.addColorStop(.5, colArray[0][7]);
circGradient.addColorStop(1, colArray[2][3]);
// Set the fill style and draw a circle
ctx.fillStyle = circGradient;
// x, y, radius, fill(boolean), stroke(boolean)
drawCircle(x_1,y_1,100,true, false);
//---------------------- third radial
x_1 = 700
y_1 = 150
var circGradient = ctx.createRadialGradient(x_1+70,y_1,1, x_1,y_1,100);
// Add three color stops
circGradient.addColorStop(0, colArray[0][7]);
circGradient.addColorStop(1, colArray[2][3]);
// Set the fill style and draw a circle
ctx.fillStyle = circGradient;
// x, y, radius, fill(boolean), stroke(boolean)
drawCircle(x_1,y_1,100,true, false);

x_1 = 700
y_1 = 400
for(var i= -2 ; i<=2 ; i++){
var circGradient = ctx.createRadialGradient(x_1+35*i,y_1,1, x_1,y_1,100);
// Add three color stops
circGradient.addColorStop(0, colArray[1][7]);
circGradient.addColorStop(1, colArray[2][3]);
// Set the fill style and draw a circle
ctx.fillStyle = circGradient;
// x, y, radius, fill(boolean), stroke(boolean)
drawCircle(x_1,y_1,100,true, false);
}




// get the canvas element using the id name
canvas = document.querySelector('#myCanvas');
// define a 2d context and associate it with the variable ctx
// all canvas commands will require the ctx.
let ctx = canvas.getContext('2d');
// specify height and width of canvas (which should be identical to the CSS
let width = 800;
let height = 600;
canvas.width = width;
canvas.height = height;

// draw some things
// rectangle
// start the path then define as a rectangle with parameters
ctx.beginPath();
ctx.rect(10,10,100,100);
// set the context
ctx.fillStyle='rgb(0,153,204)';
ctx.strokeStyle='rgb(0,0,0)';
ctx.lineWidth=10;
// actually fill and stroke
ctx.stroke();
ctx.fill();
// the following follow exactly the same pattern
// circle
ctx.beginPath();
ctx.arc(200,60, 50, 0, 2*Math.PI);
ctx.fillStyle='rgb(255,204,51)';
ctx.strokeStyle='rgb(51,51,255)';
ctx.lineWidth=10;
ctx.stroke();
ctx.fill();
// line
ctx.beginPath();
// set start point of the line
ctx.moveTo(0, 200);
// set next point of the line
ctx.lineTo(750,200);
ctx.strokeStyle="rgb(255,0,0)";
ctx.lineWidth=1;
ctx.stroke();

// rectangle with a gradient fill

ctx.beginPath()
ctx.rect(10,350, 200,200);
let my_gradient=ctx.createLinearGradient(10,350,10,550);
my_gradient.addColorStop(0,"rgb(255,102,102)");
my_gradient.addColorStop(0.5,"rgb(255,255,153)");
my_gradient.addColorStop(1,"rgb(0,153,204)");
ctx.fillStyle=my_gradient;
ctx.fill();
// note that the stroke picks up the previous context
ctx.stroke();

// quadratic curves (bezier)
ctx.strokeStyle="rgb(255,0,0)";
ctx.beginPath();
ctx.moveTo(300,400);
ctx.lineWidth=10;
ctx.quadraticCurveTo(500, 550, 700, 400);
ctx.lineCap = "round";
ctx.stroke();


// add text, set the context then fill the text
ctx.fillStyle="rgb(0,0,255)";
// shorthand css to set basic options
let myFont= "bold 30px monospace";
ctx.font=myFont;
ctx.fillText("Hello World", 300,50);

// images can be placed on the canvas but we need to know if they have loaded
// there other ways of dealing with this
let img = new Image();
img.onload = function(e){
    let img_h = img.height;
    let img_w= img.width
    console.log(e);
    ctx.drawImage(img, 500,220, img_w/4, img_h/4);
}
img.src= "red_kangaroo.jpeg"
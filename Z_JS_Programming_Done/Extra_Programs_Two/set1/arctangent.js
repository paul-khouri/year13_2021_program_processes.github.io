window.onload = function(){
var canvas = document.getElementById("canvas"),
ctx=canvas.getContext("2d"),
width = canvas.width = 900,
height= canvas.height = 500;
document.getElementsByTagName("canvas")[0].style.width=width;
document.getElementsByTagName("canvas")[0].style.heigth=height;
var arrowX = width/2,
arrowY = height/2,
dx,dy,
angle=0;

var mouseX, mouseY

render();
var angCount = 0
var radius = 100;
function render(){
ctx.clearRect(0,0, width, height);
dx= mouseX - (arrowX + radius*Math.cos(angCount));
dy= mouseY - (arrowY + radius*Math.sin(angCount));
angle = Math.atan2(dy,dx);

ctx.save();

ctx.translate(arrowX+radius*Math.cos(angCount), arrowY+radius*Math.sin(angCount));
angCount += Math.PI/50
ctx.rotate(angle);
ctx.beginPath()
ctx.arc(0,0, radius, 0 , 2*Math.PI);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,0);
ctx.lineTo(-20,0);
ctx.moveTo(20,0);
ctx.lineTo(10,10)
ctx.moveTo(20,0);
ctx.lineTo(10,-10);
ctx.moveTo(0,0);
ctx.lineTo(Math.abs(Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))),0);
ctx.stroke();

ctx.restore();
requestAnimationFrame(render);


}

canvas.addEventListener("mousemove", function(e){
mouseX = e.offsetX
mouseY = e.offsetY



}


)



}
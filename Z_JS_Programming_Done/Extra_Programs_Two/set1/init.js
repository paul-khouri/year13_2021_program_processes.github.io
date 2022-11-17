
window.onload = function(){
    var canvas = document.getElementById("canvas"),
    ctx=canvas.getContext("2d"),
    width = canvas.width = 900,
    height= canvas.height = 500;
    document.getElementsByTagName("canvas")[0].style.width=width;
    document.getElementsByTagName("canvas")[0].style.heigth=height;
    particles = [],
    num_particles = 30;
    for(var i = 0; i<num_particles; i++ ){
        particles.push(particle.create(width/2,height/2, 20*Math.random(), Math.random()*2*Math.PI));
    }
  


update();

function update(){
    ctx.clearRect(0,0, width, height);
    for( var i =0 ; i<num_particles; i++){
        var p = particles[i];
        p.update();
        ctx.beginPath();
        ctx.arc(p.position.getX(), p.position.getY(), 5, 0, 2*Math.PI);
        ctx.fillStyle = "rgba(200,100,20,0.25)";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.position.getX(), p.position.getY());
        ctx.lineTo(p.position.getX()+10*p.velocity.getX(),p.position.getY()+10*p.velocity.getY());
        ctx.strokeStyle = "rgba(0,0,200,0.25)";
        ctx.stroke();
    }
    

 




    requestAnimationFrame(update);

}

}

/*
var v1 = vector.create(3,4);

console.log(v1.getX());
console.log(v1.getY());
console.log(v1.getLength());
console.log(v1.getAngle());
v1.setAngle(Math.PI/6);
v1.setLength(100);
console.log(v1.getX());
console.log(v1.getY());
console.log(v1.getLength());
console.log(v1.getAngle());


var v2 = vector.create(5,6);
v3= v1.add(v2);
console.log(v3.getX());
console.log(v3.getY());
*/

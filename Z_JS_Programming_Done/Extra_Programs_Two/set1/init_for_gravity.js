
window.onload = function(){
    var canvas = document.getElementById("canvas"),
    ctx=canvas.getContext("2d"),
    width = canvas.width = 900,
    height= canvas.height = 500;
    document.getElementsByTagName("canvas")[0].style.width=width;
    document.getElementsByTagName("canvas")[0].style.heigth=height;
    particles = [],
    num_particles = 100;
    //gravity = vector.create(0, 0.05)
    for(var i = 0; i<num_particles; i++ ){
        var p=particle.create(width/2,height/4, 4*Math.random(), -Math.random()*Math.PI, 0.075);
        particles.push(p);
        p.setContext(ctx);
    }
  


update();

function update(){
    ctx.clearRect(0,0, width, height);
    for( var i =0 ; i<num_particles; i++){
        var p = particles[i];
        //p.accelerate(gravity);
        p.update();
        p.draw();
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

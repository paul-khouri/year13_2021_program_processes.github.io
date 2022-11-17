
window.onload = function(){
    var canvas = document.getElementById("canvas"),
    ctx=canvas.getContext("2d"),
    width = canvas.width = 900,
    height= canvas.height = 500;
    document.getElementsByTagName("canvas")[0].style.width=width;
    document.getElementsByTagName("canvas")[0].style.heigth=height;
    p = particle.create(100, height, 10, -this.Math.PI/2);
    accel = vector.create(0.15,0.2)
    positions = [];
  

    var count = 0;
update();

function update(){
    ctx.clearRect(0,0, width, height);
    positions[count]= [p.position.getX(), p.position.getY()];

    //p.velocity.addTo(accel);
    p.accelerate(accel);

    p.update();

    if(count == 10){
        console.log(positions);
    }
        
        ctx.beginPath();

        ctx.arc(p.position.getX(), p.position.getY(), 15, 0, 2*Math.PI);
        ctx.fillStyle = "rgba(200,200,20,1)";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(p.position.getX(), p.position.getY());
        ctx.lineTo(p.position.getX()+10*p.velocity.getX(),p.position.getY()+10*p.velocity.getY());
        ctx.strokeStyle = "rgba(0,0,200,0.25)";
        ctx.stroke();

        ctx.beginPath();
        for(var i = 0; i < count; i++){
            ctx.moveTo(positions[i][0], positions[i][1])
            ctx.lineTo(positions[i+1][0], positions[i+1][1]);
            ctx.stroke();

        }
        count += 1;
    
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

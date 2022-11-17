
window.onload = function(){
    var canvas = document.getElementById("canvas"),
    ctx=canvas.getContext("2d"),
    width = canvas.width = 900,
    height= canvas.height = 500;
    document.getElementsByTagName("canvas")[0].style.width=width;
    document.getElementsByTagName("canvas")[0].style.heigth=height;

    var myImg = new Image();
    myImg.onload = function() {
   //context.drawImage(myImg, 0, 0);
   console.log("image loaded");
   console.log(myImg.height);
    };
    myImg.src="rocket.png";





    ship = particle.create(width/2, height/2, 0,0);
    ship.setContext(ctx);
    thrust = vector.create(0,0);
  
  


update();

this.document.body.addEventListener("keydown", function(e){
//console.log("key is down")


switch(e.keyCode){
    case 38: //up
        thrust.setY(-0.05);
        break;
    case 40: //down
        thrust.setY(0.05);
        break;
    case 37: //left
        thrust.setX(-0.05);
        break;
    case 39: //right
        thrust.setX(0.05);
        break;
}
ship.accelerate(thrust);
//console.log(ship.getVelocity());

});


this.document.body.addEventListener("keyup", function(e){

    //console.log(e.keyCode);
    switch(e.keyCode){
        case 38: //up
            thrust.setY(0);
            break;
        case 40: //down
            thrust.setY(0);
            break;
        case 37: //left
            thrust.setX(0);
            break;
        case 39: //right
            thrust.setX(0);
            break;
    
    
    
    }
    
});

function update(){
    ctx.clearRect(0,0, width, height);
    
    ship.update()
    ship.drawImage(myImg);
/*
    ctx.beginPath();
    ctx.arc(ship.position.getX(), ship.position.getY(), 30, 0, 2*Math.PI);
    ctx.fill();
    */

    ctx.save()
    ctx.translate(width/2, height/2);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(10*ship.getVelocity()[0], 10*ship.getVelocity()[1]);
    ctx.stroke();
    ctx.restore();


    
    requestAnimationFrame(update);

}

}
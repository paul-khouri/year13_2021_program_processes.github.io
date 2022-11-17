window.onload = function(){
    var canvas = document.getElementById("canvas"),
    ctx=canvas.getContext("2d"),
    width = canvas.width = 900,
    height= canvas.height = 500;
    document.getElementsByTagName("canvas")[0].style.width=width;
    document.getElementsByTagName("canvas")[0].style.heigth=height;
    sun = particle.create(width/2, height/2, 0, 0, 20, "rgb(255,255,0)");
    earth = particle.create(width/2 + 200, height/2 , 3, -this.Math.PI/2, 5, "rgb(0,255,255)");
    mars = particle.create(width/2 + 300, height/2 , 2, -this.Math.PI/2, 3, "rgb(255,0,255)");
    particleSet=[];
/*     for(var i = 0; i<5 ;i++){
        var dist = 300+
        var temp = particle.create(width/2 + 300, height/2 , 2, -this.Math.PI/2, 3, "rgb(255,0,255)");


    } */

    sun.mass = 2000;

    earth.setContext(ctx);
    mars.setContext(ctx);
    sun.setContext(ctx);

    update();

    function update(){
        ctx.clearRect(0,0, width, height);
        earth.gravitateTo(sun);
        mars.gravitateTo(sun);
        earth.update();
        mars.update();
        earth.draw();
        mars.draw();
        sun.draw();
    

        requestAnimationFrame(update);
    }
}
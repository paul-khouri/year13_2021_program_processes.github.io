console.log("main js called")
var t = 50;
var l = 50;
var r = 600;
var b = 500;
Missile.t = t;
Alien.l = l;
Alien.r = r;
var shipA = [];
var myShip = new Ship((l+r)/2,b,Missile, l, r);
shipA.push(myShip);

var alienA = [];

var myControl = new Control(shipA, l, t , r - l , b - t);
myShip.setControl(myControl);
for(var x = 0 ; x< r-60 ; x += 20){
    for(var y = 0 ; y< 200; y+=40){

myControl.addAlien(l+x, t+y);
    }
}
 

function animate(){
    ctx.clearRect(0, 0, width, height);
    myControl.update();

    window.requestAnimationFrame(animate);
}
animate();
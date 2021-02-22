console.log("main1__testing js file has been called for pages");

// object Set
var objectSet = [];
var D =new DateModule(canvas);
var f = ctx.fillStyle;

// key f fillstyle, s strokeStyle l linewidth
var ob ={f:"rgb(99,33,45)",s:"rgb(255,33,105)"};
updateContext(ob);
var f = ctx.fillStyle;


var G = new Grid(50);
var P = new Point(200,300,30,"rgb(200,200,200)", "rgb(100,0,0)", "rgb(200,0,0)", canvas)
var PS = new PointSet()



function animate(){
    ctx.clearRect(0, 0, width, height);
    G.update();
 
    D.update();
    P.update();
    PS.update();


    window.requestAnimationFrame(animate);
}
animate();
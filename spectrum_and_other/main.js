console.log("main1__testing js file has been called for pages");

// object Set
var objectSet = [];
var D =new DateModule(canvas);
var f = ctx.fillStyle;
console.log(f);
// key f fillstyle, s strokeStyle l linewidth
var ob ={f:"rgb(99,33,45)",s:"rgb(255,33,105)"};
updateContext(ob);
var f = ctx.fillStyle;
  console.log(f);


function animate(){
    ctx.clearRect(0, 0, width, height);
 
    D.update();
  


    window.requestAnimationFrame(animate);
}
animate();
console.log("main js called")
var G = new Grid(width, height, 50,50);
var C = new showColours(colArray, 800,500,200);

var name_list = ["Press Me", "Over Here", "What about me?" ]
var button_list = []
var x = 400;
var y = 100;
var w = 200;
var h = 50;
for( var i = 0 ; i<name_list.length ; i++){
    button_list.push(new Button(x,y+i*h,w,h, name_list[i], colArray[0][7],colArray[0][5],colArray[0][9]))
}






function animate(){
    ctx.clearRect(0, 0, width, height);
    G.update();
    C.update();
    for(var i = 0; i<button_list.length ; i++){
        button_list[i].update();
    }


    window.requestAnimationFrame(animate);
}
animate();







/*



*/

    /*

    */

/*


    B.update();
*/


/*
var name_list = ["Press Me", "Over Here", "What about me?" ]
var button_list = []
var x = 400;
var y = 100;
var w = 200;
var h = 50;
for( var i =0 ; i<name_list.length ; i++){
    button_list.push(new Button(x,y+i*h,w,h, name_list[i], colArray[0][7],colArray[0][5],colArray[0][9]))
}
*/
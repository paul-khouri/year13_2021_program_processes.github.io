let G = new Grid(width, height, 50, col[0][2], 0.3)
let T = new TextBox(800,550,200, col[0][4], col[0][2])
let I = new InteractiveObject();

let IB = new InteractiveBall(100,100,20, col[0][7], col[0][5], 5)

let IBA = new InteractiveBall(400,100,20, col[0][7], col[0][5], 5)

let IBB_A = new InteractiveBallBetter(600,300,10, col[0][6], col[0][7], 5)

let IBB_B = new InteractiveBallBetter(700,300,10, col[0][6], col[0][7], 5)
let IBB_C = new InteractiveBallBetter(800,300,10, col[0][6], col[0][7], 5)




// create an animation function
function animate(t){
    ctx.clearRect(0,0, width, height);
    G.update();
    let timer = Math.round(t)
    T.update(timer);

    IB.update()
    IBA.update()
    IBB_A.update()
    IBB_B.update()
    IBB_C.update()

    // the call below is a request to the browser
    // the function is called again (about 50 times a second)
    window.requestAnimationFrame(animate)
}
// start off call to get it going
animate()
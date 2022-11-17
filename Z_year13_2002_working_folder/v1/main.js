console.log('main js is called')
let G = new Grid(width, height, 25, col[0][2], 0.3)

OptionNames = ["Rectangle", "Ellipse", "Circle","Star", "Polygon", "Brush1", "Brush2", "Brush3" ]
OptionSet =[]
let x= 25;
let y= 25;
let w = 130;
let h = 25;
let step = h+5;
let text = ""

for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    temp = new OptionsButton(25,25 + i*step, w,h, col[0][3], col[0][7], col[0][6], col[0][8], text, col[0][0])
    OptionSet.push(temp)
}
OptionsButton.selected = OptionSet[0];
let M = new Centre()


function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    M.update();
    for(let i =0; i<OptionSet.length; i++){
        OptionSet[i].update()
    }

    window.requestAnimationFrame(animate)
}

animate()
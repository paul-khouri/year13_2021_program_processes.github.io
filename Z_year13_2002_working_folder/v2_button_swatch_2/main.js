console.log('main js is called')
let Gd = new Grid(width, height, 25, col[0][2], 0.3)
//------------ options button set up
//"Polygon", "Brush1", "Brush2", "Brush3"
OptionNames = ["Rectangle", "Ellipse", "Circle","Star" ]
OptionSet =[]
let x= 0;
let y= 0;
let w = 200;
let h = 25;
let step = h;
let text = ""
let s= 2

for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    let temp = new OptionsButton(x+2,y+2 + i*step,w-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2],  text, col[0][9])
    OptionSet.push(temp)
}
OptionsButton.selected = OptionSet[0];
//
for(let i=0; i<8; i++){
    let temp = new StarPolygonSides(x+2+i*h,y+2 + (4)*step,h-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2], i+3, col[0][9])
    OptionSet.push(temp)
    StarPolygonSides.selected=temp
}
for(let i=0; i<8; i++){
    let temp = new StarRatio(x+2+i*h,y+2 + (5)*step,h-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2], (i+2)/10, col[0][9])
    OptionSet.push(temp)
    StarRatio.selected = temp
}

OptionNames = ["Polygon", "Brush1", "Brush2", "Brush3"]
for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    let temp = new OptionsButton(x+2,y+2 + (i+6)*step,w-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2],  text, col[0][9])
    OptionSet.push(temp)
}
y= 500;
OptionNames = ["Undo", "Clear"]
for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    let temp = new OptionsButton(x+2,y+2 + (i)*step,w-2*s,h-2*s,col[0][0], col[0][3], col[0][6], col[0][2],  text, col[0][9])
    OptionSet.push(temp)
}

//-----------------
y=300
w=w/2
h=25
let P = new Panel(x,y,w,h, "Fill")
let Q = new Panel(x+w,y,w,h, "Stroke")
let M = new Centre(200,25,750,500)
//let B = new BlurryCircle()



function animate(){
    ctx.clearRect(0,0,width,height);
    Gd.update();
    M.update();
    P.update()
    Q.update()
    //B.update()



    for(let i =0; i<OptionSet.length; i++){
        OptionSet[i].update()
    }


    window.requestAnimationFrame(animate)
}

animate()
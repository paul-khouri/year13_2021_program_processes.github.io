// noinspection DuplicatedCode

console.log('main js is called')
let G = new Grid(width, height, 25, col[0][2], 0.3)
//------------ options button set up

OptionNames = ["Rectangle", "Ellipse", "Circle","Star", "Polygon", "Brush1", "Brush2", "Brush3" ]
OptionSet =[]
let x= 25;
let y= 25;
let w = 130;
let h = 25;
let step = h+5;
let text = ""
let i_final = 0

for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    let temp = new OptionsButton(x,y + i*step,col[0][3], col[0][7], col[0][6], col[0][8], w,h, text, col[0][8])
    OptionSet.push(temp)
    i_final = i

}
OptionsButton.selected = OptionSet[0];

let S = new SwitchButton(x,y+(i_final+2)*step ,col[0][3], col[0][7], col[0][6], col[0][8], w,2*h, "Guide", col[0][8])





//-----------------

// --------- swatch buttons
SwatchSet =[]
let r = 12.5
x = 900 +r;
y = 25 +r;
step = 2*r+2;
for(let j = 0; j < col.length; j++){
    for(let k = 0; k<col[j].length ; k++){
        let temp =new SwatchButton(x + j*step,y + k*step, col[j][k],col[0][0] , col[0][2],col[j][k], 1, r)
        SwatchSet.push(temp)
    }
}


//
let M = new Centre(175,25,700,500)
M.setGuideSwitch(S)


function animate(){
    ctx.clearRect(0,0,width,height);
    G.update();
    M.update();

    for(let i =0; i<OptionSet.length; i++){
        OptionSet[i].update()
    }



    for(let i =0; i<SwatchSet.length; i++){
        SwatchSet[i].update()
    }
    S.update()



    window.requestAnimationFrame(animate)
}

animate()
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

for(let i =0; i<OptionNames.length; i++){
    text = OptionNames[i]
    let temp = new OptionsButton(25,25 + i*step,col[0][3], col[0][7], col[0][6], col[0][8], w,h, text, col[0][8])
    OptionSet.push(temp)
}
OptionsButton.selected = OptionSet[0];


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



    window.requestAnimationFrame(animate)
}

animate()
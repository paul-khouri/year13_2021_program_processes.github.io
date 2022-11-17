// noinspection DuplicatedCode

console.log('main js is called')
let G = new Grid(0,0,width, height, 25, col[0][2], 0.3)
//------------ options button set up

OptionNames = ["Rectangle", "Ellipse", "Circle","Star", "Polygon", "Brush1", "Brush2", "Brush3" ]
OptionSet =[]
let x= 0;
let y= 0;
let w = 100;
let h = 50;
let step = h;
let text = ""
let i_final = 0


OptionSet.push(new OptionsButton(x,y ,col[0][3], col[0][9], col[0][6], col[0][8], w,h, "Rectangle", col[0][8]))
OptionSet.push(new OptionsButton(x,y+h, col[0][3], col[0][9], col[0][6], col[0][8], w,h, "Ellipse", col[0][8]))

OptionSet.push(new OptionsButton(x,y+3*h ,col[0][3], col[0][9], col[0][6], col[0][8], w,h, "Star", col[0][8]))
OptionSet.push(new OptionsButton(x+w,y+3*h, col[0][3], col[0][9], col[0][6], col[0][8], w,h, "Polygon", col[0][8]))

let StarSlider = new Slider(x,y+4*h,w,h,col[0][3],col[0][8], 2, "Ratio", 0,1, true)
OptionSet.push(StarSlider)
let NumberSlider = new Slider(x+w,y+4*h,w,h,col[0][3],col[0][8], 2, "Number", 3,12, false)
OptionSet.push(NumberSlider)


OptionsButton.selected = OptionSet[0];

let S = new SwitchButton(x,y+10*h,col[0][3], col[0][7], col[0][6], col[0][8], w,h, "Guide", col[0][8])
i_final += 1
let T = new SwitchButton(x,y+ 11*h,col[0][3], col[0][7], col[0][6], col[0][8], w,h, "Grid", col[0][8])





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
M.setGridSwitch(T)
M.setRatioSlider(StarSlider)
M.setNumberSlider(NumberSlider)




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
    T.update()




    window.requestAnimationFrame(animate)
}

animate()
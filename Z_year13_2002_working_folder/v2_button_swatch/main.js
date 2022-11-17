console.log('main js is called')
let Gd = new Grid(width, height, 25, col[0][2], 0.3)
//------------ options button set up

OptionNames = ["Rectangle", "Ellipse", "Circle","Star", "Polygon", "Brush1", "Brush2", "Brush3" ]
OptionSet =[]
let x= 25;
let y= 25;
let w = 150;
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


SwatchSet = []
x= 25;
y= 225;
w = 25;
h = 25;
step = h+5;
text = ""
let R = 0
let G = 0
let B = 0
let A = 1
let rowlength = 5
let colheight = 11

for(let i =0 ; i<=colheight; i++) {

    for (let j = 0; j <= rowlength; j++) {
        /*
        R = ((rowlength - j) / rowlength) * 255*(colheight-i)/colheight
        G = (j / rowlength) *255*(colheight-i)/colheight
        B = (i/colheight)*255
         */
        R=255*Math.random()
        G=255*Math.random()
        B=255*Math.random()
        A=Math.random()
        let c = "rgb(" + R + "," + G + "," + B + ")"
        let S = new SwatchButton(x+s + j * w, y+s +i*h, w-2*s, h-2*s, c, col[0][0], col[0][6], col[0][2])
        SwatchSet.push(S)
    }

}



//-----------------

let P = new Panel(300,300,100,25, "Fill")
let Q = new Panel(400,300,100,25, "Stroke")
let M = new Centre(200,25,750,500)


function animate(){
    ctx.clearRect(0,0,width,height);
    Gd.update();
   M.update();
    P.update()
    Q.update()

    for(let i =0; i<OptionSet.length; i++){
        OptionSet[i].update()
    }
    for(let j =0; j<SwatchSet.length; j++){
        SwatchSet[j].update()
    }







    window.requestAnimationFrame(animate)
}

animate()
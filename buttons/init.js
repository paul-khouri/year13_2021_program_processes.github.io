console.log("init js called")

//set up code

canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 1000;
var height = 600;
var scale = 2
canvas.width = width*scale;
canvas.height = height*scale;
ctx.scale(scale,scale);

var my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(100,100,100)"
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "6px solid rgba(200,200,200,0.5)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(190,190,190)";
// colour set
var colArray=[

    [ "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 

      "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",

      "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)",

      "rgba(137,255,0,1)","rgba(255,165,0,1)"

    ],

    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 

       "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",

       "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)",

       "rgba(137,255,0,0.67)","rgba(255,165,0,0.67)"

     ],

     [ "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 

       "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",

       "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)",

       "rgba(137,255,0,0.33)","rgba(255,165,0,0.33)"

      ]

        ]
//---


class showColours{
constructor(c,x,y,w){
    this.color = c;
    this.x = x;
    this.y = y
    this.w = w

}
    update(){
        this.draw();
    }

    draw(){
        for( var row=0; row<this.color.length; row ++ ){
            for(var col=0 ; col<this.color[row].length; col ++){
                ctx.fillStyle = this.color[row][col];
                ctx.beginPath();
                var step = this.w/this.color[row].length
                ctx.rect(this.x + col*step, this.y + row*step, step, step)
                ctx.fill();
            }
        }
    }

}



/**
 * get a colour given Hue by interval 0 -> L
 * @param  0 <= x <= L  (number)
 * @param L (number)
 * @return string rgb( , , )
 */
function getColor(x,L){
    var R, G, B, rgbstring
    switch(true){
        case x < 0:
            console.log("x invalid, less than 0")
            R=255;
            G=0;
            B=0;
            rgbstring = "rgb("+R+","+G+","+B+")";
            break;
        case x <= L/6:
            R= 255
            G = 0
            B = Math.round(((6*255)/L)*x)
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 2*L/6:
            R= Math.round(  (-(6*255)/L)*(x-L/6) +255 )
            G = 0
            B = 255
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 3*L/6:
            R= 0
            G = Math.round(  ((6*255)/L)*(x-2*L/6)   )
            B = 255
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 4*L/6:
            R= 0
            G = 255
            B = Math.round(  (-(6*255)/L)*(x-3*L/6) +255 )
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 5*L/6:
            R= Math.round(  ((6*255)/L)*(x-4*L/6)   )
            G = 255
            B = 0
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        case x <= 6*L/6:
            R= 255
            G = Math.round(  (-(6*255)/L)*(x-5*L/6) +255 )
            B = 0
            rgbstring = "rgb("+R+","+G+","+B+")"
            break;
        default:
            console.log("Default")
            R=0;
            G=0;
            B=0;
            rgbstring = "rgb("+R+","+G+","+B+")"
    }
    return rgbstring;
}

/**
 * Alter the shading or brighness of a Hue given x on interval 0 -> L
 * @param  0 <= x <= L  (number)
 * @param L (number)
 * @param rgbstring (string of Hue)
 * @return string rgb( , , )
 */
function getShade(rgbstring, x, L){
    // -L/2 < x < L/2
var xValue = x - L/2
var numbers = rgbstring.match(/\d+/g).map(Number);
var colset={r:numbers[0], g:numbers[1], b:numbers[2]}
var rgbstring = "rgb(100,100,100)"
switch(true){
    case xValue < -L/2:
        console.log("error xValue is too low");
        console.log(xValue)
        R=0;
        G=0;
        B=0;
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    case xValue <= 0:
        R = getShadeValueLeft(xValue,L, colset.r);
        G = getShadeValueLeft(xValue,L, colset.g);
        B = getShadeValueLeft(xValue,L, colset.b);
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    case 0< xValue <= L/2:
        R = getShadeValueRight(xValue,L, colset.r);
        G = getShadeValueRight(xValue,L, colset.g);
        B = getShadeValueRight(xValue,L, colset.b);
        rgbstring = "rgb("+R+","+G+","+B+")";
        break;
    default:
        R=255;
        G=255;
        B=255;
        rgbstring = "rgb("+R+","+G+","+B+")";
}
return rgbstring;
}

function getShadeValueLeft(xValue,L, c){
    return (c/(L/2))*xValue + c
}
function getShadeValueRight(xValue,L, c){
    return ((255 -c)/(L/2))*xValue +c
}


/**
 * Updates the context using small data object
 * @param mini object of type {f: fillColour , s: strokeColour, l: lineWidth} can be empty
 * @return Null
 */
function updateContext(ob){
    for (const [key, value] of Object.entries(ob)) {
        switch(key) {
            case "f":
              ctx.fillStyle = value;
              break;
            case "s":
                ctx.strokeStyle = value;
              break;
            case "l":
                ctx.lineWidth = value;
              break;
            default:
                console.log("unrecognised");
          }
      }

}


class Grid{
    constructor(w,h, xstep, ystep){
        this.xstep = xstep;
        this.ystep = ystep;
        this.w = w;
        this.h = h;
    }

    update(){
        this.draw()


    }

    draw(){
        for(var col=0; col<= this.w; col+= this.xstep){
            this.draw_line(col, 0, col, this.h);
        }
        for(var row=0; row<= this.h; row+= this.ystep){
            this.draw_line(0, row, this.w, row);
        }
    }

    draw_line(x_1, y_1, x_2,y_2){
        ctx.strokeStyle="rgb(255,255,255)";
        ctx.lineWidth=0.25;
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2,y_2);
        ctx.stroke();
    }



}

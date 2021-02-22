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

      "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(0,153,204,1)"

    ],

    [ "rgba(255,255,255,0.67)", "rgba(153,153,153,0.67)", "rgba(0,0,0,0.67)", 

       "rgba(204,0,0,0.67)","rgba(255,204,51,0.67)","rgba(51,51,255,0.67)",

       "rgba(255,102,102,0.67)","rgba(255,255,153,0.67)", "rgba(0,153,204,0.67)"

     ],

     [ "rgba(255,255,255,0.33)", "rgba(153,153,153,0.33)", "rgba(0,0,0,0.33)", 

       "rgba(204,0,0,0.33)","rgba(255,204,51,0.33)","rgba(51,51,255,0.33)",

       "rgba(255,102,102,0.33)","rgba(255,255,153,0.33)", "rgba(0,153,204,0.33)"

      ]

        ]
//---
/**
 * get a colour given Hue by interval 0 -> L
 * @param  0 <= x <= L  (number)
 * @param L (number)
 * @return string rgb( , , )
 */
function getColor(x,L){
    var R, G, B, rgbstring
    console.log( x <= L/6);
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
//console.log("Returned colour");
//console.log(getColor(6,6));



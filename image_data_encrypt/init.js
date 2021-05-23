console.log("init js called")

//set up code
document.body.style.backgroundColor = "rgb(190,190,190)";
function set_up_canvas(id, w, h, s){
let c_id = '#'+id;
let canvas = document.querySelector(c_id);
let ctx = canvas.getContext('2d');
let width = w;
let height = h;
let scale = s
canvas.width = width*scale;
canvas.height = height*scale;
ctx.scale(scale,scale);
//
let my_c = document.getElementById(id);
my_c.style.backgroundColor = "rgb(100,100,100)"
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "0px solid rgba(200,200,200,0.5)";
//my_c.style.display = "block";
my_c.style.margin = '20px';

return ctx

}
var width = 500
var height = 400
var scale = 2
var c_name = 'myCanvasOne'
var x = document.getElementById('container');
var to_write = '<canvas id="myCanvasOne"></canvas><canvas id="myCanvasTwo"></canvas>';

x.innerHTML = to_write;
ctx_1 = set_up_canvas(c_name, width, height, scale);

var c_name = 'myCanvasTwo'
ctx_2 = set_up_canvas(c_name, width, height, scale);



// colour set




var colArray=[

    [ "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 

      "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",

      "rgba(255,102,102,1)","rgba(255,255,153,1)", "rgba(100,153,204,1)",

      "rgba(20,255,20,1)","rgba(255,165,5,1)"

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
    constructor(w,h, xstep, ystep, ctx){
        this.xstep = xstep;
        this.ystep = ystep;
        this.w = w;
        this.h = h;
        this.ctx= ctx;
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
      var ctx= this.ctx;
        ctx.strokeStyle="rgb(255,255,255)";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(x_1, y_1);
        ctx.lineTo(x_2,y_2);
        ctx.stroke();
    }



}






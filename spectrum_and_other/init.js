console.log("functions js called")

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
console.log("Returned colour");
console.log(getColor(6,6));


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

/**
 * Creates a series of date texts 
 * Shown right bottom of canvas
 * 
 * @param canvas
 * @return Null
 */

class DateModule{
constructor(canvas){
    // used to calculate frame rate 
    this.count = 0;
    this.frame_interval = 40;
    this.startDate = Date.now();
    this.endDate = Date.now();
    this.frameRate = 0;
    // used to count seconds
    this.seconds = 0
    this.secondsCounter = Date.now();
}
/**
 * Creates a series of date texts 
 * 
 * @param None
 * @return Null
 */
update(){
    this.count+=1
    if(this.count%this.frame_interval == 0){
        this.startDate = this.endDate;
        this.endDate = Date.now();
        this.frameRate= Math.round( this.frame_interval/((this.endDate - this.startDate)/1000) );
    }
//update seconds count
    this.secondCount();
    this.draw();
}
/**
 * Creates a series of date texts 
 * And draws on the canvas
 * @param canvas
 * @return Null
 */
draw(){
    var xPos , yPos , boxWidth , boxHeight, output;

    boxWidth = 300;
    boxHeight = 30;
    xPos = width-boxWidth;
    yPos = height - boxHeight;
    //---
    output = "Seconds: "+this.seconds;
    this.rectangleText(xPos,yPos, boxWidth, boxHeight, 
        {f:'rgb(0,153,204)' , s:'rgb(0,0,0)' , l:1},{f:"rgb(255,255,255)"},output);
    //----
    yPos = height - 2*boxHeight;
    //-----
    output = "Frame Rate: "+this.frameRate;
    this.rectangleText(xPos,yPos, boxWidth, boxHeight,
    {f:'rgb(0,153,204)' , s:'rgb(0,0,0)' , l:1},{f:"rgb(255,255,255)"},output);
    //---
    yPos = height - 3*boxHeight;
    //---
    output = "Frame Count: "+this.count;
    this.rectangleText(xPos,yPos, boxWidth, boxHeight,
    {f:'rgb(0,153,204)' , s:'rgb(0,0,0)' , l:1},{f:"rgb(255,255,255)"},output);
    //---
    yPos = height - 4*boxHeight;
    //---
    var d = new Date();
    output = d.getHours()+":"+d.getMinutes().toString().padStart(2, '0')+":"
    +d.getSeconds().toString().padStart(2, '0')+":"+d.getMilliseconds().toString().padStart(3, '0');
    this.rectangleText(xPos,yPos, boxWidth, boxHeight,
        {f:'rgb(0,153,204)' , s:'rgb(0,0,0)' , l:1},{f:"rgb(255,255,255)"},output);
    //---
    yPos = height - 5*boxHeight;
    //---
    var t = Math.round(d.getTime()/1000);
    output ="Seconds since 01/01/1970:"+t;
    this.rectangleText(xPos,yPos, boxWidth, boxHeight,
        {f:'rgb(0,153,204)' , s:'rgb(0,0,0)' , l:1},{f:"rgb(255,255,255)"},output);


}

secondCount(){
    if(Date.now()-this.secondsCounter > 1000){
        this.seconds +=1
        this.secondsCounter = Date.now()
    }

}
/**
 * Draws rectangle with text on it 
 * And draws on the canvas
 * @param dimensions x,y,w,h,  rect_context(mini object), text_context(mini object), output(string)
 * @return Null
 */
rectangleText(x,y,w,h,rect_context, text_context, output){

    this.updateContext(rect_context);

    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.stroke();
    ctx.fill();
    this.updateContext(text_context)
    var myFont= "bold 15px sans-serif";
    ctx.font=myFont;
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
 
    ctx.fillText(output, x+w/2,y+h/2);

}


}
// add update conext function to the object
DateModule.prototype.updateContext = updateContext;
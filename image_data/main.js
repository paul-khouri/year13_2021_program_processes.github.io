console.log("man js called")




var step = 50
var G = new Grid(width,height, step,step)
G.update()


object_set = []
col_count = 0
for(var i = 0 ; i<width ; i += step){

    for(var j = 0; j< height ; j+= step){
        col_count = col_count%colArray[0].length
        var temp = new Rectangle(i/5,j/5, step/5, step/5,colArray[0][col_count])
        object_set.push(temp)
        col_count += 1
    }

}

for(var i = 0; i < object_set.length; i++){
    object_set[i].update();
}





for(var i = 0 ; i<scale*4; i+=scale){
    console.log("row" + i/2)
    for(var j= 0 ; j<scale*4; j+=scale){
        console.log("column" + j/2)
var myImageData = ctx.getImageData(i,j,1,1);
console.log(myImageData.data[0]);
console.log(myImageData.data[1]);
console.log(myImageData.data[2]);
console.log(myImageData.data[3]);
}
}

console.log(myImageData.width)
console.log(myImageData.height)
var myImageData = ctx.getImageData(0,0,4,4);
var blueComponent = myImageData.data[((0 * (myImageData.width * 4)) + (0* 4)) + 0];
console.log(blueComponent)



canvas.addEventListener("mousemove", function(event){
    pick(event, X_out, ColourOver);

})
canvas.addEventListener("click", function(event){
    pick(event, X_out, ColourSelect);

})
function pick(event,stringOb, colOb){
   
    var x = event.layerX;
    var y = event.layerY;
    //console.log(x +","+y);
    // need to compensate for the canvas scaling
    var pixel = ctx.getImageData(2*x,2*y,1,1)
    var data = pixel.data;
    //console.log(data);
    const rgba= `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`

    stringOb.updateMessage(rgba);
    colOb.setColour(rgba)


}

var X_out = new TextBox(300,300, 400,50, {f:"rgb(0,0,0)", s:"rgb(255,255,255)", l:0.5}, {f:"rgb(255,255,255)"},"Waiting for colour")
X_out.update();

var ColourOver = new Rectangle(300,240,400,60,"rgba(0,0,0,0)")
ColourOver.update();
var ColourSelect = new Rectangle(300,350,400,60,colArray[0][1])
ColourSelect.update();
var block = ctx.getImageData(0,0,2*width/5, 2*height/5);
ctx.save()
ctx.translate(0,400)
ctx.rotate(-Math.PI/2)
ctx.fillStyle = "rgb(255,255,255)";
ctx.beginPath();
ctx.rect(0, 0, 150, 50);
ctx.fill();
//ColourSelect.update();
ctx.putImageData(block,0,2*200)
ctx.restore();
var invert = function() {
    const imageData = ctx.getImageData(0, 0, 2*width/5, 2*height/5);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    s_ctx.putImageData(imageData, 0, 0);
    ctx.putImageData(imageData, 0, 2*400)
};
invert();
var img = secondCanvas.toDataURL("image/png");
console.log(img)
document.write('<img id="imID" src="'+img+'"/>');
var x = document.getElementById('imID')
console.log(x.src)
var d= new Image();
d.src = img
ctx.drawImage(d, 500,500,d.width/2, d.height/2);
   // decode the string

  // Start file download.
  //download("hello.png",'d');
  

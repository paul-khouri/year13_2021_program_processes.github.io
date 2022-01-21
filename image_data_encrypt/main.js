console.log("main called")
var G = new Grid(width,height,50,50, ctx_1)

var R = new Rectangle(0,0,width,height,colArray[0][8],ctx_1)
R.update();
G.update();
var H = new Grid(width,height,50,50, ctx_2)
H.update();

var img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'attackatmidnight.jpg';
img.onload = function() {
    img.crossOrigin = "Anonymous";
    ctx_1.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx_1.getImageData(0, 0, 2*img.width, 2*img.height);
    ctx_2.putImageData(imageData, 0, 0);
    invert(imageData, ctx_2)
    v_encrypt(imageData, ctx_2)
    //ctx_2.drawImage(img, 0, 0, img.width/8, img.height/8);

}



var invert = function(imageData, ctx) {
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
   
    ctx.putImageData(imageData, 0, 0)
};

var v_encrypt = function(imageData, ctx) {
    const data = imageData.data;
    //let key = [[200,50,30], [0,30,170], [100,200,100], [230,100,190]]
    // create random list
    let key =[]
    for(let i = 0; i<50; i++){
        let temp = []
        for(let j = 0; j<3; j++){
            let r = Math.floor(255*Math.random())
            temp.push(r)
            //console.log(r);
        }
        key.push(temp)
        console.log(key)

    }
    let c= 0
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = (data[i] + key[c][0])%255;     // red
        data[i + 1] = (data[i + 1] + key[c][1])%255; // green
        data[i + 2] = (data[i + 2] + key[c][2])%255; // blue
        c+=1;
        c= c%key.length;
    }
   
    ctx.putImageData(imageData, 0, 0)
};




/*
ctx_1.fillStyle='rgb(200,153,204)';
ctx_1.strokeStyle='rgb(0,0,0)';
ctx_1.lineWidth=10;
ctx_1.beginPath();
ctx_1.rect(20,10,100,100);
ctx_1.stroke();
ctx_1.fill();
*/

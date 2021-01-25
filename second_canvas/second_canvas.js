canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;


SecondCanvas = document.querySelector('#mySecondCanvas');
var ctx_s = SecondCanvas.getContext('2d');
SecondCanvas.width = width;
SecondCanvas.height = height;


drawCircle(ctx_s,100,300);






class Handler{
    
    constructor(canvas){


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseleave', this.mLeave.bind(this));
        this.mouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.newImageSet = [];
        console.log(this.newImageSet)
       
    }

    mDown(e){
        this.mouseDown = true;
        var output = "The mouse has gone DOWN at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());

        ctx_s.clearRect(0,0,width,height);


    }

    mUp(e){
        this.mouseDown = false;

        var output = "The mouse has gone UP at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());
        this.getdataURL();
        /*
        if(this.newImage){
            console.log("Have a canvas image");
            
        }else{
            console.log("No image added");
        }
        */
       ctx.clearRect(0,0,width,height);
       for(var i =0 ; i< this.newImageSet.length; i++){
           ctx.drawImage(this.newImageSet[i], 0, 0);
       }
    }

    mMove(e){

        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;


        ctx.clearRect(0,0,width,height);
        for(var i =0 ; i< this.newImageSet.length; i++){
            ctx.drawImage(this.newImageSet[i], 0, 0);
        }

        if(this.mouseDown == true){
            console.log("Mouse move")
            this.drawCircle(ctx_s,this.mouseX, this.mouseY);
            ctx.drawImage(SecondCanvas, 0, 0);
            }
        
    }

    mLeave(e){
        console.log("mouse has left");
        this.mouseDown = false;

    }

    dataPack(){
        return {down: this.mouseDown , x:this.mouseX , y:this.mouseY}
    }

    getdataURL(){
        var copiedImage = new Image();
        var imageArray = this.newImageSet;
        console.log(this.newImageSet)
        copiedImage.addEventListener('load' , function(){
            console.log("image from canvas is loaded");
            imageArray.push(copiedImage);
            console.log(imageArray)
            //ctx.drawImage(this.newImage, 0, 0);
        },false)
        
        var dataURL = SecondCanvas.toDataURL("image/png");

        copiedImage.src = dataURL;
        

    }


}
Handler.prototype.drawCircle=drawCircle;


var my_Handler = new Handler(canvas);
console.log(my_Handler.dataPack());

function drawCircle(c,x,y){
// draw circle
c.fillStyle='rgba(255,204,51,0.1)';
c.strokeStyle='rgb(0,0,255)';
c.lineWidth=0;
c.beginPath();
c.arc(x,y, 25, 0, 2*Math.PI);
//ctx.stroke();
c.fill();

}

var img = new Image();   // Create new img element
img.addEventListener('load' , drawIm)
img.src = 'merz.png'; // Set source path

var copiedImage = new Image();
function drawIm(e){
    console.log("image loaded");
    ctx_s.drawImage(img,100,100, img.width/4, img.height/4);
    //ctx.drawImage(SecondCanvas, 0, 0);
    var dataURL = SecondCanvas.toDataURL("image/png");
    copiedImage.src = dataURL
    ctx.drawImage(copiedImage, 0, 0);
    //console.log(dataURL);
}

//ctx.drawImage(SecondCanvas, 0, 0);


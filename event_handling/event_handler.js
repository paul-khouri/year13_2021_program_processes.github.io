console.log("js file has been called");
// Now this line will be the same size on the page
canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
canvas.width = width;
canvas.height = height;

console.log(width);
console.log(height)

class Handler{
    
    constructor(canvas){


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.mouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
       
    }

    mDown(e){
        this.mouseDown = true;
        var output = "The mouse has gone DOWN at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());
    }

    mUp(e){
        this.mouseDown = false;

        var output = "The mouse has gone UP at x: "+ e.offsetX +" and y: " + e.offsetY;
        console.log(output);
        console.log(this.dataPack());
    }

    mMove(e){

        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;

        if(this.mouseDown == true){
        console.log("Mouse move")
        }
    }

    dataPack(){
        return {down: this.mouseDown , x:this.mouseX , y:this.mouseY}
    }


}


var my_Handler = new Handler(canvas);
console.log(my_Handler.dataPack());
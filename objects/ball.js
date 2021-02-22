console.log("ball js called")

class Ball{
constructor(x,y,r,col){
    this.x = x;
    this.y = y;
    this.rad = r;
    this.col= col;
    console.log("A ball has been instantiated");
}
update(){
    this.draw();
}

draw(){
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
    ctx.fill();
}

area(){
    var a = Math.PI*Math.pow(this.rad, 2)
    var output = "Area is: "+ a + " pixels (squared?)";
    console.log(output);
}
}

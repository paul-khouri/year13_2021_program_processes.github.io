console.log("mixer js called");


class Mixer{
// class Mixer x,y,w,h,Slider, canvas, c_1,c_2, c_3  
constructor(x,y,w,h,Slider, canvas,c_1,c_2, c_3){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
    this.R = new Slider(canvas, x+1*0.125*w, y+0.1*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.G = new Slider(canvas, x+1*0.125*w, y+0.3*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.B = new Slider(canvas, x+1*0.125*w, y+0.5*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.A = new Slider(canvas, x+1*0.125*w, y+0.7*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 100, 0, 100);
    this.outline = c_1;
    this.fill = c_2;
    this.stroke = c_3;
    this.colour = ""
}

update(){
this.R.update();
this.G.update();
this.B.update();
this.A.update();
this.colour = "rgba("+ this.R.getValue()+','+ this.G.getValue()+','+this.B.getValue()+','+this.A.getValue()/100+")";
//console.log(this.colour);
this.draw();
}

getColour(){
    return this.colour;
}

draw(){

    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.rect(this.x+ 5*0.125*this.w,this.y+0.1*this.h,2*0.125*this.w,0.8*this.h);
    ctx.fill();
    ctx.strokeStyle = this.outline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(this.x,this.y,this.w,this.h);
    ctx.stroke();
}


}
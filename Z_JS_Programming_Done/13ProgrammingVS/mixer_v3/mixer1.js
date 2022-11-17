console.log("mixer js called");


class Mixer{
// class Mixer x,y,w,h,Slider, canvas, c_1,c_2, c_3  
constructor(x,y,w,h,Slider, canvas,c_1,c_2, c_3, Button, SFButton){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // class Button x,y,w,h,text, c_1, c_2, c_3, canvas
    this.strokeB = new SFButton(x+5*0.125*w, y-0.15*h, 0.1*w, 0.2*h, "S", c_1, c_3, c_2, canvas, "Stroke"  );
    this.fillB = new SFButton(x+6*0.125*w, y-0.15*h, 0.1*w, 0.2*h, "F", c_1, c_3, c_2, canvas, "Fill"  );
   
    //class Slider (canvas,x,y,w,h,c_1,c_2, c_3, max, min, start)
    this.StrkWidth = new Slider(canvas, x+1*0.125*w, y-0.1*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 10, 0, 10);

    this.R = new Slider(canvas, x+1*0.125*w, y+0.1*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.G = new Slider(canvas, x+1*0.125*w, y+0.3*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.B = new Slider(canvas, x+1*0.125*w, y+0.5*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 255, 0, 255);
    this.A = new Slider(canvas, x+1*0.125*w, y+0.7*h, 3*0.125*w, 2*0.1*h , c_1, c_2, c_3, 100, 0, 100);

    this.outline = c_1;
    this.fill = c_2;
    this.stroke = c_3;
    this.colour = "";
    this.strokeColour = "rgba(0,0,0,1)";

    this.strokeWidth = 0;
    this.selectedStyle = SFButton.selectedStyle;

}

update(){
this.StrkWidth.update();
this.strokeB.update();
this.fillB.update();
this.R.update();
this.G.update();
this.B.update();
this.A.update();
this.strokeWidth = this.StrkWidth.getValue();

// manage zero stroke width
if(this.strokeWidth<1){
    this.strokeWidth = 0.01;
}
var mixColour = "rgba("+ this.R.getValue()+','+ this.G.getValue()+','+this.B.getValue()+','+this.A.getValue()/100+")";

if( SFButton.selectedStyle =="Fill"){

    if(this.selectedStyle != "Fill"){
        // initiated on first click to reset to previous colour value
        var fc = this.colour.match(/[. 0-9]+/g).map(Number);;
        console.log(fc);
        this.R.setValue(fc[0]);
        this.G.setValue(fc[1]);
        this.B.setValue(fc[2]);
        this.A.setValue(fc[3]*100);
        this.selectedStyle = "Fill";

    }else{
        this.colour = mixColour;
    }

}else{

    if(this.selectedStyle != "Stroke"){
        // initiated on first click to reset to previous colour value
        var fc = this.strokeColour.match(/\d+/g).map(Number);
        this.R.setValue(fc[0]);
        this.G.setValue(fc[1]);
        this.B.setValue(fc[2]);
        this.A.setValue(fc[3]*100);
        this.selectedStyle = "Stroke";

    }else{
        this.strokeColour =  mixColour;
    }
    
}


this.draw();
}

getColour(){
    return this.colour;
}

getStrokeColour(){
    return this.strokeColour;
}

getLineWidth(){
    return this.strokeWidth;
}

draw(){
// colour rectangle
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.rect(this.x+ 5*0.125*this.w,this.y+0.1*this.h,2*0.125*this.w,0.8*this.h);
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColour;
    ctx.fill();
    ctx.stroke();
}


}
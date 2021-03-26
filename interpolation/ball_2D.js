console.log("ball js called")

class Ball{
constructor(x,y,r,col, f, T_x, T_y, W,H,c_set){
    this.x_s = x;
    this.y_s = y;
    this.x = x;
    this.y = y;
    this.rad = r;
    this.col= col;
    console.log("A ball has been instantiated");
    this.count = 0;
    this.c_x = 0;
    this.c_y = 0;
    this.T_x = T_x;
    this.T_y = T_y;
    this.W = W;
    this.H = H;
    this.f = f;
    this.colour_list = ["rgb(0,0,0)","rgb(200,45,255)","rgb(255,255,255)","rgba(100,255,0,0.5)","rgba(0,0,0,0.25)"]
    this.colour_list = c_set;
    this.i = 0;
    this.col = this.colour_list[this.i];

    canvas.addEventListener('mousemove', this.mMove.bind(this));
    this.mouseX = 0;
    this.mouseY = 0;



}

mMove(e){
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
    
   
}
update(){
    this.count +=1;
    this.c_x = this.count%this.T_x;
    this.c_y = this.count%this.T_y;
    

    if(this.c_x == 0 || this.c_y == 0 || this.c_x == Math.round(this.T_x/2) || this.c_y == Math.round(this.T_y/2) ){
       
        this.i += 1
        this.i = this.i%this.colour_list.length;
        //cycle on colour
        this.col= this.colour_list[this.i]


    }

    if(this.f =="l"){
        this.y = this.y_s + this.linear(this.T_y, this.H, this.c_y);
    }else if(this.f == "q"){
        this.y = this.y_s + this.quadratic(this.T_y, this.H, this.c_y);
    }else if(this.f == "t"){
        this.y = this.y_s + this.trig(this.T_y, this.H, this.c_y);
    }


    this.x = this.x_s + this.linear(this.T_x, this.W, this.c_x)


    var d = this.getDistance(this.mouseX, this.mouseY, this.x, this.y);
  
    var scale = 10*this.rad - d;
    var trig_scale = 4*this.rad*Math.sin(((Math.PI)/(5*this.rad))*(scale))


    if( scale < 0){
        this.draw(this.rad);
    }else{
      
        this.draw(Math.abs(trig_scale))

    }

  
    //console.log(this.y)
    //this.draw(this.rad);
    //this.draw_line(this.x, this.y, this.mouseX, this.mouseY)
}

draw(R){
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, R, 0, 2*Math.PI);
    ctx.fill();
}

draw_line(x_1, y_1, x_2,y_2){
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();


}

linear(T,H,c){
    var h = 0
    if( c<T/2){
        h = (2*H/T)*c
    }
    else{
        h = (-2*H/T)*c+2*H
    }
    return h
}

quadratic(T,H,c){
    var h = 0;
    if(c<T/2){
        h = ((4*H)/Math.pow(T,2))*Math.pow(c,2)
    }else{
        h = ((4*H)/Math.pow(T,2))*Math.pow(c-T,2)

    }
    return h;
}

trig(T,H,c){
    var h = (H/2)*Math.sin((2*Math.PI/T)*(c-T/4))+H/2
    return h;
}



area(){
    var a = Math.PI*Math.pow(this.rad, 2)
    var output = "Area is: "+ a + " pixels (squared?)";
   
}

/**
 * Pythagoras distance check 
 * @param  x,y,positions of mouse and of point circle and radius of point circle  (number)
 * @return boolean
 */
 getDistance(x_1, y_1, x_2, y_2){
    var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
    return d

}

}

class Rectangle{
constructor(x,y,w,h,fill){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
}
update(){
    this.draw();
}
draw(){
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
}

}

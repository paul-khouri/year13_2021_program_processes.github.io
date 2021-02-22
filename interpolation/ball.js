console.log("ball js called")

class Ball{
constructor(x,y,r,col, f, T, H){
    this.x_s = x;
    this.y_s = y;
    this.x = x;
    this.y = y;
    this.rad = r;
    this.col= col;
    console.log("A ball has been instantiated");
    this.count = 0;
    this.T = T;
    this.H = H;
    this.f = f


}
update(){
    this.count +=1;
    this.count = this.count%this.T;
    if(this.f =="l"){
        this.y = this.y_s + this.linear(this.T, this.H, this.count);
    }else if(this.f == "q"){
        this.y = this.y_s + this.quadratic(this.T, this.H, this.count);
    }else if(this.f == "t"){
        this.y = this.y_s + this.trig(this.T, this.H, this.count);
    }

    //console.log(this.y)
    this.draw();
}

draw(){
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
    ctx.fill();
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
    console.log(output);
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

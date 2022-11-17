console.log("alien js called");
class Alien{
constructor(x,y){
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.fill = 'rgb(255,255,0)';
    this.speed = 0.5;
    this.step = this.h;
}
getX(){
    return this.x;
}

getY(){

    return this.y;
}
getW(){
    return this.w;
}
getH(){
    return this.h;
}
update(){
    if(Alien.r < this.x){
        this.x = Alien.r;
        this.y += this.step
       this.speed = -this.speed;
    }
    if(Alien.l > this.x){
        this.x = Alien.l;
       this.speed = -this.speed;
    }
    this.x += this.speed

    var myR = Math.round(1000*Math.random())
    if(myR == 27){
        this.fill = 'rgb(0,255,0)';

    }


    this.draw();


}

draw(){
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
}

}
Alien.r =0;
Alien.l =0;
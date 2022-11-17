console.log("missile js called" )

class Missile{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.fill = "rgb(50,255,200)";
        this.w = 5;
        this.h = 15;
        this.live = true; 
        this.speed = 10;
    }

update(){
    if(this.y< Missile.t){
        this.live = false;
    }

    if(this.live){
        this.y-= this.speed;
    }

    

    this.draw();
}

getX(){
    return this.x;
}

getY(){
    return this.y;
}

getLive(){
    return this.live;
}
draw(){
    ctx.fillStyle = this.fill;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill();
}
}
Missile.t = 0;
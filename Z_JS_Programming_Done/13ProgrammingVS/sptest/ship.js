console.log( "ship js called");

class Ship{
// class Ship x, y Class(Missile) Object(Control)
constructor(x,y, Missile,l, r){
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 20;
    this.M = Missile;
    this.C = "";
    document.addEventListener('keydown', this.kDown.bind(this));
    document.addEventListener('keyup', this.kUp.bind(this));
    this.fill = 'rgb(255,255,255)';
    this.ArrowRight = false;
    this.ArrowLeft = false;
    this.fire = true;
    this.speed = 10;
    this.l = l;
    this.r = r;
    this.count = 0;


}
setControl(c){
    this.C = c;
}
kDown(e){
    var myKey = e.key;
    if(myKey == " "){
        console.log("space pressed");
        if(this.fire){
        this.C.addMissile(this.x+this.w/2, this.y);
        this.fire = false;
        }


    }
    if(myKey == 'ArrowRight' ){
        console.log("right");
        this.ArrowRight = true;
    }
    if(myKey == 'ArrowLeft' ){
        console.log("left");
        this.ArrowLeft = true;
    }

}

kUp(e){
    var myKey = e.key;
    if(myKey == " "){
        this.fire = true;
    }
    this.ArrowRight = false;
    this.ArrowLeft = false;

}

update(){
    this.count+=1;
    if(this.ArrowRight && this.x + this.w < this.r - this.speed){
        this.x += this.speed;
    }
    if(this.ArrowLeft && this.x > this.l + this.speed){
        this.x -= this.speed;
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
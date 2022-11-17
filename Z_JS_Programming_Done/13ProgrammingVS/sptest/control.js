console.log("control js called")

class Control{
constructor(shipA,x ,y ,w, h){
    this.shipA = shipA;
    this.missileA = [];
    this.alienA = [];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.stroke = 'rgb(255,255,255)';
}

addMissile(x,y){
    this.missileA.push(new Missile(x,y));
}

addAlien(x,y){
    this.alienA.push(new Alien(x,y));

}

update(){

    for( var j = 0 ; j< this.alienA.length ; j++){
        var x = this.alienA[j].getX();
        var y = this.alienA[j].getY();
        var w = this.alienA[j].getW();
        var h = this.alienA[j].getH();

        for( var i = 0; i< this.missileA.length; i++){
            var xM = this.missileA[i].getX();
            var yM = this.missileA[i].getY();
            if(this.inBoundsCheck(xM, yM, x, y, w, h)){
                this.missileA.splice(i,1);
                i -= 1;
                this.alienA.splice(j,1);
                j -= 1;
            }


        }


    }

    for(var j =0 ; j< this.alienA.length; j++){
        this.alienA[j].update();
    }



    for(var k=0; k< this.missileA.length ; k++){

        if(this.missileA[k].getLive() == false){
            this.missileA.splice(k,1);
            k -= 1;
        }
    }


    for(var i = 0 ; i< this.missileA.length ; i++){
        this.missileA[i].update();
    }

    this.shipA[0].update();

    this.draw();

}

draw(){
    ctx.strokeStyle = this.stroke;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.stroke();
}

inBoundsCheck(xM, yM, x, y, w, h){
    if( xM > x && xM < x+w && yM > y && yM < y+h){
        return true;
    }else{
        return false;
    }

}
}
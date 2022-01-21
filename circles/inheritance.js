class ObjectOne{
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    update(){

    }

    callOne(){
        console.log(this.x)
        console.log(this.y)
        console.log(this.z)

    }
}

var O = new ObjectOne(1,2,3)
//O.callOne()

class ObjectTwo extends ObjectOne{
    constructor(x,y,z,u){
        super(x,y,z)
        this.u = u;
    }

    callTwo(){
        console.log(this.u)
    }


}
var P = new ObjectTwo(4,5,6,7)
//P.callOne();
//P.callTwo();

console.log((-1+4)%4)
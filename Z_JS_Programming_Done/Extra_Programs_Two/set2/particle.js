var particle = {
    position: null,
    velocity: null,
    ctx:null,
    gravity: null,
    angle: 0,
    scale: 0.25,

    create: function(x,y, speed, direction, grav){
        var obj = Object.create(this);
        obj.position = vector.create(x,y);
        obj.velocity = vector.create(0,0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0)
        return obj;
    },

    update: function() {
        this.velocity.addTo(this.gravity);
        //this.position.addTo(this.velocity);
        this.position.addToMod(this.velocity, 900, 500);

    },

    accelerate: function(accel){
        this.velocity.addTo(accel);
    },

    draw: function(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.getX(), this.position.getY(), 5, 0, 2*Math.PI);
        this.ctx.fillStyle = "rgba(200,100,20,0.25)";
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.position.getX(), this.position.getY());
        this.ctx.lineTo(this.position.getX()+10*this.velocity.getX(),this.position.getY()+10*this.velocity.getY());
        this.ctx.strokeStyle = "rgba(0,0,200,0.25)";
        this.ctx.stroke();
    },

    drawImage: function(img){
        var x = this.velocity.getX();
        var y = this.velocity.getY();
        if(x != 0 || y!=0 ){
            this.angle=Math.atan2(y,x);
            //console.log(this.angle);
        }
        this.ctx.save();
        this.ctx.translate(this.position.getX(), this.position.getY());
        this.ctx.rotate(this.angle+Math.PI/2);
        this.ctx.drawImage(img, -img.width*this.scale/2,-img.height*this.scale/2, img.width*this.scale, img.height*this.scale);
        this.ctx.restore();
    },


    setContext: function(my_context){
        this.ctx=my_context;
    },

    getVelocity(){
        return [this.velocity.getX() , this.velocity.getY()];
    }




}
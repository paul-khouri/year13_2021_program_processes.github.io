var particle = {
    position: null,
    velocity: null,
    ctx:null,
    gravity: null,

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
        this.position.addTo(this.velocity);

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

    setContext: function(my_context){
        this.ctx=my_context;
    }




}
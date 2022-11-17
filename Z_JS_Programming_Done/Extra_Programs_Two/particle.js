var particle = {
    position: null,
    velocity: null,
    ctx:null,
    mass: 1,
    radius: 1,
    colour: "rgb(255,255,0)",


    create: function(x,y, speed, direction, size, colour){
        var obj = Object.create(this);
        obj.position = vector.create(x,y);
        obj.velocity = vector.create(0,0);
        obj.velocity.setLength(speed);
        obj.velocity.setAngle(direction);
        obj.radius = size;
        obj.colour = colour;
   
        return obj;
    },

    update: function() {
        //this.velocity.addTo(this.velocity);
        this.position.addTo(this.velocity);
    },

    accelerate: function(accel){
        this.velocity.addTo(accel);
    },

    draw: function(){
        this.ctx.beginPath();
        this.ctx.arc(this.position.getX(), this.position.getY(), this.radius, 0, 2*Math.PI);
        this.ctx.fillStyle = this.colour;
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
    },

    angleTo: function(p2){
        return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX())

    },

    distanceTo: function(p2){
        dx = p2.position.getX() - this.position.getX();
        dy = p2.position.getY() - this.position.getY();
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy,2));
    },

    gravitateTo: function(p2){
        var grav = vector.create(0,0);
            dist = this.distanceTo(p2);
            
            grav.setLength(p2.mass/Math.pow(dist,2));
            grav.setAngle(this.angleTo(p2));

            this.velocity.addTo(grav);

    }



}
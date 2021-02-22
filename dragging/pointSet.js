class PointSet{
constructor(){
    this.pointArray = [];
    this.rad = 100;
    this.x_c = 400;
    this.y_c = 300;
    this.num = 10;
    this.ang=0;

 

    
    for(var i = 0 ; i<this.num ; i++){
        var x =this.x_c+this.rad*Math.cos(i*2*Math.PI/this.num);
        var y=this.y_c+this.rad*Math.sin(i*2*Math.PI/this.num);
        var temp = new Point(x, y, 30, "rgb(0,255,0)", "rgb(255,0,0)", "rgb(0,0,255)", canvas)
        this.pointArray.push(temp)
    }

    

}

update(){
    /*
    ctx.save()
    ctx.translate(this.x_c, this.y_c);
    ctx.rotate(this.ang*Math.PI/180);
    this.ang+=0;
    */
    
    for(var i=0; i< this.pointArray.length ; i++){
        this.pointArray[i].update()
    }
var count = 0
    for(var i=0; i< this.pointArray.length ; i++){

        for(var j=i+1 ; j< this.pointArray.length ;j++){
            count += 1
        this.draw_line( this.pointArray[i].getX(),this.pointArray[i].getY(),this.pointArray[j].getX(),this.pointArray[j].getY()  )
        }


    }

   // ctx.restore()



    
    


}

getArray(){
    return this.pointArray
}

draw_line(x_1, y_1, x_2,y_2){
    this.updateContext({s:"rgb(255,255,255)", l:1})
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();


}

updateContext(ob){
    for (const [key, value] of Object.entries(ob)) {
        switch(key) {
            case "f":
              ctx.fillStyle = value;
              break;
            case "s":
                ctx.strokeStyle = value;
              break;
            case "l":
                ctx.lineWidth = value;
              break;
            default:
                console.log("unrecognised");
          }
      }

}





}
console.log("Slider js file has been called");
class Slider{
// class Slider x,y,w,h, stroke, fill, over, max_value 
constructor(x,y,w,h,r, stroke, fill, over, max_value){
    this.x = x; this.y = y; this.r = h/4; this.w = w; this.h = h;
    this.x_min = x; this.x_max = x+w;
    this.value = 0; this.max_value = max_value;
    this.x_s = x+w/2; this.y_s = y+h/2;
    this.stroke = stroke; this.fill = fill; this.over = over;
    this.inBounds = false;
    this.xMouse = 0;
    this.yMouse = 0;
    canvas.addEventListener('mousedown', this.mDown.bind(this));
    canvas.addEventListener('mousemove', this.mMove.bind(this));
    canvas.addEventListener('mouseup', this.mUp.bind(this));
}
mDown(e){
    if(this.inBounds){
        Slider.taken = this;
    }}
mMove(e){
    this.xMouse = e.offsetX;
    this.yMouse = e.offsetY; 
    this.inBounds = this.boundsCheck(this.xMouse, this.yMouse, this.x_s, this.y_s, this.r);
}
mUp(e){
    Slider.taken = "";
}
update(){
    if(Slider.taken == this){
        this.x_s=this.xMouse;
        if(this.x_s < this.x_min){
            this.x_s = this.x_min
        }else if(this.x_s > this.x_max){
            this.x_s = this.x_max
        } }
    // value working out
    this.value =  Math.round( ( (this.x_s - this.x_min)/(this.x_max-this.x_min) ) *this.max_value )
// new addition
   this.drawRect();
    this.draw_line(this.x_min, this.y+this.h/2, this.x_max, this.y+this.h/2)
    this.drawCircle();
    this.text(this.x_min+this.w/2, this.y+3*this.h/4, this.value);
}
drawCircle(){
    if(this.inBounds || Slider.taken == this){
    ctx.fillStyle= this.over;
    }else{
        ctx.fillStyle= this.fill;
    }
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 2;
    ctx.beginPath()
    ctx.arc(this.x_s,this.y_s, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
}
drawRect(){
    ctx.fillStyle = "rgb(80,80,80)";
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fill()
}
draw_line(x_1, y_1, x_2,y_2){
    ctx.strokeStyle=this.stroke;
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();
}
boundsCheck(x_1, y_1, x_2, y_2, r){
        var d = Math.sqrt( Math.pow(x_2 - x_1, 2) + Math.pow(y_2 - y_1, 2) );
        if(d<r){
            return true;
        }else{
            return false;
        }}
text(x,y, message){
    ctx.fillStyle="rgb(255,255,255)";
    var myFont= "bold 25px monospace";
    ctx.font=myFont;
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    var output = message;
    ctx.fillText(output, x,y);
}
// these allow other parts of the program to get the x  and y values of the Slider
getX(){
    return this.x;
}
getY(){
    return this.y;
}
}
Slider.taken="";
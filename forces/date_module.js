console.log("date module loaded")
class DateModule{
constructor(canvas){
    this.count = 0;
    this.frame_interval = 40;
    this.startDate = Date.now();
    this.endDate = Date.now();
    this.frameRate = 0;

    this.seconds = 0
    this.secondsCounter = Date.now();
    




}

update(){
    this.count+=1
    if(this.count%this.frame_interval == 0){
        this.startDate = this.endDate;
        this.endDate = Date.now();
        
        this.frameRate= Math.round( this.frame_interval/((this.endDate - this.startDate)/1000) );
      
        
    }

    this.secondCount();
    this.draw();
}

draw(){
    var xPos , yPos , boxWidth , boxHeight;

    boxWidth = 300;
    boxHeight = 30;

ctx.fillStyle='rgb(0,153,204)';
ctx.strokeStyle='rgb(0,0,0)';
ctx.lineWidth=1;


xPos = width-boxWidth;
yPos = height - boxHeight;

ctx.beginPath();
ctx.rect(xPos,yPos,boxWidth,boxHeight);
ctx.stroke();
ctx.fill();

ctx.fillStyle="rgb(255,255,255)";
var myFont= "bold 15px sans-serif";

ctx.font=myFont;
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
var output = "Seconds: "+this.seconds;
ctx.fillText(output, xPos+boxWidth/2,yPos+boxHeight/2);


ctx.fillStyle='rgb(0,153,204)';

yPos = height - 2*boxHeight;
ctx.beginPath();
ctx.rect(xPos,yPos,boxWidth,boxHeight);
ctx.stroke();
ctx.fill();


ctx.fillStyle="rgb(255,255,255)";
ctx.font=myFont;
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
var output = "Frame Rate: "+this.frameRate;
ctx.fillText(output, xPos+boxWidth/2,yPos+boxHeight/2);

ctx.fillStyle='rgb(0,153,204)';

yPos = height - 3*boxHeight;
ctx.beginPath();
ctx.rect(xPos,yPos,boxWidth,boxHeight);
ctx.stroke();
ctx.fill();


ctx.fillStyle="rgb(255,255,255)";
ctx.font=myFont;
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
var output = "Frame Count: "+this.count;
ctx.fillText(output, xPos+boxWidth/2,yPos+boxHeight/2);





}

secondCount(){
    if(Date.now()-this.secondsCounter > 1000){
        this.seconds +=1
        this.secondsCounter = Date.now()
        console.log(this.seconds);
    }

}


}
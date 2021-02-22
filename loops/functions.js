console.log("functions js called");
/**
 * Updates the context using small data object
 * @param mini object of type {f: fillColour , s: strokeColour, l: lineWidth} can be empty
 * @return Null
 */
function updateContext(ob){
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
function drawRect(x, y, w, h, f_b, s_b, context_ob){
    updateContext(context_ob)
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(f_b){
        ctx.fill();
    }
    if(s_b){
        ctx.stroke();
    }
}
function drawCircle(x, y, r, f_b, s_b, context_ob){
    updateContext(context_ob)
    ctx.beginPath();
    ctx.arc(x,y,r, 0, 2*Math.PI);
    if(f_b){
        ctx.fill();
    }
    if(s_b){
        ctx.stroke();
    }
}

// end setup code
function draw_line(x_1, y_1, x_2,y_2){
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();


}

function draw_grid(){
    var grid_interval = 50;
    for(var i=0; i< width/grid_interval; i++){
        draw_line(i*grid_interval,0,i*grid_interval,height);
    }
    for(var i=0; i< height/grid_interval; i++){
        draw_line(0,i*grid_interval,width,i*grid_interval);
    }
}


function text_box(x,y,w,h, bCol, tCol, message){
    console.log("function called")
    ctx.fillStyle=bCol;
    ctx.strokeStyle='rgb(255,255,255)';
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle=tCol;
    var myFont= "bold 25px monospace";

    ctx.font=myFont;
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    var output = message;
    ctx.fillText(output, x+w/2,y+h/2);


}





function rounded_button(x,y,w,h, bCol = "rgb(0,0,255)"){
    console.log("function called")
    
    ctx.fillStyle=bCol;
    ctx.strokeStyle='rgb(255,255,255)';
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
 
    ctx.fill();
  
 
    //ctx.fillStyle="rgb(0,0,255)";
    ctx.fillStyle=bCol;
    ctx.lineWidth=1;
    var rad = 100;
    if(rad > h/2){
        rad = h/2;
    }
    ctx.beginPath();
    ctx.arc(x+rad,y+rad, rad, Math.PI,3*Math.PI/2 );
    ctx.arc(x+w-rad,y+rad, rad, 3*Math.PI/2,0 );
    ctx.arc(x+w-rad,y+h-rad, rad,0,Math.PI/2 );
    ctx.arc(x+rad,y+h-rad, rad,Math.PI/2,Math.PI );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
   
  
  
}

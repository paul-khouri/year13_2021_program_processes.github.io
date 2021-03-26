/**
 * Draw a rectangle
 *
 * @param {number} x corner x
 * @param {number} y corner y
 * @param {number} w width
 * @param {number} h height
 * @param {string} fillcolour rgb string
 * @param {string} strokecolour rgb string.
 * @param {number} strokewidth x coordinate of second point.
 * @return {null} 
 */
function drawRect(x,y,w,h, fillcolour, strokecolour, strokewidth){
    ctx.fillStyle = fillcolour;
    ctx.strokeStyle = strokecolour;
    ctx.lineWidth = strokewidth;
    ctx.beginPath()
    ctx.rect(x,y,w,h)
    ctx.fill();
    ctx.stroke();
}
// call the function to make a rectangle
drawRect(700,100,250, 450, "rgb(240, 100, 80)", "rgb(0, 100, 80)", 3)
/**
 * Draw a circle
 *
 * @param {number} x corner x
 * @param {number} y corner y
 * @param {number} r radius
 * @param {string} fillcolour rgb string
 * @param {string} strokecolour rgb string.
 * @param {number} strokewidth x coordinate of second point.
 * @return {null} 
 */
 function drawCircle(x,y,r, fillcolour, strokecolour, strokewidth){
    ctx.fillStyle = fillcolour;
    ctx.strokeStyle = strokecolour;
    ctx.lineWidth = strokewidth;
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI)
    ctx.fill();
    ctx.stroke();
}
drawCircle(700,500,50, "rgb(0, 255, 80)", "rgb(0, 100, 255)", 8)
/**
 * Draw a white line between two points
 *
 * @param {number} x_1 x coordinate of first point.
 * @param {number} y_1 y coordinate of first point.
 * @param {number} x_2 x coordinate of second point.
 * @param {number} y_2 y coordinate of second point.
 * @return {null} 
 */
function draw_line(x_1, y_1, x_2,y_2){
    ctx.strokeStyle="rgb(255,255,255)";
    ctx.lineWidth=0.25;
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2,y_2);
    ctx.stroke();
}
draw_line(0,400, 600,100)
//use the drawline method to make a grid
/**
 * Draw a grid  line between two points
 *
 * @param {number} n width and height of each grid square
 * @return {null} 
 */
function draw_grid(n){
    var grid_interval = n;
    for(var i=0; i< width/grid_interval; i++){
        draw_line(i*grid_interval,0,i*grid_interval,height);
    }
    for(var i=0; i< height/grid_interval; i++){
        draw_line(0,i*grid_interval,width,i*grid_interval);
    }
}
// call the function and draw the grid
draw_grid(50);
/**
 * Draw a white line between two points
 *
 * @param {number} x_1 x coordinate of first point.
 * @param {number} y_1 y coordinate of first point.
 * @param {number} x_2 x coordinate of second point.
 * @param {number} y_2 y coordinate of second point.
 * @return {null} 
 */
function text_box(x,y,w,h, bCol, tCol, message){
    ctx.fillStyle=bCol;
    ctx.strokeStyle='rgb(255,255,255)';
    ctx.lineWidth=1;
    //create and fill-draw the rectangle
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.stroke();
    // reset the context for the text color
    ctx.fillStyle=tCol;
    var myFont= "bold 25px monospace";
    // position and draw text in middle of box
    ctx.font=myFont;
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    var output = message;
    ctx.fillText(output, x+w/2,y+h/2);
}
// create one text box
text_box(0,0,300,50, "rgb(100,200,0)", "rgb(255,255,255)", "Little Text");
// create a set using an array and a loop
box_list = ["hello", "goodbye", "see you"]
box_height = 50;
for(var i =0 ; i<box_list.length; i++){
text_box(300,200+i*box_height,300,box_height, "rgb(0,0,100)", "rgb(255,255,255)", box_list[i]);
}

/**
 * Draw a rectangle with rounded edges
 *
 * @param {number} x_1 x coordinate of first point.
 * @param {number} y_1 y coordinate of first point.
 * @param {number} x_2 x coordinate of second point.
 * @param {number} y_2 y coordinate of second point.
 * @return {null} 
 */
function rounded_rectangle(x,y,w,h, bCol = "rgb(0,0,255)"){
    console.log("function called")
    ctx.fillStyle=bCol;
    ctx.lineWidth=1;
    // corner radius cannot be more than half the height
    var rad = 100;
    if(rad > h/2){
        rad = h/2;
    }
    ctx.beginPath();
    // draw in order the 4 quater circles of the rounded rectangle edges
    // straight lines will autaomatically connect them
    ctx.arc(x+rad,y+rad, rad, Math.PI,3*Math.PI/2 );
    ctx.arc(x+w-rad,y+rad, rad, 3*Math.PI/2,0 );
    ctx.arc(x+w-rad,y+h-rad, rad,0,Math.PI/2 );
    ctx.arc(x+rad,y+h-rad, rad,Math.PI/2,Math.PI );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
rounded_rectangle(50,100,200,50);


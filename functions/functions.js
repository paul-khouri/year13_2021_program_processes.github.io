/**
 * Circle with circular gradient
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
function blurredCircle(){
    // Create a radial gradient
// The inner circle is at x=110, y=90, with radius=30
// The outer circle is at x=100, y=100, with radius=70
    let x= 200
    let y = 300
    let r =10
   let gradient = ctx.createRadialGradient(x,y,0, x,y, r);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;

    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI)
    ctx.fill();
}
blurredCircle()

function blurredLine(x_1, y_1, x_2, y_2){
    let x_mid = (x_1+x_2)/2
    let y_mid = (y_1 +y_2)/2
    let w = x_2 - x_1
    let h = y_2 - y_1
    let ang = Math.atan2(h,w);
    console.log(ang*180/Math.PI)
    let length = Math.sqrt(Math.pow(w,2) + Math.pow(h, 2))
    let thickness = 5
    basicCircle(x_1, y_1, 5)
    basicCircle(x_2, y_2, 5)

    ctx.save()
    ctx.translate(x_mid, y_mid)
    ctx.rotate(ang)

    let gradient = ctx.createLinearGradient(0,0+thickness,0,0-thickness);
    gradient.addColorStop(0, 'rgba(0,255,255,0)');
    gradient.addColorStop(0.5, 'rgba(0,255,255,1)');
    gradient.addColorStop(1, 'rgba(0,255,255,0)');



    ctx.beginPath()
    ctx.rect(0 -length/2,0-thickness, length, 2*thickness)
    ctx.strokeStyle = "rgb(255,255,255)"
    ctx.fillStyle = gradient
    ctx.fill()
    //ctx.stroke()
    ctx.restore()


}
blurredLine(100,300, 400, 600)


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
function basicCircle(x,y,r, fillcolour="rgb(0,0,0)"){
    ctx.fillStyle = fillcolour;
    ctx.beginPath()
    ctx.arc(x,y,r, 0, 2*Math.PI)
    ctx.fill();
    ctx.stroke();
}
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
    for(let i=0; i< width/grid_interval; i++){
        draw_line(i*grid_interval,0,i*grid_interval,height);
    }
    for(let i=0; i< height/grid_interval; i++){
        draw_line(0,i*grid_interval,width,i*grid_interval);
    }
}
// call the function and draw the grid
draw_grid(50);
/**
 * Draw a white line between two points
 *
 * @param {number} x x coordinate of first point.
 * @param {number} y y coordinate of first point.
 * @param {number} w width.
 * @param {number} h height.
 * @param {string} bCol hex string background colour
 * @param {string} tCol hex string text colour
 * @param {string} message text
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
    // position and draw text in middle of box
    ctx.font="bold 25px monospace";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillText(message, x+w/2,y+h/2);
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
    // draw in order the 4 quarter circles of the rounded rectangle edges
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


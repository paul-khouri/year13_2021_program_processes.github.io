console.log("curves js called")
var colArray=[
    [
    "rgba(255,255,255,1)", "rgba(153,153,153,1)", "rgba(0,0,0,1)", 
    "rgba(204,0,0,1)","rgba(255,204,51,1)","rgba(51,51,255,1)",
    "rgba(0,153,204,1)","rgba(255,255,153,1)","rgba(255,255,102,1)"
    ],
    [
        "rgba(255,255,255,0.5)", "rgba(153,153,153,0.5)", "rgba(0,0,0,0.5)", 
        "rgba(204,0,0,0.5)","rgba(255,204,51,0.5)","rgba(51,51,255,0.5)",
        "rgba(0,153,204,0.5)","rgba(255,255,153,0.5)","rgba(255,255,102,0.5)"
        ],
    [
        "rgba(255,255,255,0)", "rgba(153,153,153,0)", "rgba(0,0,0,0)", 
        "rgba(204,0,0,0)","rgba(255,204,51,0)","rgba(51,51,255,0)",
        "rgba(0,153,204,0)","rgba(255,255,153,0)","rgba(255,255,102,0)"
        ]
    ]
//drawCircle x, y, radius, fill(boolean), stroke(boolean)
//drawRectangle x, y, width, height fill(boolean), stroke(boolean)
//drawLine takes x y start and x y end, line width
ctx.strokeStyle= colArray[0][0];
ctx.lineWidth=5;
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
ctx.stroke();
ctx.fillStyle = colArray[0][7];
drawCircle(20,20,10,true,false);
drawCircle(20,100,10,true,false);
drawCircle(200,100,10,true,false);
drawCircle(200,20,10,true,false);
drawLine(20,20,20,100,1);
drawLine(200,100,200,20,1);

function bCurve(x_1,y_1, cx_1, cy_1, cx_2, cy_2, x_2,y_2,){
ctx.strokeStyle= colArray[0][0];
ctx.lineWidth=5;
ctx.beginPath();
ctx.moveTo(x_1, y_1);
ctx.bezierCurveTo(cx_1, cy_1, cx_2, cy_2, x_2, y_2,);
ctx.closePath();
ctx.stroke();

ctx.fillStyle = colArray[1][7];
ctx.fill();
drawCircle(x_1,y_1,10,true,false);
drawCircle(cx_1,cy_1,10,true,false);
drawCircle(cx_2,cy_2,10,true,false);
drawCircle(x_2,y_2,10,true,false);
drawLine(x_1,y_1,cx_1,cy_1,1);
drawLine(x_2,y_2,cx_2,cy_2,1);

}

bCurve(20,300, 20,400, 200,200, 200, 300);

ctx.save();
ctx.translate(450, 100);
var degree= 30;
ctx.rotate(Math.PI / 180 * degree);
bCurve(-50,0, -50,100, 50,-100, 50, 0);
ctx.restore();

ctx.save();
ctx.translate(450, 300);
bCurve(-50,0, -50,100, 50,-100, 50, 0);
ctx.scale(1, -1);
bCurve(-50,0, -50,100, 50,-100, 50, 0);

ctx.closePath();

ctx.restore();

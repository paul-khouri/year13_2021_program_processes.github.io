drawRectangle(20,20,200,130, col[0][3], undefined, undefined);
drawRectangle(20,170,200,130, undefined, col[1][6], 9);
drawRectangle(20,320,200,130, col[0][3], col[0][6], 4);
drawRectangle(240,20,700,430,undefined,col[0][6], 4);

drawCircle(590, 235, 100, col[0][7], col[1][0], 10)

drawLine(240,450, 940,20, col[0][2], 1);
drawLine(240,20, 940,450, col[0][2], 1);
let x= 50
let space = 300
drawTextBox(x, 480, 260,"Button One", col[0][2],col[0][5]);
drawTextBox(x+space, 480, 260,"Button Two", col[0][2],col[0][5]);
drawTextBox(x+2*space, 480, 260,"Button Three", col[0][2],col[0][5]);
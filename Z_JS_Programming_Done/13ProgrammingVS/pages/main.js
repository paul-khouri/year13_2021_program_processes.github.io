console.log(' main js has been called')
// class Button x,y,w,h,text, c_1, c_2, c_3, canvas
var myButton = new Button(50,50,200,50, "Next Page", colArray[0][0], colArray[0][3], colArray[0][4] , canvas);
var page1 = new Page(width, height, "Page 1", myButton, colArray[0][4], colArray[2][6], colArray[0][4]);
var page2 = new Page(width, height, "Page 2", myButton, colArray[0][4], colArray[2][7], colArray[0][4]);
var page3 = new Page(width, height, "Page 3", myButton, colArray[0][4], colArray[2][8], colArray[0][4]);
var page4 = new Page(width, height, "Page 4", myButton, colArray[0][4], colArray[2][5], colArray[0][4]);
pageArray = [];
pageArray.push(page1, page2, page3, page4);
var pageNum = 1;
function animate(){
    ctx.clearRect(0, 0, width, height);
    pageArray[pageNum].update();
    console.log
    if(pageArray[pageNum].getClicked()){
        pageNum+= 1;
        pageNum = pageNum%pageArray.length;
    }
    window.requestAnimationFrame(animate);
}
animate();
//please have a console log at the top of each js file
//with its name
//you will be loading multiple files later on and need basic checks 
//to know files have loaded
console.log("myfile js file has been called");
 // This code connects to the canvas using its id name
 // it then sets a 2 dimensional context
canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
// define width and height
var width = 800;
var height =600;
//assign to the canvas
canvas.width = width;
canvas.height = height;
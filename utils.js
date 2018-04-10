//grabing canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Get Canvas Coordinates on click
canvas.addEventListener("mousedown", mouseDown, false);

function mouseDown(e)
{
    if (e.button === 2)
    { //right click 
     
    }
    else
    {
        let coordinates = getMouseCoordinates(e);

        trackColor = getPixelRGB(coordinates.x, coordinates.y);
    }
}

function getMouseCoordinates(e)
{
    var x;
    var y;

    if (e.pageX || e.pageY)
    {
        x = e.pageX;
        y = e.pageY;
    }
    else
    {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return {x, y}
}

/**
 * Returns R, G, B values for a pixel on x, y position
 * @param {*} x 
 * @param {*} y 
 */
function getPixelRGB(x, y){

    var imageData = context.getImageData(0, 0, width, height);
    var pixels = imageData.data;

    let pixIndex = x*4 + y*4 * width;

    return {
        r: pixels[pixIndex],
        g: pixels[pixIndex + 1],
        b: pixels[pixIndex + 2]
    }
}

/**
 * Euclidean distance RGB no sqrt
 * @param {*} r1 
 * @param {*} g1 
 * @param {*} b1 
 * @param {*} r2 
 * @param {*} g2 
 * @param {*} b2 
 */
function rgbDistance(r1, g1, b1, r2, g2, b2) {

    return Math.pow((r2-r1), 2) + Math.pow((g2-g1),2) + Math.pow((b2-b1), 2)                
}

/**
 * Euclidean distance x, y no sqrt
 * @param {*} x0 
 * @param {*} y0 
 * @param {*} x1 
 * @param {*} y1 
 */
function distance(x0, y0, x1, y1){

    return Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2);
}

/**
 * Draw a circle
 * @param {*} x 
 * @param {*} y 
 * @param {*} radius 
 */
function drawCircle(x, y, radius, fill){

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    if(fill){
        context.fillStyle = 'gray';
        context.fill();
    }
    context.lineWidth = 5;
    context.strokeStyle = 'green';
    context.stroke();
}

function drawLine(x0, y0, x1, y1){

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineWidth = 2;
    context.strokeStyle = 'blue';
    context.stroke();
}

/**
 * Linear interpolation, imprecise method, which does not guarantee v = v1 when t = 1
 * @param {*} v0 origin
 * @param {*} v1 target
 * @param {*} t step 
 */
function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
  }

/**
 * Linear interpolation, precise method, which guarantees v = v1 when t = 1.
 * @param {*} v0 origin
 * @param {*} v1 target
 * @param {*} t step 
 */
function lerpPrecise(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
}

function min(x0, x1){

    if(x1 <= x0){

        return x1;
    }

    return x0;
}

function max(x0, x1){

    if(x0 <= x1){
        
        return x1;
    }

    return x0;
}
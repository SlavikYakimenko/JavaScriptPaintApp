var canvas = document.getElementById('paint');
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth; //set canvas width to the width of the screen
canvas.height = window.innerHeight; //set canvas width to the height of the screen

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var radius = 10;
var mouseDrag = false;

var putPoint = function(e) { //painting function

    if (mouseDrag) {

        ctx.lineWidth = radius * 2;
        ctx.lineTo(e.clientX, e.clientY); // draw line to the new mouse point
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2, true); //draw point
        ctx.fill();
        ctx.beginPath(); // eliminate the dots problem while dragging at varying speeds
        ctx.moveTo(e.clientX, e.clientY);
    }

}

var doDraw = function(e) { //painting function - draws only when mousedown 
    mouseDrag = true;
    putPoint(e); //puts point on a click
}

var dontDraw = function() { //dont paint when mousemove, unless clicked
    mouseDrag = false;
    ctx.beginPath(); // open a new path so that on next drag the new line doesnt link to the old sketch because the path is open
}

canvas.addEventListener('mousedown', doDraw) //mousedown event
canvas.addEventListener('mousemove', putPoint); //mousemove event
canvas.addEventListener('mouseup', dontDraw); //mouseup event

var minimumRadius = 0.05, //min limit 
    maximumRadius = 1000, // max limit
    defaultRadius = 10, // default value
    interval = 5,
    radVal = document.getElementById('val'),
    decRad = document.getElementById('decrement'),
    incRad = document.getElementById('increment');

var setRadius = function(newRadius) { //function to set radius and interval
    if (newRadius < minimumRadius) {
        newRadius = minimumRadius;
    } else if (newRadius > maximumRadius) {
        newRadius = maximumRadius;
    }
    radius = newRadius;
    if (radius == minimumRadius) {
        interval = 0.95; //on increase set radius = 1
    } else if (radius >= 1 && radius < 5) {
        interval = 1; //on increase set radius = 2,3,4,5
    } else if (radius >= 5 && radius < maximumRadius) {
        interval = 5.00; // on icrease set radius = 10, 15...1000
    }
    ctx.lineWidth = radius * 2;
    radVal.innerHTML = radius;

}

decRad.addEventListener('click', function() {
    setRadius(radius - interval); //on click calls the function to decrease radius
});

incRad.addEventListener('click', function() {
    setRadius(radius + interval); //on click calls the function to increase radius
});

setRadius(10);

var swatches = document.getElementsByClassName('pallete'); //returns all the elements with the class swatch

for (var i = 0; i < swatches.length; i++) { //iterate through the colors
    swatches[i].addEventListener('click', setSwatch); //call the set Pallete function
}

var setColors = function setColor(color) {

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    var active = document.getElementsByClassName('active')[0]; //reference to already active pallete
    if (active) { //removal of class if active
        active.className = 'pallete';
    }

}

function setSwatch(e) { //function to select clicked pallete, set the color and add active class

    var pallete = e.target; //event object returns the element that is clicked
    setColors(pallete.style.backgroundColor); //calls the set color function
    pallete.className += ' active'; //appends the active class

}
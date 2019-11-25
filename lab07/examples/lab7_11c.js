var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var my_gradient = context.createLinearGradient(0, 0, 300, 225);

my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "white");

context.fillStyle = my_gradient;
context.fillRect(0, 0, 300, 225);
context.moveTo(250,200);
context.arc(200,200,50,0,1.5*Math.PI);
context.strokeStyle = "#F00";
context.stroke();

pktx = 355;
pkty = 200;
startx = 200;
starty = 300;
endx = 350;
endy = 300;

context.beginPath();
context.moveTo(startx,starty);
context.quadraticCurveTo(pktx,pkty,endx,endy);
//context.closePath();
context.strokeStyle = "red";
context.stroke();

context.fillRect(pktx, pkty, 3, 3);

context.beginPath();
context.moveTo(startx, starty);
context.lineTo(pktx, pkty);
context.moveTo(endx, endy);
context.lineTo(pktx, pkty);
context.strokeStyle = "black";
context.stroke();

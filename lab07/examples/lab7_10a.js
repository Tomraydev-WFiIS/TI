//function draw_b() {
  var b_canvas = document.getElementById("canvas");
  var b_context = b_canvas.getContext("2d");
  b_context.fillStyle = 'red';
  b_context.fillRect(50, 25, 150, 50);
  b_context.fillStyle = 'green';
  b_context.fillRect(50,100,150, 50);
  
  
  b_context.strokeRect(25,15,200,200);
//}
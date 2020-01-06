'use strict';
window.onload = main;

// Mandelbrot constants
const MAX_ITER = 80;
const RE_START = -2;
const RE_END = 1;
const IM_START = -1;
const IM_END = 1;

function main(){
	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext("2d");
	let cx = canvas.width/2;
	let cy = canvas.height/2;
	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white';


	function infiniteCircle(x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI, false);
		ctx.stroke();
		if(r > 10){
			infiniteCircle(x-r, y, r/2);
			infiniteCircle(x+r, y, r/2);
			infiniteCircle(x, y+r, r/2);
			infiniteCircle(x, y-r, r/2);
		}
	}

	function cantorLine(x, y, len){
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x+len,y);
		ctx.stroke();
		if(len >= 1){
			cantorLine(x, y+10, len/3);
			cantorLine(x + len*2/3, y+10, len/3);
		}
	}

	function sierpinskiCarpet(x, y, a){
		ctx.fillRect(x-a/2, y-a/2, a, a);
		if (a >= 10){
			sierpinskiCarpet(x, y - a, a/3);// top
			sierpinskiCarpet(x + a, y - a, a/3);// top right
			sierpinskiCarpet(x + a, y, a/3);// right
			sierpinskiCarpet(x + a, y + a, a/3);// bottom right
			sierpinskiCarpet(x, y + a, a/3);// bottom
			sierpinskiCarpet(x - a, y + a, a/3);// bottom left
			sierpinskiCarpet(x - a, y, a/3);// left
			sierpinskiCarpet(x - a, y - a, a/3);// top left
		}
	}

	function fractalTree(x,y,len, angle, rotation=0){
		// angle = angle * (Math.random()*2 + 1);
		console.log(angle);
		let dx = len * Math.sin(rotation);
		let dy = len * Math.cos(rotation);

		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x + dx,y - dy);
		ctx.stroke();
		if (len >= 1){
			fractalTree(x + dx, y - dy, len*0.6, angle, rotation - angle*Math.PI/180);
			fractalTree(x + dx, y - dy, len*0.6, angle, rotation + angle*Math.PI/180);
		}
	}

	function mandelbrot(data){
		let h = canvas.height;
		let w = canvas.width;
		for(let y = 0; y < h; y++){
			for(let x = 0; x < w; x++){
				// Convert pixel coordinate to complex number
				let c = math.complex(
					RE_START + (x/w) * (RE_END - RE_START),
					IM_START + (y/h) * (IM_END - IM_START)
				);

				// Compute the number of iterations
				let n = getIterations(c);

				// Color depends on number of iterations
				let hue = n/MAX_ITER;
				let value = n < MAX_ITER ? 1 : 0;
				let color = HSVtoRGB(hue, 1, value);

				// Color the point
				data[4*(y*w + x)] = color.r;
				data[4*(y*w + x)+1] = color.g;
				data[4*(y*w + x)+2] = color.b;
				data[4*(y*w + x)+3] = 255;
			}
		}
	}

	function getIterations(c){
		let z = math.complex(0,0);
		let n = 0;
		while(absComplex(z) <= 2 && n < MAX_ITER){
			z = math.add(math.multiply(z,z), c); // optimize?
			n++;
		}
		if (n == MAX_ITER){
			return MAX_ITER;
		}
		// return n;
		return n + 1 - Math.log(Math.log2(absComplex(z)));
	}

	function absComplex(z){
		return Math.sqrt(z.re*z.re + z.im*z.im);
	}

	function HSVtoRGB(h, s, v) {
		// h,s,v in between [0,1]
		var r, g, b, i, f, p, q, t;
		if (arguments.length === 1) {
			s = h.s, v = h.v, h = h.h;
		}
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		};
	}

	
	
	// sierpinskiCarpet(cx, cy, 300);
	// fractalTree(cx,canvas.height,100, 30);

	// var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
	// console.time('mandelbrot');
	// mandelbrot(imageData.data);
	// console.timeEnd('mandelbrot');
	// ctx.putImageData(imageData,0,0);
}
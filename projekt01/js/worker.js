importScripts("../js/math.js")

// Mandelbrot constants
const RE_START = -2;
const RE_END = 1;
const IM_START = -1;
const IM_END = 1;


function infiniteCircle(x, y, r, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.stroke();
    if(r > 10){
        infiniteCircle(x-r, y, r/2, ctx);
        infiniteCircle(x+r, y, r/2, ctx);
        infiniteCircle(x, y+r, r/2, ctx);
        infiniteCircle(x, y-r, r/2, ctx);
    }
}

function cantorLine(x, y, len, ctx) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+len,y);
    ctx.stroke();
    if(len >= 1){
        cantorLine(x, y+10, len/3, ctx);
        cantorLine(x + len*2/3, y+10, len/3, ctx);
    }
}

function sierpinskiCarpet(x, y, a, ctx) {
    ctx.fillRect(x-a/2, y-a/2, a, a);
    if (a >= 10){
        sierpinskiCarpet(x, y - a, a/3, ctx);// top
        sierpinskiCarpet(x + a, y - a, a/3, ctx);// top right
        sierpinskiCarpet(x + a, y, a/3, ctx);// right
        sierpinskiCarpet(x + a, y + a, a/3, ctx);// bottom right
        sierpinskiCarpet(x, y + a, a/3, ctx);// bottom
        sierpinskiCarpet(x - a, y + a, a/3, ctx);// bottom left
        sierpinskiCarpet(x - a, y, a/3, ctx);// left
        sierpinskiCarpet(x - a, y - a, a/3, ctx);// top left
    }
}

function fractalTree(ctx, x,y,len, angle, rotation=0) {
    // angle = angle * (Math.random()*2 + 1);
    let dx = len * Math.sin(rotation);
    let dy = len * Math.cos(rotation);

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + dx,y - dy);
    ctx.stroke();
    if (len >= 1){
        fractalTree(ctx, x + dx, y - dy, len*0.6, angle, rotation - angle*Math.PI/180);
        fractalTree(ctx, x + dx, y - dy, len*0.6, angle, rotation + angle*Math.PI/180);
    }
}

function fractalTreeAnimated(ctx, x,y,len, angle, rotation=0, timeout) {
    let dx = len * Math.sin(rotation);
    let dy = len * Math.cos(rotation);

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + dx,y - dy);
    ctx.stroke();
    if (len >= 1){
        setTimeout(function() {
            fractalTreeAnimated(ctx, x + dx, y - dy, len*0.6, angle, rotation - angle*Math.PI/180, timeout);
            fractalTreeAnimated(ctx, x + dx, y - dy, len*0.6, angle, rotation + angle*Math.PI/180, timeout);
        }, timeout)
    }
}

function mandelbrot(data, canvas, MAX_ITER) {
    let h = canvas.height;
    let w = canvas.width;
    for(let y = 0; y < h; y++){
        for(let x = 0; x < w; x++){
            // Convert pixel coordinate to complex number
            let c = math.complex(
                RE_START + (x/w) * (RE_END - RE_START),
                IM_START + (y/h) * (IM_END - IM_START)
            );

            // Calculate the number of iterations
            let n = getIterations(c, MAX_ITER);

            // Calculate the color
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

function getIterations(c, MAX_ITER) {
    let z = math.complex(0,0);
    let n = 0;
    while(absComplex(z) <= 2 && n < MAX_ITER){
        z = math.add(math.multiply(z,z), c); // optimize?
        n++;
    }
    if (n == MAX_ITER){
        return MAX_ITER;
    }
    return n + 1 - Math.log(Math.log2(absComplex(z)));
}

function absComplex(z) {
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

function welcomeAnimation(ctx, canvas) {
    fractalTreeAnimated(ctx, canvas.width/2, canvas.height, canvas.height*0.4, 40, 0, 50);
}

var ctx, canvas, cy, cx;

onmessage = function(evt) {
    switch (evt.data.cmd){
        case 'welcome':
            canvas = evt.data.canvas;
            ctx = canvas.getContext("2d");
            cx = canvas.width/2;
            cy = canvas.height/2;
            ctx.strokeStyle = 'white';
            ctx.fillStyle = 'white';
            welcomeAnimation(ctx, canvas);
            break;

        case 'mandelbrot':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            console.time('mandelbrot');
            mandelbrot(imageData.data, canvas, evt.data.MAX_ITER);
            console.timeEnd('mandelbrot');
            ctx.putImageData(imageData, 0, 0);
            break;

        case 'sierpinskiCarpet':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // sierpinskiCarpet(cx, cy, evt.data.side, ctx); // tak nie działa - rysują się tylko 3
            sierpinskiCarpet(cx, cy, 100, ctx); // a tak działa, o co w tym chodzi?
            break;

        case 'fractalTree':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            fractalTree(ctx, cx, canvas.height, evt.data.len, evt.data.angle);
            break;

        case 'circle':
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            // infiniteCircle(cx, cy, evt.data.radius, ctx); // tutaj też nie działa.
            infiniteCircle(cx, cy, 100, ctx);
            break;
    }
    postMessage("done");
};
var worker;

function main() {
    'use strict';
    function startWorker() {
        var offscreen = document.querySelector('#mainCanvas').transferControlToOffscreen();
        worker = new Worker('../js/worker.js');
        worker.onmessage = function(evt){
            document.getElementById("progress").innerHTML = "";
        }
        worker.postMessage({ canvas: offscreen, cmd: "welcome" }, [offscreen]);
    }
    startWorker();
    
    document.getElementById("changeResolution").addEventListener("click", function() {
        // stop worker
        worker.terminate();
        worker = undefined;
        
        // remove old canvas
        var resX = document.getElementById("resX").value;
        var resY = document.getElementById("resY").value;
        var oldCanvas = document.querySelector('#mainCanvas');
        oldCanvas.parentNode.removeChild(oldCanvas);

        // create new canvas
        var newCanvas = document.createElement("CANVAS");
        newCanvas.id = "mainCanvas";
        newCanvas.width = resX;
        newCanvas.height = resY;
        var content = document.querySelector('#drawing')
        content.appendChild(newCanvas);

        // start new worker
        startWorker();
    });

    document.getElementById("btn-draw").addEventListener("click", function() {
        document.getElementById("progress").innerHTML = "Generowanie grafiki";
        var mode = document.getElementById("selectFractal").value;

        switch (mode){
            case 'mandelbrot':
                var MAX_ITER = document.getElementById("mandelbrotIter").value;
                worker.postMessage({ cmd: mode, MAX_ITER: MAX_ITER });
                break;

            case 'sierpinskiCarpet':
                var side = document.getElementById("sierpinskiSide").value;
                worker.postMessage({ cmd: mode, side: side });
                break;
    
            case 'fractalTree':
                var angle = document.getElementById("treeAngle").value;
                var len = document.getElementById("treeLength").value;
                worker.postMessage({ cmd: mode, angle: angle, len: len });
                break;
    
            case 'circle':
                var radius = document.getElementById("circleRadius").value;
                worker.postMessage({ cmd: mode, radius: radius });
                break;
        }
    });


    document.getElementById("drawing-link").addEventListener("click", function() {
        document.getElementById("drawing-page").style.display = 'block';
        document.getElementById("history-page").style.display = 'none';
        document.getElementById("examples-page").style.display = 'none';
    });

    document.getElementById("history-link").addEventListener("click", function() {
        document.getElementById("drawing-page").style.display = 'none';
        document.getElementById("history-page").style.display = 'block';
        document.getElementById("examples-page").style.display = 'none';
    });

    document.getElementById("examples-link").addEventListener("click", function() {
        document.getElementById("drawing-page").style.display = 'none';
        document.getElementById("history-page").style.display = 'none';
        document.getElementById("examples-page").style.display = 'block';
    });
}

function displayOptions(index){
    switch(index){
        case 0:
            document.getElementById("optionsMandelbrot").style.display = 'block';
            document.getElementById("optionsSierpinskiCarpet").style.display = 'none';
            document.getElementById("optionsFractalTree").style.display = 'none';
            document.getElementById("optionsCircle").style.display = 'none';
            break;

        case 1:
            document.getElementById("optionsMandelbrot").style.display = 'none';
            document.getElementById("optionsSierpinskiCarpet").style.display = 'block';
            document.getElementById("optionsFractalTree").style.display = 'none';
            document.getElementById("optionsCircle").style.display = 'none';
            break;

        case 2:
            document.getElementById("optionsMandelbrot").style.display = 'none';
            document.getElementById("optionsSierpinskiCarpet").style.display = 'none';
            document.getElementById("optionsFractalTree").style.display = 'block';
            document.getElementById("optionsCircle").style.display = 'none';
            break;

        case 3:
            document.getElementById("optionsMandelbrot").style.display = 'none';
            document.getElementById("optionsSierpinskiCarpet").style.display = 'none';
            document.getElementById("optionsFractalTree").style.display = 'none';
            document.getElementById("optionsCircle").style.display = 'block';
            break;
    }
}

window.onload = main;

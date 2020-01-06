'use strict';
window.onload = main;
var worker;

function main(){

	function startWorker(){
		const offscreen = document.querySelector('#mainCanvas').transferControlToOffscreen();
		worker = new Worker('../js/worker.js');
		worker.postMessage({ canvas: offscreen, cmd: "welcome" }, [offscreen]);
	}
	startWorker();
	
	document.getElementById("changeResolution").addEventListener("click", function(){
		// stop worker
		worker.terminate();
		worker = undefined;
		
		// remove old canvas
		let resX = document.getElementById("resX").value;
		let resY = document.getElementById("resY").value;
		let oldCanvas = document.querySelector('#mainCanvas');
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

	document.getElementById("btn-draw").addEventListener("click", function(){
		var cmd = document.getElementById("selectFractal").value;
		worker.postMessage({ cmd: cmd });
	});

	document.getElementById("drawing-link").addEventListener("click", function(){
		document.getElementById("drawing-page").style.display = 'block';
		document.getElementById("history-page").style.display = 'none';
		document.getElementById("examples-page").style.display = 'none';
	});

	document.getElementById("history-link").addEventListener("click", function(){
		document.getElementById("drawing-page").style.display = 'none';
		document.getElementById("history-page").style.display = 'block';
		document.getElementById("examples-page").style.display = 'none';
	});

	document.getElementById("examples-link").addEventListener("click", function(){
		document.getElementById("drawing-page").style.display = 'none';
		document.getElementById("history-page").style.display = 'none';
		document.getElementById("examples-page").style.display = 'block';
	});
}

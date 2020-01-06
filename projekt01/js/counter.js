'use strict';
var w;
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("../js/worker.js");
        }
        w.onmessage = function(event) {
            $("#counter").html(event.data);
        };
    } else {
        $("#counter").html("Sorry, your browser does not support Web Workers...");
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}
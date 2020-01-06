var i = 0;
function Count() {
    postMessage(++i);
    setTimeout("Count()",1000);
}
Count();
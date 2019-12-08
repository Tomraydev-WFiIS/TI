function send(event){
    event.preventDefault(); // prevent page reload
    figure_name = 'figure_name=' + encodeURIComponent(document.form1.figure_name.value);
    vertex_n = 'vertex_n=' + encodeURIComponent(document.form1.vertex_n.value);

    x0 = 'x0=' + encodeURIComponent(document.form1.x0.value);
    x1 = 'x1=' + encodeURIComponent(document.form1.x1.value);
    x2 = 'x2=' + encodeURIComponent(document.form1.x2.value);
    x3 = 'x3=' + encodeURIComponent(document.form1.x3.value);
    x4 = 'x4=' + encodeURIComponent(document.form1.x4.value);

    y0 = 'y0=' + encodeURIComponent(document.form1.y0.value);
    y1 = 'y1=' + encodeURIComponent(document.form1.y1.value);
    y2 = 'y2=' + encodeURIComponent(document.form1.y2.value);
    y3 = 'y3=' + encodeURIComponent(document.form1.y3.value);
    y4 = 'y4=' + encodeURIComponent(document.form1.y4.value);

    data = [figure_name, vertex_n, x0, x1, x2, x3, x4, y0, y1, y2, y3, y4];
    data = data.join("&");
    console.log("data: " + data);
    let XHR = new XMLHttpRequest();                  // utworz obiekt XHR
    XHR.open('POST', "../cgi-bin/lab08/save_figure.py", true);  // otworz polaczenie z plikiem python - asynchroniczne true

    XHR.onreadystatechange = function (aEvt) {
        console.log("XHR.readyState: " + XHR.readyState);
        console.log("XHR.status: " + XHR.status);
        if (XHR.readyState == 4) {
            if (XHR.status == 200)  {
                console.log("XHR.responseText: " + XHR.responseText);
                alert("Pomyslnie dodano figure");
            }
        }  
    }

    XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  // ustaw header
    XHR.send(data);
}

function getFigures(){
    
}

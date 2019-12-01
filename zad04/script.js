function draw(data) {
    let canvas = document.getElementById('histogram');
    let ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    ctx.font = "14px Arial";
    ctx.clearRect(0, 0, w,h);

    let color = ['green', 'yellow', 'orange', 'blue'];
    let courses = ["Bazy danych","Metody numeryczne","Analiza obrazów","Techniki internetowe"];
    let id = ["BD", "MN", "AO", "TI"];
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = color[i];
        ctx.fillRect(i*0.25*w, h - 30 - data[id[i]]*5, 0.25*w, data[id[i]]*5);
        ctx.fillText(courses[i], i*0.25*w +16, h-10); //label
        ctx.fillText(data[id[i]], i*0.25*w +0.12*w, h - 50 - data[id[i]]*5);// counter
    }
}

function send(event){
    event.preventDefault(); // prevent page reload
    let choice = document.form1.course.value;    // wczytaj formularz
    let XHR = new XMLHttpRequest();                  // utworz obiekt XHR
    XHR.open('POST', "../cgi-bin/zad04/update.py", true);  // otworz polaczenie z plikiem python - asynchroniczne true
    data = 'info=' + encodeURIComponent(choice)
    
    XHR.onreadystatechange = function (aEvt) {
        console.log("XHR.readyState: " + XHR.readyState);
        console.log("XHR.status: " + XHR.status);
        if (XHR.readyState == 4) {
            if (XHR.status == 200)  {
                console.log("XHR.responseText: " + XHR.responseText);
                data = JSON.parse(XHR.responseText);   //wczytaj dane
                console.log("data: " + JSON.stringify(data))
                draw(data);   //rysuj histogram
            }
        }  
    }

    XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  // ustaw header
    XHR.send(data);
}

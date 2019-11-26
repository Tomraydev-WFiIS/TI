function draw() {
    let canvas = document.getElementById('histogram');
    let ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    ctx.font = "14px Arial";

    let color = ['green', 'yellow', 'orange', 'blue'];
    let courses = ["Bazy danych","Metody numeryczne","Analiza obrazów","Techniki internetowe"];
    let data = [25, 11, 42, 89]; //dummy
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = color[i];
        ctx.fillRect(i*0.25*w, h - 30 - data[i], 0.25*w, data[i]);
        ctx.fillText(courses[i], i*0.25*w +16, h-10);
    }
}

function send(event){
    event.preventDefault(); // prevent page reload
    let choice = document.form1.course.value;    // wczytaj formularz
    let XHR = new XMLHttpRequest();                  // utworz obiekt XHR
    XHR.open('POST', "../cgi-bin/zad04/update.py", true);  // otworz polaczenie z plikiem python - asynchroniczne
    data = 'info=' + encodeURIComponent(choice)

    XHR.onreadystatechange = function (aEvt) {// onreadystatechange . . .
        if (XHR.readyState == 4) {
            if (XHR.status == 200)  {
                // console.log(XHR.responseText);
                let response = JSON.parse(XHR.responseText);   //wczytaj dane
                console.log(response) //debug
                draw();   //rysuj histogram
            }
        }  
    }

    XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  // ustaw header
    XHR.send(data);
}

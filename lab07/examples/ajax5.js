var xmlHttp;
function getRequestObject()      {
       if ( window.ActiveXObject)  {
            return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
        } else if (window.XMLHttpRequest)  {
           return (new XMLHttpRequest())  ;
        } else {
           return (null) ;
        }
  }
function sendRequest()      {
       xmlHttp = getRequestObject() ;
       if (xmlHttp) {
         try {
           var info = document.getElementById('info').value ;    
           var url = "../cgi-bin/python/ajax_form.py" ;
           var data = "info=" + encodeURIComponent(info) ;
           xmlHttp.onreadystatechange = handleResponse ;
           xmlHttp.open("POST", url, true);
           xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded") ;
           xmlHttp.send(data);
         }
         catch (e) {
           alert ("Nie mozna polaczyc sie z serwerem: " + e.toString()) ;
         }
       } else {
         alert ("Blad") ;
       }
  }
function handleResponse()      {
    myDiv = document.getElementById("MyDivElement");
    if (xmlHttp.readyState == 4) {
         if ( xmlHttp.status == 200 )  {
             response = xmlHttp.responseText;
             myDiv.innerHTML += "Status zadania: 4 (zakonczony)<br/>" ;
             myDiv.innerHTML += response + "<br/>" ;
             myDiv.innerHTML += xmlHttp.getAllResponseHeaders() + "<br />" ;
         }
    }  
}

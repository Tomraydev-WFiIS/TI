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
           var url = "../cgi-bin/python/ajax_json.py" ;
           xmlHttp.onreadystatechange = handleResponse ;
           xmlHttp.open("GET", url, true);
           xmlHttp.send(null);
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
             response = xmlHttp.response;
             myDiv.innerHTML += "Status zadania: 4 (zakonczony)<br/>" ;
             myDiv.innerHTML += response + "<br/>" ;
             var dataJSON  = JSON.parse(response) ;
             html = "" ;
             for ( var i=0; i<dataJSON.students.length ; i++)
               html += dataJSON.students[i].fname + " " + dataJSON.students[i].lname + "<br/>" ;
             myDiv.innerHTML += html ;
             myDiv.innetHTML += dataJSON + "<br/>" ;
             myDiv.innerHTML += xmlHttp.getAllResponseHeaders() + "<br />" ;
         }
    }  
}

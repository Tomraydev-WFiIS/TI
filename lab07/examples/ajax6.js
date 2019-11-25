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
           var url = "../cgi-bin/python/ajax_xml.py" ;
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
             response = xmlHttp.responseXML;
             myDiv.innerHTML += "Status zadania: 4 (zakonczony)<br/>" ;
             myDiv.innerHTML += response + "<br/>" ;
             var xmlRoot = response.documentElement ;
             var fnameArray = xmlRoot.getElementsByTagName('fname') ;
             var lnameArray = xmlRoot.getElementsByTagName('lname') ;
             var html = "" ;
             for ( var i=0; i<fnameArray.length; i++) 
                 html += fnameArray.item(i).firstChild.data + " " 
                       + lnameArray.item(i).firstChild.data + "<br/>" ;
             myDiv.innerHTML += html ;
             myDiv.innerHTML += xmlHttp.getAllResponseHeaders() + "<br />" ;
         }
    }  
}

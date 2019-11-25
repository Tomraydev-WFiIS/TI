var request;
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
       request = getRequestObject() ;
       request.onreadystatechange = handleResponse ;
       request.open("GET", "../cgi-bin/python/ajax_hello.py", true);
       request.send(null);
  }
function handleResponse()      {
       if (request.readyState == 4)    {
           alert(request.responseText) ;
       }
}

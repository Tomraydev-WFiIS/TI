<?php

function do_call($host, $port, $request) { 

    $fp = fsockopen($host, $port, $errno, $errstr); 
    // if ($fp) echo "<<< OK - fp >>>" ;
    $query  = "POST /~user/XmlRpcServer.php HTTP/1.0\n" ;
    $query .= "User_Agent: My Egg Client\n" ;
    $query .= "Host: ".$host."\n" ;
    $query .= "Content-Type: text/xml\n" ;
    $query .= "Content-Length: ".strlen($request)."\n\n" ;
    $query .= $request."\n"; 

    if (!fputs($fp, $query, strlen($query))) { 
       $errstr = "Write error"; 
       echo $errstr ;
       return 0; 
    } 

    // echo "<<< return OK from server >>>" ;

    $contents = ''; 
    while (!feof($fp)) { 
        $contents .= fgets($fp); 
    } 

    fclose($fp); 
    return $contents; 
} 

print "Start XML-RPC" ;
$host = 'pascal.fis.agh.edu.pl'; 
$port = 80; 
$request = xmlrpc_encode_request('cycle', 'egg'); 
print $request ;
$response = do_call($host, $port, $request);

print "Return from Server" ;
print "--".$response."--"; 

$result  = explode( "\r\n\r\n", trim($response), 2 ) ;
$content = isset( $result[1] ) ? $result[1] : '' ;

print "..".$content."..";

$resp = xmlrpc_decode($content) ;
print "++".$resp."++" ;
/* do something with $response, e.g. print it */            
             
?>
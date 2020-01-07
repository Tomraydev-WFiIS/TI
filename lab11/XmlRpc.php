<?php

/* implementacja metody */
function impl($method_name,$params,$user_data){
  // wydruk przeslanych danych
  echo "================================================\n" ;
  echo " Dane udostepnione do funkcji na serwerze\n" ;
  echo "------------------------------------------------\n" ;
  var_dump(func_get_args('impl'));
  echo "================================================\n" ;
  return array_sum($params);
}


print "<pre>\n" ;
/* utworzenie serwera i przekazanie metody */
$s=xmlrpc_server_create();
xmlrpc_server_register_method($s,'add','impl');

/* przygotowanie zapytanie dla serwera XML-RPC */
$req=xmlrpc_encode_request('add',array(1,2,3));

// wydruk danych przeslanych do serwera
echo "================================================\n" ;
echo " Dane przeslane do serwera  {Klient ---> Serwer}\n" ;
echo "------------------------------------------------\n" ;
print htmlspecialchars($req) ;
echo "================================================\n" ;
/* przetworzenie zapytania przez serwer */
$resp=xmlrpc_server_call_method($s,$req,null);

// wydruk odpowiedzi
echo "================================================\n" ;
echo " Dane przeslane z serwera  {Klient <--- Serwer}\n" ;
echo "------------------------------------------------\n" ;
print htmlspecialchars($resp) ;
echo "================================================\n" ;

/* przetworzenie zwroconych danych */
$decoded=xmlrpc_decode($resp);
if(xmlrpc_is_fault($decoded)){
    echo 'fault!';
}
// wydruk odpowiedzi
echo "================================================\n" ;
echo " Dane przetworzone przez klienta \n" ;
echo "------------------------------------------------\n" ;
var_dump($decoded);
echo "================================================\n" ;


?>
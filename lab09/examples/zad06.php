<?php

function __autoload($class_name) {
    include $class_name . '.php' ;
}

$page = new Template() ;

$data['tytul'] = " Szablony ";  
$data['opis']  = " Prosty program ";
$data['name']  = " A. Dydejczyk ";  
$data['data']  = " 24 kwiecien 2016 ";

$file = "zad06.html" ;

$page->read($file);
$page->merge($data);
echo $page->write();

?>
<?php

function __autoload($class_name) {
    include $class_name . '.php' ;
}

$user = new User();
$user->setSession() ;

$obj = new Server();
$obj->prn_cookie();
$obj->prn_session();

?>
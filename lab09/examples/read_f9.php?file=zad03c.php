<?php

function __autoload($class_name) {
    include $class_name . '.php' ;
}

$user = new User();
$user->destroySession();

$obj = new Server();
$obj->prn_cookie();
$obj->prn_session();

?>
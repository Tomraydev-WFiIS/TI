<?php    

function __autoload($class_name) {
    include $class_name . '.php' ;
}

$obj = new Server() ;

$obj->prn_server() ;
$obj->prn_post() ;
$obj->prn_get() ;
$obj->prn_cookie() ;
$obj->prn_session() ;

?>
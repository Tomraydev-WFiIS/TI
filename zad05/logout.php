<?php
function __autoload($class_name) {
    include $class_name . '.php' ;
}
session_start();
include("templates/head.php");

$user = new User;
echo $user->logout();
echo "<a href='index.php'>Powrót do menu głównego.</a>";
?>
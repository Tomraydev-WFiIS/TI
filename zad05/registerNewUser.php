<?php

function __autoload($class_name){
    include $class_name . '.php';
}
session_start();
include("templates/head.php");

$reg = new Register;
$reg->read();
$reg->save();
echo "<a href='index.php'>Powrót do menu głównego.</a>";

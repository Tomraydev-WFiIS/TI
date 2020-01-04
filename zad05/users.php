<?php
function __autoload($class_name) {
    include $class_name . '.php' ;
}
session_start();
include("templates/head.php");
echo "
<body>
<h3>Zarejestrowani użytkownicy</h3>
";

$user = new User;
$user->printAllUsers();
echo "
<a href='index.php'>Powrót do menu głównego.</a>
</body>
";
?>
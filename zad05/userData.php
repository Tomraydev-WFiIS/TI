<?php
function __autoload($class_name) {
    include $class_name . '.php' ;
}
session_start();
include("templates/head.php");

echo '
<body>
<h3>Dane użytkownika</h3>';

$user = new User;
$user->printUser();

echo '
</body>
</html>';
echo "<a href='index.php'>Powrót do menu głównego.</a>";
?>
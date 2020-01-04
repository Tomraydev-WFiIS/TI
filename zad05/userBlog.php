<?php
function __autoload($class_name) {
    include $class_name . '.php';
}
session_start();
include("templates/head.php");

if(isset($_GET['ownerName']) && isset($_GET['ownerEmail'])){
    $ownerName = $_GET['ownerName'];
    $ownerEmail = $_GET['ownerEmail'];
} else {
    $ownerName = $_SESSION['name'];
    $ownerEmail = $_SESSION['email'];
}

$blog = new Blog($ownerName, $ownerEmail);

echo "
<body>
<h3>Blog użytkownika: $ownerName </h3>
";

if ($ownerName == $_SESSION['name']){
    echo "
    <form method='post'>
        <textarea name='blogPost' id='' cols='71' rows='6'></textarea><br>
        <input type='submit' value='Dodaj wpis'>
    </form>
    ";
}
echo "<div class='blogWrapper'>";
$blog->_read_messages();
echo "</div>";

echo "
<a href='index.php'>Powrót do menu głównego.</a>
</body>
</html>
";

if(isset($_POST['blogPost'])){
    $blog->_read();
    $blog->_save_message();
    header("Refresh:0");
}
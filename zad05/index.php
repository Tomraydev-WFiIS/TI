<?php
function __autoload($class_name) {
    include $class_name . '.php' ;
}
session_start();
include("templates/head.php");

$user = new User;
?>

<body>
    <h3>Zadanie 5 - Tomasz Rajchel</h3>
    <?php
    if ($user->isLoggedIn()){
        echo '
        <ul>
            <li><a href="userData.php">Dane użytkownika</a></li>
            <li><a href="users.php">Zarejestrowani użytkownicy</a></li>
            <li><a href="userBlog.php">Blog użytkownika</a></li>
            <li><a href="logout.php">Wylogowanie z serwisu</a></li>
        </ul>
        ';
    } else {
        echo '
        <p>Treść jest dostępna tylka dla zalogowanych użytkowników</p>
        <hr>
        <form action="login.php" method="post">
            <input type="email" name="email" placeholder="email" required></br>
            <input type="password" name="pass" placeholder="password" required></br>
            <input type="submit" value="Zaloguj się">
        </form>

        <hr>
        <form action="registerNewUser.php" method="post">
            <input type="text" name="name" placeholder="name" required></br>
            <input type="email" name="email" placeholder="email" required></br>
            <input type="password" name="pass" placeholder="password" required></br>
            <input type="submit" value="Zarejestruj się">
        </form>
        <hr>
        ';
    }
    ?>
</body>

</html>
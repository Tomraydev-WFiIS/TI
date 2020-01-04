<?php
 
class User {
    private $dbfile = "db/users.db";
    private $data = array();         

    function login(){
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $access = false;
        $dbh = dba_open($this->dbfile, "r");   
        if(dba_exists($email, $dbh)) {
            $serialized_data = dba_fetch($email, $dbh);
            $this->data = unserialize($serialized_data);
            if (password_verify($pass, $this->data['hash'])) {
                $_SESSION['auth'] = 'OK';
                $_SESSION['email'] = $this->data['email'];
                $_SESSION['name'] = $this->data['name'];
                $access = true;
            }
        }
        dba_close($dbh);   
        $text = ($access ? '<p>Uzytkownik zalogowany poprawnie.</p>' : '<p>Nieprawidłowe dane logowania.</p>');
        return $text;
    }

    function isLoggedIn() {
        if (isset ($_SESSION['auth'])) { 
           $isLoggedIn = $_SESSION['auth'] == 'OK' ? true : false;
        } else {
            $isLoggedIn = false;
        }
        return $isLoggedIn;
    }

    function logout() {
        unset($_SESSION); 
        session_destroy();   
        $text = '<p>Uzytkownik wylogowany</p>';
        return $text;
    }

    function printUser(){
        echo "<p>name: " . $_SESSION['name'] . "</p>";
        echo "<p>email: " . $_SESSION['email'] . "</p>";
    }

    function printAllUsers(){
        echo "<table><tr><th>Name</th><th>E-mail</th><th>Blog</th></tr>";
        $dbh = dba_open( $this->dbfile, "r");   
        $key = dba_firstkey($dbh);
        while ($key) {
            $serialized_data = dba_fetch($key, $dbh) ;
            $this->data = unserialize($serialized_data);
            echo "<tr>";
            echo "<td>" . $this->data['name'] . "</td>";
            echo "<td>" . $this->data['email'] . "</td>";
            $url = "userBlog.php?ownerName=" .  $this->data['name'] . "&ownerEmail=" . $this->data['email']; 
            echo "<td><a href='$url'>" . $this->data['name'] . "</td>";
            echo "</tr>";
            $key = dba_nextkey($dbh);
        }
        echo "</table>";
        dba_close($dbh);
    }
}
 
?>
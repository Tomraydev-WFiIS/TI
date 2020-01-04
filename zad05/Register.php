<?php

class Register {
    private $data = array();

    function read(){
        $this->data['name'] = $_POST['name'];
        $this->data['email'] = $_POST['email'];
        $this->data['hash'] = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    }

    function save(){
        $key = $this->data['email'];
        $value = serialize($this->data);
        
        $dbh = dba_open("db/users.db", "c");
	if(!$dbh){
		echo "<p>Nie udało się otworzyc bazy danych: db/users.db</p>";
		echo $dbh;
	    return;
	}
	if (dba_exists($key, $dbh)){
            echo "<p>Adres " . $this->data['email'] . " jest już zajęty.</p>";
        } else {
            dba_insert($key, $value, $dbh);
            echo "<p>Zarejestrowano użytkownika o adresie " . $this->data['email'] . ".</p>";
        }
        dba_close($dbh);
    }
}





?>

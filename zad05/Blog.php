<?php

class Blog implements BlogInterface {
    private $ownerName;
    private $ownerEmail;
    private $newKey = array();
    private $blogPost;
    private $dbfile = "db/blog.db";

    function __construct($ownerName, $ownerEmail){
        $this->ownerName = $ownerName;
        $this->ownerEmail = $ownerEmail;
    }

    function _read(){
        $this->newKey['email'] = $_SESSION['email'];
        $this->newKey['timestamp'] = $_SERVER['REQUEST_TIME'];
        $this->blogPost = $_POST['blogPost'];
    }

    function _save_message(){
        $key = serialize($this->newKey);
        $value = $this->blogPost;

	$dbh = dba_open($this->dbfile, "c");
	if (!$dbh){
		echo "Nie udało się otworzyc bazy danych: " . $this->dbfile;
		echo "<script>alert(\"" . "Nie udało się otworzyc bazy danych: ". $this->dbfile . "\");</script>";
		return;
	}
        dba_insert($key, $value, $dbh);
        dba_close($dbh);
    }

    function _read_messages(){
        $dbh = dba_open($this->dbfile, "c");
        $key = dba_firstkey($dbh);
        while ($key) {
            $email = unserialize($key)['email'];
            if ($email == $this->ownerEmail){
                $timestamp = unserialize($key)['timestamp'];
                $content = dba_fetch($key, $dbh) ;
                echo "<div class='blogPost'>";
                echo date('Y-m-d H:i:s', $timestamp);
                echo "<br>";
                echo "<p> $content </p>";
                echo "</div>";
            }
            $key = dba_nextkey($dbh);
        }
        dba_close($dbh);
    }
}

?>

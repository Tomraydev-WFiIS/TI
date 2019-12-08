<?php

/*
 * Pobranie danych uzytkownika z bazy 
 */

   function _read_user() {
      $email = $_SESSION['user'] ;
      $this->dbh = dba_open( $this->dbfile, "r");   
      if ( dba_exists( $email, $this->dbh ) ) {
         $serialized_data = dba_fetch($email, $this->dbh) ;
         $this->data = unserialize($serialized_data);
      }   
      dba_close($this->dbh) ;   
   }

/*
 * Pobranie danych uzytkownikow z bazy 
 */

   function _read_all() {
      $table = array();
      $this->dbh = dba_open( $this->dbfile, "r");   
      $key = dba_firstkey($this->dbh);
      while ($key) {
         $serialized_data = dba_fetch($key, $this->dbh) ;
         $this->data = unserialize($serialized_data);
         $table[$key]['email'] = $this->data['email'];
         $table[$key]['fname'] = $this->data['fname'];
         $table[$key]['lname'] = $this->data['lname'];
         $key = dba_nextkey($this->dbh);
      }    
      dba_close($this->dbh) ;  
      return $table;
   }

?>
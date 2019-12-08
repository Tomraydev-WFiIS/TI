<?php
class Register_new extends Register {

   private $dbh;
   private $dbfile = "files/datadb.db" ;

   function __construct () {
      parent::__construct() ;  
      session_start() ;
   }

/*
 *  Zapis danych do bazy
 */

   function _save () {
      $this->dbh = dba_open( $this->dbfile, "c");
      if ( ! dba_exists($this->data['email'], $this->dbh ) ) {
         $serialized_data = serialize($this->data) ;
         dba_insert($this->data['email'],$serialized_data, $this->dbh) ;
         $text = 'Dane zostały zapisane' ;
      } else {          
         $text = 'Dane dla podanego adresu e-mail sa w bazie danych' ;
      }
      dba_close($this->dbh) ;
      return $text;
   }  
}
?>
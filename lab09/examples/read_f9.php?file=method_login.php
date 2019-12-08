<?php

/*
 * Logowanie uzytkownika do serwisu 
 */

   function _login() {
      $email = $_POST['email'] ;
      $pass  = $_POST['pass'] ;
      $access = false ;
      $this->dbh = dba_open( $this->dbfile, "r");   
      if ( dba_exists( $email, $this->dbh ) ) {
         $serialized_data = dba_fetch($email, $this->dbh) ;
         $this->data = unserialize($serialized_data);
         if ( $this->data['pass'] == $pass ) {
            $_SESSION['auth'] = 'OK' ;
            $_SESSION['user'] = $email ;
            $access = true ;
         } 
      }      
      dba_close($this->dbh) ;   
      $text = ( $access ? 'Uzytkownik zalogowany' : ' Uzytkownik nie zalogowany ' ) ;
      return $text ;

   }

/*
 * Sprawdzamy czy uzytkownik jest zalogowany 
 */

   function _is_logged() {
      if ( isset ( $_SESSION['auth'] ) ) { 
         $ret = $_SESSION['auth'] == 'OK' ? true : false ;
      } else { $ret = false ; }
      return $ret ;
   } 


?>
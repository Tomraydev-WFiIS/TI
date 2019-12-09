<?php

/*
 * Wylogowanie uzytkownika do serwisu 
 */

   function _logout() {
      unset($_SESSION); 
      session_destroy();   
      $text =  'Uzytkownik wylogowany ' ;
      return $text ;
   }

?>
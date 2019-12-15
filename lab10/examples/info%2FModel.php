<?php

namespace info ;

class Model 
{

   private $table = array() ;

   function __construct() {
      $this->table['main'] = 'mvc2/ , mvc2/index.php, mvc2/index.php?sub=Info, mvc2/index.php?sub=Info&action=main' ;
      $this->table['info'] = 'mvc2/index.php?sub=Info&action=help' ;
      $this->table['list'] = 'mvc2/index.php?sub=Baza, mvc2/index.php?sub=Baza&action=list' ;
      $this->table['form'] = 'mvc2/index.php?sub=Baza&action=form' ;      
   }

   function getTable() {
     // return 'test - table' ;
     // print 'xxx' ;
     // print_r($table) ;
     return $this->table ;
   }

}

?>
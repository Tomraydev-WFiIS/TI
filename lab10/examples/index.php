<?php
/***************
 * 
 * 
 ****************/
function __autoload($class_name) {
   // print '{'.$class_name.'}' ;
   $path_to_class = __DIR__. '/' . str_replace('\\', DIRECTORY_SEPARATOR, $class_name) . '.php';
   require_once($path_to_class);
}
               
use info\Info ;
use baza\Baza ;
use test\Test ;

try {

  if (empty ($_GET['sub']))    { $contr = 'Info' ;   }
  else                         { $contr = $_GET['sub'] ; }

  if (empty ($_GET['action'])) { $action     = 'index' ;  }
  else                         { $action     = $_GET['action'] ; } 
  
  //print $contr. ' ' . $action .' - ';
  
  switch ($contr) {           
     case 'Info' :
       $contr = "info\\".$contr ;                      
       break ;
     case 'Baza' :
       $contr = "baza\\" . $contr ;
       break ;  
  }
  $controller = new $contr ;
  echo $controller->$action() ;
}
catch (Exception $e) {
  // echo 'Blad -.- : [' . $e->getCode() . '] ' . $e->getMessage() . '</br>' ;
  // echo __CLASS__.':'.__LINE__.':'.__FILE__ ;
  // $contr = new info() ;
  // echo $contr->error ( $e->getMessage() ) ;
  echo 'Error: [' . $e->getCode() . '] ' . $e->getMessage() ;

}

?>

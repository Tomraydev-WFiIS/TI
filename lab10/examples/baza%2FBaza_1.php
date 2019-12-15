<?php

namespace baza   ;

use appl\ { View, Controller } ;
// use appl\Controller ;

class Baza extends Controller 
{

    protected $layout ;
    protected $model ;

    function __construct() {
       parent::__construct();
       $this->layout = new View('main') ;
       $this->layout->css = $this->css ;
       // $this->layout->css = "<link rel=\"stylesheet\" href=\"css/main.css\" type=\"text/css\" media=\"screen\" >" ; 
       $this->layout->title  = 'Baza danych SQL' ;
       $this->layout->menu = $this->menu ;
       // $this->layout->menu = file_get_contents ('template/menu.tpl') ;
       $this->model  = new Model() ;
    }


    function listAll() {     
       $this->layout->header = 'Lista wszystkich rekordow' ;
       $this->view = new View('listAll') ;
       $this->view->data = $this->model->listAll() ;
       $this->layout->content = $this->view ; 
       return $this->layout ;
    }
    
    function insertRec() {
       $this->layout->header = 'Wprowadzanie danych do bazy' ;
       $this->view = new View('form') ;
       $this->layout->content = $this->view ;
       return $this->layout ;
    }

    function saveRec() {
       $data = $_POST['data'] ;
       $obj  = json_decode($data) ;
       if ( isset($obj->fname) and isset($obj->lname) and isset($obj->city)  ) {
       //     echo "fn= ".$obj->fname." ln= ".$obj->lname." city= ".$obj->city ;      
          $response = $this->model->saveRec($obj) ;
       }
       return ( $response ? "Dodano rekord" : "Blad " ) ;
    }

    function info ( $text ) {
       $this->layout->content = $text ;
       return $this->layout ; 
    }



    function index ()  {
       // $this->layout->content = $text ;
       return $this->layout ; 
    }

} 

?>
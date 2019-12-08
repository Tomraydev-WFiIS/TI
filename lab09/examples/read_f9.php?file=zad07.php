<?php

class Magic
{
    private $myArray = array();
    public function __set($prop, $value) {
        $this->myArray[$prop] = $value;
    }
    public function __get($prop) {
        return $this->myArray[$prop];
    }
    public function __isset($prop) {
        return isset($this->myArray[$prop]);
    }
    public function __unset($prop) {
        unset($this->myArray[$prop]);
    }
    public function __toString() {
        return "class {". __CLASS__ . "} method {". __METHOD__ ."} :" . $this->name;
    }
}
$obj = new Magic();
if (!isset($obj->name)) {
    $obj->name = "Krakow";
}
echo $obj->name."<br/>"; 
echo $obj."<br/>"; 
echo "dir {".__DIR__."} file {". __FILE__ ."} line {". __LINE__ ."}" ;

?>
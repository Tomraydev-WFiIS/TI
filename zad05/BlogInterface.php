<?php
interface BlogInterface{
    // Odczyt danych  przesłanych z  formularza
    function _read();
      
    // Metoda  _save_message()
    // Zapis przesłanej informacji na serwer w pliku blog.db 
    // bazy Berkeley DB:
    // klucz (e-mail&znacznik czasowy) => wartość(informacja)
    function _save_message();
    
    // Metoda  _read_messages()
    // Odczyt wszystkich informacji dla danego użytkownika 
    // z  bazy Berkeley DB:
    // klucz (e-mail&znacznik czasowy) => wartość(informacja) 
    function _read_messages();
}
?>
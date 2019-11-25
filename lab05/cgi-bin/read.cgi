#!/usr/bin/perl
# Program przetwarzajacy formularz
# Generowanie naglowka HTTP
print "Content-type: text/html\n\n";
# Generowanie dokumentu HTML
print "<html><head>\n";
print "<title> Display query string data  </title></head> \n";
print "<body>\n";
# Rozpoznanie metody przeslania danych przez formularz
$request_method = $ENV{'REQUEST_METHOD'};
if ($request_method eq "GET")
  {  $query_string = $ENV{'QUERY_STRING'};
     print " Metoda przeslania formularza - GET <br><hr>" ;  }
elsif ($request_method eq "POST")
  {  read(STDIN, $query_string, $ENV{'CONTENT_LENGTH'});
     print " Metoda przeslania formularza - post <br><hr>" ;  }
else
  {  print "Error - request method is illegal \n";   }
# Podzial "query string" na pare wartosci "name=value"
@name_value_pairs = split(/&/, $query_string);
foreach $name_value (@name_value_pairs)
{
    ($name, $value) = split (/=/, $name_value);
    print "Para  'name=value' zawiera nastepujace dane: $name, $value \n<br>";
}
print "</body> </html> \n";

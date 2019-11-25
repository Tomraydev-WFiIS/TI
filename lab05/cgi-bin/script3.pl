#!/usr/bin/perl -wT
print <<KONIEC_HTML;
Content-type: text/html
 
<html>
<head><title>Informacje o serwerze</title></head>
<body>
<h1>Parametry serwera</h1>
<hr><br />
<table>
<tr><td>Nazwa serwera</td>         <td>$ENV{SERVER_NAME}</td></tr>
<tr><td>Oprogramowanie serwera</td><td>$ENV{SERVER_SOFTWARE}</td></tr>
<tr><td>Protokol serwera</td>      <td>$ENV{SERVER_PROTOCOL}</td></tr>
<tr><td>Wersja CGI</td>            <td>$ENV{GATEWAY_INTERFACE}</td></tr>
</table>
</body>
<html>
KONIEC_HTML

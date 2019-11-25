#!/usr/bin/env python
import cgi
form = cgi.FieldStorage()
 
text1 = form.getvalue("data1","(no data)")
text2 = form.getvalue("data2","(no data)")
text3 = form.getvalue("data3","(no data)")
 
# print HTTP/HTML headers
print """Content-type: text/html
 
<!DOCTYPE html>
<html><head>
<title>A CGI Script</title>
</head><body>
"""
 
# print HTML body using form data
print "<p>Zawartosc pola data1 - " + text1 + ".</p>"
print "<p>Zawartosc pola data2 - " + text2 + ".</p>"
print "<p>Zawartosc pola data3 - " + text3 + ".</p>"
#print "<p>TEST OK"
print "</body></html>"

#!/usr/bin/env python3
import cgi

form = cgi.FieldStorage()

name = form.getvalue("name", "null")
surname = form.getvalue("surname", "null")
email = form.getvalue("email", "null")
studyYear = form.getvalue("studyYear", "null")

with open("../students.csv", "a") as csv:
    csv.write("\n" + ",".join([name, surname, email, studyYear]))

print("Content-type: text/html\n")
print("<p>Operacja wykonana poprawnie:</p>")
print("<p>" + name + "</p>")
print("<p>" + surname + "</p>")
print("<p>" + email + "</p>")
print("<p>" + studyYear + "</p>")
print('<a href="read.py">Zapisani studenci</a>')
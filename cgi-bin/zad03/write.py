#!/usr/bin/env python3
import cgi

form = cgi.FieldStorage()

name = form.getvalue("name", "null")
surname = form.getvalue("surname", "null")
email = form.getvalue("email", "null")
studyYear = form.getvalue("studyYear", "null")

with open("../../zad03/students.csv", "a") as csv:
    csv.write("\n" + ",".join([name, surname, email, studyYear]))

#!/usr/bin/env python

import cgi
import json

print("Content-Type: text/html\n\n")
# odbierz dane z formularza
form = cgi.FieldStorage()
figure_name = form.getvalue("figure_name")
vertex_n = form.getvalue("vertex_n")
vertices = {}
print("nazwy OK")
for i in range(int(vertex_n)):
    print(form.getvalue("x%d" % i))
    print(form.getvalue("x%d" % i))
    vertices["x%d" % i] = form.getvalue("x%d" % i)
    vertices["y%d" % i] = form.getvalue("y%d" % i)

print("slownik OK")
# zapisz do pliku
with open("../../lab08/figures.txt", "w") as f:
    f.write(json.dumps(vertices))

print("Successfuly saved: ")

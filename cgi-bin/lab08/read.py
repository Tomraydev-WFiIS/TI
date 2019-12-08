#!/usr/bin/env python

import cgi
import json

# odbierz dane z formularza
form = cgi.FieldStorage()
course = form.getvalue("info")

# wczytaj dane z pliku
with open("../../zad04/data.json", "r") as f:
    data = json.loads(f.read())

# inkrementacja
data[course] += 1

# zapisz do pliku
with open("../../zad04/data.json", "w") as f:
    f.write(json.dumps(data))

# wyslij dane do skrytu js

print("Content-Type: application/json\n\n")
print(json.dumps(data))

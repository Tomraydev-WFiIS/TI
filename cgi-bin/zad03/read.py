#!/usr/bin/env python3
def print_students():
    with open("../../zad03/students.csv") as csv:
        data = csv.read().split("\n")
        for r in data:
            r = r.split(",")
            print("<tr>")
            for e in r:
                print("<td>" + e + "</td>")
            print("</tr>")

# output
print("Content-type: text/html\n")





print("""
<!doctype html>
<html lang="pl">
    
    <head>
        <title>Zadanie 3</title>
        <meta name="author" content="Tomasz Rajchel" />
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="../../zad03/style.css" type="text/css" />
</head>

<body>
<table>
        <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Adres email</th>
            <th>Rok studiów</th>
        </tr>
""")

print_students()

print("""
</table>
</body>

</html>
""")

#!/usr/bin/python3
import sys
import os
from html import escape

sys.stderr = sys.stdout

print("Content-type: text/html")
print("\n")
print("<html><head><title>CGI ENV from python</title></head><body><p>")
print("Running:")
print("<b>Python %s</b><br><br>" % (sys.version))
print("Environmental variables:<br>")
print("<ul>")
for k in sorted(os.environ):
    print("<li><b>%s:</b>\t\t%s<br>" % (escape(k), escape(os.environ[k])))
print("</ul></p></body></html>")

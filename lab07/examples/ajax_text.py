#!/usr/bin/python
import time

print("Content-Type: text/plain")
print("Expires: Wed, 23 Dec 1980 00:30:00 GMT")
print("Last-Modified: %s GMT" % time.strftime("%a, %d %b %Y %H:%M:%S", time.gmtime()))
print("Cache-Control: no-cache, no-store, max-age=0, must-revalidate")
print("Pragma: no-cache")
print()
print(
    """
Hello, AJAX, Time %s 
"""
    % time.strftime("%a, %d %b %Y %H:%M:%S", time.gmtime())
)

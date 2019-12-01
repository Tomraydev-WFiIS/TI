#!/usr/bin/env python

import BaseHTTPServer
import CGIHTTPServer
import cgitb
import os

cgitb.enable()  ## This line enables CGI error reporting

port = int(os.getenv("VCAP_APP_PORT"))

server = BaseHTTPServer.HTTPServer
handler = CGIHTTPServer.CGIHTTPRequestHandler
server_address = ("", port)
handler.cgi_directories = ["/cgi-bin"]

httpd = server(server_address, handler)
httpd.serve_forever()

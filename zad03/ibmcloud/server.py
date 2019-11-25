#!/usr/bin/env python3
 
import BaseHTTPServer
import CGIHTTPServer
import cgitb; cgitb.enable()  ## This line enables CGI error reporting
import os
 
port = int(os.getenv('VCAP_APP_PORT'))
  
server = BaseHTTPServer.HTTPServer
handler = CGIHTTPServer.CGIHTTPRequestHandler
server_address = ("", port)
handler.cgi_directories = ["/cgi-bin"]
  
httpd = server(server_address, handler)
httpd.serve_forever()

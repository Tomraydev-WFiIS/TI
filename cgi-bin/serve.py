#!/usr/bin/env python
import os
from lxml import etree


xmlfile = open("../zad02/warehouse.xml")
xslfile = open("../zad02/warehouse.xsl")

xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom)

QUERY_STRING = os.getenv("QUERY_STRING", "name")
result = transform(xmldom, sortby=etree.XSLT.strparam(QUERY_STRING))

print("Content-type: text/html\n")
print(result)

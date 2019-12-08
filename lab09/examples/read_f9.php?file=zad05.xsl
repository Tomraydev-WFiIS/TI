<?xml version="1.0"  standalone="no" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="xml"
encoding="UTF-8"
indent="yes"
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>zadanie 1 - przetwarzanie dokumentow XML</title>
<meta name="author" content="Antoni Dydejczyk" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" href="zajecia.css" rel="stylesheet" />
</head>
<body>
<p class="title" >Przykladowe rozwiazanie zadania 1</p>
<p class="zajecia" >
Zajecia: <span><xsl:value-of select="//zajecia/nazwa" /></span>,
termin: <span><xsl:value-of select="//zajecia/termin" /></span>,
sala: <span><xsl:value-of select="//zajecia/sala" /> </span> </p>
<table>
<tr><th>Nazwisko</th><th>Imie</th><th>e-mail</th></tr>
<xsl:apply-templates select="//studenci" />
</table>
</body>
</html>
</xsl:template>
<xsl:template match="studenci">
<xsl:for-each select="//student" >
<xsl:sort select="./nazwisko/text()" />
<tr xmlns="http://www.w3.org/1999/xhtml">
<td><xsl:value-of select="nazwisko" /></td>
<td><xsl:value-of select="imie" /></td>
<td><xsl:value-of select="email" /></td>
</tr>
</xsl:for-each>
</xsl:template>
</xsl:stylesheet>


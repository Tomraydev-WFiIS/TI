<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"  />

<xsl:template match="/">
    <html lang="pl">

    <head>
        <title>Tomasz Rajchel</title>
        <link rel="stylesheet" href="../css/style.css" type="text/css" />
        <link rel="icon" href="../images/favicon.ico" type="image/x-icon" />
        <meta charset="UTF-8" />
        <meta name="author" content="Tomasz Rajchel" />
    </head>

    <body>

    <div class="title">
        <h1>Tomasz Rajchel</h1>
        <h3>Techniki Internetowe 2019/2020</h3>
    </div>

    <div class="server-box">
        <a class="server-link" href="https://tomek-ti-2019.eu-gb.mybluemix.net/">IBM Cloud</a>
        <a class="server-link" href="http://pascal.fis.agh.edu.pl/~7rajchel/TI/">Pascal</a>
    </div>

    <div class="content">
        <ul class="content-list">
            <xsl:apply-templates select="labs" />
        </ul>
    </div>

    </body>
    </html>
</xsl:template>

<xsl:template match="lab">
    <li>
        <p class="timestamp"><xsl:value-of select="timestamp" /></p>
        <p class="title"><xsl:value-of select="title" /></p>
        <ul class="nested-list">
            <xsl:apply-templates select="task" />
        </ul>
        </li>
</xsl:template>

<xsl:template match="task">
    <li>
        <a href="{link}">
            <xsl:value-of select="name" />
        </a>
    </li>
</xsl:template>

</xsl:stylesheet>

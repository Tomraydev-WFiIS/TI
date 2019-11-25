<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:param name="sortby" />
<xsl:template match="/">
    <html>
        <head>
            <title>Warehouse</title>
            <meta charset="UTF-8" />
            <meta name="author" content="Tomasz Rajchel" />
            <style>
            body {
                margin:32px;
                background-color: #fafafa;
                font-family: Arial, Helvetica, sans-serif;
                color:#444;
            }

            h1 {
                color: #ff7b33;
            }

            table, td, th  {
                border: solid 1px #444;
                text-align: center;
            }
            td, th {
                padding: 4px;
            }
            th {
                background-color: #eaeaea;
            }
            </style>
        </head>
        <body>
            <h1>Warehouse Inventory</h1>
            <xsl:apply-templates select="warehouse/group[name='Phones']" />
            <xsl:apply-templates select="warehouse/group[name='Televisions']" />
            <xsl:apply-templates select="warehouse/group[name='Cameras']" />
    
    	<p>Sort by QUERY_STRING: ?name, ?price, ?quantity</p>
    	</body>
    </html>
</xsl:template>

<xsl:template match="group">
    <h2><xsl:value-of select="./name" /></h2>
    <table>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
            <xsl:choose>
                    <xsl:when test="$sortby = 'name'">
                        <xsl:for-each select="product" >
                            <xsl:sort select="name/text()" />
                            <xsl:call-template name="product" />
                        </xsl:for-each>
                    </xsl:when>

                    <xsl:when test="$sortby = 'price'">
                        <xsl:for-each select="product" >
                            <xsl:sort select="price" data-type="number"/>
                            <xsl:call-template name="product" />
                        </xsl:for-each>                    
                    </xsl:when>

                    <xsl:when test="$sortby = 'quantity'">
                        <xsl:for-each select="product" >
                        <xsl:sort select="quantity" data-type="number"/>
                            <xsl:call-template name="product" />
                        </xsl:for-each>                    
		    </xsl:when>

                    <xsl:otherwise>
                        <xsl:for-each select="product" >
                            <xsl:sort select="name/text()" />
                            <xsl:call-template name="product" />
                        </xsl:for-each>
                    </xsl:otherwise>
            </xsl:choose>
    </table>
    <!--/xsl:if-->
</xsl:template>

<xsl:template name="product" >
    <tr>
        <!-- <td><xsl:number/></td> -->
        <td><xsl:value-of select="name" /></td>
        <td><xsl:value-of select="price" /></td>
        <td><xsl:value-of select="quantity" /></td>
    </tr>
</xsl:template>

</xsl:stylesheet>

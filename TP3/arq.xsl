<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
    <xml:output method="html" enconding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Arqueossítios</title>
            </head>
            
            <body>
                <table width="100%" border="1">
                    <tr>
                        <td width="30%" valign="top">
                            <a name="indice"/>
                            <h3>Índice</h3>
                            <ul>
                                <xsl:apply-templates mode="indice" select="//ARQELEM">
                                    <xsl:sort select="CONCEL"/>
                                </xsl:apply-templates>
                            </ul>
                        </td>
                        <td>
                            <xsl:apply-templates select="//ARQELEM">
                                <xsl:sort data-type="number" select="ALTITU"/>
                            </xsl:apply-templates>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
    
    <!--  Templates para o Indice -->
    
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="#{generate-id()}">
                <xsl:value-of select="CONCEL"/>
                <ul>
                    <xsl:apply-templates select="IDENTI"/>
                </ul>
            </a>
        </li>
    </xsl:template>
    
    <!--  Templates para o Conteúdo -->
    
    <xsl:template match="ARQELEM">
        <a name="{generate-id()}"/>
        <p><b>Identificação: </b>: <xsl:value-of select="IDENTI"/></p>
        <p><b>Concelho</b>: <xsl:value-of select="CONCEL"/></p>
        <p><b>Freguesia: </b>: <xsl:value-of select="FREGUE"/></p>
        
        <address>[<a href="#i{generate-id()}">Voltar ao Índice</a>]</address>
        <center>
            <hr width="80%"/>
        </center>
        
    </xsl:template>
    
</xsl:stylesheet>
<?php
/*
   Przyklad przetwarzania dokumnetu XML z wykorzystaniem XSL.
*/

      $xmlfile = 'zad05.xml' ;
      $xslfile = 'zad05.xsl' ;

      // date_default_timezone_set('Europe/Berlin');
      // $fdate = date ("d M Y",filemtime($xmlfile));
      $xml = new DOMDocument;
      $xml->load($xmlfile);
      //echo $xml->saveXML();
      $xsl = new DOMDocument;
      $xsl->load($xslfile);
      $proc = new XSLTProcessor;
      $proc->importStyleSheet($xsl); // attach the xsl rules
      // $proc->setParameter ('', 'fdate', $fdate );
      $template = $proc->transformToXML($xml);
      print $template ;
?>
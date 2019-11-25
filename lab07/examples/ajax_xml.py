#!/usr/bin/python
print "Content-Type: application/xml"
print
print """\
&lt;?xml version=\"1.0\" ?&gt;
&lt;students&gt;
 &lt;student&gt;
   &lt;fname&gt;Adam&lt;/fname&gt;
   &lt;lname&gt;Abacki&lt;/lname&gt;
 &lt;/student&gt;
  &lt;student&gt;
   &lt;fname&gt;Bogdan&lt;/fname&gt;
   &lt;lname&gt;Babacki&lt;/lname&gt;
 &lt;/student&gt; 
&lt;/students&gt;
"""
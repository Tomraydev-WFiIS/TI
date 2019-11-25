#include <stdio.h>
#include <stdlib.h>
#define MAXLEN 80
 
int main(void)
{
  char *lenstr;
  char input[MAXLEN];
  long len;
  printf("%s%c%c\n","Content-Type:text/html;charset=iso-8859-2",13,10);
  printf("<TITLE>Response</TITLE>\n");
  lenstr = getenv("CONTENT_LENGTH");
  if(lenstr == NULL || sscanf(lenstr,"%ld",&len)!=1 || len > MAXLEN)
     printf("<p>Error in invocation - wrong FORM probably.</p>");
  else {
     fgets(input, len+1, stdin);
     printf("\n %s",input);
  }
return 0;
}

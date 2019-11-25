top.eulerLine = EulerLine; 
            
function load_img()
	     {
           var x1=document.getElementById("x1").value;
	         var x2=document.getElementById("x2").value;
           var x3=document.getElementById("x3").value;
           var y1=document.getElementById("y1").value;
	         var y2=document.getElementById("y2").value;
           var y3=document.getElementById("y3").value;

	         var trojkat=[];
	             trojkat[0]=[];
	             trojkat[1]=[];
	             trojkat[2]=[];

	             trojkat[0][0]=parseFloat(x1);
               trojkat[0][1]=parseFloat(y1);
	             trojkat[1][0]=parseFloat(x2);
	             trojkat[1][1]=parseFloat(y2);
	             trojkat[2][0]=parseFloat(x3);
	             trojkat[2][1]=parseFloat(y3);

           window.eulerLine(trojkat);
        }
        
       
       function EulerLine(trojkat)
		    {

			     //sprawdzamy czy sie da zbudowac trojkat
			     var czy_sie_da=0;
			     var d=[];
			     d[0]=Math.sqrt( (trojkat[0][0]-trojkat[1][0])*(trojkat[0][0]-trojkat[1][0]) + (trojkat[0][1]-trojkat[1][1])*(trojkat[0][1]-trojkat[1][1]) );
			     d[1]=Math.sqrt( (trojkat[1][0]-trojkat[2][0])*(trojkat[1][0]-trojkat[2][0]) + (trojkat[1][1]-trojkat[2][1])*(trojkat[1][1]-trojkat[2][1]) );
			     d[2]=Math.sqrt( (trojkat[2][0]-trojkat[0][0])*(trojkat[2][0]-trojkat[0][0]) + (trojkat[2][1]-trojkat[0][1])*(trojkat[2][1]-trojkat[0][1]) );

			     if(d[0]+d[1]<=d[2]) czy_sie_da=1;
			     if(d[1]+d[2]<=d[0]) czy_sie_da=1;
			     if(d[0]+d[2]<=d[1]) czy_sie_da=1;

			     if(czy_sie_da==1)
			      {
				       alert("Z podanych punktow nie mozna zbudowac trojkata");
				       return 0;
			      }
			     else
			      {
				       var srodek=[];
				       srodek[0]=[];
				       srodek[1]=[];
				       srodek[2]=[];
			         for(i=0;i<3;i++)
		  		      {
					      if(i==2)
						       sasiad = 0;
					      else
						       sasiad = i+1;
					         srodek[i][0]=(trojkat[sasiad][0]+trojkat[i][0])/2;
					         srodek[i][1]=(trojkat[sasiad][1]+trojkat[i][1])/2;
				        }

				   //obliczamy wspolczynniki rownania prostych dla symetralnych bokow
				   var a_symetr=[];
				   var b_symetr=[];
				   for(i=0;i<3;i++)
				    {
				    	if(i==2)
						    sasiad = 0;
					    else
						    sasiad = i+1;
					      var A = trojkat[sasiad][1] - trojkat[i][1];
					      var B = trojkat[sasiad][0] - trojkat[i][0];
					      var C = trojkat[sasiad][0]*trojkat[i][0] - (trojkat[sasiad][1]*trojkat[i][0]);

					      a_symetr[i] = -1*(1/(A/B)); // z warunku na prostpadlosc prostych
					      b_symetr[i] = srodek[i][1] - a_symetr[i]*srodek[i][0];

				    }

				   var U=[];
				   var R=0;

				   //wyznaczamy punkt przeciecia symetralnych, czyli srodek okregu opisanego
				   U[0]= (b_symetr[1]-b_symetr[0])/(a_symetr[0]-a_symetr[1]);
				   U[1]= a_symetr[1]*U[0]+b_symetr[1];

				   //wyznaczamy promien okregu opisanego
				   R = (trojkat[1][0] - U[0])*(trojkat[1][0] - U[0]) ;
           R = R + (trojkat[1][1] - U[1])*(trojkat[1][1] - U[1] ) ;
           R = Math.sqrt(R) ;

				   var polyTrojkat = document.getElementById('trojkat');
				   var kolo = document.getElementById('kolo');
				   var k = document.getElementById('K');

           polyTrojkat.setAttribute('points',''+trojkat[0][0]+', '+trojkat[0][1]+', '+trojkat[1][0]+' '+trojkat[1][1]+', '+trojkat[2][0]+', '+trojkat[2][1]);
           kolo.setAttribute('cx',U[0]);
           kolo.setAttribute('cy',U[1]);
           kolo.setAttribute('r',R);

				   k.setAttribute('cx',U[0]);
				   k.setAttribute('cy',U[1]);
			  }
     }   

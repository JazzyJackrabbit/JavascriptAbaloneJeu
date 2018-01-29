	function affichage(){ //affichae d'une [bille ou case]

		//on efface le plateau de jeu
		//ctx.clearRect(0,0,530,620);
		
		
		//réaffiche le plateau de jeu, axe Y
		

		
		//for (y = 31; y<=39; y++){
		if(yaff<=45){
			//réaffiche le plateau de jeu, axe X
			if(xaff<=45){
			//for (x = 31; x<=39; x++){
				

				
				zaff = xaff + yaff;
				
				//affecte les modif (si modification) + efface tableau memo
				if(jmem[xaff][yaff]!=0){;
					j[xaff][yaff]=jmem[xaff][yaff];
					jmem[xaff][yaff]=0;
				};
				console.log("test:"+xaff+" "+yaff);
				
				if(zaff>65 && zaff<75){
					var ctx = document.getElementById('Plat').getContext('2d');
					var img = new Image();
					
					img.onload = function() {
					
						var taille = 10	;
						var tX=xaff-30;
						var tY=yaff-30;
						//affiche seulement entre 2 axe z (Axes x et y définit par les boucles x et y)
						
							ctx.drawImage(img, (tX)*taille, (tY)*taille);
							
						
						

					};

					if(ys==yaff && xs==xaff && mode!=3 && mode!=6){	
						if(mode==1||mode==4){
							//affiche selecteur mode position
							if(j[xaff][yaff]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
							if(j[xaff][yaff]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
							if(j[xaff][yaff]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
						};
						if(mode==2||mode==5){
							//affiche selecteur mode direction
							if(j[xaff][yaff]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png';};//pos
							if(j[xaff][yaff]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png';};//pos
							if(j[xaff][yaff]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png';};//pos
						};						
					}else{ //cases vides ou joueurs
						if(((ys==ysd&&xs==xsd)||(mode!=2&&mode!=5))||(x!=xsd||y!=ysd)){
							if(j[xaff][yaff]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/c.png';};//case vide
							if(j[xaff][yaff]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/a.png';};//j1
							if(j[xaff][yaff]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/b.png';};//j2
						}else{
							if(j[xaff][yaff]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
							if(j[xaff][yaff]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
							if(j[xaff][yaff]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
						};
					};
				};
				
				xaff++;
				if(xaff>42){yaff++;xaff=31};
				
			};
		}else{
			if(xaff<=45){
				yaff = 31;
				xaff = 31;
			};
		};
	};
	
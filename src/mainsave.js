//import Mode0 from './states/Mode0';


jQuery(document).ready(function($){
	
	var version = "1.1";
	
	console.log("Abalone - Version: "+version+" - CASTAING Alexandre");
	
	//Joueur non-IA de jouer, affiche la fleche verte
	//debutHTML();

	//en haut de la page
	$(document).scrollTop(0);
	
	// mode de jeu + passage Joueur 1
	// =0 alors rien
	// =1 alors Joueur 1 Selection position   	- En mode 2 joueur, Joueur 1 est Le 2eme joueur
	// =2 alors Joueur 1 Selection direction 
	// =3 alors passage Joueur 2	
	// =4 alors Joueur 2 Selection position  	- Joueur 2 est le joueur
	// =5 alors Joueur 2 Selection direction
	// =6 alors passage Joueur 1 (ou IA en mode 10)
	// =8 alors fin du jeu, affiche message et passage au mode 9
	// =9 alors fin du jeu officiel
	// =10 alors IA								- En mode 1 joueur, IA
	var mode = 4;
	
	//Utilisé pour empecher la page de descendre lorsque qu'on appuye sur espace
	var timerScroll = 0; 
	var timeTimerScroll = 10;
	
	var NombreJoueurs = 1;
	
	// variables tableaux et boucles
	var x = 0;
	var y = 0;
	var z = 0;
	var xx = 0;
	var yy = 0;
	var zz = 0;
	
	// nombre de billes
	var j1 = 6;
	var j2 = 6;
	
	//couleurs billes
	var clr = 0;//mode
	var clr1 = 0;//j1
	var clr2 = 0;//j2
	
	//couleurs par default	
	clr1 = "#eee";
	clr2 = "#222";
	
	// variables position selecteur départ & position selecteur final
	// position selecteur
	var xs = 35;
	var ys = 35;
	var zs = xs + ys;
	//memoires tampons 
	var xsd = xs; 
	var ysd = xs;
	var xsf = xs;
	var ysf = xs;
	
	//memoires tampons pour redefinir xs; ys sur Axe Z
	var memoxs = 0;
	var memoys = 0;
	
	//la derniere touche appuyé
	var Touche = 0;
	
	//Affiche clavier visuel (=1) ou non (=0)
	var ClavierID = 0;
	
	//variable memoire tampon IA ou multijoueur pour changer le titre de la page
	var Ttstate = "IA";
	
	//On créera une matrice a une dimention qui prendra l'axe a modifier, on a besoin de 
	var SENS = 0; // 1= positif ; -1= négatif
	var AXE = 0; // 0= X ; 1= Y ; 2= Z
	var axeV = 0; //C'est la valeur de la position dans la matrice de l'axe dans lequel on travail
	
	//Quel joueur est conserné à chaque fois
	var JoueurA = 0;
	var JoueurB = 0;
		
	//nombre de tour joués pour les 2 joueurs
	var nCoup = 0;
		
	//enregistre les 20 derniers tours pour pouvoir annuler et retourner en arriere si voulu
	var MJ=[];
	
	// =0 alors Affiche pas l'aide, =1 alors Affiche l'aide
	var aideOK = 0;
	
	//texte "C'est au tour de ~ "
	var qui = "des noirs";
	
	//memorise position selecteur pour chaque joueur
	var xsmemjr1=35;
	var ysmemjr1=35;
	var xsmemjr2=35;
	var ysmemjr2=35;
	
	//créer un tableau d'axe X et Y, (l'axe z sera la somme de x et de y)
	//si =0 alors rien, si =1 alors Joueur 1, si =2 alors Joueur 2, si =3 alors Case Vide
	var j = []; //tableau valeurs jeu
	var jmem = []; // tableau memorisation et modification dans 2eme boucle
	var k = []; // Axe à modifier
	for(x=0; x<=70; x++){
		j[x]=[];
		jmem[x]=[];
		k[x]=0; 
		MJ[x]=[];
		for(y=0; y<=70; y++){
			j[x][y]=0;
			jmem[x][y]=0;
			MJ[x][y]=[];
			for(var i5 = 0; i5 <= 50 ; i5++){
				MJ[x][y][i5]=0;
			};
		};
	};
	
	//variable sortie de condition et passage de condition ( 0=condition effectué ; 1=condition passé)
	var ps = 0; 
	
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	};
		
	//variable utilisées par l'IA
	var IA = []; //IACP tableau x y AXE & SENS pour les coups possibles avec pour valeur 1 ou + suivant l'importance du coup à faire
	var ValeurMax = 0;
	var IAxFinal = 0;
	var IAyFinal = 0;
	var AXEFinal = 0;
	var SENSFinal = 0;
	var IAx = 0;
	var IAy = 0;
	var IAz = 0;
	var IAx2 = 0;
	var IAy2 = 0;
	var IAz2 = 0;
	var AXE = 0;
	var SENS = 0;
	var AXE2 = 0;
	var SENS2 = 0;
	var distance = 0;
	var angle = 0;
	var IAverifieCoup = [];
	var NonModifie = 0;
	var NonModifie2 = 0;
	var chercheAxe = 0;
	//création matrice des positions et déplacement de l'IA
	for(var i1=0; i1<=70; i1++){
		IA[i1]=[];
		IAverifieCoup[i1]=[];
		for(var i2=0; i2<=70; i2++){
			IA[i1][i2]=[];
			IAverifieCoup[i1][i2] = 0;
			for(var i3=0; i3<=2; i3++){
				IA[i1][i2][i3]=[]; 
				for(var i4=0; i4<=1; i4++){	
					IA[i1][i2][i3][i4]=0;
				};
			};
		};
	};		
	//mémorise les coups avec le meme niveau d'importance pour chercher un déplacement au hasard
	IAxAlea=[];
	IAyAlea=[];
	AXEAlea=[];
	SENSAlea=[];
	var Vtest = 0;
	for(var i1=0; i1<=70; i1++){
		IAxAlea[i1]=0;
		IAyAlea[i1]=0;
		AXEAlea[i1]=0;
		SENSAlea[i1]=0;
	};

	// fonction Frames en boucle
	setInterval(Frames,10);
	
	jeu(); //clavier, commandes utilisateurs, vérifications et changement des positions des cases joueurs
	
	//Boucle Principal
	function Frames(){
		ScrollEnHaut();
		if(mode==8||mode==9){// si c'est la fin de la partie
			finPartie();
		}else{// sinon
			if(mode==10){IAfunction()};//Intelligence artificiel (le mode=10 etais passé lorsque NombreJoueurs=1 et que tour terminé, sinon mode=1
			limiteC(); 		//TOUS LES MODES -> empeche le selecteur de sortir du plateau
			limiteCF(); 	//empeche le selecteur de sortir de la zone de selection pour la direction
			affichage(); 	//affiche les cases et les billes du jeu
			changeJoueur();	//change de joueur
			// ..met fin a la boucle, fin partie si j1<1 ou j2<1
			if(j1<1||j2<1){
				mode = 8;
			};
		};	
	};//fin fonction Boucle Principal
	
	function ScrollEnHaut(){
	//scroll vers le haut de la page
		if(timerScroll>0){
			timerScroll -=1;
			$(document).scrollTop(0);
			if(timerScroll==1){if(Touche==48||Touche==98||Touche==55){Touche=0};};
		};
	};//fin fonction Scroll auto en haut de la page
	
	function limiteC(){ //limite curseur mode selection d'une bille, le curseur vert doit rester dans le plateau
		for (y=31;y<=39;y++){
			for (x=31;x<=39;x++){
				z = x + y;    
				zs  = xs + ys;
				//Axe x et y
				if(xs < 31){
					xs = 31
						if(Touche==113||Touche==52){ys -= 1;}// touche de gauche
					};
				if(xs > 39){
					xs = 39
						if(Touche==100||Touche==54){ys += 1;}// touche de droite
					};
				if(ys < 31){ys = 31};
				if(ys > 39){ys = 39};
				
				//Axe z
				if(zs < 66){
					xs = memoxs; ys = memoys;
					if(Touche==122||Touche==56){xs += 1; ys -= 1;} // touche du haut
					if(Touche==113||Touche==52){xs -= 1; ys += 1;}// touche de gauche
				};				
				if(zs > 74){
					xs = memoxs; ys = memoys;
					if(Touche==115||Touche==53){xs -= 1; ys += 1;} // touche du bas
					if(Touche==100||Touche==54){xs += 1; ys -= 1;}// touche de droite
				};
				memoxs = xs;
				memoys = ys;
			};
		};	
	};//fin fonction mode selection

	function limiteCF(){
		// limite curseur mode déplacement des billes, dois rester d'une case autour du selecteur depart si mode 2 ou 5
		if (mode==2||mode==5){
			if(xs < xsd - 1){
				xs = xsd - 1
					if(Touche==113||Touche==52){ys -= 1;}// touche de gauche
				};
			if(xs > xsd + 1){
				xs = xsd + 1
					if(Touche==100||Touche==54){ys += 1;}// touche de droite
				};
			if(ys < ysd - 1){ys = ysd - 1};
			if(ys > ysd + 1){ys = ysd + 1};
			if (xs < xsd && ys < ysd){
				xs = memoxsf; ys = memoysf;
				if(Touche==122||Touche==56){xs += 1; ys -= 1;} // touche du haut
				if(Touche==113||Touche==52){xs -= 1; ys += 1;}// touche de gauche
			};
			if (xs > xsd && ys > ysd){
				xs = memoxsf; ys = memoysf;
				if(Touche==115||Touche==53){xs -= 1; ys += 1;} // touche du bas
				if(Touche==100||Touche==54){xs += 1; ys -= 1;}// touche de droite
			};
			memoxsf = xs;
			memoysf = ys;
		};	
	};//fin limite du curseur en mode déplacement
	
	function jeu(){
		$("#DivAbalone").hide();
		$("#DAok").click(function(){
			$("#DivAbalone").show();
			$("#DivMessage").hide();
			$("#Qui").text("C'est au tour "+qui+".");	
		});
		$("#refresh").click(function(){//recharge le jeu
			recharger();
		});
		$("#Qui").text("");
		$("#foot").text("Copyright © 2017-2018 | CASTAING Alexandre | YNOV - Ingésup B1B | Abalone");
		$("#PTMIA").text("IA");NombreJoueurs=1; //
		$("#arrow2").append("<img src='imgs\\arrow.png' />"); //image fleche verte
		$("#version").text("Abalone - ");
		$("#version2").text("Version: "+version+".");
		$("#ClavierID").hide();
		$("#DivClavier2").hide();
		
		//on pose les billes des joueurs à la position correspondante 3 shémas aléatoires
		debutBilles();
		//remplis le tableau des anciens coups du tableau actuel (afin de ne pas faire bugguer le jeu si aucun coup réalisé)
		for(x=0; x<=70; x++){
			for(y=0; y<=70; y++){
				for(var i5 = 0; i5 <= 50 ; i5++){
					MJ[x][y][i5]=j[x][y];
				};
			};
		};
		//cache la zone d'aide
		$("#DivHelp").hide();
		//boutton aide
			$("#helpe").click(function(){
			if(aideOK==0){
				aideOK=1;
				$("#DivHelp").slideUp(300).fadeIn(2000);	
				//$("#DivHelp").show();	
			};
			$(document).scrollTop(1450);
		});
		//change le titre de la page
		$("#titrePage").text("ABALONE "+version+" - "+"IA"+" - "+j2+"/"+j1);
		//coup précédent
		$("#av").click(function(){
			AncienCoup();
		});
		// 1 joueur ou 2 joueur OPTIONS
		$("#PTMIA").click(function(){
			if(NombreJoueurs==1){$("#PTMIA").text("Multi");NombreJoueurs=3;Ttstate="Multi";}
			if(NombreJoueurs==2){$("#PTMIA").text("IA");NombreJoueurs=1;Ttstate="IA";}
			if(NombreJoueurs==3){NombreJoueurs=2};
			//change le titre de la page
			$("#titrePage").text("ABALONE "+version+" - "+Ttstate+" - "+j2+"/"+	j1);
		});
		//couleurs des billes
		$("#CLRBL").click(function(){
			changeCouleur();
		});
		//Activation ou désactivation du clavier visuel
		$("#KeyMode").click(function(){
			if($(".Pbar2").length > 0){
				$(".Pbar2").removeClass('Pbar2').addClass('Pbar');
				$(document).scrollTop(400);
			};
			ClavierID+=1;
			if(ClavierID==1){
				$("#ClavierID").slideUp(300).fadeIn(600);
				$(this).text("Oui");
			};
			if(ClavierID>1){
				ClavierID=0;
				$("#ClavierID").slideDown(300).fadeOut(600);
				$(this).text("Non");
			};
		});
		//clavier visuel 
		$("#MiniDivKey2").click(function(e){
			Touche=56;
			Clav(e);
		});
		$("#MiniDivKey4").click(function(e){
			Touche=52;
			Clav(e);
		});		
		$("#MiniDivKey6").click(function(e){
			Touche=54;
			Clav(e);
		});		
		$("#MiniDivKey8").click(function(e){
			Touche=53;
			Clav(e);
		});
		$("#MiniDivKey5").click(function(e){
			Touche=55;
			Clav(e);
		});	
		//clavier normal
		$(window).keypress(function(e){
			Touche = (e.keyCode);
			Clav(e);
		});		
	};//fin fonction jeu()
	
					var canvas = document.querySelector('canvas'),
				ctx = canvas.getContext('2d'),
				img = new Image(),
			 
				gCanvas = document.createElement('canvas'),
				gCtx = gCanvas.getContext('2d');
				gCanvas.width = canvas.width;
				gCanvas.height = canvas.height;
	
		
	function draw() {
	  var ctx = document.getElementById('Plat').getContext('2d');
	  var img = new Image();
	  img.onload = function() {
		
		
		ctx.drawImage(img, (x+(y-decay)/2-decax)*taille, (y-decay)*taille, taille, taille);
		//context.clearRect((x+(y-decay)/2-decax)*taille, (y-decay)*taille, taille, taille);
		
		//ctx.beginPath();
		/*ctx.moveTo(30, 96);
		ctx.lineTo(180, 66);
		ctx.lineTo(103, 76);
		ctx.lineTo(100, 15);
		ctx.fillRect(100, 100, 150, 150);*/
		//ctx.stroke();
		
		
	  };
	}
	
	function draw2() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
}
	
	
	function affichage(){ //affichae d'une [bille ou case]

		//on efface le plateau de jeu
		//ctx.clearRect(0,0,530,620);
		
		
		//réaffiche le plateau de jeu, axe Y
		for (y = 31; y<=39; y++){
			//réaffiche le plateau de jeu, axe X
			for (x = 31; x<=39; x++){
				
				z = x + y;
				
				//affecte les modif (si modification) + efface tableau memo
				if(jmem[x][y]!=0){;
					j[x][y]=jmem[x][y];
					jmem[x][y]=0;
				};
				
				//affiche seulement entre 2 axe z (Axes x et y définit par les boucles x et y)
				if(z>65 && z<75){
					
					var taille = 40;
					var decax = 30;
					var decay = 30;

					draw();
					
					
					//affiche selecteur (si mode 1;2;4;5)
					if(ys==y && xs==x && mode!=3 && mode!=6){	
						if(mode==1||mode==4){
							//affiche selecteur mode position
							if(j[x][y]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png';};//img depl
							if(j[x][y]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png'};//img depl
							if(j[x][y]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png'};//img depl
						};
						if(mode==2||mode==5){
							//affiche selecteur mode direction
							if(j[x][y]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png'};//pos
							if(j[x][y]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png'};//pos
							if(j[x][y]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/d.png'};//pos
						};						
					}else{ //cases vides ou joueurs
						if(((ys==ysd&&xs==xsd)||(mode!=2&&mode!=5))||(x!=xsd||y!=ysd)){
							if(j[x][y]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/c.png'};//case vide
							if(j[x][y]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/a.png'};//j1
							if(j[x][y]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/b.png'};//j2
						}else{
							if(j[x][y]==0){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png'};//img depl
							if(j[x][y]==1){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png'};//img depl
							if(j[x][y]==2){img.src = 'D:/DEV/NodeJS/jeu/imgs/p.png'};//img depl
						};
					};
					
					
					
					
					
					
				};
			};//réaffiche le plateau de jeu, axe X
		};//réaffiche le plateau de jeu, axe Y	
		
				

	};//fin fonction affichage()

	// IA (Trés grosse partie), je réunirais les bouts de codes identiques de tous le programme dans une prochaine version d'Abalone)

	function IAfunction(){

		NonModifie = 1;
		NonModifie2 = 0;
		
		for(i3=0;i3<=70;i3++){
			IAxAlea[i3]=0;
			IAyAlea[i3]=0;
			AXEAlea[i3]=0;
			SENSAlea[i3]=0;
		};
		
		ValeurMax = 0;
		i1 = 0;
		i2 = 0;
		//Vtest = 0;
		for(IAy=30;IAy<=40;IAy++){
			for(IAx=30;IAx<=40;IAx++){
				IAverifieCoup[IAx][IAy] = 0;
			};
		};
		
			for(IAmode=0;IAmode<=9;IAmode++){
				//IAmode=0 --> vérification des coups possibles et des coups à faire
				//IAmode=1 --> On valorise la bille joueur la plus proche 
				//IAmode=2 --> et les billes IA sur la limite 
				//IAmode=3 --> vérifie si il peut attaquer le joueur ou si il est suseptible de perdre une bille
				//IAmode=4 --> limite = retire la valeur du déplacement pour UNE BILLE
				//IAmode=5 --> cherche le coup le plus fort, sinon un coup au hasard (1ere étape)
				//IAmode=6 --> cherche le coup le plus fort, sinon un coup au hasard (2eme étape)
				//IAmode=7 --> cherche le coup le plus fort, sinon un coup au hasard (3eme étape)
				//IAmode=8 --> EXECUTE LE DEPLACEMENT
				//IAmode=9 --> vérifie si une bille c'est bien déplacé
				for(IAy=30;IAy<=40;IAy++){
					for(IAx=30;IAx<=40;IAx++){
						IAz = IAx + IAy;
						if(j[IAx][IAy]==JoueurA||j[IAx][IAy]==JoueurB){//si bille
						
							for(SENS=(-1);SENS<=1;SENS+=2){
								for(AXE=0;AXE<=2;AXE++){
									
									// quel joueur ?
									JoueurA=1;JoueurB=2;
									IAaxe();//L'axe en question est copier en entier dans la matrice k()
									
									//vérification des coups possibles et des coups à faire
									if(IAmode==0){					
										IA[IAx][IAy][AXE][SENS]=0; //"vide" le tableau des coups possibles					
										IAcoupPossible = 0;
										IAcoupPossibl(); // sort IAcoupPossible = 0 ou 1.
										if(IAcoupPossible == 1){
											IAcoupPossible = 0;
											/***/IA[IAx][IAy][AXE][SENS]=1+Math.trunc(getRandomArbitrary(0,1.22));
										};
										IAverifieCoup[IAx][IAy] = j[IAx][IAy];
									};		
									
									//On valorise la bille joueur la plus proche (c'est une méthode pour que l'IA ne sorte pas du plateau tous seul)
									//valorise également les billes IA sur la limite 
									if(IAmode==1){
										//console.log("ok");
										NonModifie = 1;
										if(IA[IAx][IAy][AXE][SENS]==1){ 
											if(j[IAx][IAy]==JoueurA){
												distance = 100;
												//console.log("test");
												//recherche une bille Non-IA  &  cherche la position de la bille la plus proche
												for(IAy2=30;IAy2<=40;IAy2++){
													for(IAx2=30;IAx2<=40;IAx2++){
														if(j[IAx2][IAy2]==JoueurB){//joueur
															if( ( Math.abs(IAy2-IAy) * Math.abs(IAx2-IAx) ) <distance){	
																memoIAx = IAx2; //valeurs mémorisé position de la bille Non-IA la plus proche 
																memoIAy = IAy2;
																distance = ( Math.abs(IAy2-IAy) * Math.abs(IAx2-IAx) );
															};
														};
													};
												};
												//recherche la direction /!\ les axes x et y ne sont pas perpendiculaires
												angle = Math.atan2(memoIAy - IAy, memoIAx - IAx)*180/Math.PI
												if (angle>-22.5&&angle<=45){
													AXE2 = 0;
													SENS2 = 1
												};
												if (angle>45&&angle<=112.5){
													AXE2 = 1;
													SENS2 = 1
												};
												if (angle>112.5&&angle<=157.5){
													AXE2 = 2;
													SENS2 = 1
												};
												if (angle>157.5&&angle<=-135){
													AXE2 = 0;
													SENS2 = -1
												};
												if (angle>-135&&angle<=-67.5){
													AXE2 = 1;
													SENS2 = -1
												};
												if (angle>67.5&&angle<=-22.5){
													AXE2 = 2;
													SENS2 = -1
												};
												/***/IA[IAx][IAy][AXE2][SENS2]+=1;										
											}; // fin si boule IA 
										};
									};
									if(IAmode==2){
								
										if ((IAy==31&&IAx>=35&&IAx<=39)||(IAy==39&&IAx<=35&&IAx>=31)||(IAx==31&&IAy>=35&&IAy<=39)||(IAx==39&&IAy<=35&&IAy>=31)||(IAz<=66||IAz>=74)){
											if(j[IAx][IAy]==JoueurA){
												//vérifie | oxx
												if(k[axeV]==JoueurA && k[axeV+1*SENS]==JoueurB && k[axeV+2*SENS]==JoueurB&&k[axeV-1*SENS]==0){
													/***/IA[IAx][IAy][AXE][SENS]+=2;
												}; 
												//vérifie | ooxxx
												if(k[axeV]==JoueurA && k[axeV+1*SENS]==JoueurA && k[axeV+2*SENS]==JoueurB && k[axeV+3*SENS]==JoueurB && k[axeV+4*SENS]==JoueurB&&k[axeV-1*SENS]==0){
													/***/IA[IAx][IAy][AXE][SENS]+=2;
												};	
												/***/IA[IAx][IAy][AXE][SENS]+=1;						
											};//fin si boule ennemi IA	
										};// fin si au bord de l'hexagone
									};
									if(IAmode==3){
										
										//if(IA[IAx][IAy][AXE][SENS]>0){ 
										////// PEUT ATTAQUER ----- (attaques nous sommes au bord)
											//if ((IAy==31&&IAx>=35&&IAx<=39)||(IAy==39&&IAx<=35&&IAx>=31)||(IAx==31&&IAy>=35&&IAy<=39)||(IAx==39&&IAy<=35&&IAy>=31)||(IAz<=66||IAz>=74)){
												if(j[IAx][IAy]==JoueurA){
													
													//vérifie | oxx
													if(k[axeV+1*SENS]==JoueurA && k[axeV+2*SENS]==JoueurB&&k[axeV+3*SENS]==0){	
														/***///Attr1JoueurA();
														IA[IAx][IAy][AXE][SENS]+=90;
													}; 		
													//vérifie | ooxxx
													if(k[axeV+1*SENS]==JoueurA && k[axeV+2*SENS]==JoueurA && k[axeV+3*SENS]==JoueurB && k[axeV+4*SENS]==JoueurB&&k[axeV+5*SENS]==0){
														/***///Attr2JoueurA();
														IA[IAx][IAy][AXE][SENS]+=90;
													};		
													//if(IA[IAx][IAy][AXE][SENS]>50){console.log(IA[IAx][IAy][AXE][SENS]+" "+IAx+" "+IAy+" "+AXE+" "+SENS)};
												};
												/*if(j[IAx][IAy]==JoueurB){
													
													//vérifie | oxx
													if(k[axeV]==JoueurB && k[axeV+1*SENS]==JoueurA && k[axeV+2*SENS]==JoueurA&&k[axeV-1*SENS]==0){	
														Attr1JoueurA();
														//IA[IAx][IAy][AXE][SENS]+=40;
													}; 		
													//vérifie | ooxxx
													if(k[axeV]==JoueurB && k[axeV+1*SENS]==JoueurB && k[axeV+2*SENS]==JoueurA && k[axeV+3*SENS]==JoueurA && k[axeV+4*SENS]==JoueurA&&k[axeV-1*SENS]==0){
														Attr2JoueurA();
														//IA[IAx][IAy][AXE][SENS]+=40;
													};		
												};*/
											//};
											////// EST ATTAQUé -----
											//if ((IAy==31&&IAx>=35&&IAx<=39)||(IAy==39&&IAx<=35&&IAx>=31)||(IAx==31&&IAy>=35&&IAy<=39)||(IAx==39&&IAy<=35&&IAy>=31)||(IAz<=66||IAz>=74)){
												if(j[IAx][IAy]==JoueurA){
													//vérifie | oxx
													if(k[axeV]==JoueurA && k[axeV+1*SENS]==JoueurB && k[axeV+2*SENS]==JoueurB&&k[axeV-1*SENS]==0){		
														chercheAxe = AXE;
														if(chercheAxe==0){//position a droite ou a gauche _ SI POSSIBLE /!\/
															/***/if(IA[IAx][IAy][AXE+2][SENS]>0){IA[IAx][IAy][AXE+2][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][SENS]>0){IA[IAx][IAy][AXE+1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+2][-SENS]>0){IA[IAx][IAy][AXE+2][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][-SENS]>0){IA[IAx][IAy][AXE+1][-SENS]+=50};
														};
														if(chercheAxe==1){
															/***/if(IA[IAx][IAy][AXE-1][SENS]>0){IA[IAx][IAy][AXE-1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][SENS]>0){IA[IAx][IAy][AXE+1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-1][-SENS]>0){IA[IAx][IAy][AXE-1][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][-SENS]>0){IA[IAx][IAy][AXE+1][-SENS]+=50};
														};
														if(chercheAxe==2){
															/***/if(IA[IAx][IAy][AXE-1][SENS]>0){IA[IAx][IAy][AXE-1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-2][SENS]>0){IA[IAx][IAy][AXE-2][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-1][-SENS]>0){IA[IAx][IAy][AXE-1][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-2][-SENS]>0){IA[IAx][IAy][AXE-2][-SENS]+=50};
														};
													}; 						
													//vérifie | ooxxx
													if(k[axeV]==JoueurA && k[axeV+1*SENS]==JoueurA && k[axeV+2*SENS]==JoueurB && k[axeV+3*SENS]==JoueurB && k[axeV+4*SENS]==JoueurB&&k[axeV-1*SENS]==0){
														chercheAxe = AXE;
														if(chercheAxe==0){//position a droite ou a gauche _ SI POSSIBLE /!\/
															/***/if(IA[IAx][IAy][AXE+2][SENS]>0){IA[IAx][IAy][AXE+2][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][SENS]>0){IA[IAx][IAy][AXE+1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+2][-SENS]>0){IA[IAx][IAy][AXE+2][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][-SENS]>0){IA[IAx][IAy][AXE+1][-SENS]+=50};
														};
														if(chercheAxe==1){
															/***/if(IA[IAx][IAy][AXE-1][SENS]>0){IA[IAx][IAy][AXE-1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][SENS]>0){IA[IAx][IAy][AXE+1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-1][-SENS]>0){IA[IAx][IAy][AXE-1][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE+1][-SENS]>0){IA[IAx][IAy][AXE+1][-SENS]+=50};
														};
														if(chercheAxe==2){
															/***/if(IA[IAx][IAy][AXE-1][SENS]>0){IA[IAx][IAy][AXE-1][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-2][SENS]>0){IA[IAx][IAy][AXE-2][SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-1][-SENS]>0){IA[IAx][IAy][AXE-1][-SENS]+=50};
															/***/if(IA[IAx][IAy][AXE-2][-SENS]>0){IA[IAx][IAy][AXE-2][-SENS]+=50};
														};
													};	
												};//fin si boule ennemi IA					
											//};// fin si au bord de l'hexagone
										//};
									};
									if(IAmode==4){
										
										//limite = retire la valeur du déplacement pour UNE BILLE
									
										/*if(IA[IAx][IAy][AXE][SENS]>15){
											console.log(IA[IAx][IAy][AXE][SENS]+"  "+IAx+" "+IAy+" "+AXE+" "+SENS);
										};*/
										
										if(IAz <= 66){//  
											if(SENS==-1){
												if(AXE==0||AXE==1){
													IA[IAx][IAy][AXE][SENS]=0;//console.log("1");
												};
											};
										};
										if(IAz >= 74){//   \.
											if(SENS==1){
												if(AXE==0||AXE==1){
													IA[IAx][IAy][AXE][SENS]=0;//console.log("2");
												};
											};
										};
										if(IAx >= 39){//   /.
											if(SENS==-1){
												if(AXE==2){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
											if(SENS==1){
												if(AXE==0){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
										};
										if(IAx <= 31){//  ./
											if(SENS==1){
												if(AXE==2){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
											if(SENS==-1){
												if(AXE==0){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
										};
										if(IAy <= 31){//  -
											if(SENS==-1){
												if(AXE==1||AXE==2){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
										};
										if(IAy >= 39){//  -
											if(SENS== 1){
												if(AXE==1||AXE==2){
													IA[IAx][IAy][AXE][SENS]=0;
												};
											};
										};
										
										//limite = retire la valeur du déplacement pour 2 BILLES
										
										if(IAz <= 66+2){//  .
											if(SENS==-1){
												if(AXE==0||AXE==1){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;//console.log("1");
													};
												};
											};
										};
										if(IAz >= 74-2){//   \.
											if(SENS==1){
												if(AXE==0||AXE==1){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;//console.log("2");
													};
												};
											};
										};
										if(IAx >= 39-1){//   /.
											if(SENS==-1){
												if(AXE==2){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
											if(SENS==1){
												if(AXE==0){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
										};
										if(IAx <= 31+1){//  ./
											if(SENS==1){
												if(AXE==2){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
											if(SENS==-1){
												if(AXE==0){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
										};
										if(IAy <= 31+1){//  -
											if(SENS==-1){
												if(AXE==1||AXE==2){
													if(j[IAx][IAy+1*SENS]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
										};
										if(IAy >= 39-1){//  -
											if(SENS== 1){
												if(AXE==1||AXE==2){
													if(j[IAx][IAy+1*SENS]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														IA[IAx][IAy][AXE][SENS]=0;
													};
												};
											};
										};
										
										
										//limite = retire la valeur du déplacement pour 3 BILLES !!!
										
										if(IAz <= 66+4){//  .
											if(SENS==-1){
												if(AXE==0||AXE==1){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;//console.log("1");
														};
													};
												};
											};
										};
										if(IAz >= 74-4){//   \.
											if(SENS==1){
												if(AXE==0||AXE==1){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;//console.log("2");
														};
													};
												};
											};
										};
										if(IAx >= 39-2){//   /.
											if(SENS==-1){
												if(AXE==2){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
											if(SENS==1){
												if(AXE==0){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
										};
										if(IAx <= 31+2){//  .
											if(SENS==1){
												if(AXE==2){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
											if(SENS==-1){
												if(AXE==0){
													if(j[IAx+1*SENS][IAy]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx+2*SENS][IAy]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
										};
										if(IAy <= 31+2){//  -
											if(SENS==-1){
												if(AXE==1||AXE==2){
													if(j[IAx][IAy+1*SENS]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx][IAy+2*SENS]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
										};
										if(IAy >= 39-2){//  -
											if(SENS== 1){
												if(AXE==1||AXE==2){
													if(j[IAx][IAy+1*SENS]==JoueurA||j[IAx+1*SENS][IAy+1*SENS]==JoueurA){
														if(j[IAx][IAy+2*SENS]==JoueurA||j[IAx+2*SENS][IAy+2*SENS]==JoueurA){
															IA[IAx][IAy][AXE][SENS]=0;
														};
													};
												};
											};
										};
										
									};
									//cherche le coup le plus fort, sinon un coup au hasard
									if(NonModifie2 == 0){
										if(IAmode==5){
											if(IA[IAx][IAy][AXE][SENS]>0){
												if(IA[IAx][IAy][AXE][SENS]>ValeurMax){
													ValeurMax = IA[IAx][IAy][AXE][SENS];
												};
											};
										};
										if(IAmode==6){
											if(IA[IAx][IAy][AXE][SENS]==ValeurMax){
												IAxAlea[i1]=IAx;
												IAyAlea[i1]=IAy;
												AXEAlea[i1]=AXE;
												SENSAlea[i1]=SENS;
												i1+=1;
											};
										};
										if(IAmode==7){		
											if(IA[IAx][IAy][AXE][SENS]==ValeurMax){
												i2=Math.trunc(getRandomArbitrary(0,i1+1))
												IAxFinal=IAxAlea[i2];
												IAyFinal=IAyAlea[i2];
												AXEFinal=AXEAlea[i2];	
												SENSFinal=SENSAlea[i2];	
												//console.log("-");														
											};
										};
									};
									if(	NonModifie2 == 1){
										if(IAmode==6){
											if(IA[IAx][IAy][AXE][SENS]>0){
												IAxAlea[i1]=IAx;
												IAyAlea[i1]=IAy;
												AXEAlea[i1]=AXE;
												SENSAlea[i1]=SENS;
												i1+=1;
											};
										};
										if(IAmode==7){		
											if(IA[IAx][IAy][AXE][SENS]>0){
												i2=Math.trunc(getRandomArbitrary(0,i1))
												IAxFinal=IAxAlea[i2];
												IAyFinal=IAyAlea[i2];
												AXEFinal=AXEAlea[i2];	
												SENSFinal=SENSAlea[i2];	
												//console.log("-");														
											};
										};
									};
									
									if(IAmode==8){//execute le deplacement et vérifie si déplacé
										kIn();
										IAdeplacement();
										kOut();
										if(IAverifieCoup[IAx][IAy]!=j[IAx][IAy]){Vtest=1};//si cases différentes alors 1
										if(Vtest==1){// si 
											//IAmode=0;
											Vtest=0;
											NonModifie = 0;
											if(NonModifie2 >= 1){NonModifie2 += 1};
										}else{
											//console.log("okelse");
										};
										//console.log(IAxFinal+" "+IAyFinal+" "+AXEFinal+" "+SENSFinal);
									};
									if(IAmode==9){//vérification
										if(NonModifie == 1){
											//console.log("-");
											IAmode=-1;
											if(NonModifie2 == 0){NonModifie2 = 1};
											//onsole.log(NonModifie2);
										};
									};
									
								};//Axe
							};//Sens
						};//Bille?
					};//IAx
				};//IAy
			};//IAmode
		//}while(Vtest==1);
		
		NvCoup();
		
		//Passage du tour au joueur 
		
		$("#arrow1").children().remove();
		$("#arrow2").append("<img src='imgs\\arrow.png' />");
		nombreCoup();
		$("#titrePage").text("ABALONE "+version+" - "+"IA"+" - "+j2+"/"+j1);
		$("#j1").text(j1);
		$("#j2").text(j2);
		mode = 4;
		
	};//fin fonction IAfunction

	function IAcoupPossibl(){ //sort IAcoupPossible = 1 si le coup est possible

		ps = 0; //variable passage de condition 

		if(k[axeV]==0){ps=1;};
		if(k[axeV]==JoueurB){ps=1;};
		if(k[axeV]==JoueurA){
			if(k[axeV + 1 * SENS] == 0){
				//k[axeV] = 0;k[axeV + 1 * SENS] = JoueurA; 
				IAcoupPossible = 1;
				ps=1; 
			};
			//A
			if(k[axeV + 1 * SENS] == JoueurB&&ps==0){ps=1;};
			if(k[axeV + 1 * SENS] == JoueurA&&ps==0){
				//AA
				if(k[axeV + 2 * SENS] == 0 &&ps==0){
					//k[axeV] = 0;k[axeV + 1 * SENS] = JoueurA;k[axeV + 2 * SENS] = JoueurA;
					IAcoupPossible = 1;
					ps=1;
					//continue passage;
				};
				if(k[axeV + 2 * SENS] == JoueurB&&ps==0){
					//AAA
					if(k[axeV + 3 * SENS] == 0&&ps==0){
						//k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurB; 
						IAcoupPossible = 1;
						ps=1;
					};
					if( k[axeV + 3 * SENS] == JoueurB&&ps==0){ps=1;};
					if( k[axeV + 3 * SENS] == JoueurA&&ps==0){ps=1;};
						
				};
				if(k[axeV + 2 * SENS] == JoueurA&&ps==0){
					//AAB
					if(k[axeV + 3 * SENS] == 0&&ps==0){
						//k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; 
						IAcoupPossible = 1;
						ps=1;
						
					};
					if(k[axeV + 3 * SENS] == JoueurB&&ps==0){
						if(k[axeV + 3 * SENS] == JoueurA &&ps==0){ps=1;}
						//AABA
						if(k[axeV + 4 * SENS] == 0&&ps==0){
							//k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; k[axeV + 4 * SENS] = JoueurB; 
							IAcoupPossible = 1;
							ps=1;
						};
						if( k[axeV + 4 * SENS] == JoueurB &&ps==0){
							//AABAA
							if(k[axeV + 5 * SENS] == 0 &&ps==0){
								//k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; k[axeV + 4 * SENS] = JoueurB; k[axeV + 5 * SENS] = JoueurB; 
								IAcoupPossible = 1;
								ps=1;
							};
							if( k[axeV + 5 * SENS] == JoueurB &&ps==0 ){ps=1;}
							if( k[axeV + 5 * SENS] == JoueurA &&ps==0){ps=1;}
						};
						if(k[axeV + 4 * SENS] == JoueurA &&ps==0){ps=1;}
					};
				};
			};
		};

		ps = 0;								
		
	};//fin coup possibles IA

	function IAaxe(){
		//L'axe en question du jeu est copier en entier dans la matrice k() POUR LA BOUCLE PRINCIPAL
		
		if(AXE == 0){
			for(var w = 1; w < 50; w++){
				k[w] = j[w][IAy];
			};
			axeV = IAx;
		};					
		if(AXE == 1){
			for(var w = 1; w < 50; w++){
				k[w] = j[IAx][w];
			};
			axeV = IAy;
		};
		if(AXE == 2){
			for(var w = 1; w < 50; w++){
				if((IAx + IAy) - w > 0 ){
					if((IAx + IAy) - w < 49 ){
						k[w] = j[(IAx + IAy) - w][w];
					};
				};
			};
			axeV = IAy;
		};
		// fin de copie de l'axe dans la matrice k()
	};

	function kIn(){
		//L'axe est copier en entier dans la matrice k() POUR LES NOUVELLES VALEURS DE X Y AXE SENS (3)
		if(AXEFinal == 0){
			for(var w = 1; w < 50; w++){
				k[w] = j[w][IAyFinal];
			};
			axeV = IAxFinal;
		};					
		if(AXEFinal == 1){
			for(var w = 1; w < 50; w++){
				k[w] = j[IAxFinal][w];
			};
			axeV = IAyFinal;
		};
		if(AXEFinal == 2){
			for(var w = 1; w < 50; w++){
				if((IAxFinal+ IAyFinal) - w > 0 ){
					if((IAxFinal + IAyFinal) - w < 49 ){
						k[w] = j[(IAxFinal + IAyFinal) - w][w];
					};
				};
			};
			axeV = IAyFinal;
		};
	};

	function IAdeplacement(){
		
		//'DEPLACEMENT DES PIONS DANS LA MATRICE K() ou non			
		ps = 0; //variable passage de condition
		
		if(k[axeV]==0){ps=1};
		if(k[axeV]==JoueurB){ps=1};
		if(k[axeV]==JoueurA){
			if(k[axeV + 1 * SENSFinal] == 0){
				k[axeV] = 0;k[axeV + 1 * SENSFinal] = JoueurA;ps=1;
			};
			//A
			if(k[axeV + 1 * SENSFinal] == JoueurB&&ps==0){ps=1};
			if(k[axeV + 1 * SENSFinal] == JoueurA&&ps==0){
				//AA
				if(k[axeV + 2 * SENSFinal] == 0 &&ps==0){
					k[axeV] = 0;k[axeV + 1 * SENSFinal] = JoueurA;k[axeV + 2 * SENSFinal] = JoueurA;ps=1;
					//continue passage;
				};
				if(k[axeV + 2 * SENSFinal] == JoueurB&&ps==0){
					//AAA
					if(k[axeV + 3 * SENSFinal] == 0&&ps==0){
						k[axeV] = 0; k[axeV + 1 * SENSFinal] = JoueurA; k[axeV + 2 * SENSFinal] = JoueurA; k[axeV + 3 * SENSFinal] = JoueurB; ps=1;
					};
					if( k[axeV + 3 * SENSFinal] == JoueurB&&ps==0){ps=1};
					if( k[axeV + 3 * SENSFinal] == JoueurA&&ps==0){ps=1};
						
				};
				if(k[axeV + 2 * SENSFinal] == JoueurA&&ps==0){
					//AAB
					//.log("YOLO");
					if(k[axeV + 3 * SENSFinal] == 0&&ps==0){
						k[axeV] = 0; k[axeV + 1 * SENSFinal] = JoueurA; k[axeV + 2 * SENSFinal] = JoueurA; k[axeV + 3 * SENSFinal] = JoueurA; ps=1;
						
					};
					if(k[axeV + 3 * SENSFinal] == JoueurB&&ps==0){
						//AABA
						if(k[axeV + 4 * SENSFinal] == 0&&ps==0){
							k[axeV] = 0; k[axeV + 1 * SENSFinal] = JoueurA; k[axeV + 2 * SENSFinal] = JoueurA; k[axeV + 3 * SENSFinal] = JoueurA; k[axeV + 4 * SENSFinal] = JoueurB;ps=1;
						};
						if( k[axeV + 4 * SENSFinal] == JoueurB &&ps==0){
							//AABAA
							if(k[axeV + 5 * SENSFinal] == 0 &&ps==0){
								k[axeV] = 0; k[axeV + 1 * SENSFinal] = JoueurA; k[axeV + 2 * SENSFinal] = JoueurA; k[axeV + 3 * SENSFinal] = JoueurA; k[axeV + 4 * SENSFinal] = JoueurB; k[axeV + 5 * SENSFinal] = JoueurB; ps=1
							};
							if( k[axeV + 5 * SENSFinal] == JoueurB &&ps==0 ){ps=1}
							if( k[axeV + 5 * SENSFinal] == JoueurA &&ps==0){ps=1}
						};
						if(k[axeV + 4 * SENSFinal] == JoueurA &&ps==0){ps=1}
					};
					if(k[axeV + 3 * SENSFinal] == JoueurA &&ps==0){ps=1}
				};
			};
		};
		
		ps = 0;
	};

	function kOut(){
		if(AXEFinal == 0){
			for(var w = 1; w < 50; w++){
				j[w][IAyFinal] = k[w];
			};
		};					
		if(AXEFinal == 1){
			for(var w = 1; w < 50; w++){
				j[IAxFinal][w] = k[w];
			};
		};
		if(AXEFinal == 2){
			for(var w = 1; w < 50; w++){
				if((IAxFinal + IAyFinal) - w > 0 ){
					if((IAxFinal + IAyFinal) - w < 49 ){
						j[(IAxFinal + IAyFinal) - w][w] = k[w];
					};
				};
			};
		};
	};

	function NvCoup(){ //enregistre les 20 derniers tableaux
		for(i5=50;i5>0;i5-=1){
			for(x=0; x<=70; x++){
				for(y=0; y<=70; y++){
					MJ[x][y][i5]=MJ[x][y][i5-1];
				};
			};
		};
		for(x=0; x<=70; x++){
			for(y=0; y<=70; y++){
				MJ[x][y][0]=j[x][y];
			};
		};
	};

	function AncienCoup(){
		var verifieFin = 0;
		//vérifie si 2 tableaux identiques  (=fin du tableau)
		for(x=0; x<=70; x++){
			for(y=0; y<=70; y++){ 
				if(MJ[x][y][0]==MJ[x][y][1]){verifieFin += 1};
			};
		};
		//console.log(verifieFin);
		//si tableaux non-identiques alors faire
		if (verifieFin<5041){//5041
			nombreCoupDecr();
			for(i5=0;i5<=50;i5+=1){
				for(x=0; x<=70; x++){
					for(y=0; y<=70; y++){
						MJ[x][y][i5]=MJ[x][y][i5+1];
					};
				};
			};
			for(x=0; x<=70; x++){
				for(y=0; y<=70; y++){
					j[x][y]=MJ[x][y][0]
				};
			};
		};
	};

	function finPartie(){
		if(j1<1){
			var clrgg = "noirs";
		}else{
			var clrgg = "blancs";
		};
		if(mode==8){alert("Fin de partie - Victoire pour les "+clrgg+".");mode=9;};
	};

	function changeCouleur(){
		clr += 1; if(clr > 12){clr = 0};
		$("#CLRBL").text(clr+1+"/13");
		switch(clr){
			case 0:
				clr1 = "#eee";
				clr2 = "#222";
				break;
			case 3:
				clr1 = "#e22";
				clr2 = "#22e";
				break;
			case 9:
				clr1 = "#cc5";
				clr2 = "#229";
				break;
			case 1:
				clr1 = "#FF0000";
				clr2 = "#222";
				break;
			case 2:
				clr1 = "#eee";
				clr2 = "#cc0000";
				break;
			case 5:
				clr1 = "#cdcdcd";
				clr2 = "#4B0082";
				break;				
			case 8:
				clr1 = "#BDB76B";
				clr2 = "#556B2F";
				break;
			case 4:
				clr1 = "#DAA520";
				clr2 = "#A0522D";
				break;
			case 6:
				clr1 = "#8888ff";
				clr2 = "#000088";
				break;
			case 7:
				clr1 = "#ff8888";
				clr2 = "#880000";
				break;
			case 10:
				clr1 = "#E6E6FA";
				clr2 = "#000080";
				break;
			case 11:
				clr1 = "#FF1493";
				clr2 = "#9400D3";
				break;
			case 12:
				clr1 = "#00dddd";
				clr2 = "#222";
		};
	};

	function changeJoueur(){
		//change de joueur et compte & affiche le nombre de billes.
		if(mode==3){
			nombreCoup();
			$("#titrePage").text("ABALONE "+version+" - "+"IA"+" - "+j2+"/"+j1);
			$("#arrow1").children().remove();
			$("#arrow2").append("<img src='imgs\\arrow.png' />");
			//Cherche hors de la limite si bille
			for (yy=25;yy<=45;yy++){
				for (xx=25;xx<=45;xx++){
					zz = xx + yy;    
					//Axe x, y & z
					if(xx < 31 || xx > 39 || yy < 31 || yy > 39 || zz < 66 || zz > 74){
						//retire bille et ajoute les points
						if(j[xx][yy]==1){j[xx][yy]=0;j1-=1;};
						if(j[xx][yy]==2){j[xx][yy]=0;j2-=1;};
						//change le titre de la page
						$("#titrePage").text("ABALONE "+version+" - "+Ttstate+" - "+j2+"/"+	j1);				
					};	
				};
			};
			//affiche le nouveau score
			$("#j1").text(j1);
			$("#j2").text(j2);
			mode=4;
		};
		if(mode>=6&&mode<8){
			nombreCoup();
			$("#titrePage").text("ABALONE "+version+" - "+"IA"+" - "+j2+"/"+j1);
			$("#arrow2").children().remove();
			$("#arrow1").append("<img src='imgs\\arrow.png' />");
			//Cherche hors de la limite si bille
			for (yy=25;yy<=45;yy++){
				for (xx=25;xx<=45;xx++){
					zz = xx + yy;    
					//Axe x, y & z
					if(xx < 31 || xx > 39 || yy < 31 || yy > 39 || zz < 66 || zz > 74){	
						//retire bille et ajoute les points
						if(j[xx][yy]==1){j[xx][yy]=0;j1-=1;};
						if(j[xx][yy]==2){j[xx][yy]=0;j2-=1;};
					};
				};
			};
			//affiche le nouveau score
			$("#j1").text(j1);
			$("#j2").text(j2);
			mode=1;
			//c'est le tour de l'IA
			if(NombreJoueurs==1){mode=10;};
			NvCoup();
		};
	};//fin fonction change joueur

	function nombreCoup(){
		nCoup += 1;
		if(nCoup<2){
			$("#nmbcoup").text("Coup: "+nCoup);
		}else{
			$("#nmbcoup").text("Coups: "+nCoup);
		};
		//enregistre/lit position selecteur pour chaque joueur
		
		if(mode==3||mode==10){//passe au joueur bille noir (1)
			if(NombreJoueurs == 2){
				xsmemjr2 = xs;
				ysmemjr2 = ys;
				xs = xsmemjr1;
				ys = ysmemjr1;		
				/*xs <- xs Xor xsmemjr1
				xsmemjr1 <- xsmemjr1 Xor xs
				xs <- xs Xor xsmemjr1*/
			};
			qui = "des noirs";
		};
		if(mode>=6&&mode<8){//passe au joueur 2 ou IA
			if(NombreJoueurs == 2){
				xsmemjr1 = xs;
				ysmemjr1 = ys;
				xs = xsmemjr2;
				ys = ysmemjr2;
				qui = "des blancs";
				/*xs <- xs Xor xsmemjr1
				xsmemjr1 <- xsmemjr1 Xor xs
				xs <- xs Xor xsmemjr1*/
			};
		};
		$("#Qui").text("C'est au tour "+qui+".");
	
	};
	
	function nombreCoupDecr(){//decrémente le nombre de coup lors d'un retour arriere
		nCoup = nCoup - 1;
		$("#nmbcoup").text(nCoup);
		console.log("test");
	};

	function debutBilles(){
		
		var JoueurAlea = Math.trunc(getRandomArbitrary(0, 3)); //Shémas
		var JoueurAleaS = Math.trunc(getRandomArbitrary(0, 2)); //billes Noires ou Blanches
		if(JoueurAleaS==0){JoueurAleaA = 1;JoueurAleaB = 2;}else{JoueurAleaA = 2;JoueurAleaB = 1;};
		
		if(JoueurAlea==0){
		//shemas 1
		j[35][31]=JoueurAleaB;j[36][31]=JoueurAleaB;j[37][31]=JoueurAleaB;j[38][31]=JoueurAleaB;j[39][31]=JoueurAleaB;
		j[34][32]=JoueurAleaB;j[35][32]=JoueurAleaB;j[36][32]=JoueurAleaB;j[37][32]=JoueurAleaB;j[38][32]=JoueurAleaB;j[39][32]=JoueurAleaB;
		j[35][33]=JoueurAleaB;j[36][33]=JoueurAleaB;j[37][33]=JoueurAleaB;
		j[35][39]=JoueurAleaA;j[34][39]=JoueurAleaA;j[33][39]=JoueurAleaA;j[32][39]=JoueurAleaA;j[31][39]=JoueurAleaA;
		j[34][38]=JoueurAleaA;j[35][38]=JoueurAleaA;j[36][38]=JoueurAleaA;j[33][38]=JoueurAleaA;j[32][38]=JoueurAleaA;j[31][38]=JoueurAleaA;
		j[35][37]=JoueurAleaA;j[34][37]=JoueurAleaA;j[33][37]=JoueurAleaA;
		};
		
		if(JoueurAlea==1){
		//shemas 2
		j[31][35]=JoueurAleaB;j[31][36]=JoueurAleaB;j[31][37]=JoueurAleaB;j[31][38]=JoueurAleaB;j[31][39]=JoueurAleaB;
		j[32][35]=JoueurAleaB;j[32][36]=JoueurAleaB;j[32][37]=JoueurAleaB;j[32][38]=JoueurAleaB;j[32][39]=JoueurAleaB;j[32][34]=JoueurAleaB;
		j[33][35]=JoueurAleaB;j[33][36]=JoueurAleaB;j[33][37]=JoueurAleaB;
		j[39][31]=JoueurAleaA;j[39][32]=JoueurAleaA;j[39][33]=JoueurAleaA;j[39][34]=JoueurAleaA;j[39][35]=JoueurAleaA;
		j[38][31]=JoueurAleaA;j[38][32]=JoueurAleaA;j[38][33]=JoueurAleaA;j[38][34]=JoueurAleaA;j[38][35]=JoueurAleaA;j[38][36]=JoueurAleaA;
		j[37][34]=JoueurAleaA;j[37][35]=JoueurAleaA;j[37][33]=JoueurAleaA;
		};
		
		if(JoueurAlea==2){
		//shemas 3
		j[35][31]=JoueurAleaA;j[34][32]=JoueurAleaA;j[33][33]=JoueurAleaA;j[32][34]=JoueurAleaA;j[31][35]=JoueurAleaA;
		j[36][31]=JoueurAleaA;j[35][32]=JoueurAleaA;j[34][33]=JoueurAleaA;j[33][34]=JoueurAleaA;j[32][35]=JoueurAleaA;j[31][36]=JoueurAleaA;
		j[34][34]=JoueurAleaA;j[33][35]=JoueurAleaA;j[35][33]=JoueurAleaA;
		j[35][39]=JoueurAleaB;j[36][38]=JoueurAleaB;j[37][37]=JoueurAleaB;j[38][36]=JoueurAleaB;j[39][35]=JoueurAleaB;
		j[35][38]=JoueurAleaB;j[36][37]=JoueurAleaB;j[37][36]=JoueurAleaB;j[38][35]=JoueurAleaB;j[39][34]=JoueurAleaB;j[34][39]=JoueurAleaB;
		j[37][35]=JoueurAleaB;j[35][37]=JoueurAleaB;j[36][36]=JoueurAleaB;
		};
		
	};

	function Clav(e){
		if(Touche==113||Touche==52){xs-=1;};//q
		if(Touche==100||Touche==54){xs+=1;};//d
		if(Touche==122||Touche==56){ys-=1;};//z
		if(Touche==115||Touche==53){ys+=1;};//s
		//.log("ToucheID:"+Touche);
		//.log("Mode:"+mode);
		
		if(Touche==48||Touche==98||Touche==55){
			
			timerScroll = timeTimerScroll; 
			$(document).scrollTop(0);
			
			if(mode==1||mode==4){
									//Touche=0; .log("test1");
				if(mode==1&&j[xs][ys]==1){ //si case joueur 1 selectionné
					xsd = xs;
					ysd = ys;
					mode += 1;
					Touche=0;
				} //si case joueur 2 selectionné
				if(mode==4&&j[xs][ys]==2){
					xsd = xs;
					ysd = ys;
					mode += 1;
					Touche=0;
				}

			};
		};
		
		//Condition Touche==32||Touche==48||Touche==98||Touche==98, 2eme fois pour sortir de la condition.
		if(Touche==48||Touche==98||Touche==55){
			//valide position final
			if(mode==2||mode==5){
			
				//si meme case que position depart, alors retour mode précédent
				if(xs == xsd && ys == ysd){
					mode -= 1;
				}
				else //sinon on vérifie si le coup est possible !
				{
					
					xsf = xs;
					ysf = ys;
					
					SENS = 1 //1=positif ; -1=negatif
					AXE = 0 //'0=x; 1=y; 2=z
					
					//cherche l'axe et le sens par rapport a la selection utilisateur
					if (ysf==ysd){
						AXE = 0;
						if(xsf - xsd > 0 ){SENS = 1;}else{SENS = -1;};
					};
					if (xsf==xsd){
						AXE = 1;
						if(ysf - ysd > 0 ){SENS = 1;}else{SENS = -1;};
					};
					if (xsf+ysf==xsd+ysd){
						
						if(xsf + ysf == xsd + ysd){
							AXE = 2;
							
							if((xsf + ysf) - (xsd + ysd) > 0){
								SENS = 1;
							}else{
								if(ysf - ysd > 0){SENS = 1;}else{SENS = -1;}
							};
						};
						
					};
					
					// quel joueur ?
					if(mode==2){JoueurA=1;JoueurB=2;}else{JoueurB=1;JoueurA=2;}
					
					//L'axe est copier en entier dans la matrice k()
					if(AXE == 0){
						for(var w = 1; w < 50; w++){
							k[w] = j[w][ysd];
						};
						axeV = xsd;
					};					
					if(AXE == 1){
						for(var w = 1; w < 50; w++){
							k[w] = j[xsd][w];
						};
						axeV = ysd;
					};
					if(AXE == 2){
						for(var w = 1; w < 50; w++){
							if((xsd + ysd) - w > 0 ){
								if((xsd + ysd) - w < 49 ){
									k[w] = j[(xsd + ysd) - w][w];
								};
							};
						};
						axeV = ysd;
					};
					
					//'DEPLACEMENT DES PIONS DANS LA MATRICE K() ou non
					
					ps = 0; //variable passage de condition
					
					if(k[axeV]==0){mode-=1};
					if(k[axeV]==JoueurB){mode-=1};
					if(k[axeV]==JoueurA){
						if(k[axeV + 1 * SENS] == 0){
							k[axeV] = 0;k[axeV + 1 * SENS] = JoueurA; mode = mode + 1;ps=1;
						};
						//A
						if(k[axeV + 1 * SENS] == JoueurB&&ps==0){mode = mode - 1};
						if(k[axeV + 1 * SENS] == JoueurA&&ps==0){
							//AA
							if(k[axeV + 2 * SENS] == 0 &&ps==0){
								k[axeV] = 0;k[axeV + 1 * SENS] = JoueurA;k[axeV + 2 * SENS] = JoueurA;mode = mode + 1; ps=1;
								//continue passage;
							};
							if(k[axeV + 2 * SENS] == JoueurB&&ps==0){
								//AAA
								if(k[axeV + 3 * SENS] == 0&&ps==0){
									k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurB; mode = mode + 1; ps=1;
								};
								if( k[axeV + 3 * SENS] == JoueurB&&ps==0){mode = mode - 1};
								if( k[axeV + 3 * SENS] == JoueurA&&ps==0){mode = mode - 1};
									
							};
							if(k[axeV + 2 * SENS] == JoueurA&&ps==0){
								//AAB
								//.log("YOLO");
								if(k[axeV + 3 * SENS] == 0&&ps==0){
									k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; mode = mode + 1; ps=1;
									
								};
								if(k[axeV + 3 * SENS] == JoueurB&&ps==0){
									//AABA
									if(k[axeV + 4 * SENS] == 0&&ps==0){
										k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; k[axeV + 4 * SENS] = JoueurB; mode = mode + 1; ps=1;
									};
									if( k[axeV + 4 * SENS] == JoueurB &&ps==0){
										//AABAA
										if(k[axeV + 5 * SENS] == 0 &&ps==0){
											k[axeV] = 0; k[axeV + 1 * SENS] = JoueurA; k[axeV + 2 * SENS] = JoueurA; k[axeV + 3 * SENS] = JoueurA; k[axeV + 4 * SENS] = JoueurB; k[axeV + 5 * SENS] = JoueurB; mode = mode + 1; ps=1;
										};
										if( k[axeV + 5 * SENS] == JoueurB &&ps==0 ){mode = mode - 1;}
										if( k[axeV + 5 * SENS] == JoueurA &&ps==0){mode = mode - 1;}
									};
									if(k[axeV + 4 * SENS] == JoueurA &&ps==0){mode = mode - 1;}
								};
								if(k[axeV + 3 * SENS] == JoueurA &&ps==0){mode = mode - 1;}
							};
						};
					};
					
					ps = 0;
					
					//'La matrice k() est recopier en retour dans l'axe du jeu en question  
					if(AXE == 0){
						for(var w = 1; w < 50; w++){
							j[w][ysd] = k[w];
						};
						axeV = xsd;
					};					
					if(AXE == 1){
						for(var w = 1; w < 50; w++){
							j[xsd][w] = k[w];
						};
						axeV = ysd;
					};
					if(AXE == 2){
						for(var w = 1; w < 50; w++){
							if((xsd + ysd) - w > 0 ){
								if((xsd + ysd) - w < 49 ){
									j[(xsd + ysd) - w][w] = k[w];
								};
							};
						};
						axeV = ysd;
					};
					
				};
			
			};
			
		};

	};

function recharger(){
		//recharge le jeu
		mode = 4;
		NombreJoueurs = 1;
		j1 = 6;
		j2 = 6;
		Touche = 0;
		Ttstate = "IA";
		nCoup = 0;
		xs = 35;
		ys = 35;
		for(x=0; x<=70; x++){
			for(y=0; y<=70; y++){
				j[x][y]=0;
				jmem[x][y]=0;
				for(var i5 = 0; i5 <= 50 ; i5++){
					MJ[x][y][i5]=0;
				};
			};
		};
		$("#nmbcoup").text("Coup: "+nCoup);
		
		for(var i1=0; i1<=70; i1++){
			IAxAlea[i1]=0;
			IAyAlea[i1]=0;
			AXEAlea[i1]=0;
			SENSAlea[i1]=0;
		};
		$("#arrow1").children().remove();
		$("#arrow2").children().remove();
		$("#arrow2").append("<img src='imgs\\arrow.png' />");
		
		$("#j1").text(j1);
		$("#j2").text(j2);
		
		xsmemjr1=35;
		ysmemjr1=35;
		xsmemjr2=35;
		ysmemjr2=35;
			
		debutBilles();	
		for(x=0; x<=70; x++){
			for(var i5 = 0; i5 <= 50 ; i5++){
				MJ[x][y][i5]=j[x][y];
			};
		};

	};
	
});
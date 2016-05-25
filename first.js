//: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/undefined  pour le retour des vacance tchéquer ça
//Ulysse Nedelec & Marc Lazo la Torre Production

var colonne = 12, ligne = 24;


var tempShape; // forme en mouvement actuel
var tempShapeX, tempShapeY; //position de la forme actuel
var canvas = document.getElementsByTagName("canvas")[0]; //If not set, a new frame will be captured each time the canvas change; if set to 0, one single frame will be captured.
														//https://developer.mozilla.org/fr/docs/Web/API/HTMLCanvasElement/captureStream
var ctx=canvas.getContext("2d");
var largeur = 200; 
var hauteur = 400;
var score=0;
var vitesse=600;


var largeurbloc = largeur / colonne, hauteurbloc = hauteur / ligne;
//https://openclassrooms.com/courses/la-balise-canvas-avec-javascript thcéquer ça au retour maroc

var formes = [
    [1,1,1,1], //la barre
	[1,1,0,0,1,1], //le carré
	[1,1,0, 0,0,1,1], //le Z
    [0,1,1,0,1,1], // le S
    [1,1,1,0,1], // le L
    [1,1,1,0,0,0,1], // L à l'envers
    [0,1,0,0,1,1,1] //le T
];
var couleurs = ['indigo','burlywood','darkblue','darkred','chartreuse','darkcyan','deepPink'];

var array=[];
var perdu;
//Vérifie si le resultat de la position de la forme va etre possible
function check( xBis, yBis, varTemp,booleen ) {
  
	if ( typeof xBis == "undefined"){
		xBis=0;
	}//
 
	if( typeof yBis =="undefined"){
		yBis=0;
	}
    
	if( typeof varTemp=="undefined"){
		varTemp=tempShape;
	}
	 xBis = tempShapeX + xBis;
     yBis = tempShapeY + yBis;


    for ( var y = 0; y < 4;y++ ) {
		
        for ( var x = 0; x < 4;x++ ) {
        
		if ( varTemp[ y ][ x ] ) {
                //Pour évité de passer à travers la bordure droite du rectangle
				if ( typeof array[ y + yBis ] == "undefined"){ //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/undefined
                    if (yBis == 1){ 
							perdu = true;
					}// perdu 
					booleen=false;
                    return booleen;
					}
				//pour évité de passer à travers la bordure Gauche du rectangle
                if( typeof array[ y + yBis ][ x + xBis ] == "undefined"){ //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/undefined
                     if (yBis == 1){ 
							perdu = true;
					}// perdu
                    booleen=false;
					return booleen;
                }
				// permet que le pièce ne se passe pas au travers
               if( array[ y + yBis ][ x + xBis ]){
                     if (yBis == 1){ 
							perdu = true;
					}// perdu
                    booleen=false;
					return booleen;
                } 			
			}
			}
			
            }
        
    booleen=true;
    return booleen;
}
//fonction du tp2 
function rewrite(score){
	
		document.getElementById("score").innerHTML=score;
}
function nouvelleForme() {
	
    var random =Math.floor(Math.random()*formes.length); //aléatoirisation de la création des formes
    var piece = formes[ random ];

    tempShape = [];
    for ( var y = 0; y < 4;y++ ) {
        tempShape[ y ] = [];
        for ( var x = 0; x < 4;x++ ) {
            var z = 4 * y + x;
            if ( typeof piece[ z ] != "undefined" && piece[ z ] ) { //https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/undefined
                tempShape[ y ][ x ]=random+1;
            }
            else {
                tempShape[y][x]=0;
            }
        }
    }
    // position ou la première forme apparrait
    tempShapeX = 5;
    tempShapeY = 0;
}
// continu la descente de la forme vers le bas, créer de nouvelle forme et efface une ligne si besoin
function testeur() {
	var y=0;
	var x=0;
	var yBis=0;
    if ( check( 0, 1 ) ) {
       tempShapeY++;
    }
    
    else {

        testeur2();
		
    }
 //Boucle for pour l'effacement de ligne
        testeur3();

        if(lignePleine==true){
           score++;
            for(yBis= y; yBis>0; yBis--) {
                for (x= 0; x< colonne;x++){
                    array[yBis][x]= array[yBis-1][x];
                }
            }
            y++;
		rewrite(score);
        }
    }
		//gestion du cas ou la partie est perdu
        PartiePerdu();
       
        nouvelleForme(); // Génère une nouvelle forme
    }
	
}

function testeur2(){

        // stop la forme dans la position actuel et la fixe
        //pose la pièce
        for (y=0; y<4;y++){
        for (x=0; x<4; x++){
            if ( tempShape[y][x]){
                array[ y+ tempShapeY][x +tempShapeX]= tempShape[y][x];
                }
            }
        }
}

function testeur3() {


        for (y =ligne-1;y >= 0;y--){
        var lignePleine =true;
        for (x = 0; x<colonne;x++ ) {
            if ( array[y][x]==0) {
                lignePleine =false;
                //break;
            }
        }
        }
}


function PartiePerdu() {

            if (perdu==true) { 
                    score=0;
                    alert('Vous avez perdu la partie, appuyez sur OK pour commencer une autre');
                    rewrite(score);
                    lanceurDePartie();//lance une nouvelle partie
                    perdu=false;
                return perdu;
        }

}

function lanceurDePartie() {
	  
	
 
	for (var y =0; y<ligne;y++) {
        array[y]= [];
        for (var x= 0; x<colonne;x++ ) {
            array[y][x] = 0;
        }
    }
	//Pour la première forme
    nouvelleForme();
	
    perdu =false;
	
	//https://developer.mozilla.org/fr/docs/Web/API/WindowTimers/setInterval tchéquer ça au retour du maroc
	var interval;
	interval = setInterval(testeur,vitesse);
	//intervalle de vitesse à laquelle la pièce descend en ms

	}

alert("Appuyez sur OK pour commencez la partie");
lanceurDePartie();

//dessine le plateau de jeu et l'actualisation du mouvement de la forme
function tetris() {
    ctx.clearRect(0,0,largeur,hauteur);//permet d'effacer la position précédente de la pièce

    ctx.strokeStyle = 'pink';//couleur des bordures des carré formant les pièces
    for ( var x=0; x<colonne;x++) {
        for ( var y=0; y <ligne;y++ ) {
            if ( array[y][x] ) {
                ctx.fillStyle = couleurs[array[y][x]-1];
                
				//Dessine le rectangle de jeu
				ctx.fillRect(largeurbloc*x, hauteurbloc*y, largeurbloc-1, hauteurbloc-1 );
				ctx.strokeRect(largeurbloc*x, hauteurbloc*y, largeurbloc-1, hauteurbloc-1 );
            }
        }
    }

  
    for (var y =0; y < 4; y++ ) {
        for ( var x=0; x<4;x++ ) {
            if ( tempShape[y][x]) {
                ctx.fillStyle = couleurs[tempShape[y][x]-1];
				//Dessine le rectangle de jeu	
				ctx.fillRect( largeurbloc *(tempShapeX+x), hauteurbloc *(tempShapeY+y), largeurbloc-1 , hauteurbloc-1);
    ctx.strokeRect( largeurbloc*(tempShapeX+x), hauteurbloc*(tempShapeY+y), largeurbloc-1, hauteurbloc-1);
            }
        }
    }
}

//toute les 30 ms
setInterval( tetris, 40 );
//intervalle d'affichage de rafraichissement de la position de la pièce, si trop long attention risque de manquer des positions de la pièce




//utilisation des touches clavier
document.body.onkeydown = function( e ) {
	
  

	//Retourne la forme

	function rotation( tempShape ) {
    var varTemp = [];
    for (var y=0;y<4; ++y ) {
        varTemp[y]= [];
        for (var x=0;x<4;++x) {
            varTemp[y][x] =tempShape[3-x][y];
        }
    }

    return varTemp;
									}
  var clavier = {37: 'gauche',38: 'rotation',39: 'droite',40: 'bas'};
    if ( typeof clavier[ e.keyCode ] != "undefined" ) {
        
		switch ( clavier[e.keyCode] ) {
        case 'gauche':
            if ( check( -1 ) ) {
                --tempShapeX;
            }
            break;
		case 'rotation':
            var tourne = rotation( tempShape );
            if (check(0,0,tourne)){
                tempShape=tourne;
            }
            break;
        case 'droite':
            if ( check( 1 ) ) {
                ++tempShapeX;
            }
            break;
        case 'bas':
            if ( check( 0, 1 ) ) {
                ++tempShapeY;
            }
            break;
        
		}
		
        tetris();
    }
};


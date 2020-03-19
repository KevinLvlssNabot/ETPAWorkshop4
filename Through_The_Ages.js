var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },

scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8, Scene9] //Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7, Scene8

};

this.game = new Phaser.Game(config);


var vieBarre = 2;
var score_pongiste = 5;
var score_tennisman = 5;
var scoreText_pongiste;
var scoreText_tennisman;
var boutonappuyé = 0;
var pv_car = 10;
var pv_yunah = 3;
var carre = 1;
var rectangle = 0;
var batton = 0;
var carre2 = 0;
var rectangle2 = 0;
var batton2 = 0;
var gameBoyOn = 0;
var lancer = 0;
var captureOiso = 0;
var captureC = 0;
var captureLic = 0;
var pokeballsRamassées = 0;
var murConstruit = 0;
var murConstruit_e = 0;
var lancer_e = 0;
var bulletShot = 0;
var jump = 0;
var restart = 0;
var alive = 0;

function takeManette(player, manette){
	player.setTint(0xff0000);
	this.scene.start("deuxieme_scene");
}

function hitBalle(balle, player){
	balle.setVelocityY(-600);
}

function destroyPlatforms(balle, destroyable){
	vieBarre = vieBarre - 1;
		if (vieBarre <= 0) {
				destroyable.destroy();
		}
}

function takeManetteAtari(player, manette){
	 this.scene.start("troisième_scène");
	}

function bouncePongiste(balle_pong, pongiste){
	balle_pong.setFlipX(true);
	balle_pong.setVelocityX(Phaser.Math.Between(-300, 300), 30);
	pongiste.setVelocityX(0);
}

function bounceTennisman(balle_pong, tennisman){
	balle_pong.setFlipX(true);
	balle_pong.setVelocityX(Phaser.Math.Between(-300, 300), 30);
	tennisman.setVelocityX(0);
}

function scorePongiste(balle, platforms_verti_droite, pongiste){
		score_pongiste -= 1;
    this.scoreText_pongiste.setText(score_pongiste);
			if (score_tennisman <= 0 && score_pongiste <= 0) {
					balle.destroy()
			}
}

function scoreTennisman(balle, platforms_verti_gauche, tennisman){
		score_tennisman -= 1;
    this.scoreText_tennisman.setText(score_tennisman);
				if (score_tennisman <= 0 && score_pongiste <= 0) {
						balle.destroy()
				}
}

function pushButton(player, bouton){
		boutonappuyé += 1;
		bouton.destroy()
}

function ascenseur(player, montante){
	if (score_pongiste <= 0 && boutonappuyé == 2 && score_tennisman <= 0) {
		montante.setVelocityY(-200);
	}
		montante.setVelocityX(0);
}

function montée(montante, platforms_hori_haut){
		if (this.montante.body.velocity.y > 0) {
				this.montante.setVelocityY(-100);
		} else if (this.montante.body.velocity.y < 0) {
				this.montante.setVelocityY(100);
		}
}

function takeManetteDR(player, manetteDR){
	 this.scene.start("quatrième_scène");
	}

function hitCars(player, vroom){
	if (vroom.body.velocity.x > 0) {
		vroom.setFlipX(true);
	} else {
		vroom.anims.play('roule', true);
		vroom.setFlipX(false);
	}

	if (this.space.isDown) {
	pv_car = pv_car - 1;
		if (pv_car <= 0) {
			vroom.setVelocityY(-10000);
			vroom.setCollideWorldBounds(false);
		}
	}

}

function takeManetteTetris(player, manetteT){
	 this.scene.start("cinquième_scène");
	}

function jumpTetris(construction, player){
	construction.setVelocityY(0);
	player.setVelocityY(10);
}

function takeManetteSNES(player, manette_SNES){
	 this.scene.start("sixième_scène");
	}

function noyade(player, mer){
	this.scene.start("sixième_scène");
}

function oops(player, pieges){
	pieges.destroy();
}

function oneUp(player, cubes){
	cubes.setVelocityY(100);
	gameBoyOn = 1;
		if (cubes.body.velocity.y == 100) {
				cubes.setVelocityY(-100);
		}
	cubes.destroy();
}


function takeGameBoy(player, gameBoy){
	gameBoy.destroy();
	 this.scene.start("septième_scène");
	}

function detruit(kekeball, platforms){
	kekeball.destroy();
	lancer = 0;
}

function contactPoke(player, ennemis){
	if (ennemis.body.velocity.x > 0) {
			ennemis.setVelocityX(50);
	} else if (ennemis.body.velocity.x < 0) {
			ennemis.setVelocityX(-50);
	}
}

function captureOiseau(kekeball, ennemis){
	kekeball.destroy();
	ennemis.destroy();
	captureOiso = 1;
	lancer = 0;
}

function captureCrabe(kekeball, ennemis){
	kekeball.destroy();
	ennemis.destroy();
	captureC = 1;
	lancer = 0;
}

function captureLicorne(kekeball, ennemis){
	kekeball.destroy();
	ennemis.destroy();
	captureLic = 1;
	lancer = 0;
}

function ramasse(player, kekeball){
	kekeball.destroy();
	pokeballsRamassées ++;
}

function takeSwitch(player, switchs){
	 this.scene.start("huitième_scène");
	}

	function detruitMur(bullets, walls){
		bullets.destroy();
		walls.destroy();
		murConstruit_e = 0;
		lancer_e = 0;
			if (lancer == 1) {
					lancer =  0;
			}
	}

	function detruit_e(kekeball, platforms){
		kekeball.destroy();
		lancer_e = 0;
	}

	function detruitMur_e(bullets_e, walls_e){
		bullets_e.destroy();
		walls_e.destroy();
		murConstruit = 0;
		lancer_e = 0;
	}

function dontMoveWallWBody(player, wall){
		wall.setVelocityX(0);
}

function dontMoveWall(bullets, wall){
	wall.setVelocityX(0);
	bullets.destroy();
	lancer = 0;
}

function dontMoveWall_e(bullets_e, wall_e){
	wall_e.setVelocityX(0);
	bullets_e.destroy();
	lancer_e = 0;
}

function leDeces(player, bullet_e){
	bullet_e.destroy();
	lancer_e = 0;
	this.scene.restart("huitième_scène");
}

function touche(yunah_e, bullets){
	bullets.destroy();
		pv_yunah = pv_yunah -1;
		lancer = 0;
		yunah_e.setVelocityX(0);
			if (pv_yunah == 0) {
					alive = 1;
			}
}

function finGame(player, GGS){
		this.scene.start("neuvième_scène");
}

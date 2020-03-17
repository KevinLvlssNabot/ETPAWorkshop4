var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    },

scene: [Scene4] //Scene 1, Scene 2, Scene3

};

this.game = new Phaser.Game(config);


var vieBarre = 2;
var score_pongiste = 5;
var score_tennisman = 5;
var scoreText_pongiste;
var scoreText_tennisman;
var boutonappuyé = 0;

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

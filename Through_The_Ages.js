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

scene: [Scene2]

};

this.game = new Phaser.Game(config);

function takeManette(player, manette){
	player.setTint(0xff0000);
	this.scene.start("deuxieme_scene");
}

function hitBalle(balle, player){
	balle.setVelocityY(-600);
}

function destroyPlatforms(balle, destroyable){
	destroyable.destroy();
}

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

scene: [Scene1]

};

this.game = new Phaser.Game(config);

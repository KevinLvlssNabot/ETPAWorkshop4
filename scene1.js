class Scene1 extends Phaser.Scene {
  constructor(){
    super("premiere_scene")
  }



preload(){
  	//this.load.image('chambre','assets/chambre.gif');
  	this.load.spritesheet('chambre_sprite','assets/sprite_chambre.png',{frameWidth: 1028, frameHeight: 770});
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});
    this.load.image('chambre_sol','assets/platform_chambre.png');
    this.load.image('manette','assets/manette_TFT.png');

  //	this.load.spritesheet('ennemis','assets/ennemis.png',{frameWidth: 40, frameHeight: 39});

  }

create(){
  //this.chambre = this.add.image(512,384,'chambre');
  this.chambre_sprite = this.add.sprite(512,384,'chambre_sprite');
//  this.cursorKeys = this.input.keyboard.createCursorKeys();
//  this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  this.platforms = this.physics.add.staticGroup();
  this.platforms.create(435,740,'chambre_sol');
  this.platforms.create(780,705,'manette');



  this.player = this.physics.add.sprite(150,600,'yunah').setSize(90,155);
  this.player.setCollideWorldBounds(true);
  this.player.setBounce(0);
  this.player.body.setGravityY(100);
  this.physics.add.collider(this.player,this.platforms);





this.anims.create({
  key: 'lumos',
  frames: this.anims.generateFrameNumbers('chambre_sprite', {start: 0, end: 1}),
  frameRate: 100,
  repeat: -1
});

this.anims.create({
  key: 'idle',
  frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
  frameRate: 2,
  repeat: -1
});

  this.cursors = this.input.keyboard.createCursorKeys();
}

update(){
  this.player.anims.play('idle', true);
  this.chambre_sprite.anims.play('lumos', true);

  if(this.cursors.left.isDown){
    this.player.setVelocityX(-150);
    this.player.setFlipX(true);
  }else if(this.cursors.right.isDown){
    this.player.setVelocityX(150);
    this.player.setFlipX(false);
  } else {
    this.player.setVelocityX(0);
  }

  if (this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown){
		this.player.anims.play('idle', true);
	}
//  if (this.space.isDown) {
//		this.scene.start("deuxieme_scene", {test: this.ciel});
//  }
}

}

class Scene6 extends Phaser.Scene {
  constructor(){
    super("sixième_scène")
  }

  init(data){

  }

  preload(){
    this.load.image('mario','assets/mario.png');
    this.load.image('gameBoy','assets/gameBoy.png');
    this.load.image('bloc','assets/mario_bloc.png');
    this.load.image('bloc2','assets/mario_bloc2.png');
    this.load.image('bloc3','assets/mario_bloc3.png');
    this.load.image('bloc4','assets/mario_bloc4.png');
    this.load.image('mer','assets/mario_mer.png');
    this.load.image('cube','assets/cube_mario.png');
    this.load.image('depart','assets/platform_mario_depart.png');
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});
    this.load.spritesheet('tiki','assets/tikitiki_sprite.png',{frameWidth: 28, frameHeight: 23});

  }


  create(){
    this.add.image(512,384,'mario');

    this.mer = this.physics.add.staticGroup();
    this.mer.create(700,720,'mer').visible = false;

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(175,700,'depart').visible = false;
    this.platforms.create(510,630,'bloc3');
    this.platforms.create(850,570,'bloc2');
    this.platforms.create(980,470,'bloc');
    this.platforms.create(650,300,'bloc4');
    this.platforms.create(820,370,'bloc');
    this.platforms.create(310,350,'bloc3');
    this.platforms.create(100,300,'bloc2');

    this.pieges = this.physics.add.staticGroup();
    this.pieges.create(380,560,'bloc');
    this.pieges.create(640,630,'bloc');
    this.pieges.create(980,180,'bloc2');

    this.invisibles = this.physics.add.staticGroup();
    this.invisibles.create(710,560,'bloc').visible = false;
    this.invisibles.create(380,560,'bloc').visible = false;
    this.invisibles.create(490,230,'bloc').visible = false;
    this.invisibles.create(820,230,'bloc').visible = false;
    this.invisibles.create(180,285,'bloc').visible = false;
    this.invisibles.create(440,285,'bloc').visible = false;
    this.invisibles.create(980,180,'bloc2').visible = false;

    this.cubes = this.physics.add.group();

    this.cube = this.cubes.create(650,70,'cube').setScale(1.3);
    this.cube.body.setGravityY(-600);
    this.cube.setCollideWorldBounds(true);
    this.cube.setVelocityY(0);

    this.gameBoy = this.physics.add.staticGroup();

    this.ennemis = this.physics.add.group();
    this.physics.add.collider(this.ennemis,this.platforms);
    this.physics.add.collider(this.ennemis,this.pieges);
    this.physics.add.collider(this.ennemis,this.invisibles);

    this.ennemi = this.ennemis.create(500,550,'tiki').setScale(1.5);
    this.ennemi.setVelocityX(-50);
    this.ennemi.setCollideWorldBounds(true);
  	this.ennemi.setBounceY(0);
  	this.ennemi.setBounceX(1);
  	this.ennemi.body.setGravityY(100);

    this.ennemi2 = this.ennemis.create(550,250,'tiki').setScale(1.5);
    this.ennemi2.setVelocityX(-50);
    this.ennemi2.setCollideWorldBounds(true);
  	this.ennemi2.setBounceY(0);
  	this.ennemi2.setBounceX(1);
  	this.ennemi2.body.setGravityY(100);

    this.ennemi3 = this.ennemis.create(280,300,'tiki').setScale(1.5);
    this.ennemi3.setVelocityX(-50);
    this.ennemi3.setCollideWorldBounds(true);
  	this.ennemi3.setBounceY(0);
  	this.ennemi3.setBounceX(1);
  	this.ennemi3.body.setGravityY(100);

    this.player = this.physics.add.sprite(170,550,'yunah').setSize(90,155).setScale(0.7);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.player,this.cubes, oneUp, null, this);
    this.physics.add.collider(this.player,this.pieges, oops, null, this);
    this.physics.add.collider(this.player,this.mer, noyade, null, this);
    this.physics.add.collider(this.player,this.ennemis, noyade, null, this);
    this.physics.add.overlap(this.player,this.gameBoy, takeGameBoy, null, this);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'marche',
      frames: this.anims.generateFrameNumbers('tiki', {start: 0, end: 2}),
      frameRate: 5,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }


  update(){
      this.player.anims.play('idle', true);


      if(this.cursors.left.isDown){
        this.player.setVelocityX(-150);
        this.player.setFlipX(true);
      }else if(this.cursors.right.isDown){
        this.player.setVelocityX(150);
        this.player.setFlipX(false);
      } else if(!this.cursors.left.isDown && !this.cursors.right.isDown){
        this.player.setVelocityX(0);
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
          this.player.setVelocityY(-400);
      }

      if (this.ennemi.body.velocity.x < 0) {
  			this.ennemi.setFlipX(false);
        this.ennemi.anims.play('marche', true);
  		} else {
  			this.ennemi.setFlipX(true);
  		}

      if (this.ennemi2.body.velocity.x < 0) {
  			this.ennemi2.setFlipX(false);
        this.ennemi2.anims.play('marche', true);
  		} else {
  			this.ennemi2.setFlipX(true);
  		}

      if (this.ennemi3.body.velocity.x < 0) {
  			this.ennemi3.setFlipX(false);
        this.ennemi3.anims.play('marche', true);
  		} else {
  			this.ennemi3.setFlipX(true);
  		}

      if (gameBoyOn == 1) {
          this.gameBoy.create(100,240,'gameBoy').setScale(0.7).setSize(35,60).setOffset(5,10);
          gameBoyOn = 0;
      }

  }




}

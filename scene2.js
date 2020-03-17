class Scene2 extends Phaser.Scene {
  constructor(){
    super("deuxieme_scene")
  }

  init(data){
    this.vieBarre = 2
  }

  preload(){
    this.load.image('tft','assets/tft_unpixel.png');
    this.load.image('balle','assets/balle.png');
    this.load.image('platform_tft','assets/platform_tft.png');
    this.load.image('platform_tfth','assets/platform_tfth.png');
    this.load.image('pplatform_tft','assets/pplatform_tft.png');
    this.load.image('manette_Atari','assets/manette_Atari.png');
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});

  }

  create(){
    this.add.image(512,384,'tft');


    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(525,622,'platform_tft');
    this.platforms.create(515,560,'platform_tfth');

    this.destroyable = this.physics.add.staticGroup();
    this.destroyable.create(750,100,'pplatform_tft');

    this.manette = this.physics.add.group();
    this.manette.create(750,75,'manette_Atari');
    this.physics.add.collider(this.manette,this.platforms);
    this.physics.add.collider(this.manette,this.destroyable);



    this.balle = this.physics.add.sprite(300,300,'balle');
    this.balle.setCollideWorldBounds(true);
    this.balle.setBounce(1);
    this.balle.setVelocity(Phaser.Math.Between(-300, 300), 30);
    this.physics.add.collider(this.balle,this.platforms);
    this.physics.add.collider(this.balle,this.destroyable, destroyPlatforms, null, this);


    this.player = this.physics.add.sprite(170,538,'yunah_TFT').setSize(90,155);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.balle, this.player, hitBalle, null, this);
    this.physics.add.overlap(this.manette, this.player, takeManetteAtari, null, this);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });
  }

  update(){
    this.player.anims.play('idle', true);

  //  var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  //  this.balle = this.balle.create(x, 16, 'balle');
  //  this.balle.setCollideWorldBounds(true);
  //  this.balle.setBounce(20);
  //  this.balle.setGravityY(100);


    if(this.cursors.left.isDown){
      this.player.setVelocityX(-150);
      this.player.setFlipX(true);
    }else if(this.cursors.right.isDown){
      this.player.setVelocityX(150);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-450);
    }

    if (this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown){
  		this.player.anims.play('idle', true);
  	}



    function hitBalle(balle, player){
      this.balle.setVelocityY(-600);
    }

    function destroyPlatforms(balle, destroyable){
      this.vieBarre = this.vieBarre -1;
        if (this.vieBarre == 0) {
            this.destroyable.destroy();
        }
    }

    function takeManetteAtari(player, manette){
    	 this.scene.start("troisième_scène");
       this.player.setVelocityX(0);
    	}

  }




}

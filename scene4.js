class Scene4 extends Phaser.Scene {
  constructor(){
    super("quatrième_scène")
  }

  init(data){

  }

  preload(){
    this.load.image('dr','assets/death_race.png');
    this.load.image('manetteT','assets/manette_Tetris.png');
    this.load.image('platform_dr','assets/platform_dr.png');
    this.load.spritesheet('vroom','assets/vroom_sprite.png',{frameWidth: 116, frameHeight: 33});
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});
    this.load.spritesheet('yunah_hit','assets/yunah_hit.png',{frameWidth: 132, frameHeight: 160});



  }


  create(){
    this.add.image(512,384,'dr');


    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(512,750,'platform_dr');

    this.manetteT = this.physics.add.staticGroup();
    this.manetteT.create(900,700,'manetteT');

    this.vroom = this.physics.add.sprite(500,680,'vroom').setScale(1.5);;
    this.vroom.setCollideWorldBounds(true);
    this.vroom.setBounceX(1);
    this.vroom.setVelocityX(-200);
    this.vroom.body.setGravityY(100);
    this.physics.add.collider(this.vroom,this.platforms);


    this.player = this.physics.add.sprite(170,650,'yunah').setSize(90,155).setScale(0.8);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.player, this.vroom, hitCars, null, this);
    this.physics.add.overlap(this.player, this.manetteT, takeManetteTetris, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 2}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
  		key:'roule',
  		frames: this.anims.generateFrameNumbers('vroom', {start: 0, end: 2}),
  		frameRate: 10,
  		repeat: -1
  	});

    this.anims.create({
  		key:'hit',
  		frames: this.anims.generateFrameNumbers('yunah_hit', {start: 0, end: 1}),
  		frameRate: 5,
  		repeat: -1
  	});

  //  this.cars = this.physics.add.group({
  //  });

  //  this.car = this.cars.create(850,650, 'vroom').setScale(1.5);
  //  this.car.setBounceX(1);
  //  this.car.setVelocityX(-150);
  //  this.car.setCollideWorldBounds(true);
  //  this.physics.add.collider(this.car,this.platforms);

  //  this.timer = this.time.addEvent({ delay: 2000, callback: spawnCar, loop: true });
  this.astuce = this.add.text(50, 0, 'Space to hit car', { fontFamily : 'Power Red And Blue', fontSize: '32px', fill: '#fff' });

  }

  update(){


    if(this.cursors.left.isDown){
      this.player.setVelocityX(-150);
      this.player.setFlipX(true);
    }else if(this.cursors.right.isDown && !this.space.isDown){
      this.player.setVelocityX(150);
      this.player.setFlipX(false);
    } else if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.space.isDown){
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (this.space.isDown) {

      this.player.anims.play('hit', true);
      this.player.setSize(110,155);
      this.player.setOffset(20,0);
  //    this.player.setSize(500,500);
   } else if (this.space.isUp) {
      this.player.anims.play('hit',false);
      this.player.setSize(90,155);
  //    this.player.anims.play('idle', true);
    }


    if (this.vroom.body.velocity.x > 0) {
			this.vroom.setFlipX(true);
		} else {
			this.vroom.anims.play('roule', true);
			this.vroom.setFlipX(false);
		}

  }




}

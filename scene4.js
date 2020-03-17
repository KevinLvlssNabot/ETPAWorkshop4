class Scene4 extends Phaser.Scene {
  constructor(){
    super("quatrième_scène")
  }

  init(data){

  }

  preload(){
    this.load.image('dr','assets/death_race.png');
    this.load.image('platform_dr','assets/platform_dr.png');
    this.load.spritesheet('vroom','assets/vroom_sprite.png',{frameWidth: 116, frameHeight: 33});
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});


  }


  create(){
    this.add.image(512,384,'dr');


    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(512,750,'platform_dr');



    this.vroom = this.physics.add.sprite(170,680,'vroom').setScale(1.5);;
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


  //  cars = this.physics.add.group({
  //		key: 'cars',
  //		repeat:0,
  //		setXY: {x:12,y:0,stepX:70}
  //	});

    this.cursors = this.input.keyboard.createCursorKeys();

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


  }

  update(){
    this.player.anims.play('idle', true);

    if(this.cursors.left.isDown){
      this.player.setVelocityX(-150);
      this.player.setFlipX(true);
    }else if(this.cursors.right.isDown){
      this.player.setVelocityX(150);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.vroom.body.velocity.x > 0) {
			this.vroom.setFlipX(true);
		} else {
			this.vroom.anims.play('roule', true);
			this.vroom.setFlipX(false);
		}
  }




}

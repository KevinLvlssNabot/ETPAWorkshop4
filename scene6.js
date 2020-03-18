class Scene6 extends Phaser.Scene {
  constructor(){
    super("sixième_scène")
  }

  init(data){

  }

  preload(){
    this.load.image('mario','assets/mario.png');
    this.load.image('mer','assets/mario_mer.png');
    this.load.image('cube','assets/cube_mario.png');
    this.load.image('depart','assets/platform_mario_depart.png');
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});

  }


  create(){
    this.add.image(512,384,'mario');

    this.mer = this.physics.add.staticGroup();
    this.mer.create(700,720,'mer').visible = false;

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(175,700,'depart').visible = false;


    this.cubes = this.physics.add.group();

    this.cube = this.cubes.create(500,500,'cube').setScale(1.3);
    this.cube.body.setGravityY(-600);
    this.cube.setCollideWorldBounds(true);
    this.cube.setVelocityY(0);


    this.player = this.physics.add.sprite(170,550,'yunah').setSize(90,155).setScale(0.7);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.player,this.mer, noyade, null, this);

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
  }




}

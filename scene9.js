class Scene9 extends Phaser.Scene {
  constructor(){
    super("neuvième_scène")
  }

  init(data){

  }

  preload(){

    this.load.image('plan','assets/plan_pokemon.png');
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});


  }


  create(){

    this.add.image(512,384,'plan');


    this.player = this.physics.add.sprite(170,550,'yunah').setSize(90,155).setScale(0.7);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);


    this.astuce = this.add.text(512, 384, "Merci d'avoir joué !", { fontFamily : 'Power Red And Blue', fontSize: '64px', fill: '#fff' });


    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

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

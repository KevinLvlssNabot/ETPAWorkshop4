class Scene5 extends Phaser.Scene {
  constructor(){
    super("cinquième_scène")
  }

  init(data){

  }

  preload(){
    this.load.image('platform_sol','assets/platform_tetris_sol.png');
    this.load.image('manette_SNES','assets/manette_SNES.png');
    this.load.image('construction_carre','assets/construction_carre.png');
    this.load.image('construction_s','assets/construction_s.png');
    this.load.image('construction_t','assets/construction_t.png');
    this.load.image('platform_haute','assets/platform_tetris_haute.png');
    this.load.image('platform_un','assets/platform_tetris_un.png');
    this.load.spritesheet('tetris','assets/Tetris.png',{frameWidth: 1024, frameHeight: 768});
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});



  }


  create(){
        this.tetris_sprite = this.add.sprite(512,384,'tetris');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(512,720,'platform_sol').setVisible(false);
        this.platforms.create(921,162,'platform_haute').setVisible(false);
        this.platforms.create(871,215,'platform_un').setVisible(false);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.constructions = this.physics.add.group();
        this.physics.add.collider(this.constructions,this.platforms);


        this.construction = this.constructions.create(512,20,'construction_carre');
        this.construction.body.setGravityY(-580);
        this.construction.setCollideWorldBounds(true);
        this.construction.setVelocityY(0);

        this.manetteSNES = this.physics.add.staticGroup();
        this.manetteSNES.create(880,125,'manette_SNES').setScale(1.2);



    this.player = this.physics.add.sprite(170,600,'yunah').setSize(90,155).setScale(0.8);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.player,this.construction);
    this.physics.add.overlap(this.player, this.manetteSNES, takeManetteSNES, null, this);


    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'univers',
      frames: this.anims.generateFrameNumbers('tetris', {start: 0, end: 5}),
      frameRate: 5,
      repeat: -1
    });

    this.astuce = this.add.text(850, 0, 'Space to restart level', { fontFamily : 'Power Red And Blue', fontSize: '16px', fill: '#fff' });

  }

  update(){
    this.player.anims.play('idle', true);
    this.tetris_sprite.anims.play('univers', true);

    if(this.cursors.left.isDown){
      if (carre == 1) {
        this.construction.setVelocityX(-50);
      }
      if (rectangle == 1) {
        this.construction2.setVelocityX(-50);
      }
        if (batton == 1) {
          this.construction3.setVelocityX(-50);
        }
          if (carre2 == 1) {
            this.construction4.setVelocityX(-50);
          }
          else if (carre == 0 && batton == 0 && rectangle == 0 && carre2 == 0){
            this.player.setVelocityX(-150);
            this.player.setFlipX(true);
          }

    }else if(this.cursors.right.isDown){
      if (carre == 1) {
        this.construction.setVelocityX(50);
      }
        if (rectangle == 1) {
          this.construction2.setVelocityX(50);
        }
          if (batton == 1) {
            this.construction3.setVelocityX(50);
          }
            if (carre2 == 1) {
              this.construction4.setVelocityX(50);
            }
            else if (carre == 0 && batton == 0 && rectangle == 0 && carre2 == 0) {
              this.player.setVelocityX(150);
              this.player.setFlipX(false);
            }

    } else {
      this.player.setVelocityX(0);
    }

    if (this.construction.body.touching.down) {
      this.construction.setVelocityX(0);
      if (carre == 1) {
          this.construction2 = this.constructions.create(500,20,'construction_s');
          this.construction2.body.setGravityY(-580);
          this.construction2.setCollideWorldBounds(true);
          this.construction2.setVelocityY(0);
          this.physics.add.collider(this.player,this.construction2, jumpTetris, null, this);
          this.physics.add.collider(this.construction,this.construction2);
          rectangle = 1;
      }
        if  (this.construction2.body.touching.down) {
          this.construction2.setVelocityX(0);
            if (rectangle == 1){
              this.construction3 = this.constructions.create(500,20,'construction_carre');
              this.construction3.body.setGravityY(-580);
              this.construction3.setCollideWorldBounds(true);
              this.construction3.setVelocityY(0);
              this.physics.add.collider(this.player,this.construction3, jumpTetris, null, this);
              this.physics.add.collider(this.construction,this.construction3);
              this.physics.add.collider(this.construction2,this.construction3);
              batton = 1;
          }
            if (this.construction3.body.touching.down) {
                this.construction3.setVelocityX(0);
                  if (batton == 1) {
                    this.construction4 = this.constructions.create(500,20,'construction_t');
                    this.construction4.body.setGravityY(-580);
                    this.construction4.setCollideWorldBounds(true);
                    this.construction4.setVelocityY(0);
                    this.physics.add.collider(this.player,this.construction4, jumpTetris, null, this);
                    this.physics.add.collider(this.construction,this.construction4);
                    this.physics.add.collider(this.construction2,this.construction4);
                    this.physics.add.collider(this.construction3,this.construction4);
                    carre2 = 1;
                  }
                    if (this.construction4.body.touching.down) {
                        this.construction4.setVelocityX(0);
                        carre2 = 0;
                      }
                batton = 0
            }
          rectangle = 0;
        }
      carre = 0;
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-470);
    }

    if (this.space.isDown) {
        this.scene.start("cinquième_scène");
    }

  }




}

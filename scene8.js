class Scene8 extends Phaser.Scene {
  constructor(){
    super("huitième_scène")
  }

  init(data){
      lancer_e = 0;lancer = 0;
      murConstruit = 0; murConstruit_e = 0;
      pv_yunah = 3; bulletShot = 0;
  }

  preload(){

    this.load.image('fortnite','assets/fortnite.png');
    this.load.image('walls','assets/walls.png');
    this.load.image('walls_e','assets/walls_e.png');
    this.load.image('bullets','assets/bullet.png');
    this.load.image('hauteur','assets/hauteur_pokemon.png');
    this.load.image('murs','assets/mur_pokemon.png');
    this.load.image('fortnite_platforms','assets/fortnite_platforms.png');
    this.load.image('GG','assets/GG.png');
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});
    this.load.spritesheet('yunah_e','assets/yunah_e.png',{frameWidth: 132, frameHeight: 160});


  }


  create(){

    this.add.image(512,384,'fortnite');

    this.platforms_fortnite = this.physics.add.staticGroup();
    this.platforms_fortnite.create(512,768,'fortnite_platforms').visible = false;
    this.platforms_fortnite.create(1024,384,'murs').visible = false;
    this.platforms_fortnite.create(0,384,'murs').visible = false;
    this.platforms_fortnite.create(512,0,'hauteur').visible = false;

    this.GG = this.physics.add.staticGroup();
    this.GGS = this.GG.create(512,400,'GG').setVisible(false);

    this.walls = this.physics.add.group();
    this.physics.add.collider(this.walls, this.platforms_fortnite);

    this.walls_e = this.physics.add.group();
    this.physics.add.collider(this.walls_e, this.platforms_fortnite);

    this.bullets = this.physics.add.group();
    this.physics.add.collider(this.bullets, this.platforms_fortnite, detruit, null, this);
    this.physics.add.collider(this.bullets, this.walls, dontMoveWall, null, this);
    this.physics.add.collider(this.bullets, this.walls_e, detruitMur, null, this);

    this.bullets_e = this.physics.add.group();
    this.physics.add.collider(this.bullets_e, this.platforms_fortnite, detruit_e, null, this);
    this.physics.add.collider(this.bullets_e, this.walls, detruitMur_e, null, this);
    this.physics.add.collider(this.bullets_e, this.walls_e, dontMoveWall_e, null, this);

    this.yunah_e = this.physics.add.sprite(850,550,'yunah_e').setSize(90,155).setScale(0.7);
    this.yunah_e.setCollideWorldBounds(true);
    this.yunah_e.setBounce(0);
    this.yunah_e.body.setGravityY(100);
    this.physics.add.collider(this.yunah_e,this.platforms_fortnite);
    this.physics.add.collider(this.yunah_e, this.walls);
    this.physics.add.collider(this.yunah_e, this.bullets, touche, null, this);


    this.player = this.physics.add.sprite(170,550,'yunah').setSize(90,155).setScale(0.7);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms_fortnite);
    this.physics.add.collider(this.player, this.walls, dontMoveWallWBody, null, this);
    this.physics.add.collider(this.player, this.walls_e, dontMoveWallWBody, null, this);
    this.physics.add.collider(this.player, this.bullets_e, leDeces, null, this);
    this.physics.add.collider(this.player, this.GGS, finGame, null, this);

    this.astuce = this.add.text(750, 10, 'Space to shoot / CTRL to build a wall', { fontFamily : 'Power Red And Blue', fontSize: '16px', fill: '#fff' });


    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'idle_e',
      frames: this.anims.generateFrameNumbers('yunah_e', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.ctrl = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

    }


  update(){
    if (restart == 1) {
      lancer_e = 0;
      restart = 0;
    }
      this.player.anims.play('idle', true);
      if (alive == 0){
      this.yunah_e.anims.play('idle_e', true);
      this.yunah_e.setFlipX(true);
        if (lancer_e == 0) {
          this.bullet_e = this.bullets_e.create(this.yunah_e.x,this.yunah_e.y,'bullets');
          this.bullet_e.body.setGravityY(-600);
          this.bullet_e.setCollideWorldBounds(true);
          this.bullet_e.setVelocityX(-500);
          lancer_e = 1;
          bulletShot++;
        }

        if (murConstruit_e == 0 && bulletShot == 10) {
          this.wall_e = this.walls_e.create(this.yunah_e.x - 100 ,this.yunah_e.y -20,'walls_e').setScale(0.7);
          this.wall_e.body.setGravityY(1000);
          this.wall_e.setCollideWorldBounds(true);
          murConstruit_e = 1;
          bulletShot = 0;
        }
      } else {
        this.yunah_e.visible = false;
        this.GGS.setVisible(true);
      }

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

      if (this.space.isDown && lancer == 0) {
        lancer = 1;
          if (lancer == 1) {
            this.bullet = this.bullets.create(this.player.x,this.player.y,'bullets');
            this.bullet.body.setGravityY(-600);
            this.bullet.setCollideWorldBounds(true);
            if (this.player.body.velocity.x < 0) {
                this.bullet.setVelocityX(-500);
                this.bullet.setFlipX(false);
            } else if (this.player.body.velocity.x > 0) {
              this.bullet.setVelocityX(500);
              this.bullet.setFlipX(true);
            } else {
              this.bullet.setVelocityX(500);
              this.bullet.setFlipX(true);
            }

          }
      }

      if (this.ctrl.isDown && murConstruit == 0) {
        if (this.player.body.velocity.x < 0) {
          this.wall = this.walls.create(this.player.x - 100 ,this.player.y -20,'walls').setScale(0.7);
          this.wall.body.setGravityY(1000);
          this.wall.setCollideWorldBounds(true);
        } else if (this.player.body.velocity.x > 0) {
          this.wall = this.walls.create(this.player.x + 100 ,this.player.y -20,'walls').setScale(0.7);
          this.wall.body.setGravityY(1000);
          this.wall.setCollideWorldBounds(true);
        } else {
          this.wall = this.walls.create(this.player.x + 100 ,this.player.y -20,'walls').setScale(0.7);
          this.wall.body.setGravityY(1000);
          this.wall.setCollideWorldBounds(true);
        }
        murConstruit = 1;
      }

      if (this.player.body.touching.down) {
    			jump = 0;
    	}

      if(this.cursors.up.isUp && !this.player.body.touching.down && jump == 0){
    		jump = 1;
    	}

      if (jump == 1) {
    			if (this.cursors.up.isDown) {
    				this.player.setVelocityY(-400);
    				jump = 2;
    			}
    	}

  }




}

class Scene7 extends Phaser.Scene {
  constructor(){
    super("septième_scène")
  }

  init(data){

  }

  preload(){

    this.load.image('plan','assets/plan_pokemon.png');
    this.load.image('switch','assets/switch.png');
    this.load.image('kekeball','assets/kekeball.png');
    this.load.image('platforms','assets/platform_pokemon.png');
    this.load.image('platforms_petite','assets/petite_pokemon.png');
    this.load.image('hauteur','assets/hauteur_pokemon.png');
    this.load.image('murs','assets/mur_pokemon.png');
    this.load.image('fakemon1','assets/fakemon1nb.png');
    this.load.image('fakemon2','assets/fakemon2nb.png');
    this.load.spritesheet('poketruc','assets/pokeduculnb.png',{frameWidth: 100, frameHeight: 100});
    this.load.spritesheet('yunah_haut','assets/yunah_haut_pokemon.png',{frameWidth: 89, frameHeight: 92});
    this.load.spritesheet('yunah_bas','assets/yunah_bas_pokemon.png',{frameWidth: 89, frameHeight: 92});
    this.load.spritesheet('yunah_pokemon','assets/yunah_pokemon.png',{frameWidth: 89, frameHeight: 115});


  }


  create(){
    this.add.image(512,384,'plan');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(150,580,'platforms').visible = false;
    this.platforms.create(622,580,'platforms').visible = false;
    this.platforms.create(622,238,'platforms').visible = false;
    this.platforms.create(512,0,'hauteur').visible = false;
    this.platforms.create(512,768,'hauteur').visible = false;
    this.platforms.create(312,238,'platforms_petite').visible = false;
    this.platforms.create(0,384,'murs').visible = false;
    this.platforms.create(1024,384,'murs').visible = false;

    this.pokeballs = this.physics.add.group();
    this.physics.add.collider(this.pokeballs, this.platforms, detruit, null, this);

    this.switch = this.physics.add.staticGroup();

    this.ennemis_pokemon = this.physics.add.group();
    this.physics.add.collider(this.ennemis_pokemon,this.platforms);


    this.ennemi1_pokemon = this.ennemis_pokemon.create(500,500,'poketruc').setScale(0.7);
    this.ennemi1_pokemon.body.setGravityY(-600);
    this.ennemi1_pokemon.setVelocityX(Phaser.Math.Between(-50,50));
    this.ennemi1_pokemon.setVelocityY(Phaser.Math.Between(-50,50));
    this.ennemi1_pokemon.setBounce(1,1);
    this.ennemi1_pokemon.setCollideWorldBounds(true);

    this.ennemi2_pokemon = this.ennemis_pokemon.create(300,100,'fakemon1');
    this.ennemi2_pokemon.body.setGravityY(-600);
    this.ennemi2_pokemon.setVelocityX(Phaser.Math.Between(-50,50));
    this.ennemi2_pokemon.setVelocityY(Phaser.Math.Between(-50,50));
    this.ennemi2_pokemon.setBounce(1,1);
    this.ennemi2_pokemon.setCollideWorldBounds(true);

    this.ennemi3_pokemon = this.ennemis_pokemon.create(800,700,'fakemon2');
    this.ennemi3_pokemon.body.setGravityY(-600);
    this.ennemi3_pokemon.setVelocityX(Phaser.Math.Between(-50,50));
    this.ennemi3_pokemon.setVelocityY(Phaser.Math.Between(-50,50));
    this.ennemi3_pokemon.setBounce(1,1);
    this.ennemi3_pokemon.setCollideWorldBounds(true);

    this.player = this.physics.add.sprite(170,750,'yunah_pokemon').setScale(0.5);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(-600);
    this.physics.add.collider(this.player,this.platforms);
    this.physics.add.collider(this.player,this.ennemis_pokemon_poke, contactPoke, null, this);
    this.physics.add.collider(this.player,this.switch, takeSwitch, null, this);


    this.anims.create({
      key: 'droite',
      frames: this.anims.generateFrameNumbers('yunah_pokemon', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'bas',
      frames: this.anims.generateFrameNumbers('yunah_bas', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'haut',
      frames: this.anims.generateFrameNumbers('yunah_haut', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key:'stop',
      frames: [{key: 'yunah_bas', frame:0}],
      frameRate: 10
    });

    this.anims.create({
      key: 'crabe',
      frames: this.anims.generateFrameNumbers('poketruc', {start: 0, end: 5}),
      frameRate: 8,
      repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.astuce = this.add.text(850, 20, 'Space to throw ball', { fontFamily : 'Power Red And Blue', fontSize: '16px', fill: '#000' });

    }


  update(){



      if(this.cursors.left.isDown){
        this.player.setVelocityX(-150);
        this.player.setFlipX(true);
        this.player.setVelocityY(0);
        this.player.anims.play('droite',true);
      }else if(this.cursors.right.isDown){
        this.player.anims.play('droite',true);
        this.player.setVelocityX(150);
        this.player.setFlipX(false);
        this.player.setVelocityY(0);
      } else if (this.cursors.down.isDown) {
          this.player.anims.play('bas',true);
          this.player.setVelocityY(150);
          this.player.setVelocityX(0);
      } else if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown){
        this.player.setVelocityX(0);
        this.player.anims.play('stop', true);
      }

      if (this.cursors.up.isDown) {
          this.player.setVelocityY(-150);
          this.player.setVelocityX(0);
          this.player.anims.play('haut',true);
      }

      if (this.cursors.up.isUp && !this.cursors.down.isDown) {
          this.player.setVelocityY(0);
      }

      if (this.cursors.down.isUp && !this.cursors.up.isDown) {
          this.player.setVelocityY(0);
      }

      if (captureC == 0){
        this.physics.add.collider(this.ennemi1_pokemon,this.pokeballs, captureCrabe, null, this);
      if (this.ennemi1_pokemon.body.velocity.x > 0) {
        this.ennemi1_pokemon.setVelocityY(0);
        this.ennemi1_pokemon.anims.play('crabe',true);
        this.ennemi1_pokemon.setFlipX(false);
      } else if (this.ennemi1_pokemon.body.velocity.x < 0) {
        this.ennemi1_pokemon.anims.play('crabe',true);
        this.ennemi1_pokemon.setVelocityY(0);
        this.ennemi1_pokemon.setFlipX(true);
      }
    } else if (captureC == 1) {
        this.pokeball = this.pokeballs.create(this.ennemi1_pokemon.x,this.ennemi1_pokemon.y,'kekeball').setScale(0.8);
        this.pokeball.body.setGravityY(-600);
        captureC = 2;
    }

    if (captureLic == 0){
        this.physics.add.collider(this.ennemi2_pokemon,this.pokeballs, captureLicorne, null, this);
      if (this.ennemi2_pokemon.body.velocity.x > 0) {
        this.ennemi2_pokemon.setVelocityY(0);
        this.ennemi2_pokemon.setFlipX(true);
      } else if (this.ennemi2_pokemon.body.velocity.x < 0) {
        this.ennemi2_pokemon.setFlipX(false);
        this.ennemi2_pokemon.setVelocityY(0);
      }
    } else if (captureLic == 1) {
        this.pokeball = this.pokeballs.create(this.ennemi2_pokemon.x,this.ennemi2_pokemon.y,'kekeball').setScale(0.8);
        this.pokeball.body.setGravityY(-600);
        captureLic = 2;
    }

    if (captureOiso == 0){
        this.physics.add.collider(this.ennemi3_pokemon,this.pokeballs, captureOiseau, null, this);
      if (this.ennemi3_pokemon.body.velocity.x > 0) {
        this.ennemi3_pokemon.setVelocityY(0);
        this.ennemi3_pokemon.setFlipX(true);
      } else if (this.ennemi3_pokemon.body.velocity.x < 0) {
        this.ennemi3_pokemon.setFlipX(false);
        this.ennemi3_pokemon.setVelocityY(0);
      }
    } else if (captureOiso == 1) {
        this.pokeball = this.pokeballs.create(this.ennemi3_pokemon.x,this.ennemi3_pokemon.y,'kekeball').setScale(0.8);
        this.pokeball.body.setGravityY(-600);
        captureOiso = 2;
    }

      if (this.space.isDown && lancer == 0) {
        lancer = 1;
          if (lancer == 1) {
            this.pokeball = this.pokeballs.create(this.player.x,this.player.y,'kekeball').setScale(0.8);
            this.pokeball.body.setGravityY(-600);
            this.pokeball.setCollideWorldBounds(true);
            if (this.player.body.velocity.y >= 0 && this.player.body.velocity.x == 0) {
                this.pokeball.setVelocityY(300);
            } else if (this.player.body.velocity.y < 0){
                this.pokeball.setVelocityY(-300);
            } else if (this.player.body.velocity.x < 0) {
                this.pokeball.setVelocityX(-300);
            } else if (this.player.body.velocity.x > 0) {
              this.pokeball.setVelocityX(300);
            }

          }
      }

        if (captureC == 2 && captureLic == 2 && captureOiso == 2) {
            this.physics.add.overlap(this.player,this.pokeballs, ramasse, null, this);
        }

        if (pokeballsRamassées == 3) {
            this.switch.create(524,328,'switch').setScale(0.7);
        }
  }




}

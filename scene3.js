class Scene3 extends Phaser.Scene {
  constructor(){
    super("troisième_scène")
  }

  init(data){
    this.score_pongiste = 5;
    this.score_tennisman = 5;
    this.scoreText_pongiste;
    this.scoreText_tennisman;
  }

  preload(){

    this.load.image('pong','assets/pong.png');
    this.load.image('balle_pong','assets/balle_pong.png')
    this.load.image('platforms_hori_bas','assets/pong_platforms_hori.png');
    this.load.image('platforms_verti','assets/pong_platforms_verti.png');
    this.load.image('pongiste','assets/pong_tennisman.png');
    this.load.image('bouton','assets/button_pong.png')
    this.load.image('elevante','assets/platform_montante.png');
    this.load.image('manetteDR','assets/manette_DR.png')
    this.load.spritesheet('yunah','assets/yunah.png',{frameWidth: 132, frameHeight: 160});

  }

  create(){
    this.add.image(512,384,'pong');

    this.platforms_hori_bas = this.physics.add.staticGroup();
    this.platforms_hori_bas.create(500,760,'platforms_hori_bas').visible = false;

    this.platforms_hori_haut = this.physics.add.staticGroup();
    this.platforms_hori_haut.create(500,150,'platforms_hori_bas').visible = false;

    this.platforms_verti_gauche = this.physics.add.staticGroup();
    this.platforms_verti_gauche.create(78,452,'platforms_verti').visible = false;

    this.platforms_verti_droite = this.physics.add.staticGroup();
    this.platforms_verti_droite.create(940,452,'platforms_verti').visible = false;

    this.montante = this.physics.add.sprite(500,770,'elevante');
    this.montante.setCollideWorldBounds(true);
    this.montante.setBounce(1);
    this.montante.setGravityY(0);
    this.montante.setVelocityY(0);
    this.physics.add.collider(this.montante,this.platforms_hori_haut, montée, null, this);

    this.bouton = this.physics.add.staticGroup();
    this.bouton.create(450,740,'bouton');

    this.bouton2 = this.physics.add.staticGroup();
    this.bouton2.create(750,740,'bouton');

    this.manetteDR = this.physics.add.staticGroup();
    this.manetteDR.create(520,120,'manetteDR')
  //  this.bouton.create(750,740,'bouton').setActive(false);


    this.balle_pong = this.physics.add.sprite(300,300,'balle_pong');
    this.balle_pong.setCollideWorldBounds(true);
    this.balle_pong.setBounce(1);
    this.balle_pong.setVelocityX(400);
    this.balle_pong.setGravityY(-600);
    this.balle_pong.setVelocityX(300);
    this.physics.add.collider(this.balle_pong,this.platforms_hori_bas);
    this.physics.add.collider(this.balle_pong,this.platforms_hori_haut);
    this.physics.add.collider(this.balle_pong,this.platforms_verti_droite, scorePongiste, null, this);
    this.physics.add.collider(this.balle_pong,this.platforms_verti_gauche, scoreTennisman, null, this);


    this.pongiste = this.physics.add.sprite(130,500,'pongiste');
    this.pongiste.setCollideWorldBounds(true);
    this.pongiste.body.setGravityY(0);
    this.pongiste.setBounceY(1);
    this.pongiste.setVelocityY(200);
    this.pongiste.setVelocityX(0);
    this.physics.add.collider(this.pongiste,this.platforms_hori_bas);
    this.physics.add.collider(this.pongiste,this.platforms_hori_haut);
    this.physics.add.collider(this.balle_pong,this.pongiste, bouncePongiste, null, this);

    this.tennisman = this.physics.add.sprite(830,250,'pongiste');
    this.tennisman.setCollideWorldBounds(true);
    this.tennisman.body.setGravityY(0);
    this.tennisman.setBounceY(1);
    this.tennisman.setVelocityY(200);
    this.physics.add.collider(this.tennisman,this.platforms_hori_bas);
    this.physics.add.collider(this.tennisman,this.platforms_hori_haut);
    this.physics.add.collider(this.balle_pong,this.tennisman, bounceTennisman, null, this);


    this.player = this.physics.add.sprite(170,680,'yunah').setSize(90,155).setScale(0.8);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0);
    this.player.body.setGravityY(100);
    this.physics.add.collider(this.player,this.platforms_hori_bas);
    this.physics.add.collider(this.player,this.platforms_verti_gauche);
    this.physics.add.collider(this.player,this.platforms_verti_droite);
    this.physics.add.collider(this.player,this.balle_pong);
    this.physics.add.collider(this.player,this.montante, ascenseur, null, this);
    this.physics.add.overlap(this.player,this.bouton, pushButton, null, this);
    this.physics.add.overlap(this.player,this.bouton2, pushButton, null, this);
    this.physics.add.overlap(this.player,this.manetteDR, takeManetteDR, null, this);


    this.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('yunah', {start: 0, end: 1}),
      frameRate: 2,
      repeat: -1
    });

    this.scoreText_pongiste = this.add.text(300, 200, '5', { fontFamily : 'Power Red And Blue', fontSize: '128px', fill: '#fff' });
    this.scoreText_tennisman = this.add.text(700, 200, '5', { fontFamily : 'Power Red And Blue', fontSize: '128px', fill: '#fff' });

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

  //  if (this.cursors.up.isDown && this.player.body.touching.down) {
  //      this.player.setVelocityY(-450);
  //  }

    if (this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown){
  		this.player.anims.play('idle', true);
  	}

    if (this.pongiste.body.velocity.y < 0) {
        this.pongiste.setVelocityY(-300);
    } else {
      this.pongiste.setVelocityY(300);
    }

    if (this.tennisman.body.velocity.y < 0) {
        this.tennisman.setVelocityY(-300);
    } else {
      this.tennisman.setVelocityY(300);
    }


    function bouncePongiste(balle_pong, pongiste){
    	this.balle_pong.setFlipY(true);
    	this.balle_pong.setVelocityX(Phaser.Math.Between(-300, 300), 30);
    	this.pongiste.setVelocityX(0);
    }

    function bounceTennisman(balle_pong, tennisman){
    	this.balle_pong.setFlipY(true);
    	this.balle_pong.setVelocityX(Phaser.Math.Between(-300, 300), 30);
    	this.tennisman.setVelocityX(0);
    }

    function scorePongiste(balle, platforms_verti_droite){
    		this.score_pongiste = this.score_tennisman - 1;
        this.scoreText_pongiste.setText(this.score_pongiste);

    }

    function scoreTennisman(balle, platforms_verti_gauche){
    		this.score_tennisman = this.score_tennisman - 1;
        this.scoreText_tennisman.setText(score_tennisman);
    }
  }




}

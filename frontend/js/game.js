var game = new Phaser.Game(800,600, Phaser.AUTO, 'money savy game', {preload: preload, create: create, update: update, render: render});

var player;
var sky;
var cursors;
var bank;
var shipTrail;
var fireButton;

var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;


function preload() {
    game.load.image('sky', '../assets/sky.png');
    game.load.image('ship', '../assets/player.png');
    game.load.image('bullet', '../assets/bullet.png');
    game.load.image('particles','../assets/sun.png');
}

function create() {
    //  The scrolling starfield background
    sky = game.add.tileSprite(0, 0, 800, 600,'sky');
    

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('player.x + 30' );
    bullets.setAll('player.y');
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true)
    
    
    //  The hero!
    player = game.add.sprite(50, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);
    
    
    // And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
     fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   
    
    //  Add an emitter for the ship's trail
      shipTrail = game.add.emitter(player.x, player.y + 10, 400); 
    shipTrail.width = 10;
    shipTrail.makeParticles('particles');
    shipTrail.setXSpeed(30, -300);
    shipTrail.setYSpeed(200, 180);
    shipTrail.setRotation(50,- 50);
    shipTrail.setAlpha(1, 0.01, 800);
    shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    shipTrail.start(false, 4000, 10);
    
}

function update() {

    // Scroll the background
    sky.tilePosition.x += -2;
   
    
    //Makes background look faster
     sky.tileScale.x =10;

    
    
    //Reset the player, then check for movement keys
     player.body.acceleration.x = 0;
     player.body.acceleration.y = 0;
    
    if (cursors.left.isDown){
    player.body.velocity.x = -200;
}
 
    else if (cursors.right.isDown){
      player.body.velocity.x = 200;
  }

    else if(cursors.up.isDown){
        player.body.velocity.y = -200;
    }

    else if(cursors.down.isDown){
        player.body.velocity.y = 200;
    }

        //  Stop at screen edges
    if (player.x > game.width - 50) {
        player.x = game.width - 50;
        
    }
    if (player.x < 50) {
        player.x = 50;
        
    }
    
    
     if (player.y > game.height - 30) {
        player.y = game.height - 30;
        
    }
    if (player.y < 40) {
        player.y = 40;
        
    }
    
        //  Fire bullet
    if (fireButton.isDown || game.input.activePointer.isDown) {
        fireBullet();
    }
    
    
   //  Squish and rotate ship for illusion of "banking"
    bank = player.body.velocity.x / MAXSPEED;
    player.scale.y = 1 - Math.abs(bank) / 2;
    player.angle = bank * 40;

    bank = player.body.velocity.y / MAXSPEED;
    player.scale.x = 1 - Math.abs(bank) / 2;
    player.angle = bank * 40;

//Keep the shipTrail lined up with the ship
    shipTrail.x = player.x + -35;
    shipTrail.y = player.y;
    
}
  

function render() {

}

function fireBullet() {
    //  Grab the first bullet we can from the pool
    var bullet = bullets.getFirstExists(false);

    if (bullet)
    {
        //  And fire it
        bullet.reset(player.x + 8, player.y + 8);
        bullet.body.velocity.x  = 400;
    }
}
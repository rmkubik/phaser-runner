class Player extends Phaser.Sprite {

    constructor(game, position) {
        super(game, position.x, position.y, 'spritesheet', 'alienGreen_stand.png');
        

        this.game.physics.arcade.enable(this);
        this.body.gravity.y = 400;
        this.body.collideWorldBounds = true;
        this.body.setSize(128, 128, 0, 128); // my assets are weirdly tall

        this.scale.setTo(0.5);
        this.anchor.setTo(0.5);

        this.animations.add('walk', ['alienGreen_walk1.png','alienGreen_walk2.png'], 6, true);
        
        this.game.stage.addChild(this);
    }
    
    _update(cursors, playerOnGround) {
        this.body.velocity.x = 0;
		if (cursors.left.isDown)
		{
			this.body.velocity.x = -150;
			this.animations.play('walk');
			this.scale.x = -0.5;
		}
		else if (cursors.right.isDown)
		{
			this.body.velocity.x = 150;
			this.animations.play('walk');
			this.scale.x = 0.5;
		}
		else
		{
			this.animations.stop();
			this.frameName = 'alienGreen_stand.png';
		}
	
		if (cursors.up.isDown && this.body.touching.down && playerOnGround)
		{
			this.body.velocity.y = -350;
		}

		if (this.body.velocity.y !== 0) {
			this.animations.stop();
			this.frameName = 'alienGreen_jump.png';
		}
    }
}

export default Player;
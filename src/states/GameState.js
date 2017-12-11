import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	init() {
		this.player;

		const groundLength = 14;
		const minGroundHeight = 1;
		const maxGroundHeight = 4;
		this.groundData = [];
		for (let i = 0; i < groundLength; i++) {
			this.groundData.push(this.game.rnd.integerInRange(minGroundHeight, maxGroundHeight));
		}
		this.ground = this.game.add.group();
		this.game.stage.backgroundColor = "#3498db";
		this.cursors = this.game.input.keyboard.createCursorKeys();
	}

	preload() {
		this.load.atlasXML('spritesheet', 'images/spritesheet_complete.png', 'images/spritesheet_complete.xml');
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		
		this.player = this.game.add.sprite(0, 0, 'spritesheet', 'alienGreen_stand.png');
		this.player.scale.setTo(0.5);
		this.player.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 400;

		this.player.animations.add('walk', ['alienGreen_walk1.png','alienGreen_walk2.png'], 6, true);

		this.ground.enableBody = true;
		this.groundData.forEach((groundHeight, index) => {
			for (let y = 0; y < groundHeight; y++) {
				let spriteKey = 'grassMid.png';
				if (y < groundHeight - 1) {
					spriteKey = 'grassCenter.png'
				}
				const tile = this.ground.create(index * (64), this.game.height - ((y + 1) * 64), 'spritesheet', spriteKey);
				tile.scale.setTo(0.5);
				tile.body.immovable = true;
			}
		})
	}

	update() {
		const playerOnGround = this.game.physics.arcade.collide(this.player, this.ground);		

		this.player.body.velocity.x = 0;
		if (this.cursors.left.isDown)
		{
			//  Move to the left
			this.player.body.velocity.x = -150;
	
			this.player.animations.play('walk');
		}
		else if (this.cursors.right.isDown)
		{
			//  Move to the right
			this.player.body.velocity.x = 150;
	
			this.player.animations.play('walk');
		}
		else
		{
			//  Stand still
			this.player.animations.stop();

			this.player.frameName = 'alienGreen_stand.png';
	
			// this.player.frame = 4;
		}
	
		//  Allow the player to jump if they are touching the ground.
		if (this.cursors.up.isDown && this.player.body.touching.down && playerOnGround)
		{
			this.player.body.velocity.y = -350;
		}

		if (this.player.body.velocity.y !== 0) {
			this.player.animations.stop();
			this.player.frameName = 'alienGreen_jump.png';
		}

		if (this.player.body.velocity.x < 0) {
			this.player.scale.x = -0.5;
		} else {
			this.player.scale.x = 0.5;
		}
	}

}

export default GameState;

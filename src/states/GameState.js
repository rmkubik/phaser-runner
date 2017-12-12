import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	init() {
		this.player;

		const groundLength = 12;
		const minGroundHeight = 1;
		const maxGroundHeight = 4;
		this.groundData = [];
		for (let i = 0; i < groundLength; i++) {
			this.groundData.push(this.game.rnd.integerInRange(minGroundHeight, maxGroundHeight));
		}
		this.ground = this.game.add.group();

		this.game.stage.backgroundColor = "#3498db";
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.exit = this.game.add.group();
	}

	preload() {
		this.load.atlasXML('spritesheet', 'images/spritesheet_complete.png', 'images/spritesheet_complete.xml');
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		let center = { x: this.game.world.centerX, y: this.game.world.centerY }

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
		});

		const startX = 0;
		const startYAdjust = 64;
		const startY = this.game.world.height - this.groundData[0] * 64 - startYAdjust;

		this.player = this.game.add.sprite(startX, startY, 'spritesheet', 'alienGreen_stand.png');
		this.player.scale.setTo(0.5);
		this.player.anchor.setTo(0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 400;

		this.player.animations.add('walk', ['alienGreen_walk1.png','alienGreen_walk2.png'], 6, true);

		const doorX = (this.groundData.length - 1) * 64;
		const doorY = this.game.world.height - this.groundData[this.groundData.length - 1] * 64;
		const doorYAdjust = 64;
		
		this.exit.enableBody = true;
		this.exit.create(doorX, doorY - 64, 'spritesheet', 'doorOpen_mid.png');
		this.exit.create(doorX, doorY - doorYAdjust - 64, 'spritesheet', 'doorOpen_top.png');
		this.exit.forEach((doorPiece) => {
			doorPiece.scale.setTo(0.5);
			doorPiece.body.immovable = true;
		});
	}

	update() {
		const playerOnGround = this.game.physics.arcade.collide(this.player, this.ground);	
		this.game.physics.arcade.overlap(this.player, this.exit, () => {
			if (this.player.body.touching.down && playerOnGround) {
				this.restartLevel();
			}
		});	

		this.player.body.velocity.x = 0;
		if (this.cursors.left.isDown)
		{
			this.player.body.velocity.x = -150;
			this.player.animations.play('walk');
			this.player.scale.x = -0.5;
		}
		else if (this.cursors.right.isDown)
		{
			this.player.body.velocity.x = 150;
			this.player.animations.play('walk');
			this.player.scale.x = 0.5;
		}
		else
		{
			this.player.animations.stop();
			this.player.frameName = 'alienGreen_stand.png';
		}
	
		if (this.cursors.up.isDown && this.player.body.touching.down && playerOnGround)
		{
			this.player.body.velocity.y = -350;
		}

		if (this.player.body.velocity.y !== 0) {
			this.player.animations.stop();
			this.player.frameName = 'alienGreen_jump.png';
		}
	}

	restartLevel() {    
		this.game.state.start(this.game.state.current);
	}

}

export default GameState;

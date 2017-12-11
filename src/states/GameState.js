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
	}

	preload() {
		this.load.atlasXML('spritesheet', 'images/spritesheet_complete.png', 'images/spritesheet_complete.xml');
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		
		this.player = this.game.add.sprite(0, 0, 'spritesheet', 'alienGreen_walk1.png');
		this.player.scale.setTo(0.5);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 300;

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
		this.game.physics.arcade.collide(this.player, this.ground);		
	}

}

export default GameState;

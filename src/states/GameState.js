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
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);
		this.player = this.game.add.sprite(center.x, center.y, 'spritesheet', 'alienGreen_walk1.png');
		this.player.scale.setTo(0.5);

		// const tile = this.game.add.sprite(60, 60, 'spritesheet', 'grassMid.png');
		// tile.scale.setTo(0.5);
		// this.ground.add(tile);

		this.groundData.forEach((groundHeight, index) => {
			for (let y = 0; y < groundHeight; y++) {
				let spriteKey = 'grassMid.png';
				if (y < groundHeight - 1) {
					spriteKey = 'grassCenter.png'
				}
				const tile = this.game.add.sprite(index * (64), this.game.height - ((y + 1) * 64), 'spritesheet', spriteKey);
				tile.scale.setTo(0.5);
				this.ground.add(tile);
			}
		})
	}

	update() {

	}

}

export default GameState;

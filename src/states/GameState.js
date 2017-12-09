import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	init() {
		this.player;

		const groundLength = 14;
		const defaultGroundHeight = 1;
		this.groundData = [];
		for (let i = 0; i < groundLength; i++) {
			this.groundData.push(defaultGroundHeight);
		}
		this.ground = this.game.add.group();
	}

	preload() {
		this.load.atlasXML('spritesheet', 'images/spritesheet_complete.png', 'images/spritesheet_complete.xml');
	}

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		// let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		// text.anchor.set(0.5);
		this.player = this.game.add.sprite(center.x, center.y, 'spritesheet', 'bee.png');
		console.log(800 / this.player.width / 2);
		this.player.scale.setTo(0.5);

		this.groundData.forEach((groundHeight) => {
			this.game.ground.add.sprite()
		})
	}

	update() {

	}

}

export default GameState;

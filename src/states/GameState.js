import RainbowText from 'objects/RainbowText';
import Player from 'objects/Player';

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

		const startX = 32;
		const startYAdjust = 64;
		const startY = this.game.world.height - this.groundData[0] * 64 - startYAdjust;
		this.player = new Player(this.game, {x: startX, y: startY});

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

		this.player._update(this.cursors, playerOnGround);
	}

	render() {
		this.game.debug.bodyInfo(this.player, 32, 32);
        this.game.debug.body(this.player);
	}

	restartLevel() {  
		this.game.stage.removeChild(this.player);  
		this.game.state.start(this.game.state.current);
	}

}

export default GameState;

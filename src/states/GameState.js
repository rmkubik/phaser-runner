import RainbowText from 'objects/RainbowText';
import Player from 'objects/Player';
import Door from 'objects/Door';
import Ground from 'objects/Ground';

class GameState extends Phaser.State {

	init() {
		this.player;
		this.ground;
		this.exit;

		const groundLength = 12;
		const minGroundHeight = 1;
		const maxGroundHeight = 4;
		this.groundData = [];
		for (let i = 0; i < groundLength; i++) {
			this.groundData.push(this.game.rnd.integerInRange(minGroundHeight, maxGroundHeight));
		}

		this.game.stage.backgroundColor = "#3498db";
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.debugMode = false;
	}

	preload() {
		this.load.atlasXML('spritesheet', 'images/spritesheet_complete.png', 'images/spritesheet_complete.xml');
	}

	create() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.ground = new Ground(this.game, this.groundData);

		const startYAdjust = 64;
		this.player = new Player(this.game, {
			x: 32, // half width of player to get him on screen
			y: this.game.world.height - this.groundData[0] * 64 - startYAdjust
		});

		this.exit = new Door(this.game, {
			x: (this.groundData.length - 1) * 64, 
			y: this.game.world.height - this.groundData[this.groundData.length - 1] * 64
		});

		this.bindButtonEvents();
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
		if (this.debugMode) {
			this.game.debug.bodyInfo(this.player, 32, 32);
			this.game.debug.body(this.player);
		} else {
			this.game.debug.reset();
		}
	}

	bindButtonEvents() {
		document.getElementById("text_button").onclick = () => {
			const textInput = document.getElementById("text_input");
			this.text = this.createCrazyText(10, 10, textInput.value);
			textInput.value = "";
		};

		document.getElementById("text_erase").onclick = () => {
			if (this.text) {
				this.text.destroy();
			}
		};

		document.getElementById("debug_button").onclick = () => {
			this.debugMode = !this.debugMode;
		}

		document.getElementById("generate_button").onclick = () => {
			this.restartLevel();
		}
	}

	restartLevel() {  
		this.game.stage.removeChild(this.player);  
		this.game.state.start(this.game.state.current);
	}

	createCrazyText(x, y, text) {
		return new RainbowText(this.game, x, y, text);
	}

}

export default GameState;

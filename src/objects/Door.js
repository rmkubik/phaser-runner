class Door extends Phaser.Group {

    constructor(game, position) {
        super(game);

        const doorYAdjust = 64;

        this.enableBody = true;
		this.create(position.x, position.y - 64, 'spritesheet', 'doorOpen_mid.png');
		this.create(position.x, position.y - doorYAdjust - 64, 'spritesheet', 'doorOpen_top.png');
		this.forEach((doorPiece) => {
			doorPiece.scale.setTo(0.5);
			doorPiece.body.immovable = true;
		});
    }
}

export default Door;
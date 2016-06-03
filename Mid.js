// Mid class

function Mid(){
	var mid_texture = new PIXI.Texture.fromImage("scroller_mid.png");	
	
	PIXI.extras.TilingSprite.call(this, mid_texture, 720, 500);
	
	this.position.x = 0;
	this.position.y = 21;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	
}

Mid.constructor = Far; // set constructor to be far function
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function(){
	this.tilePosition.x -= .64;
};
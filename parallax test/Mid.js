<<<<<<< HEAD
// Mid class

function Mid(){
	var mid_texture = new PIXI.Texture.fromImage("scroller_mid.png");	
	
	PIXI.extras.TilingSprite.call(this, mid_texture, 720, 250);
	
	this.position.x = 0;
	this.position.y = 248;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	
}

Mid.constructor = Far; // set constructor to be far function
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function(){
	this.tilePosition.x -= .64;
=======
// Mid class

function Mid(){
	var mid_texture = new PIXI.Texture.fromImage("scroller_mid.png");	
	
	PIXI.extras.TilingSprite.call(this, mid_texture, 720, 250);
	
	this.position.x = 0;
	this.position.y = 248;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	
}

Mid.constructor = Far; // set constructor to be far function
Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.prototype.update = function(){
	this.tilePosition.x -= .64;
>>>>>>> 47f6030cc51ba3a2851dd4839619c18d34c2f8b1
};
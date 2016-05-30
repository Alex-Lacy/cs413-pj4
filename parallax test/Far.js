<<<<<<< HEAD
// Far class

function Far(){
	var far_texture = new PIXI.Texture.fromImage("scroller_far.png");
	
	PIXI.extras.TilingSprite.call(this, far_texture, 720, 500);
	
	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	
}

Far.constructor = Far; // set constructor to be far function
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function(){
	this.tilePosition.x -= .4;
};

=======
// Far class

function Far(){
	var far_texture = new PIXI.Texture.fromImage("scroller_far.png");
	
	PIXI.extras.TilingSprite.call(this, far_texture, 720, 500);
	
	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	
}

Far.constructor = Far; // set constructor to be far function
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.prototype.update = function(){
	this.tilePosition.x -= .4;
};

>>>>>>> 47f6030cc51ba3a2851dd4839619c18d34c2f8b1

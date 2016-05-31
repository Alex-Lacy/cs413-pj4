function Platform(previous_y, stage){


	
	this.last_y = previous_y;
	this.texture = PIXI.Texture.fromImage('mid_0.png');

	this.width = Math.random() * (8 - 4) + 4;
	this.height = Math.random() * ((previous_y - 20) - (previous_y + 20)) + (previous_y + 20);// a random number between prev_y+100 and prev_y-100

	this.segments = [];
	this.on = true;

	for(var i = 0; i < this.width; i++){

		var temp_sprite = new PIXI.Sprite(this.texture);
		stage.addChild(temp_sprite);
		temp_sprite.anchor.x = 1.0;
		temp_sprite.anchor.y = 0.0;
		temp_sprite.position.x = (i * 120) + 800;
		temp_sprite.position.y = this.height;

		this.segments.push(temp_sprite);


	}
}

Platform.prototype.update = function(speed){

	for(var j = 0; j < this.segments.length; j++){

		this.segments[j].position.x -= speed;

		if(this.segments[this.segments.length-1].position.x <= 0){
			stage.removeChild(this.segments[j]);
			this.on = false;
		}
	}


	


}
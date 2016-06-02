function Platform(previous_y, stage){


	
	this.last_y = previous_y;
	this.texture = PIXI.Texture.fromImage('mid_0.png');

	this.width = Math.random() * (15 - 4) + 4;
	this.height = Math.random() * ((previous_y - 50) - 400) + (400);// a random number between prev_y+100 and prev_y-100
	if(this.height >= 480){
		this.height = 450;
	}

	else if (this.height <= 250){
		this.height = 250;
	}

	this.segments = [];
	this.on = true;

	for(var i = 0; i < this.width; i++){

		var temp_sprite = new PIXI.Sprite(this.texture);
		stage.addChild(temp_sprite);
		temp_sprite.anchor.x = 1.0;
		temp_sprite.anchor.y = 0.0;
		temp_sprite.position.x = (i * 120) + 900;
		temp_sprite.position.y = this.height;

		this.segments.push(temp_sprite);


	}
}

Platform.prototype.update = function(speed){

	for(var j = 0; j < this.segments.length; j++){

		this.segments[j].position.x -= speed;

		if(this.segments[this.segments.length-1].position.x <= 0){
			stage.removeChild(j);
			this.on = false;
		}
	}


	


}
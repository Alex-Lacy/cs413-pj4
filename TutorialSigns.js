function TutorialSign(center_of_platform, kind, stage){


	//this.texture = PIXI.Texture.fromImage('mid_0.png');
	// random type
	// 400 x 200


	this.x = center_of_platform;

	this.y = Math.random() * (250 - 100);
	this.kind = kind;

	PIXI.loader
		.add('instructions.json')
		.load(this.loadTextures);



	temp_sprite = new PIXI.Sprite(this.texture);
	temp_sprite.position.x = this.x;
	temp_sprite.position. = this.y;
	temp_sprite.kind = this.kind;
	temp_sprite.anchor.x = .5;
	temp_sprite.anchor.x = 0.0;

	stage.push(temp_sprite);

}


TutorialSign.prototype.loadTextures = function(){

	if(kind == 0){
		this.texture = PIXI.Texture.fromImage("instructions_1.png");
	}

	else if(kind == 1){
		this.texture = PIXI.Texture.fromImage("instructions_2.png");
	}

	else{
		this.texture = PIXI.Texture.fromImage("instructions_3");
	}

}

TutorialSign.prototype.update = function(speed){


		temp_sprite.position.x -= speed;

		if(temp_sprite.position.x <= -120){
			stage.removeChild(temp_sprite);
		
		}
}
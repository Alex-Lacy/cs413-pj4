// Basic game setup to display in HTML

var game_width = 720;
var game_height = 500;
var game_scale = 1;

var objectsStart = 1;

var gameport = document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(game_width, game_height);
gameport.appendChild(renderer.view);


var stage = new PIXI.Container();
stage.scale.x = game_scale;
stage.scale.y = game_scale;

var game_view = new PIXI.Container();
stage.addChild(game_view);

var title_view = new PIXI.Container();
stage.addChild(title_view);

var scroller = new Scroller(game_view);

var platforms = new PIXI.Container();
game_view.addChild(platforms);

var obstacles = new PIXI.Container();
game_view.addChild(obstacles);

var death_view = new PIXI.Container();
stage.addChild(death_view);

death_view.visible = false;
death_view.interactive = false;

game_view.visible = true;
game_view.interactive = false;

title_view.visible = true;
title_view.interactive = true;

title_view.alpha = 70;


var player = {};
player.jumping = false;

var laserTextures = [];

var first_run = true;

var first_platforms = [];

var speed = 3; // The overall scaling of the game speed

var game_on = false;

var fall_speed = 5;

var p_collission = false; // collision for platforms

var score = 0;

var platform_texture;


var distance_from_last = -50;
var platform_distance = 200;

var last_y = 475;

var platform_1 = {};
var platform_2 = {};

var select_sound;
var fall_death_sound;
var laser_death_sound;
var game_theme;
var jump_sound;

player.runningFrames;
//player.runner;



PIXI.loader
	.add('./menu_assets/menu_assets.json')
	.load(loadMenus);


PIXI.loader
	.add("select.wav")
	.add("fall_death.wav")
	.add("laser_death.wav")
	.add("laser_off.wav")
	.add("jump.wav")
	.add("proj_4_theme.wav")
	.load(soundFnc);

function soundFnc(){// loads the sounds, sets the theme to loop
	
	select_sound = PIXI.audioManager.getAudio("select.wav");
	fall_death_sound = PIXI.audioManager.getAudio("fall_death.wav");
	laser_death_sound = PIXI.audioManager.getAudio("laser_death.wav");
	laser_off_sound = PIXI.audioManager.getAudio("laser_off.wav");
	game_theme = PIXI.audioManager.getAudio("proj_4_theme.wav");
	jump_sound = PIXI.audioManager.getAudio("jump.wav");
	
	game_theme.loop = true;
	game_theme.play();
	
	
}

function loadMenus(){

	var title_screen = new PIXI.Sprite(PIXI.Texture.fromFrame('title_screen.png'));
	title_view.addChild(title_screen);
	title_screen.interactive = true;
	title_screen.on('mousedown', changeView.bind(null, game_view));
	title_screen.on('mousedown', function(){game_on = true;});
	title_screen.on('mousedown', firstRun);



	var death_bg = new PIXI.Sprite(PIXI.Texture.fromFrame('death.png'));
	death_view.addChild(death_bg);
	

	var you_died = new PIXI.Sprite(PIXI.Texture.fromFrame('you_died.png'));
	death_view.addChild(you_died);
	you_died.position.x = 120;
	you_died.position.y = 90;
	you_died.scale.x = 1.1;
	you_died.scale.y = 1.1;


	var play_again = new PIXI.Sprite(PIXI.Texture.fromFrame('play_again.png'));
	death_view.addChild(play_again);
	play_again.position.x = 60;
	play_again.position.y = 250;
	play_again.interactive = true;
	play_again.on('mousedown', reset);


	var credits = new PIXI.Sprite(PIXI.Texture.fromFrame('credits.png'));
	death_view.addChild(credits);
	credits.position.x = 420;
	credits.position.y = 380;




	//title_screen.on('mousedown', firstRun);
}



PIXI.loader
	.add('./scroller_assets/platform_assets/platform_assets.json')
	.add('./obstacle_assets/laser.json')
	//.add('./entity_assets/entity_assets.json')
	.add("running.json") // runing player
	.load(loadGame);


function loadGame(){



	player.runningFrames = [];
	for(i=1; i<=4; i++) {
		player.runningFrames.push(PIXI.Texture.fromFrame('running' + i + '.png'));
	}
	player = new PIXI.extras.MovieClip(player.runningFrames);
	game_view.addChild(player);
	player.animationSpeed = 0.25;
	player.anchor.x = .5;
	player.anchor.y = 1;
	player.position.x = 120;
	player.position.y = 400;
	player.play();


	// laserz
	for(var a=1; a<=11; a++) {
		laserTextures.push(PIXI.Texture.fromFrame('laser_trap_air_'+a+'.png'));
	}



	platform_texture = PIXI.Texture.fromFrame('mid_0.png');
	

	for(var k = 0; k <= game_width + 240; k += 120){

		var platformk = new PIXI.Sprite(platform_texture);
		platforms.addChild(platformk);
		platformk.visible = true;
		platformk.anchor.x = .5;
		platformk.anchor.y = 1.0;
		platformk.position.x = k;
		platformk.position.y = 625;

		first_platforms.push(platformk);

	}
	
}



// Add any keyboard functions we need to this array
// These are they only keys that we will steal control from
var to_overwrite = [32];

window.addEventListener('keydown', function(e){

	if(to_overwrite.indexOf(e.keyCode) === -1) return true; // if the input key isn't in the array, we don't want it

	else {

		e.preventDefault();
		if(e.repeat || !player || player.jumping)
			return;
		else if (e.keyCode == 32)
			
			// check if player is on one of the platforms
			
			if(!player.jumping && p_collission){
				if(platform_1.on && player.x > (platform_1.segments[0].x-120) && player.x < platform_1.segments[platform_1.segments.length-1].x){// check if player is in x bounds of platform_1
					if(player.y >= platform_1.height + 40 && player.y <= (platform_1.height + 70)){// check y bounds
						jump();
					}
				}
				else if(platform_2.on && player.x > (platform_2.segments[0].x-120) && player.x < platform_2.segments[platform_2.segments.length-1].x){// check if player is in x bounds of platform_2
					if(player.y >= platform_2.height + 40 && player.y <= (platform_2.height + 70)){// check y bounds
						jump();
					}
				}
			}// end platform_1 / platform_2 check

			
			// check if player is on the beginning segment
			if(!p_collission && player.y >= 420) jump();
	}

});
 
function reset(){


	for(var i = 0; i < stage.children.length-1; i++){
		stage.removeChildAt(i);
	}

	game_view = new PIXI.Container();
	stage.addChild(game_view);

	title_view = new PIXI.Container();
	stage.addChild(title_view);

	scroller = new Scroller(game_view);

	platforms = new PIXI.Container();
	game_view.addChild(platforms);

	obstacles = new PIXI.Container();
	game_view.addChild(obstacles);

	death_view = new PIXI.Container();
	stage.addChild(death_view);

	death_view.visible = false;
	death_view.interactive = false;

	game_view.visible = true;
	game_view.interactive = false;


	title_view.visible = true;
	title_view.interactive = true;

	title_view.alpha = 70;


	player = {};
	player.jumping = false;


	first_run = true;

	first_platforms = [];

	speed = 3; // The overall scaling of the game speed

	game_on = false;

	fall_speed = 5;

	game_on = false;

	p_collission = false; // collision for platforms

	platform_distance = 200;

	score = 0;

	distance_from_last = -50;
	last_y = 475;

	platform_1 = {};
	platform_2 = {};

	//player.runner;
	loadMenus();
	loadGame();
}

function jump(){
	player.jumping = true;
	var jump_time = 600 - speed;
	var jump_height = 160 + speed;
	
	// change player position
	jump_sound.play();
	createjs.Tween.get(player.position).to({y: (player.y - jump_height)}, jump_time); // tween the player to the max height, then let fall() do the rest
	window.setTimeout(function () { player.jumping = false; }, jump_time);
	
	//player.y -= 100;
	
	// set player.jumping back to false
	
	/**
	var jump_time = 500;

	if(player.jumping){
		createjs.Tween.get(player).to({y: player.position.y + 120}, jump_time);
		window.setTimeout(function () { player.jumping = false; }, jump_time);
	}

	else{
		player.jumping = true;    
		createjs.Tween.get(player).to({y: player.position.y - 120}, jump_time);
		window.setTimeout(jump, jump_time);
	}
	**/
	/////

}

// collision with platforms //////////////////////////////////////////////////////////////////////
//

// Simulates gravity, player.y should be increasing (toward the bottom of the screen)
// unless there is an obstacle under him
function fall(){ 
	// check if player is jumping
	if (!player.jumping){	

		player.y += fall_speed;

	}
}


// checks if player coords are off screen,
// returns TRUE if the player is off screen
// returns FALSE if the player is still on the screen
function offScreen(){
	
}


// puts the above movement functions into the collision function,
// so that when the player collides with something
// movement matches the collision


function collisionPlatform(){// platform x = 1, y = 0 = top right //player x = .5, y= 1 = feet
	if(p_collission){
	

	if(platform_1.on && player.x > (platform_1.segments[0].x-120) && player.x < (platform_1.segments[platform_1.segments.length-1].x + 20)){ // player inside edges of platform (mult by 120 to get pixels)
		if (player.y < platform_1.height + 40 || player.y > (platform_1.height + 70)){ // player is above/ below the platform	

			fall(); // fall() checks if the player is jumping
		}
	}

	else if(platform_2.on && player.x > (platform_2.segments[0].x-120) && player.x < (platform_2.segments[platform_2.segments.length-1].x +20)){ // player inside edges of platform (mult by 120 to get pixels)
		if (player.y < platform_2.height + 40 || player.y > (platform_2.height + 70)){ // player is above/ below the platform
			fall();
		}
	}
	
	// check if player is jumping
	else fall();
	}
	else{ // player is in the first run bit of platform (the neverending platform)
		if(player.y < 420){
			fall();
		}
	}
}


//
// end collision with platforms //////////////////////////////////////////////////////////////////


// Changes the current displaying container
// Currently this only works for switching between children of stage
function changeView(view){

	//blip.play();

	for(var i=0; i<stage.children.length; i++){
		stage.children[i].visible = false;
		stage.children[i].interactive = false;
	}

	view.visible = true;
	view.interactive = true;

	
}

// As long as there is less then 3 objects generate a new set of object 
// TODO: add other object groups
function generateObstacles(centerX, centerY) {
	
	// Generate a random number and position and type of lasers
	var container = new PIXI.Container();
	
	var amount = Math.floor(Math.random() * (4 -1) + 1); // The top range in this formula for random is exclusive, 
	// so using floor the top range has to be one more then what you want
	
	for(i=0; i < amount; i++){
		var laser = new PIXI.extras.MovieClip(laserTextures);
		
		var laserDeltaX = Math.floor(Math.random() * 400) - 200;
		var laserDeltaY = Math.floor(Math.random() * 100) - 50;
		
		laser.anchor.x = 0.5;
		laser.anchor.y = 0.5;
		
		laser.position.x = centerX + laserDeltaX;
		laser.position.y = centerY + laserDeltaY - 100;
		
		laser.animationSpeed = .25;
		laser.loop = true;
		laser.play();

		container.addChild(laser);	
		
	}
	obstacles.addChild(container);
}




function turnLasersOff(){

}

  
// Cycles through each obstacle and moves based on the amount given
function moveObstacles(amount) {

	for(var j = 0; j < obstacles.children.length; j++){

		obstacles.children[j].position.x -= speed;

		if(obstacles.children[j].position.x + game_width * game_width <= 0){
			obstacles.removeChildAt(j);
			
		}
	}


}

// Cycles through each object and checks for collison
function checkCollison() {
	var playerX = player.position.x;
	var playerY = player.position.y;
	for(var j = 0; j < obstacles.children.length; j++){
		if(obstacles.children[j].position.x <= playerX + 62.5 && obstacles.children[j].position.x >= playerX - 62.5) {
			if(obstacles.children[j].position.y <= playerY + 62.5 && obstacles.children[j].position.y >= playerY - 62.5) {
				die();
			}
		}

	}
}



function firstRun(){

		
		if(!(game_on)) return;

		//first_platforms[first_platforms.length-1].visible = false;
		for(var m = 0; m < first_platforms.length-1; m++){


			first_platforms[m].position.x -= speed;


			if(first_platforms[m].position.x <= -120){
				platforms.removeChild(first_platforms[m]);
				first_platforms.splice(m, 1);

			}
		}



			

		if (first_platforms.length == 0){
			first_run = false;

		}

		else{
			requestAnimationFrame(firstRun);
		}


			
}








// Called when player collides with something or falls
function die() {
	
	changeView(death_view);
	game_view.visible = true;
}


function animate(){

	requestAnimationFrame(animate);
	scroller.update();

		if(game_on){
			if (platform_1.on || platform_2.on) moveObstacles(speed);

			if (platform_2.on) platform_2.update(speed);

			if (platform_1.on){
				platform_1.update(speed);


				if(platform_1.segments[0].x < player.x + 232){ // the first platform has been created and passed where the play is

					p_collission = true;
				}
			}
				// the initial creation of segments that were not an actual platform object have been removed from the screen
			
			collisionPlatform();



			if(distance_from_last >= platform_distance){
				if(!(platform_1.on)){
					
					platform_1 = new Platform(last_y, platforms);
					generateObstacles(platform_1.segments[Math.floor(platform_1.segments.length/2)].position.x, platform_1.height);
					last_y = platform_1.height;
					distance_from_last = -(platform_1.width*120);


				}

				else if(!(platform_2.on)){
					
					platform_2 = new Platform(last_y, platforms);
					generateObstacles(platform_2.segments[Math.floor(platform_2.segments.length/2)].position.x, platform_2.height);
					last_y = platform_2.height;			
					distance_from_last = -(platform_2.width*120);

				}
			}

			distance_from_last += speed;

			//platform_distance += speed;

			speed += .001;
			score += 100 * speed;
			player.animationSpeed += speed/100000;
	}

	else{

		for(var k = 0; k < platforms.children.length-1; k++){
		 
		 		platforms.children[k].position.x -= speed;
		 		
		 		if (platforms.children[k].position.x == -120){
		 			platforms.children[k].position.x = game_width + 120;
		 		}
		 	}
	}
	
	renderer.render(stage);

}


animate();
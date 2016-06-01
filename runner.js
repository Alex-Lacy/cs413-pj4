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


var title_view = new PIXI.Container();
stage.addChild(title_view);

var game_view = new PIXI.Container();
stage.addChild(game_view);

var scroller = new Scroller(game_view);

var platforms = new PIXI.Container();
game_view.addChild(platforms);

game_view.visible = false;
game_view.interactive = false;


title_view.visible = true;
title_view.interactive = true;


var player = {};
player.jumping = false;


var first_run = true;

var first_platforms = [];

var speed = 3; // The overall scaling of the game speed

var game_on = false;

player.runningFrames;
//player.runner;



PIXI.loader
	.add('./menu_assets/menu_assets.json')
	.load(loadMenus);


function loadMenus(){

	var title_screen = new PIXI.Sprite(PIXI.Texture.fromFrame('title_screen.png'));
	title_view.addChild(title_screen);
	title_screen.interactive = true;
	title_screen.on('mousedown', changeView.bind(null, game_view));
	title_screen.on('mousedown', firstRun);

}



PIXI.loader
	.add('./scroller_assets/platform_assets/platform_assets.json')
	//.add('./entity_assets/entity_assets.json')
	.add("running.json") // runing player
	.load(loadGame);


function loadGame(){


	first_run = true;


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




	var platform_texture = PIXI.Texture.fromFrame('mid_0.png');
	

	for(var k = 0; k <= game_width + 120; k += 120){

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
			jump();
	}

});



function jump(){
	
	player.y -= 50;
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
	player.y += 10;
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
	if(platform_1.on && player.x > (platform_1.segments[0].x-120) && player.x < platform_1.segments[platform_1.segments.length-1].x){ // player inside edges of platform (mult by 120 to get pixels)
		if (player.y < platform_1.height || player.y > (platform_1.height + 70)){ // player is above/ below the platform
			fall();
		}
	}

	else if(platform_2.on && player.x > (platform_2.segments[0].x-120) && player.x < platform_2.segments[platform_2.segments.length-1].x){ // player inside edges of platform (mult by 120 to get pixels)
		if (player.y < platform_2.height || player.y > (platform_2.height + 70)){ // player is above/ below the platform
			fall();
		}
	}
	
	else fall();
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
	

	//container.anchor.x = 0.5;
	//container.anchor.y = 0.5;
	// Generate a random number and position and type of lasers

	var container = new PIXI.Container();
	var amount = Math.floor(Math.random() * 3);
	
	for(i=0; i < amount; i++){
		var laserType = Math.floor(Math.random() * (2 -1) + 1);
		console.log(laserType);
		var laserDeltaX = Math.floor(Math.random() * 400) - 200;
		var laserDeltaY = Math.floor(Math.random() * 200) - 100;
		var laser_texture = PIXI.Texture.fromImage('laser_trap_air_1.png');
		var trap = new PIXI.extras.MovieClip([laser_texture]);

		trap.position.x = centerX + laserDeltaX;
		trap.position.y = centerY + laserDeltaY;
		trap.animationSpeed = .5;
		trap.play();

		container.addChild(trap);

		
		
	}
	stage.children[1].children[3].addChild(container);


}

// Cycles through each obstacle and moves based on the amount given
function moveObstacles(amount) {

	
	for(i = 0; i < stage.children[1].children[3].children.length; i++) {
		stage.children[1].children[3].children[i].x -= amount;
		
		if(stage.children[1].children[3].children[i].x + 400 <= 0) {

			// remove container from game view and destroy its children (ie the sprite)
			var toDestroy = stage.children[1].children[3].removeChildAt(i);
			toDestroy.destroy(true);
		}
	}
}

// Cycles through each object and checks for collison
function checkCollison() {
	var playerX = player.position.x;
	var playerY = player.position.y;
	for(i = objectsStart; i < stage.children[2].children.length; i++) {
		if(stage.children[2].children[i].x <= playerX + 62.5 && stage.children[2].children[i].x >= playerX - 62.5) {
			if(stage.children[2].children[i].y <= playerY + 62.5 && stage.children[2].children[i].y >= playerY - 62.5) {
				// Collsion results?
			}
		}
		
	}
}



function firstRun(){

		game_on = true;
	
		for(var m = 0; m < first_platforms.length; m++){

			first_platforms[m].position.x -= speed;

			if(first_platforms[first_platforms.length-1].position.x <= 0){
				platforms.removeChild(first_platforms[m]);
			}
		}

		if(first_platforms[first_platforms.length-1].position.x > 0){
			requestAnimationFrame(firstRun);
		}
	
}

var distance_from_last = -150;
var last_y = 475;

var platform_1 = {};
var platform_2 = {};





// Called when player collides with something or falls
function die() {
	
}

var game_on = false;
var p_collission = false; // collision for platforms

function animate(){

	requestAnimationFrame(animate);
	scroller.update();

		if(game_on){
		if (platform_1.on || platform_2.on) moveObstacles(speed);

		if (platform_2.on) platform_2.update(speed);
		if (platform_1.on) platform_1.update(speed);


		if(distance_from_last >= 200){
			if(!(platform_1.on)){
				
				platform_1 = new Platform(last_y, platforms);
				generateObstacles(platform_1.segments[Math.floor(platform_1.segments.length/2)].position.x, platform_2.height -100);
				last_y = platform_1.height;
				distance_from_last = -(platform_1.width*120);

			}

			else if(!(platform_2.on)){
				
				platform_2 = new Platform(last_y, platforms);
				generateObstacles(platform_2.segments[Math.floor(platform_2.segments.length/2)].position.x, platform_2.height -100);
				last_y = platform_2.height;			
				distance_from_last = -(platform_2.width*120);

			}
		}


	}


	
	if(game_on && platform_1.on){
		if(platform_1.segments[0].x < player.x){ // the first platform has been created and passed where the play is
			p_collission = true;
		}
	
		if(p_collission){ // the initial creation of segments that were not an actual platform object have been removed from the screen
			collisionPlatform();
		}
	}




	distance_from_last += speed;
	renderer.render(stage);

}


animate();
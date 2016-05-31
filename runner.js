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
	.add('./entity_assets/entity_assets.json')
	.add("running.json") // runing player
	.load(loadGame);


function loadGame(){


	first_run = true;
/*
	player = new PIXI.Sprite(PIXI.Texture.fromFrame('player.png'));
	game_view.addChild(player);
	player.interactive = true;
	player.anchor.x = .5;
	player.anchor.y = 1;
	player.position.x = 120;
	player.position.y = 400;

*/


	player.runningFrames = [];
	for(i=1; i<=4; i++) {
		player.runningFrames.push(PIXI.Texture.fromFrame('running' + i + '.png'));
	}
	player = new PIXI.extras.MovieClip(player.runningFrames);
	game_view.addChild(player);
	player.animationSpeed = 0.1;
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

	/////

}




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
function generateObstacles() {
	if(objects >= 3) {return;}
	
	// Create a new container for the object and add it to the game view
	var container = new PIXI.Container();
	
	// Random type
	var type = Math.floor(Math.random() * 2);
	var trap;
	if (type == 0) {
		// Air traps
		trap = new PIXI.Sprite(PIXI.Texture.fromFrame('obstacle_assets/laser_trap_air_1.png'));
		container.addChild(trap);
		container[0].y += 75; // Moves the trap into the air enough that you need to duck
	}
	else {
		// Ground traps 
		trap = new PIXI.Sprite(PIXI.Texture.fromFrame('obstacle_assets/spike_trap_floor_1.png'));
		container.addChild(trap);
	}
	container.anchor.x = 0.5;
	container.anchor.y = 0.5;
	stage.children[2].addChildAt(container);
	objects += 1;
	
}

// Cycles through each obstacle and moves based on the amount given
function moveObstacles(amount) {
	for(i = objectsStart; i < stage.children[2].children.length; i++) {
		stage.children[2].children[i].x -= amount;
		if(stage.children[2].children[i].x + 125 <= 0) {
			// remove container from game view and destroy its children (ie the sprite)
			var toDestroy = stage.children[2].removeChildAt(i);
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



console.log(platform_1 == true);


// Called when player collides with something or falls
function die() {
	
}


function animate(){

	requestAnimationFrame(animate);
	scroller.update();


	if (platform_2.on) platform_2.update(speed);
	if (platform_1.on) platform_1.update(speed);

	if(distance_from_last >= 200){
		if(!(platform_1.on)){
			console.log("p1");
			platform_1 = new Platform(last_y, platforms);
			last_y = platform_1.height;
			distance_from_last = -(platform_1.width*120);

		}

		else if(!(platform_2.on)){
			console.log("p2")
			platform_2 = new Platform(last_y, platforms);
			last_y = platform_2.height;			
			distance_from_last = -(platform_2.width*120);

		}
	}
		// turn p2 on
		// remove p1

	


	/*if(distance_from_last >= 200){
			if(first_run){
				platform_1 = new Platform(100, platforms);
				distance_from_last = -(platform_1.width*120);
				first_run = false;
				on_1 = true;
				last_y = platform_1.height;
			}
			else{
				platform_2 = new Platform(last_y, platforms);
				on_2 = true;
				last_y = platform_2.height;
			}*/
	//}


	distance_from_last += speed;
	renderer.render(stage);
}

animate();
// Basic game setup to display in HTML

var game_width = 720;
var game_height = 500;
var game_scale = 1;


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

game_view.visible = false;
game_view.interactive = false;


title_view.visible = true;
title_view.interactive = true;


var player = {};
player.jumping = false;



PIXI.loader
	.add('./menu_assets/menu_assets.json')
	.load(loadMenus);


function loadMenus(){

	var title_screen = new PIXI.Sprite(PIXI.Texture.fromFrame('title_screen.png'));
	title_view.addChild(title_screen);
	title_screen.interactive = true;
	title_screen.on('mousedown', changeView.bind(null, game_view));

}



PIXI.loader
	.add('./scroller_assets/scroller_assets.json')
	.add('./entity_assets/entity_assets.json')
	.load(loadGame);


function loadGame(){

	var scroller_mid = new PIXI.Sprite(PIXI.Texture.fromFrame('scroller_mid.png'));
	game_view.addChild(scroller_mid);


	player = new PIXI.Sprite(PIXI.Texture.fromFrame('player.png'));
	game_view.addChild(player);
	player.interactive = true;
	player.anchor.x = .5;
	player.anchor.y = 1;
	player.position.x = 120;
	player.position.y = 450;
	player.on('')



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




function animate(){
	requestAnimationFrame(animate);
	renderer.render(stage);


}

animate();
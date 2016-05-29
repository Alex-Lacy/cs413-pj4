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



PIXI.loader
	.add('./menu_assets/menu_assets.json')
	.load(load_menus);


function load_menus(){

	var title_screen = new PIXI.Sprite(PIXI.Texture.fromFrame('title_screen.png'));
	title_view.addChild(title_screen);
	title_screen.interactive = true;
	title_screen.on('mousedown', changeView.bind(null, game_view));

}



PIXI.loader
	.add('./scroller_assets/scroller_assets.json')
	.load(load_game);


function load_game(){

	var scroller_mid = new PIXI.Sprite(PIXI.Texture.fromFrame('scroller_mid.png'));
	game_view.addChild(scroller_mid);
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
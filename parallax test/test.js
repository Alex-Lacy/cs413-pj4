var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(720, 500, {backgroundColor: 0x66FF99});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();


var far_texture = new PIXI.Texture.fromImage("scroller_far.png");
var mid_texture = new PIXI.Texture.fromImage("scroller_mid.png");

var far = new PIXI.extras.TilingSprite(far_texture, 720, 370);
var mid = new PIXI.extras.TilingSprite(mid_texture, 721, 500);

stage.addChild(far);
far.tilePosition.x = 0;
far.tilePosition.y = 0;


stage.addChild(mid);

mid.tilePosition.x = 0;
mid.tilePosition.y = 0;




function animate() {
	requestAnimationFrame(animate);
	far.tilePosition.x -= .128;
	mid.tilePosition.x -= .64;
	
	
	renderer.render(stage);
}

animate();
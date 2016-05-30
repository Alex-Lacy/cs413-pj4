<<<<<<< HEAD
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(720, 500, {backgroundColor: 0x66FF99});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var scroller;

scroller = new Scroller(stage);

function animate() {
	requestAnimationFrame(animate);	
	scroller.update();
	
	renderer.render(stage);
}

=======
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(720, 500, {backgroundColor: 0x66FF99});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var scroller;

scroller = new Scroller(stage);

function animate() {
	requestAnimationFrame(animate);	
	scroller.update();
	
	renderer.render(stage);
}

>>>>>>> 47f6030cc51ba3a2851dd4839619c18d34c2f8b1
animate();
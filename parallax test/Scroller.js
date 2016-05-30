<<<<<<< HEAD
function Scroller(stage){
	this.far = new Far();
	stage.addChild(this.far);
	
	this.mid = new Mid();
	stage.addChild(this.mid);
}


Scroller.prototype.update = function(){
	this.far.update();
	this.mid.update();
=======
function Scroller(stage){
	this.far = new Far();
	stage.addChild(this.far);
	
	this.mid = new Mid();
	stage.addChild(this.mid);
}


Scroller.prototype.update = function(){
	this.far.update();
	this.mid.update();
>>>>>>> 47f6030cc51ba3a2851dd4839619c18d34c2f8b1
}
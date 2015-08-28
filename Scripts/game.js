var game = new Game();

var imageRepository = new function() {
	this.background = new Image();
	this.kyltti = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
	this.ukko = new Image();
	
	this.background.src = "bg.png";
	this.kyltti[0].src = "kyltti1.png";
	this.kyltti[1].src = "kyltti2.png";
	this.kyltti[2].src = "kyltti3.png";
	this.kyltti[3].src = "kyltti4.png";
	this.kyltti[4].src = "kyltti5.png";
	this.kyltti[5].src = "kyltti6.png";
	this.ukko.src = "ukko1.png";
}

function Background() {
	this.init = function(x,y){
		this.x = x;
		this.y = y;
	}
	this.speed = 5;
	
	this.draw = function() {
		this.x -= this.speed;
		this.context.drawImage(imageRepository.background, this.x, this.y);
	
		this.context.drawImage(imageRepository.background, this.x + this.canvasWidth, this.y);

		if (this.x <= -(this.canvasWidth))
			this.x = 0;
	};
}

function Kyltti() {
	this.init = function(y,x1,x2,x3,x4,x5,x6,cc){
		this.y = y;
		this.kyltti = [{x:x1},{x:x2},{x:x3},{x:x4},{x:x5},{x:x6}];
		this.clickcount = cc;
	}
	this.speed = 5;
	this.start = 0;
	this.end = 0;

	this.count = function() {
		if(this.clickcount == 0){
			this.start = + new Date();
		}
		this.end = + new Date();
		this.clickcount++;
		this.context.clearRect(0, 0, 35, 15);
		this.context.fillText(this.clickcount,1,10);
		if(this.clickcount == 100){
			var diff = this.end -this.start;
			document.getElementById('time').innerHTML = "Time: "+ diff/1000;
			document.getElementById('time').style.display = "block";
			document.getElementById('restart').style.display = "block";
		}

	};
	this.draw = function() {
		
		for(var i = 0; i< 6; i++){
			if(this.kyltti[i].x > 15){
				this.context.clearRect(this.kyltti[i].x, this.y, this.kyltti[i].x+15, this.y+35);
			}else{
				this.context.clearRect(0, this.y, this.kyltti[i].x+15, this.y+35);		
			}
		}
		for(var i = 0; i< 6; i++){

			this.kyltti[i].x -= this.speed;
			if(this.kyltti[i].x > -15){
				this.context.drawImage(imageRepository.kyltti[i], this.kyltti[i].x, this.y);
			}
		}
	};
}

function Ukko() {
	this.init = function(x,y){
		this.x = x;
		this.y = y;
	}
	this.draw = function() {

		this.context.drawImage(imageRepository.ukko, this.x, this.y);
	};
}

function Game() {
	this.init = function() {
		this.bgCanvas = document.getElementById('background');
		this.kylttiCanvas = document.getElementById('kyltti');
		this.ukkoCanvas = document.getElementById('ukko');

		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.kylttiContext = this.kylttiCanvas.getContext('2d');
			this.ukkoContext = this.ukkoCanvas.getContext('2d');
		
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;
			
			Kyltti.prototype.context = this.kylttiContext;
			Kyltti.prototype.canvasWidth = this.kylttiCanvas.width;
			Kyltti.prototype.canvasHeight = this.kylttiCanvas.height;

			Ukko.prototype.context = this.ukkoContext;
			Ukko.prototype.canvasWidth = this.ukkoCanvas.width;
			Ukko.prototype.canvasHeight = this.ukkoCanvas.height;
			
			this.background = new Background();
			this.background.init(0,0);

			this.kyltti = new Kyltti();
			this.kyltti.init(111,150,250,350,450,550,650,0);

			this.ukko = new Ukko();
			this.ukko.init(145,111);

			this.ukkoCanvas.addEventListener('mousedown', function(evt ) {
				game.kyltti.count();
				animate();
			}, false);

			this.ukkoCanvas.addEventListener('touchstart', function(evt){
				evt.preventDefault();
				game.kyltti.count();
				animate();        			
    			}, false);


			animate();
		} 
	};
	
	this.restart = function() {
		
		document.getElementById('time').style.display = "none";
		document.getElementById('restart').style.display = "none";

		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.kylttiContext.clearRect(0, 0, this.kylttiCanvas.width, this.kylttiCanvas.height);
		this.ukkoContext.clearRect(0, 0, this.ukkoCanvas.width, this.ukkoCanvas.height);

		this.background.init(0,0);
		this.kyltti.init(111,150,250,350,450,550,650,0);
		this.ukko.init(145,111);

		animate();
	};
}


function animate() {
	game.background.draw();
	game.kyltti.draw();
	game.ukko.draw();
}
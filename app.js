var myGamePiece;
var myObstacles = [];
var myScore;
var flappy = "https://www.pngitem.com/pimgs/b/184-1842507_flappy-bird-png.png"

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, flappy, 10, 120, "image");
    myScore = new component("30px", "Consolas", "#5f27cd", 280, 40, "text");
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 370;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNumber = 0; 
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(a, b, c, x, y, type) {
    this.type = type;
  if (type == "image") {
        this.image = new Image();
        this.image.src = c;
    }
    this.a = a;
    this.b = b;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.a + " " + this.b;
            ctx.fillStyle = c;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = c;
            ctx.fillRect(this.x, this.y, this.a, this.b);
        }
      
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.a, this.b);
        } else {
            ctx.fillStyle = c;
            ctx.fillRect(this.x, this.y, this.a, this.b);
        }
    }
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.a);
        var mytop = this.y;
        var mybottom = this.y + (this.b);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.a);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.b);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNumber += 1;
    if (myGameArea.frameNumber == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "black", x, 0));
        myObstacles.push(new component(10, x - height - gap, "black", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPosition();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNumber;
    myScore.update();
    myGamePiece.newPosition()    
    myGamePiece.update()
}

function everyinterval(n) {
    if ((myGameArea.frameNumber / n) % 1 == 0) {
        return true
    }
    return false
}

function moveup() {
    myGamePiece.speedY = -1; 
}

function movedown() {
    myGamePiece.speedY = 1; 
}

function moveleft() {
    myGamePiece.speedX = -1; 
}

function moveright() {
    myGamePiece.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
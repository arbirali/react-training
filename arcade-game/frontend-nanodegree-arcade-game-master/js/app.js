// Enemies our player must avoid
var Enemy = function(x = 0, y = 2) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x * 101;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var loc = this.x++;
    if (loc > 500) {
        this.x = -100
    }
    ctx.drawImage(Resources.get(this.sprite), loc, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.y * 83) - 12);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x = 2, y = 5) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

var wons = 0;
var fails = 0;

Player.prototype.update = function () {
    var playerX = this.x * 101;
    var playerY = this.y;
    if (playerY == 0) {
        wons++;
        console.log(`Wons ${wons} time(s)`);
        player.x = 2;
        player.y = 5;
    }

    allEnemies.forEach(enemy => {
        if (enemy.y == playerY) {
            if (enemy.x > playerX - 101 && enemy.x < playerX + 101) {
                fails++;
                console.log(`Fails ${fails} time(s)`);
                player.x = 2;
                player.y = 5;
            }
        }
    });
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 12);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            this.x > 0 ? this.x-- : ''
            break;
        case 'right':
            this.x < 4 ? this.x++ : '';
            break;
        case 'up':
            this.y > 0 ? this.y-- : ''
            break;
        case 'down':
            this.y < 5 ? this.y++ : '';
            break;
        default:
            '';
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(2, 5);

var enemy1 = new Enemy(0, 1);
var enemy2 = new Enemy(2, 2);
var enemy3 = new Enemy(3, 3);

var allEnemies = [ enemy1, enemy2, enemy3 ];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

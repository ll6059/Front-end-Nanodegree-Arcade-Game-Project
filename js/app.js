// Enemies our player must avoid
// Create "Enemy" constructor 
var Enemy = function() {
    // Variables applied to each of our instances go here
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    // Use math.random() to select a random number between 1 and 5
    this.speed = Math.floor(Math.random() * 5 + 1) * 200;
};

// Turn "Enemy" function into the "update" method for the Enemy object prototype. Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers
    this.x = this.x + (this.speed * dt);

    // Changes enemy's speed and y position when enemy moves beyond the right x-axis border of the canvas     
    if (this.x > 505) {
        this.x = -101;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * 200));
        // Prevents enemy from entering into the grass
        //console.log("new y: " + this.y);
        if (this.y > 298) {
            this.y = 60;
        }
    }
};

// Draw the enemy on the screen, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class requires an update(), render() and a handleInput() method
var Player = function() {
    // The starting point of the player
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 380;
};

// Return to the starting point if the conditions are met 
Player.prototype.update = function() {
    if (this.x > 400 || this.x < 0 || this.y > 400) {
        this.reset();
    }

    if (this.y < 40) {
        confirm("Nice job, you win");
        this.reset();
    }
};
// Reset player's position 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Restrict player movement within canvas
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= 100;
    }
    if (key === 'right') {
        this.x += 100;
    }
    if (key === 'up') {
        this.y -= 85;
    }
    if (key === 'down') {
        this.y += 85;
    }
};

// Check for collision between player and enemies. The player returns to the initial position if the condition is met.
Player.prototype.checkCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            this.x = 200;
            this.y = 415;
        }
    }
};

// Place the player object in a variable called player
var player = new Player();

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var bugEnemies = 3;

for (var i = 0; i < bugEnemies; i++) {
    allEnemies.push(new Enemy());
}
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





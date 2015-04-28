var startGame = false;
var playerExists = false;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Initializing position corordinates
    this.x = x;
    this.y = y;
    // Initializing the enemy's speed
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // var dist = 200 * dt;
    // this.x += dist;
    // console.log(this.speed);
    var dist = this.speed * dt;
    this.x += dist;
    if (this.x > 500) {
      this.x = -50;
    }
    // defining the edges of the enemy for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 70;
    this.bottom = this.y + 70;
    if (playerExists) {
      this.checkCollision(this, player);
    }
  }
  // Checks to see if enemy and player are intersecting
Enemy.prototype.isIntersecting = function(enemy, player) {
    return !(enemy.top > player.bottom || enemy.left > player.right || enemy.right < player.left || enemy.bottom < player.top);
  }
  // Checks to see if there is any collision between enemy and payer
  // if there is then reset position
Enemy.prototype.checkCollision = function(enemy, player) {
    if (this.isIntersecting(enemy, player)) {
      // If there is collision between the player and any of the enemies,
      // reduce the player's life by 1
      player.lives -= 1;
      console.log("lives:");
      console.log(player.lives);
      $("#lives").find('p').text(player.lives);
      player.resetPosition();
    }
  }
  // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Now write your own player class
  // This class requires an update(), render() and
  // a handleInput() method.
var Player = function(x, y) {
    // The default image/sprite for our player
    this.sprite = 'images/char-boy.png';
    // Initializing position coordinates
    this.x = x;
    this.y = y;
    // Initializing the number of lives the player has
    this.lives = 10;
    // Initializing the player's score
    this.score = 0;
  }
  // Update the player's position
Player.prototype.update = function() {
    playerExists = true;
    // defining the edges of the player for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 70;
    this.bottom = this.y + 70;
  }
  // Function that allows you select a player of your choice
Player.prototype.selectPlayer = function() {
    var currentPlayer = $("#players").val();
    // console.log(currentPlayer);
    switch (currentPlayer) {
      case 'boy':
        this.sprite = 'images/char-boy.png';
        break;
      case 'cat-girl':
        this.sprite = 'images/char-cat-girl.png';
        break;
      case 'horn-girl':
        this.sprite = 'images/char-horn-girl.png';
        break;
      case 'pink-girl':
        this.sprite = 'images/char-pink-girl.png';
        break;
      case 'princess-girl':
        this.sprite = 'images/char-princess-girl.png';
        break;
      default:
        this.sprite = 'images/char-boy.png';
        break;
    }
  }
  // Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Handles the keyboard inputs
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
      if (this.x > 50) {
        this.x -= 101;
      }
    }
    if (keyCode === 'up') {
      if (this.y > 100) {
        this.y -= 83;
      } else {
        this.score++;
        console.log(this.score);
        this.resetPosition();
      }
    }
    if (keyCode === 'right') {
      if (this.x < 350) {
        this.x += 101;
      }
    }
    if (keyCode === 'down') {
      if (this.y < 400) {
        this.y += 83;
      }
    }
    if (keyCode == 'space') {
      startGame = true;
    }
  }
  // This function resets the player position to its starting position
  // It checks if the player's lives is 0, the it sets the score to 0 and lives to 10
  // promts the user that game is over
Player.prototype.resetPosition = function() {
  this.x = 200;
  this.y = 400;
  if (this.lives == 0) {
    startGame = false;
    this.score = 0;
    this.lives = 10;
    $('#score').find('p').text(player.score);
    alert('Game Over! :( Click ok, then press "space" to start the game.');
  }
}
var enemyMinSpeed = 100;
var enemyMaxSpeed = 300;
var enemy1 = new Enemy(0, 65, Math.floor((Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed)));
var enemy2 = new Enemy(125, 150, Math.floor((Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed)));
var enemy3 = new Enemy(75, 230, Math.floor((Math.random() * (enemyMaxSpeed - enemyMinSpeed) + enemyMinSpeed)));
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'space'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
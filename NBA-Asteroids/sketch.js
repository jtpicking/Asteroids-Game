var img;
var img2;
var player;
var ball;
var speed;
const BASE_SPEED = 5;
var bullets = [];
var asteroids = [];


function preload() {
  img = loadImage("images/tblogo.png");
  img2 = loadImage("images/ball.png");
}

function setup() {
  createCanvas(600, 600);
  player = new Blazer(width / 2, height / 2, -PI / 2); //set rotation so image upright to start
  speed = BASE_SPEED;

}

function draw() {
  background(220);

  player.display();
  player.move();


  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].display();
    asteroids[i].move();
    if (player.intersects(asteroids[i])) {
      textSize(30);
      text("Game Over", width / 2, height / 2)
      noLoop();
    }
  }

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move();
    bullets[i].display();

    for (var j = 0; j < asteroids.length; j++) {
      if (bullets[i].intersects(asteroids[j])) {
        asteroids.splice(j, 1);
      }
    }
    if (bullets[i].y < 0 || bullets[i].x < 0 || bullets[i].y > height || bullets[i].x > width) {
      bullets.splice(i, 1);
    }
  }
}

function keyPressed() {
  player.gun();
  if (keyIsDown(13)) {
    for (var i = 0; i < 2; i++) {
      asteroids.push(new createBall(width + 60, random(height), 60, random(-2, -1), random(-1, 1)))
      asteroids.push(new createBall(-60, random(height), 60, random(2, 1), random(-1, 1)))
      asteroids.push(new createBall(random(width), -60, 60, random(-1, 1), random(1, 2)))
      asteroids.push(new createBall(random(width), height + 60, 60, random(-1, 1), random(-1, -2)))
    }
  }
}

function Blazer(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.d = 50;

  this.display = function() {
    push()
    translate(this.x, this.y)
    rotate(this.r + PI / 2); //Added 90 degrees so that top is lead
    imageMode(CENTER)
    image(img, 0, 0, this.d, this.d);
    pop();
  }

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.d / 2 + other.d / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.move = function() {
    var vector2 = createVector(0, 0);

    if (keyIsDown(65)) { //"A" key
      this.r -= 0.1;
    }
    if (keyIsDown(68)) { //"D" key
      this.r += 0.1;
    }
    if (keyIsDown(87)) { //"W" key
      this.x += cos(this.r) * speed;
      this.y += sin(this.r) * speed;
    }
    if (keyIsDown(83)) { //"S" key
      this.x -= cos(this.r) * speed;
      this.y -= sin(this.r) * speed;
    }

    if (this.x < 0 - 30)
      this.x = width;

    if (this.x > width + 30)
      this.x = 0;

    if (this.y < 0 - 30)
      this.y = height;

    if (this.y > height + 30)
      this.y = 0;

  }

  this.gun = function() {
    if (keyIsDown(32)) {
      bullets.push(new Bullet(this.x, this.y, cos(this.r), sin(this.r)))
    }
  }
}

function Bullet(x, y, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.diameter = 10;
  this.speedX = speedX * 8;
  this.speedY = speedY * 8;

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.diameter / 2 + other.d / 2) {
      return true;
    } else {
      return false;
    }
  }

  this.move = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

function createBall(x, y, d, sX, sY) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.sX = sX;
  this.sY = sY;



  this.display = function() {
    push();
    imageMode(CENTER)
    image(img2, this.x, this.y, this.d, this.d);
    pop();
  }

  this.move = function() {
    this.x += this.sX;
    this.y += this.sY;

    if (this.x < 0 - 30)
      this.x = width;

    if (this.x > width + 30)
      this.x = 0;

    if (this.y < 0 - 30)
      this.y = height;

    if (this.y > height + 30)
      this.y = 0;
  }
}
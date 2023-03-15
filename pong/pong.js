// Get the canvas element and its context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Define the ball object
var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 60,
  height: 60,
  dx: 5,
  dy: -5,
  image: new Image(),
};

ball.image.src = "https://storied-pasca-bf13a0.netlify.app/rut.png";


// Define the paddles
var paddleHeight = 80;
var paddleWidth = 10;

var leftPaddle = {
  x: 0,
  y: (canvas.height - paddleHeight) / 2,
  dy: 0,
};

var rightPaddle = {
  x: canvas.width - paddleWidth,
  y: (canvas.height - paddleHeight) / 2,
  dy: 0,
};

// Define the score
var leftScore = 5;
var rightScore = 5;

// Handle user input
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    rightPaddle.dy = -5;
  } else if (event.code === "ArrowDown") {
    rightPaddle.dy = 5;
  } else if (event.code === "KeyW") {
    leftPaddle.dy = -5;
  } else if (event.code === "KeyS") {
    leftPaddle.dy = 5;
  }
});

document.addEventListener("keyup", function (event) {
  if (
    event.code === "ArrowUp" ||
    event.code === "ArrowDown" ||
    event.code === "KeyW" ||
    event.code === "KeyS"
  ) {
    leftPaddle.dy = 0;
    rightPaddle.dy = 0;
  }
});

// Define the game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Bounce the ball off the top and bottom walls
  if (ball.y < 0 || ball.y + ball.height > canvas.height) {
    ball.dy = -ball.dy;
  }

  // Bounce the ball off the paddles
  if (
    ball.x < paddleWidth &&
    ball.y + ball.height > leftPaddle.y &&
    ball.y < leftPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  } else if (
    ball.x + ball.width > canvas.width - paddleWidth &&
    ball.y + ball.height > rightPaddle.y &&
    ball.y < rightPaddle.y + paddleHeight
  ) {
    ball.dx = -ball.dx;
  }

  // Check if the ball goes out of bounds and update the score
  if (ball.x < 0) {
    rightScore--;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  } else if (ball.x + ball.width > canvas.width) {
    leftScore--;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
  }

  // Move the paddles
  leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;

  // Keep the paddles on the screen
  if (leftPaddle.y < 0) {
leftPaddle.y = 0;
} else if (leftPaddle.y + paddleHeight > canvas.height) {
leftPaddle.y = canvas.height - paddleHeight;
}

if (rightPaddle.y < 0) {
rightPaddle.y = 0;
} else if (rightPaddle.y + paddleHeight > canvas.height) {
rightPaddle.y = canvas.height - paddleHeight;
}

// Draw the ball
ctx.drawImage(ball.image, ball.x, ball.y, ball.width, ball.height);

// Draw the paddles
ctx.fillRect(
leftPaddle.x,
leftPaddle.y,
paddleWidth,
paddleHeight
);

ctx.fillRect(
rightPaddle.x,
rightPaddle.y,
paddleWidth,
paddleHeight
);

// Draw the score
ctx.font = "bold 32px Arial";
ctx.fillStyle = "black";
ctx.fillText(leftScore.toString(), canvas.width / 2 - 50, 50);
ctx.fillText(rightScore.toString(), canvas.width / 2 + 25, 50);

// Check if the game is over
if (leftScore === 0 || rightScore === 0) {
alert("Game over!");
location.reload();
}

// Request the next frame of the game loop
requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

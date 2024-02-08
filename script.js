let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [
  { x: 8 * box, y: 8 * box },
  { x: 7 * box, y: 8 * box },
];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};
let score = 0;
let speed = 200;

function createBG() {
  context.fillStyle = "white";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "blue";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function createFood() {
  context.fillStyle = "black";
  context.fillRect(food.x, food.y, box, box);
}

function drawScore() {
  context.fillStyle = "black";
  context.font = "18px Arial";
  context.fillText("Score: " + score, box, box);
}

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX < 0) snakeX = 15 * box;
  if (snakeY < 0) snakeY = 15 * box;
  if (snakeX > 15 * box) snakeX = 0;
  if (snakeY > 15 * box) snakeY = 0;

  if (snakeX == food.x && snakeY == food.y) {
    var newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
    food = {
      x: Math.floor(Math.random() * 15 + 1) * box,
      y: Math.floor(Math.random() * 15 + 1) * box,
    };
    score += 10;
    speed -= 10;
    clearInterval(game);
    game = setInterval(startGame, speed);
  } else {
    snake.pop();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snakeX && snake[i].y == snakeY) {
      clearInterval(game);
      alert("Game Over! Your score was: " + score);
    }
  }

  var newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  createBG();
  createSnake();
  createFood();
  drawScore();
}

document.addEventListener("keydown", update);

var game = setInterval(startGame, speed);

var field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

var x = 0;
var y = 0;
var width = 20;
for (var i = 0; i < width * width; i++) {
    var cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
    if (x == width) {
        y++;
        x = 0;
    }
    cell.setAttribute('posX', x);
    cell.setAttribute('posY', y);
    x++;
}

var coords = generateSnake();
var snakeBody = [document.querySelector('[posX = "' + coords[0] + '"][posY = "' + coords[1] + '"]'), document.querySelector('[posX = "' + (coords[0] - 1) + '"][posY = "' + coords[1] + '"]'), document.querySelector('[posX = "' + (coords[0] - 2) + '"][posY = "' + coords[1] + '"]')];
for (var i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('snakeHead');

var input = document.createElement('input');
document.body.appendChild(input);
input.id = 'scoreInput';
var score = 0;
input.value = 'Score: ' + score;
var pauseInput = document.createElement('input');
document.body.appendChild(pauseInput);
pauseInput.id = 'pauseInput';

var direction = 'right';
var apple;
var step = false;
var pause = 1;
var gameOver = false;
createApple();
var interval = setInterval(move, 300);



function generateSnake() {
    var posX = Math.round(Math.random() * ((width - 1) - 2) + 2);
    var posY = Math.round(Math.random() * ((width - 1) - 2) + 2);
    return [posX, posY];
}
function createApple() {
    function generateApple() {
        var posX = Math.round(Math.random() * (width - 1));
        var posY = Math.round(Math.random() * (width - 1));
        apple = document.querySelector('[posX = "' + posX + '"][posY = "' + posY + '"]');
        while (apple.classList.contains('snakeBody'))
            generateApple();
    }
    generateApple();
    apple.classList.add('apple');
}
function move() {
    var headCoords = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction == 'right') {
        if (headCoords[0] < (width - 1)) {
            snakeBody.unshift(document.querySelector('[posX = "' + ( + headCoords[0] + 1) + '"][posY = "' + headCoords[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "0"][posY = "' + headCoords[1] + '"]'));
        }
    } else if (direction == 'left') {
        if (headCoords[0] > 0) {
            snakeBody.unshift(document.querySelector('[posX = "' + ( + headCoords[0] - 1) + '"][posY = "' + headCoords[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + ( + width - 1) + '"][posY = "' + headCoords[1] + '"]'));
        }
    } else if (direction == 'up') {
        if (headCoords[1] > 0) {
            snakeBody.unshift(document.querySelector('[posX = "' + headCoords[0] + '"][posY = "' + ( + headCoords[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + headCoords[0] + '"][posY = "' + ( + width - 1) + '"]'));
        }
    } else if (direction == 'down') {
        if (headCoords[1] < (width - 1)) {
            snakeBody.unshift(document.querySelector('[posX = "' + headCoords[0] + '"][posY = "' + ( + headCoords[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + headCoords[0] + '"][posY = "0"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
        apple.classList.remove('apple');
        snakeBody.push(document.querySelector('[posX = "' + snakeBody[snakeBody.length - 1].getAttribute('posX') + '"][posY = "' + snakeBody[snakeBody.length - 1].getAttribute('posY') + '"]'));
        createApple();
        score++;
        input.value = 'Score: ' + score;
    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        pauseInput.value = 'GAME OVER';
        gameOver = true;
        clearInterval(interval);
    }

    if (score == (width * width) - 3) {
        gameOver = true;
        pauseInput.value = 'YOU WIN';
        clearInterval(interval);
    }
    
    snakeBody[0].classList.add('snakeHead');
    for (var i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
    step = true;
}
window.addEventListener('keydown', function(e) {
    if (step) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left'; 
            step = false;
        }       
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            step = false;
        }   
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            step = false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            step = false;
        }
        else if (e.keyCode == 32) {
            pause *= (-1);
            if (pause == -1 && !gameOver) {
                pauseInput.value = 'PAUSE';
                clearInterval(interval);
            }
            if (pause == 1 && !gameOver) {
                pauseInput.value = '';
                interval = setInterval(move, 300);
            }  
        }    
    }
});

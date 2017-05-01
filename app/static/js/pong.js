var canvas;
var canvasContext;
var ballX = 390;
var ballY = 290;

var defaultBallSpeedY = 4;

var ballSpeedX = 8; 
var ballSpeedY = defaultBallSpeedY;
var paddle1Y = 250;
var paddle2Y = 250;
var paddle1Thickness= 10;
var paddle2Thickness= 10;
const PADDLE1_HEIGHT = 100;
const PADDLE2_HEIGHT = 100;

var player1Score = 0;
var player2Score = 0;

var showingWinScreen = false;

function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;

    return {
        x:mouseX,
        y:mouseY
    };
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = -ballSpeedY;
    ballSpeedY = defaultBallSpeedY;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE2_HEIGHT/2);
    if (paddle2YCenter < ballY-35) {
        paddle2Y += 5;
    } else if (paddle2YCenter > ballY+35) {
        paddle2Y -= 5;
    }
}

function moveEverything() {
    computerMovement();

    ballX += ballSpeedX;
    ballY -= ballSpeedY;

    //CPU side - Right
    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y+PADDLE2_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y+PADDLE2_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            player1Score++;
        }
    }
    //Player side - Left
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y+PADDLE1_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y+PADDLE1_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            player2Score++;
        }
    }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY <= 5) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {

    //Background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0 ,0, canvas.width, canvas.height);

    //Ball
    colorCircle(ballX, ballY, 10, 'limegreen');

    //Paddle - Player
    colorRect(0, paddle1Y, paddle1Thickness, PADDLE1_HEIGHT,'limegreen');

    //Paddle - CPU
    colorRect(canvas.width-10, paddle2Y, paddle2Thickness, PADDLE2_HEIGHT,'limegreen');

    //Draw Player1 Score
    canvasContext.fillText(player1Score, 100, 80);
    //Draw Player2 Score
    canvasContext.fillText(player2Score, canvas.width-100, 80);
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font="30px Monospace";

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove',
            function(event) {
                var mousePos = calculateMousePos(event);
                paddle1Y = mousePos.y - (PADDLE1_HEIGHT/2);
                //paddle2Y = mousePos.y - (PADDLE2_HEIGHT/2);
            });
}

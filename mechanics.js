const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const diamondImages = [
    new Image(),
    new Image(),
    new Image()
];

diamondImages[0].src = 'billeder/nydiamant.png';
diamondImages[1].src = 'billeder/nydiamant2.png';
diamondImages[2].src = 'billeder/nydiamant3.png';

const bombImg = new Image();
bombImg.src = 'billeder/bombe.png';

let score = 0;
let gameOver = false;
let lastSpeedIncreaseTime = Date.now();

const diamondSizes = [
    { size: 50, points: 10, baseSpeed: 4 },
    { size: 70, points: 5, baseSpeed: 3 },
    { size: 90, points: 2, baseSpeed: 2.5 }
];

const bombSizes = [
    { size: 40, baseSpeed: 2.5 },
    { size: 60, baseSpeed: 2 }
];

const paddle = {
    width: 100,
    height: 20,
    x: (canvas.width - 100) / 2,
};

canvas.addEventListener('click', () => {
    canvas.requestPointerLock();
});

document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement === canvas) {
        paddle.x += event.movementX;

        paddle.x = Math.min(Math.max(paddle.x, 0), canvas.width - paddle.width);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.exitPointerLock();
    }
});

let diamonds = Array.from({ length: 3 }, createDiamond);
let bombs = Array.from({ length: 2 }, createBomb);

// Modal elements
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const playAgainButton = document.getElementById('playAgainButton');
const submitScoreButton = document.getElementById('submitScoreButton');
const watchHighscoresButton = document.getElementById('watchHighscoresButton'); // Tilføjet

// Add event listeners for modal buttons
playAgainButton.addEventListener('click', restartGame);
submitScoreButton.addEventListener('click', submitHighScore);

watchHighscoresButton.addEventListener('click', () => {
    window.location.href = 'highscore.php';
});

function createDiamond() {
    let type = diamondSizes[Math.floor(Math.random() * diamondSizes.length)];
    return {
        x: Math.random() * (canvas.width - type.size),
        y: 0,
        size: type.size,
        points: type.points,
        speed: type.baseSpeed,
        delayTime: Math.random() * 200
    };
}

function createBomb() {
    let type = bombSizes[Math.floor(Math.random() * bombSizes.length)];
    return {
        x: Math.random() * (canvas.width - type.size),
        y: 0,
        size: type.size,
        speed: type.baseSpeed,
        delayTime: Math.random() * 300
    };
}

function drawDiamonds() {
    diamonds.forEach(diamond => {
        if (diamond.delayTime <= 0) {
            let imgIndex = diamondSizes.findIndex(d => d.size === diamond.size);
            if (diamondImages[imgIndex].complete) {
                ctx.drawImage(diamondImages[imgIndex], diamond.x, diamond.y, diamond.size, diamond.size);
            }
        }
    });
}

function drawBombs() {
    bombs.forEach(bomb => {
        if (bomb.delayTime <= 0 && bombImg.complete) {
            ctx.drawImage(bombImg, bomb.x, bomb.y, bomb.size, bomb.size);
        }
    });
}

function drawPaddle() {
    ctx.fillStyle = '#000';
    ctx.fillRect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Pixelify Sans';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function showGameOverModal() {
    finalScoreElement.textContent = score;
    gameOverModal.style.display = 'flex';
}

function drawGameOver() {
    // Show the game over modal
    showGameOverModal();
}

function updateDiamonds() {
    let currentTime = Date.now();

    if (currentTime - lastSpeedIncreaseTime >= 5000) {
        diamonds.forEach(diamond => diamond.speed += 0.5);
        bombs.forEach(bomb => bomb.speed += 0.5);
        lastSpeedIncreaseTime = currentTime;
    }

    diamonds.forEach(diamond => {
        if (diamond.delayTime > 0) {
            diamond.delayTime--;
            return;
        }
        diamond.y += diamond.speed;

        if (diamond.y + diamond.size >= canvas.height - paddle.height - 10 &&
            diamond.x + diamond.size >= paddle.x && diamond.x <= paddle.x + paddle.width) {
            score += diamond.points;
            resetDiamond(diamond);
        } else if (diamond.y > canvas.height) {
            resetDiamond(diamond);
        }
    });
}

function updateBombs() {
    bombs.forEach(bomb => {
        if (bomb.delayTime > 0) {
            bomb.delayTime--;
            return;
        }
        bomb.y += bomb.speed;

        if (bomb.y + bomb.size >= canvas.height - paddle.height - 10 &&
            bomb.x + bomb.size >= paddle.x && bomb.x <= paddle.x + paddle.width) {
            gameOver = true;
        } else if (bomb.y > canvas.height) {
            resetBomb(bomb);
        }
    });

    if (gameOver) {
        drawGameOver();
        document.exitPointerLock();
    }
}

function resetDiamond(diamond) {
    let newDiamond = createDiamond();
    newDiamond.speed = diamond.speed;
    Object.assign(diamond, newDiamond);
}

function resetBomb(bomb) {
    let newBomb = createBomb();
    newBomb.speed = bomb.speed;
    Object.assign(bomb, newBomb);
}

function draw() {
    ctx.fillStyle = '#aee3cd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        drawDiamonds();
        drawBombs();
        drawPaddle();
        drawScore();
        updateDiamonds();
        updateBombs();
        requestAnimationFrame(draw);
    }
}

function restartGame() {
    gameOver = false;
    score = 0;
    diamonds = Array.from({ length: 3 }, createDiamond);
    bombs = Array.from({ length: 2 }, createBomb);
    gameOverModal.style.display = 'none';
    canvas.requestPointerLock();
    draw();
}

function submitHighScore() {
    const playerNameElement = document.querySelector('#playerName')
    console.log(score)
    console.log(JSON.stringify({
        player: playerNameElement.value,
        score: score,
    }))



    fetch(
        'submit-highscore.php',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player: playerNameElement.value,
                score: score,
            }),
        }
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error){
            console.error(error);
        });
}

function startGame() {
    canvas.requestPointerLock();
    draw();
}

startGame();

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawBackground() {
    ctx.fillStyle = '#aee3cd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawButton(x, y, width, height, text) {
    ctx.fillStyle = '#8A2BE2FF';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#000000';
    ctx.font = '20px Pixelify Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x + width / 2, y + height / 1.5);
}


drawBackground();
const playButton = { x: 350, y: 250, width: 200, height: 50, text: 'Play' };
const highscoreButton = { x: 350, y: 350, width: 200, height: 50, text: 'Highscore' };
drawButton(playButton.x, playButton.y, playButton.width, playButton.height, playButton.text);
drawButton(highscoreButton.x, highscoreButton.y, highscoreButton.width, highscoreButton.height, highscoreButton.text);


canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;


    if (
        mouseX >= playButton.x &&
        mouseX <= playButton.x + playButton.width &&
        mouseY >= playButton.y &&
        mouseY <= playButton.y + playButton.height
    ) {
        window.location.href = 'game.php';
    }


    if (
        mouseX >= highscoreButton.x &&
        mouseX <= highscoreButton.x + highscoreButton.width &&
        mouseY >= highscoreButton.y &&
        mouseY <= highscoreButton.y + highscoreButton.height
    ) {
        window.location.href = 'highscore.php';
    }
});

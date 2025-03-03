const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawBackground() {
    ctx.fillStyle = '#aee3cd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawBackground();



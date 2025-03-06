<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Diamond Catcher</title>
    <link rel="stylesheet" href="styles.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
</head>
<body>

<H1 class="header" style="display: flex; justify-content: center;">Diamond Catcher</H1>

<main style="display: flex; justify-content: center; position: relative;">
    <canvas id="myCanvas" width="900" height="680"></canvas>
    <iframe id="highscoreFrame"
            src="https://highscores.martindilling.com/games/73/embed?"
            title="Highscore table for Diamond Catcher"
            style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);
                   width: 400px; height: 300px; border: none; background: white;">
    </iframe>
</main>

<script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const button = {
        x: canvas.width / 2 - 100,
        y: canvas.height - 100,
        width: 200,
        height: 50,
        text: "Back to frontpage"
    };

    function drawBackground() {
        ctx.fillStyle = '#aee3cd';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawButton() {
        ctx.fillStyle = "#8A2BE2FF";
        ctx.fillRect(button.x, button.y, button.width, button.height);

        ctx.fillStyle = "black";
        ctx.font = "20px Pixelify Sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2);
    }

    function isInsideButton(x, y) {
        return x > button.x && x < button.x + button.width &&
            y > button.y && y < button.y + button.height;
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isInsideButton(mouseX, mouseY)) {
            window.location.href = 'index.php';
        }
    });

    drawBackground();
    drawButton();
</script>

</body>
</html>

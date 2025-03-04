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
            src="https://highscores.martindilling.com/games/64/embed?"
            title="Highscore table for Diamond Catcher"
            style="position: absolute; top: 50px; left: 50%; transform: translateX(-50%);
                   width: 400px; height: 300px; border: none; background: white;">
    </iframe>
</main>

<script src="highscore.js"></script>

</body>
</html>

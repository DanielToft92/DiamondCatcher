

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

    <style>
        #myCanvas{
            cursor: none;
        }
    </style>
</head>
<body>

<H1 class="header" style="display: flex; justify-content: center;" >Diamond Catcher</H1>

<main style="display: flex; justify-content: center;">
    <canvas id="myCanvas" width="900" height="680"></canvas>

    <div id="gameOverModal" style="display: none;">
        <div id="modalContent">
            <h2>Game Over</h2>
            <p>Final Score: <span id="finalScore"></span></p>
            <input type="text" id="playerName" placeholder="Enter your name">
            <button id="submitScoreButton">Submit highscore</button>
            <button id="watchHighscoresButton">Watch highscores</button>
            <button id="playAgainButton">Play again</button>
        </div>
    </div>

</main>


<script src="mechanics.js"></script>



</body>
</html>






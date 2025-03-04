<?php
$token = '25|LPwZBCLvlhShHrSRJvbAAZjhfEwBDviZm5SvgRixc4febed1';
$url = 'https://highscores.martindilling.com/api/v1/games';
$headers = [
    'Accept: application/json',
    'Content-type: application/json',
    'Authorization: Bearer ' . $token,
];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
]);
$responseData = curl_exec($curl);
curl_close($curl);

$responseJson = json_decode($responseData);
?>

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

<main style="display: flex; justify-content: center;">
    <canvas id="myCanvas" width="900" height="680"></canvas>
</main>

<script src="index.js"></script>

<script>
    const playerElement = document.querySelector('[data-player]');
    const scoreElement = document.querySelector('[data-score]');
    const sendButton = document.querySelector('[data-send-button]');
    const responsePreviewElement = document.querySelector('[data-response-preview]');

    const player = generatePirateName();
    const score = Math.round(Math.random() * 1000);

    playerElement.textContent = player;
    scoreElement.textContent = score.toString();

    function generatePirateName() {
        const firstNames = ["Blackbeard", "Salty", "One-Eyed", "Mad", "Captain", "Peg-Leg", "Red", "Stormy", "Jolly", "Barnacle"];
        const lastNames = ["McScurvy", "Silverhook", "Rumbelly", "Seadog", "Plankwalker", "Bones", "Squidbeard", "Driftwood", "Sharkbait", "Bootstraps"];

        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        return `${randomFirstName} ${randomLastName}`;
    }
</script>

</body>
</html>

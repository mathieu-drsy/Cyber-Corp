<!DOCTYPE html>
<html>
    <body>
    <title>Sélection du niveau</title>
    <link rel="stylesheet" href="index.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0px;
        }

        h1 {
            color: #333;
        }

        .btn-container {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;
        }

        .btn1 {
            width: 200px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn1:hover {
            background-color: #1ab71a;
        }

        .btn2 {
            width: 200px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn2:hover {
            background-color: #e18f13;
        }

        .btn3 {
            width: 200px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn3:hover {
            background-color: #de1717;
        }
    </style>
</head>
<body>
    <h1>Bienvenue sur CYBER CORP</h1>
    <h1>Choisissez votre niveau</h1>

    <div class="btn-container">
        <div class="btn1" onclick="redirectTo('Novice/Novice.html')">
            <h3>Novice</h3>
            <p>Si vous êtes nouveau dans le domaine.</p>
        </div>
        <div class="btn2" onclick="redirectTo('transition/transition.html')">
            <h3>Intermédiaire</h3>
            <p>Si vous avez des connaissances de base.</p>
        </div>
        <div class="btn3" onclick="redirectTo('transition/transition.html')">
            <h3>Avancée</h3>
            <p>Si vous êtes un professionnel expérimenté.</p>
        </div>
    </div>

    <script>
        function redirectTo(url) {
            window.location.href = url;
        }
    </script>
</body>
</html>

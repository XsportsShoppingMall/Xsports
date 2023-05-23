<?php
$host = 'localhost';
$db   = 'XsportsShoppingMalldb';
$user = 'root';
$pass = 'example';
$charset = 'utf8mb4';
$port = 3307;

$dsn = "mysql:host=$host;dbname=$db;charset=$charset;port=$port";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$query = $pdo->query("SELECT * FROM represent_productTBL ORDER BY views DESC LIMIT 30");

// 이부분은 HTML에 들어갑니다.
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Xsports Shopping Mall</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1 class="my-4">Xsports Shopping Mall</h1>
        
        <!-- Search form -->
        <form class="form-inline my-4">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fas fa-search"></i> Search</button>
        </form>
        
        <!-- Categories -->
        <div class="row my-4">
            <div class="col">
                <h3>Categories</h3>
                <!-- Add your categories here -->
            </div>
        </div>
        
        <!-- Product listing -->
        <div class="row">
            <?php while ($row = $query->fetch()): ?>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <img class="card-img-top" src="data:image/jpeg;base64,<?= base64_encode( $row['image_data'] )?>" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title"><?= htmlspecialchars($row['name']) ?></h5>
                            <h6><?= htmlspecialchars($row['price']) ?></h6>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</body>
</html>

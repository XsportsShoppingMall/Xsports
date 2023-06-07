<?php
$host = 'db:3306';
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
    
</head>
<body>
    
</body>
</html>

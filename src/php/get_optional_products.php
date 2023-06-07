<?php
// DB 연결 정보
$host = 'db';
$dbname = 'XsportsShoppingMalldb';
$username = 'root';
$password = 'example';

// DB 연결
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die('DB Connection failed: ' . $conn->connect_error);
}

// 사용자 입력 값
$productID = $_GET['productID'];

// optional_productTBL에서 product_no가 $productID인 상품 검색
$sql = "SELECT * FROM optional_productTBL WHERE product_no = $productID";

// 쿼리 실행
$result = $conn->query($sql);
$products = $result->fetch_all(MYSQLI_ASSOC);

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode($products);

// 연결 종료
$conn->close();
?>

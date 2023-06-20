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
$product_no = $_GET['product_no'];

// 쿼리 생성
$sql = "SELECT * FROM represent_productTBL WHERE product_no = ?";

// 쿼리 실행
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$product_no);
$stmt->execute();
$result = $stmt->get_result();
$products = $result->fetch_all(MYSQLI_ASSOC);

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode($products);

// 연결 종료
$stmt->close();
$conn->close();
?>

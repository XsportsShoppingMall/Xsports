<?php
// DB 연결 정보
$host = 'db:3306';
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

// 쿼리 생성
$sql = "SELECT * FROM represent_productTBL WHERE product_no = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $productID); // i는 integer 데이터 타입을 의미합니다.

// 쿼리 실행
$stmt->execute();
$result = $stmt->get_result();
$item = $result->fetch_assoc();

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode($item);

// 연결 종료
$stmt->close();
$conn->close();
?>

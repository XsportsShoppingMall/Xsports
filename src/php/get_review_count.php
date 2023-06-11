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
$productNo = $_GET['product_no'];

// 쿼리 생성
$sql = "SELECT COUNT(*) AS review_count FROM review_articleTBL WHERE product_no = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $productNo);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
$reviewCount = $data['review_count'];

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode(array('review_count' => $reviewCount));

// 연결 종료
$stmt->close();
$conn->close();
?>

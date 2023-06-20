<?php
// 데이터베이스 연결 설정
$host = 'db:3306';
$dbname = 'XsportsShoppingMalldb';
$username = 'root';
$password = 'example';

// MySQL 연결 생성
$conn = new mysqli($host, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// POST 데이터 가져오기
$member_id = $_GET['member_id'];
$product_no = $_GET['product_no'];

// 데이터베이스에 데이터 삽입
$stmt = $conn->prepare("INSERT INTO favoriteTBL (memberID, product_no) VALUES (?, ?)");
$stmt->bind_param('si', $member_id, $product_no);

$response = [];

if ($stmt->execute()) {
  // 성공적으로 추가되었음을 응답으로 전송
  $response['success'] = true;
} else {
  // 오류가 발생하면 오류 메시지를 응답으로 전송
  $response['success'] = false;
  $response['message'] = $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>

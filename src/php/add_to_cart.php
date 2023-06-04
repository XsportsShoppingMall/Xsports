<?php
// 데이터베이스 연결 설정
$host = 'db:3306';
$dbname = 'XsportsShoppingMalldb';
$username = 'cookUser';
$password = '1234';

// MySQL 연결 생성
$conn = new mysqli($host, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

// POST 데이터 가져오기
$data = json_decode(file_get_contents('php://input'), true);

// 데이터베이스에 데이터 삽입
$stmt = $conn->prepare("INSERT INTO shopping_cartTBL (memberID, product_no, product_index, product_quantity) VALUES (?, ?, ?, ?)");
$stmt->bind_param('siii', $data['memberID'], $data['product_no'], $data['product_index'], $data['product_quantity']);

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
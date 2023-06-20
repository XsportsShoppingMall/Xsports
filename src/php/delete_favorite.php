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
$memberID = $_GET['member_id'];
$product_no = $_GET['product_no'];

// 쿼리 생성
$sql = "DELETE FROM favoriteTBL WHERE memberID =? AND product_no = ?";

// 쿼리 실행
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $memberID,$product_no);
if ($stmt->execute()) {
    // 성공적으로 추가되었음을 응답으로 전송
    $response['success'] = true;
  } else {
    // 오류가 발생하면 오류 메시지를 응답으로 전송
    $response['success'] = false;
    $response['message'] = $stmt->error;
  }

// 연결 종료
$stmt->close();
$conn->close();
?>

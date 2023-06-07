<?php
// DB 연결 정보
$host = 'db';
$dbname = 'XsportsShoppingMalldb';
$username = 'cookUser';
$password = '1234';

// DB 연결
$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die('DB Connection failed: ' . $conn->connect_error);
}

// 사용자 입력 값
$memberID = $_GET['memberID'];
$product_no = $_GET['product_no'];
$product_index = $_GET['product_index'];

// 쿼리 생성
$sql = "DELETE FROM shopping_cartTBL WHERE memberID =? AND product_no = ? AND product_index = ?";

// 쿼리 실행
$stmt = $conn->prepare($sql);
$stmt->bind_param("sii", $memberID,$product_no,$product_index);
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

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
$productNo = $_GET['product_no'];

// 쿼리 생성
$sql = "SELECT AVG(star_rating) AS avg_rating FROM review_articleTBL WHERE product_no = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $productNo);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
$averageRating = $data['avg_rating'];

// 평균 별점값이 없을 경우 기본값 설정
$averageRating = $averageRating ? round($averageRating, 1) : 0;

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode(array('average_rating' => $averageRating));

// 연결 종료
$stmt->close();
$conn->close();
?>

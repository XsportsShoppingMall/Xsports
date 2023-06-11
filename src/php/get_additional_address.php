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
$member_id = $_GET['member_id'];

// 쿼리 생성
$sql = "SELECT * FROM additional_addressTBL 
        WHERE memberTBL_ID = ?";

// 쿼리 실행
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$member_id);
$stmt->execute();
$result = $stmt->get_result();
$address = $result->fetch_all(MYSQLI_ASSOC);

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode($address);

// 연결 종료
$stmt->close();
$conn->close();
?>

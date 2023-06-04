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
$member_id = $_GET['member_id'];

// 쿼리 생성
$sql = "SELECT *, o.price AS price_change FROM shopping_cartTBL AS s
        JOIN optional_productTBL AS o ON s.product_no = o.product_no AND s.product_index = o.product_index
        JOIN represent_productTBL AS r ON o.product_no = r.product_no
        WHERE s.memberID = ? 
        ORDER BY s.product_no ASC";

// 쿼리 실행
$stmt = $conn->prepare($sql);
$stmt->bind_param("s",$member_id);
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

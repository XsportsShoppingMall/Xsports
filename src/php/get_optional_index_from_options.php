<?php
// 필요한 처리를 수행하고 상품 인덱스를 검색하는 로직을 작성합니다.
// 상품의 이름과 옵션 정보를 가져옵니다.
echo "start";
$productNo = $_POST['product_no'];
$colorOption = $_POST['color'];
$sizeOption = $_POST['size'];
$otherOption = $_POST['other_option'];

// 데이터베이스 연결 및 쿼리 실행
$host = 'db:3306';
$dbname = 'XsportsShoppingMalldb';
$username = 'cookUser';
$password = '1234';

// 데이터베이스 연결
$conn = new mysqli($host, $username, $password, $dbname);

// 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 상품 인덱스를 검색하는 쿼리 실행
$query = "SELECT * FROM optional_productTBL WHERE product_no = ? AND color = ? AND size = ? AND other_option = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('isss', $productNo, $colorOption, $sizeOption, $otherOption);
$stmt->execute();
$result = $stmt->get_result();
$product = $result->fetch_assoc();
$stmt->close();
$conn->close();

// 검색된 상품 정보를 JSON 형식으로 반환합니다.
echo json_encode($product);
?>



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
$productID = $_GET['product_no'];
$color = $_GET['color'];
$size = $_GET['size'];
$other_option = $_GET['other_option'];

// optional_productTBL에서 product_no가 $productID인 상품 검색
if($color == null){
    $color='';
}
if($size == null){
    $size='';
}
if($other_option == null){
    $other_option='';
}
$sql = "SELECT * FROM optional_productTBL WHERE product_no = ? AND color = ? AND size = ? AND other_option = ?";

$stmt = $conn->prepare($sql);

// Bind the parameters
$stmt->bind_param("isss", $productID, $color, $size , $other_option);

// Execute the query
$stmt->execute();

// Fetch the product
$result = $stmt->get_result();
$product = $result->fetch_assoc();

// JSON 형태로 결과 반환
header('Content-Type: application/json');
echo json_encode($product);

// 연결 종료

$conn->close();
?>

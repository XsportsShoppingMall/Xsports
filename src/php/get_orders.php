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

// 주문정보 관련 POST 데이터 받아오기

$ID = $_GET['ID'];

  // 장바구니 상품 불러오기 쿼리
  // 쿼리 생성
  $sql = "  SELECT *, rp.name as product_name, m.name as member_name FROM orderTBL as o, 
            ordered_productTBL as op, 
            represent_productTBL as rp, 
            optional_productTBL as opp, 
            memberTBL as m 
            WHERE o.shopper_ID = ? 
            AND o.order_no = op.order_no 
            AND op.product_no = rp.product_no 
            AND rp.product_no = opp.product_no 
            AND op.product_index = opp.product_index 
            AND o.shopper_ID = m.ID 
            order by order_date DESC";

  // 쿼리 실행
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s",$ID);
  $stmt->execute();
  $result = $stmt->get_result();
  $ordered_items = $result->fetch_all(MYSQLI_ASSOC);

$stmt->close();

echo json_encode($ordered_items);
?>

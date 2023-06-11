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
$data = json_decode(file_get_contents('php://input'), true);

$shopper_ID = $data['shopper_ID'];
$receiver = $data['receiver'];
$order_date = date('Y-m-d H:i:s');
$payment_method = $data['payment_method'];
$delivery_address = $data['delivery_address'];
$delivery_zipCode = $data['delivery_zipCode'];
$delivery_address_nickname = $data['delivery_address_nickname'];
$used_point = $data['used_point'];
$delivery_pay = $data['delivery_pay'];
$is_address_save = $data['is_address_save'];
$earned_point = $data['earned_point'];

// 트랜잭션 시작
$conn->autocommit(false);

try {
  // 주문정보 삽입
  $stmt1 = $conn->prepare("INSERT INTO orderTBL (shopper_ID, receiver, order_date, payment_method, delivery_address, delivery_zipCode, delivery_address_nickname, used_point, delivery_pay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt1->bind_param('sssssssii', $shopper_ID, $receiver, $order_date, $payment_method, $delivery_address, $delivery_zipCode, $delivery_address_nickname, $used_point, $delivery_pay);
  $stmt1->execute();

  // 삽입한 주문의 order_no 조회
  $order_no = $stmt1->insert_id;

  // 장바구니 상품 불러오기 쿼리
  // 쿼리 생성
  $sql = "SELECT *, o.price AS price_change FROM shopping_cartTBL AS s
          JOIN optional_productTBL AS o ON s.product_no = o.product_no AND s.product_index = o.product_index
          JOIN represent_productTBL AS r ON o.product_no = r.product_no
          WHERE s.memberID = ? 
          ORDER BY s.product_no ASC";

  // 쿼리 실행
  $stmt2 = $conn->prepare($sql);
  $stmt2->bind_param("s",$shopper_ID);
  $stmt2->execute();
  $result = $stmt2->get_result();
  $cart_items = $result->fetch_all(MYSQLI_ASSOC);

  // 주문에 상품 추가
  foreach ($cart_items as $item) {
    $product_no = $item['product_no'];
    $product_index = $item['product_index'];
    $product_quantity = $item['product_quantity'];
    $unit_price = $item['price_change'];

    $stmt3 = $conn->prepare("INSERT INTO ordered_productTBL (order_no, product_no, product_index, product_quantity, unit_price) VALUES (?, ?, ?, ?, ?)");
    $stmt3->bind_param('iiiii', $order_no, $product_no, $product_index, $product_quantity, $unit_price);
    $stmt3->execute();
  }

  // 장바구니 비우기
  $stmt4 = $conn->prepare("DELETE FROM shopping_cartTBL WHERE memberID = ?");
  $stmt4->bind_param('s', $shopper_ID);
  $stmt4->execute();

  // 포인트 불러오기
  // 쿼리 생성
  $sql = "SELECT * FROM memberTBL WHERE ID = ?";

  // 쿼리 실행
  $stmt5 = $conn->prepare($sql);
  $stmt5->bind_param("s",$shopper_ID);
  $stmt5->execute();
  $result = $stmt5->get_result();
  $members = $result->fetch_all(MYSQLI_ASSOC);
  
  $current_point = $members[0]['current_point'] + $earned_point - $used_point;
  $accumulated_point = $members[0]['accumulated_point'] + $earned_point;
  
  //포인트 저장하기  
  $stmt6 = $conn->prepare("UPDATE memberTBL SET current_point = ?, accumulated_point = ? WHERE ID = ?");
  $stmt6 -> bind_param('iis', $current_point, $accumulated_point , $shopper_ID);
  $stmt6 -> execute();

  
  if($is_address_save == true){
    //배송지 저장
    $stmt7 = $conn->prepare("INSERT INTO additional_addressTBL VALUES (?, ?, ?, ?)");
    $stmt7 -> bind_param('ssss', $shopper_ID, $delivery_address_nickname , $delivery_address, $delivery_zipCode);
    $stmt7 -> execute();
  }

  // 트랜잭션 커밋
  $conn->commit();
  
  // 응답 전송
  $response['success'] = true;
} catch (Exception $e) {
  // 트랜잭션 롤백
  $conn->rollback();

  // 오류 응답 전송
  $response['success'] = false;
  $response['message'] = $e->getMessage();
}

$stmt1->close();
$stmt2->close();
$stmt3->close();
$stmt4->close();
$stmt5->close();
$stmt6->close();
$stmt7->close();
$conn->close();

echo json_encode($response);
?>

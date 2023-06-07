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
$category = $_GET['category'];
$search = $_GET['search'];
$sort = $_GET['sort'];
$page = $_GET['page'];

// 쿼리 생성
$sql = "SELECT * FROM represent_productTBL";
$params = array();

if (!empty($category)) {
    $sql .= " WHERE category = ?";
    $params[] = $category;
}

if (!empty($search)) {
    if (empty($category)) {
        $sql .= " WHERE";
    } else {
        $sql .= " AND";
    }
    $sql .= " name LIKE ?";
    $params[] = "%$search%";
}

// 정렬 방식 설정
switch ($sort) {
    case 'views':
        $sql .= " ORDER BY views DESC";
        break;
    case 'price':
        $sql .= " ORDER BY price ASC";
        break;
    case 'add_date':
        $sql .= " ORDER BY add_date DESC";
        break;
    default:
        $sql .= " ORDER BY views DESC";
        break;
}

$offset = ($page - 1) * 9;
$sql .= " LIMIT 9 OFFSET $offset";

// 쿼리 실행
$stmt = $conn->prepare($sql);
if (!empty($params)) {
    $types = str_repeat('s', count($params));
    $stmt->bind_param($types, ...$params);
}
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
